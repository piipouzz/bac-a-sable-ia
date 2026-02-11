import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Section from "../components/Section"
import QuizCard from "../components/QuizCard"
import ReservationForm from "../components/ReservationForm"
import { destinations, quizContent, quizQuestions, reservationContent } from "../data/destinations"
import { sendChat } from "../lib/apiClient"
import { openChat } from "../lib/utils"

export default function Quiz() {
  const [searchParams] = useSearchParams()
  const preselect = searchParams.get("preselect")

  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [aiLoading, setAiLoading] = useState(false)
  const [aiText, setAiText] = useState<string | null>(null)

  const completed = quizQuestions.every(q => answers[q.id])

  const recommendedId = useMemo(() => {
    const validPreselect = preselect && destinations.find(d => d.id === preselect) ? preselect : null
    if (validPreselect) return validPreselect

    const scores: Record<string, number> = {
      "paris-1889": 0,
      cretace: 0,
      "florence-1504": 0
    }

    const addScore = (id: keyof typeof scores, value: number) => {
      scores[id] += value
    }

    if (answers.style === "Élégance urbaine") addScore("paris-1889", 2)
    if (answers.style === "Exploration sauvage") addScore("cretace", 2)
    if (answers.style === "Art et ateliers") addScore("florence-1504", 2)

    if (answers.intensity === "Rassurant") addScore("paris-1889", 2)
    if (answers.intensity === "Intense") addScore("cretace", 2)
    if (answers.intensity === "Équilibré") addScore("florence-1504", 1)

    if (answers.focus === "Culture") addScore("paris-1889", 2)
    if (answers.focus === "Aventure") addScore("cretace", 2)
    if (answers.focus === "Art") addScore("florence-1504", 2)

    if (answers.budget === "VIP") addScore("florence-1504", 1)
    if (answers.budget === "Premium") addScore("paris-1889", 1)
    if (answers.budget === "Standard") addScore("paris-1889", 1)

    if (answers.ambiance === "Soirees glamour") addScore("paris-1889", 2)
    if (answers.ambiance === "Nature brute") addScore("cretace", 2)
    if (answers.ambiance === "Ateliers et chefs-d'oeuvre") addScore("florence-1504", 2)

    if (answers.rythme === "Rythme doux") addScore("paris-1889", 1)
    if (answers.rythme === "Expedition intense") addScore("cretace", 1)
    if (answers.rythme === "Flanerie artistique") addScore("florence-1504", 1)

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
    return sorted[0]?.[0] || "paris-1889"
  }, [answers, preselect])

  const destination = destinations.find(d => d.id === recommendedId)

  const explanation = useMemo(() => {
    if (!destination) return ""
    const focus = answers.focus || destination.tags[0]
    const intensity = answers.intensity || "Équilibré"
    const ambiance = answers.ambiance || "Soirees glamour"
    const budget = answers.budget || "Premium"
    return `Vos choix orientes ${focus.toLowerCase()} et un niveau ${intensity.toLowerCase()} suggerent ${destination.title}. L'ambiance ${ambiance.toLowerCase()} et le pack ${budget} renforcent ce choix pour un voyage aussi fluide qu'inoubliable.`
  }, [answers, destination])

  const generatePremium = async () => {
    if (!destination) return
    setAiLoading(true)
    try {
      const reply = await sendChat(
        [
          {
            role: "user",
            content: `Reformule une recommandation premium. Destination: ${destination.title}. Réponses quiz: ${JSON.stringify(answers)}.`
          }
        ],
        "quiz"
      )
      setAiText(reply)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <Section title={quizContent.title} subtitle={quizContent.subtitle}>
      {preselect && destination && (
        <div className="mb-6 glass rounded-2xl p-4 text-smoke">
          {quizContent.preselectLabel}: {destination.title}
        </div>
      )}
      <div id="quiz" className="grid md:grid-cols-2 gap-6">
        {quizQuestions.map(q => (
          <QuizCard
            key={q.id}
            title={q.title}
            options={q.options}
            selected={answers[q.id]}
            onSelect={value => setAnswers(prev => ({ ...prev, [q.id]: value }))}
          />
        ))}
      </div>

      {completed && destination && (
        <div className="mt-10 space-y-8">
          <div className="glass rounded-2xl p-6">
            <div className="text-smoke uppercase tracking-[0.2em] text-xs">{quizContent.recommendationLabel}</div>
            <h3 className="font-display text-2xl text-gold mt-2">{destination.title}</h3>
            <p className="text-smoke mt-3">{explanation}</p>
            {aiText && <p className="text-platinum mt-4">{aiText}</p>}
            <div className="mt-6 flex gap-4">
              <button onClick={generatePremium} className="btn-gold" disabled={aiLoading} type="button">
                {aiLoading ? "Génération..." : quizContent.premiumCta}
              </button>
              <button onClick={() => openChat()} className="btn-outline" type="button">
                {quizContent.chatCta}
              </button>
            </div>
          </div>
          <div>
            <div className="text-smoke uppercase tracking-[0.2em] text-xs">{reservationContent.title}</div>
            <h4 className="font-display text-xl text-gold mt-2">{reservationContent.subtitle}</h4>
            <div className="mt-4">
              <ReservationForm initialDestinationId={destination.id} />
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}

