import { destinations } from "../src/data/destinations"

const rateStore = new Map<string, { count: number; ts: number }>()

const SYSTEM_PROMPT = `
Tu es l'assistant virtuel de TimeTravel Agency, agence de voyage temporel de luxe.
Ton rôle: conseiller, guider, répondre aux questions, proposer des offres.
Ton ton: professionnel, chaleureux, passionné d'histoire, enthousiaste sans être familier.
Tu connais parfaitement les 3 destinations et tu inventes des prix réalistes.
Tu poses 1 à 2 questions pour affiner les préférences quand c'est utile.
Tu ne promets jamais l'impossible: tu respectes des protocoles temporels fictifs.
Tu peux répondre à une FAQ: sécurité, durée, risques, assurance, conditions d'annulation, tenue recommandée.
Réponds en français.
`

const MODE_HINTS = {
  chat: "Objectif: conseiller le client, clarifier son besoin et proposer un pack adapté.",
  quiz: "Objectif: reformuler une recommandation premium élégante et convaincante en 3 à 5 phrases."
}

const buildContext = () =>
  destinations
    .map(d => ({
      id: d.id,
      title: d.title,
      era: d.era,
      tags: d.tags,
      teaser: d.teaser,
      description: d.description,
      highlights: d.highlights,
      preparation: d.preparation,
      riskLevel: d.riskLevel,
      packs: d.packs
    }))
    .map(d => JSON.stringify(d))
    .join("\n")

const rateLimit = (ip: string) => {
  const now = Date.now()
  const current = rateStore.get(ip)
  if (!current || now - current.ts > 60000) {
    rateStore.set(ip, { count: 1, ts: now })
    return true
  }
  if (current.count >= 10) return false
  current.count += 1
  return true
}

const sanitizeMessages = (input: any[]) => {
  const allowed = new Set(["user", "assistant"])
  return input
    .filter(m => m && allowed.has(m.role) && typeof m.content === "string")
    .map(m => ({ role: m.role, content: m.content.slice(0, 800) }))
    .slice(-12)
}

const sendJson = (res: any, status: number, data: any) => {
  if (res?.status && res?.json) {
    res.status(status).json(data)
    return
  }
  res.statusCode = status
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(data))
}

export const handleChat = async (req: any, res: any) => {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method Not Allowed" })
    return
  }

  const forwarded = req.headers?.["x-forwarded-for"]
  const ip = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket?.remoteAddress || "unknown"
  if (!rateLimit(ip)) {
    sendJson(res, 429, { error: "Rate limit" })
    return
  }

  const body = req.body || {}
  const rawMessages = Array.isArray(body.messages) ? body.messages : []
  const messages = sanitizeMessages(rawMessages)
  if (messages.length === 0) {
    sendJson(res, 400, { error: "Invalid payload" })
    return
  }

  const lastUser = messages.filter(m => m.role === "user").at(-1)?.content || ""
  if (lastUser.length === 0 || lastUser.length > 800) {
    sendJson(res, 400, { error: "Invalid message size" })
    return
  }

  const mode = body.mode === "quiz" ? "quiz" : "chat"
  const model = process.env.MISTRAL_MODEL || "mistral-small-latest"
  const apiKey = process.env.MISTRAL_API_KEY

  if (!apiKey) {
    sendJson(res, 500, { error: "Missing API key" })
    return
  }

  const system = [SYSTEM_PROMPT.trim(), MODE_HINTS[mode], "Contexte destinations:", buildContext()].join("\n")
  const payload = {
    model,
    messages: [{ role: "system", content: system }, ...messages],
    temperature: mode === "quiz" ? 0.7 : 0.6,
    max_tokens: 500
  }

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      sendJson(res, 500, { error: "OpenAI error" })
      return
    }

    const data = await response.json()
    const reply = data?.choices?.[0]?.message?.content || "Je reviens vers vous avec une proposition."
    sendJson(res, 200, { reply })
  } catch {
    sendJson(res, 500, { error: "Server error" })
  }
}
