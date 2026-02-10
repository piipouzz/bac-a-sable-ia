import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import Section from "../components/Section"
import { detailContent, destinations } from "../data/destinations"
import { formatPrice, openChat, resolveAsset } from "../lib/utils"
import { fallbackAsset } from "../assets"

export default function DestinationDetail() {
  const { id } = useParams()
  const destination = useMemo(() => destinations.find(d => d.id === id), [id])

  if (!destination) {
    return (
      <Section title={detailContent.notFoundTitle}>
        <p className="text-smoke">{detailContent.notFoundText}</p>
      </Section>
    )
  }

  const imageSrc = resolveAsset(destination.imageKey)

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="container-safe py-16">
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10">
              <img
                src={imageSrc}
                alt={destination.title}
                className="w-40 h-40 md:w-56 md:h-56"
                loading="lazy"
                decoding="async"
                onError={e => {
                  e.currentTarget.src = fallbackAsset
                }}
              />
              <div>
                <div className="text-smoke uppercase tracking-[0.2em] text-xs">{destination.era}</div>
                <h1 className="font-display text-4xl text-gold mt-2">{destination.title}</h1>
                <p className="text-smoke mt-4 max-w-2xl">{destination.description}</p>
                <div className="mt-6 flex gap-3 flex-wrap">
                  {destination.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full border border-gold/40 text-gold">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-4">
                  <Link to={`/quiz?preselect=${destination.id}`} className="btn-gold">
                    {detailContent.planLabel}
                  </Link>
                  <button
                    onClick={() => openChat(`Je souhaite planifier un voyage vers ${destination.title}.`)}
                    className="btn-outline"
                    type="button"
                  >
                    {detailContent.chatLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section title={detailContent.highlightsTitle}>
        <ul className="grid md:grid-cols-3 gap-4">
          {destination.highlights.map(item => (
            <li key={item} className="glass rounded-2xl p-5 text-smoke">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={detailContent.preparationTitle}>
        <ul className="grid md:grid-cols-3 gap-4">
          {destination.preparation.map(item => (
            <li key={item} className="glass rounded-2xl p-5 text-smoke">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={detailContent.riskTitle}>
        <div className="glass rounded-2xl p-6 text-gold">{destination.riskLevel}</div>
      </Section>

      <Section title={detailContent.packsTitle}>
        <div className="grid md:grid-cols-3 gap-6">
          {destination.packs.map(pack => (
            <div key={pack.name} className="glass rounded-2xl p-6">
              <h3 className="font-display text-xl text-gold">{pack.name}</h3>
              <div className="text-2xl mt-2">{formatPrice(pack.price)}</div>
              <ul className="mt-4 space-y-2 text-smoke">
                {pack.perks.map(perk => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
