export type ChatMessage = {
  role: "user" | "assistant" | "system"
  content: string
}

export type ChatResponse = {
  reply: string
}

export const sendChat = async (messages: ChatMessage[], mode: "chat" | "quiz" = "chat") => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, mode })
  })
  if (!res.ok) {
    throw new Error("Erreur de réponse IA")
  }
  const data = (await res.json()) as ChatResponse
  return data.reply
}
