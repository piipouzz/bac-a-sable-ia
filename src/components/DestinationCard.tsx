import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Destination } from "../data/destinations"
import { cn, resolveAsset } from "../lib/utils"
import { fallbackAsset } from "../assets"

type Props = {
  destination: Destination
  className?: string
}

export default function DestinationCard({ destination, className }: Props) {
  const imageSrc = resolveAsset(destination.imageKey)
  return (
    <motion.div
      className={cn("glass rounded-2xl overflow-hidden group", className)}
      whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link to={`/destinations/${destination.id}`} className="block">
        <div className="relative h-48 bg-coal flex items-center justify-center">
          <img
            src={imageSrc}
            alt={destination.title}
            className="h-32 w-32 opacity-80 group-hover:opacity-100 transition"
            loading="lazy"
            decoding="async"
            onError={e => {
              e.currentTarget.src = fallbackAsset
            }}
          />
          <span className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
        </div>
        <div className="p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-smoke">{destination.era}</div>
          <h3 className="font-display text-xl mt-2 text-gold">{destination.title}</h3>
          <p className="text-sm text-smoke mt-2">{destination.teaser}</p>
          <div className="flex gap-2 mt-4 flex-wrap">
            {destination.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full border border-gold/40 text-gold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
