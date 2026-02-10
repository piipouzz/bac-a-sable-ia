import { useMemo, useState } from "react"
import Section from "../components/Section"
import DestinationCard from "../components/DestinationCard"
import { destinations, destinationsPage } from "../data/destinations"

export default function Destinations() {
  type Filter = (typeof destinationsPage.filters)[number]
  const [filter, setFilter] = useState<Filter>("Tous")

  const filtered = useMemo(() => {
    if (filter === "Tous") return destinations
    return destinations.filter(d => d.tags.includes(filter))
  }, [filter])

  return (
    <Section title={destinationsPage.title} subtitle={destinationsPage.subtitle}>
      <div className="flex gap-3 flex-wrap">
        {destinationsPage.filters.map(tag => (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`px-4 py-2 rounded-full border transition ${filter === tag ? "border-gold bg-gold/10 text-gold" : "border-gold/30 text-smoke"}`}
            type="button"
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {filtered.map(d => (
          <DestinationCard key={d.id} destination={d} />
        ))}
      </div>
    </Section>
  )
}
