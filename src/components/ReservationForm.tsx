import { useMemo, useState } from "react"
import { destinations, reservationContent } from "../data/destinations"

type Errors = {
  destinationId?: string
  startDate?: string
  endDate?: string
}

export default function ReservationForm() {
  const today = new Date().toISOString().slice(0, 10)
  const [destinationId, setDestinationId] = useState(destinations[0]?.id ?? "")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo<Errors>(() => {
    const next: Errors = {}
    if (!destinationId) next.destinationId = reservationContent.errors.destination
    if (!startDate) next.startDate = reservationContent.errors.startDate
    if (!endDate) next.endDate = reservationContent.errors.endDate
    if (startDate && endDate && startDate > endDate) next.endDate = reservationContent.errors.dateOrder
    if (startDate && startDate < today) next.startDate = reservationContent.errors.startPast
    return next
  }, [destinationId, startDate, endDate, today])

  const hasErrors = Boolean(errors.destinationId || errors.startDate || errors.endDate)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (hasErrors) return
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 grid gap-6">
      <div className="grid gap-2">
        <label className="text-sm text-smoke">{reservationContent.labels.destination}</label>
        <select
          value={destinationId}
          onChange={e => setDestinationId(e.target.value)}
          className="bg-night text-platinum border border-gold/30 rounded-xl px-4 py-3 focus:outline-none"
        >
          {destinations.map(destination => (
            <option key={destination.id} value={destination.id}>
              {destination.title}
            </option>
          ))}
        </select>
        {errors.destinationId && <p className="text-xs text-gold">{errors.destinationId}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label className="text-sm text-smoke">{reservationContent.labels.startDate}</label>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={e => setStartDate(e.target.value)}
            className="bg-night text-platinum border border-gold/30 rounded-xl px-4 py-3 focus:outline-none"
          />
          {errors.startDate && <p className="text-xs text-gold">{errors.startDate}</p>}
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-smoke">{reservationContent.labels.endDate}</label>
          <input
            type="date"
            value={endDate}
            min={startDate || today}
            onChange={e => setEndDate(e.target.value)}
            className="bg-night text-platinum border border-gold/30 rounded-xl px-4 py-3 focus:outline-none"
          />
          {errors.endDate && <p className="text-xs text-gold">{errors.endDate}</p>}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <button type="submit" className="btn-gold w-full md:w-auto" disabled={hasErrors}>
          {reservationContent.cta}
        </button>
        {submitted && <p className="text-sm text-smoke">{reservationContent.success}</p>}
      </div>
    </form>
  )
}
