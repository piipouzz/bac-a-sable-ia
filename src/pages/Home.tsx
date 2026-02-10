import { useState } from "react"
import Section from "../components/Section"
import DestinationCard from "../components/DestinationCard"
import { destinations, siteContent } from "../data/destinations"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { assets } from "../assets"
import { openChat } from "../lib/utils"

export default function Home() {
  const [videoReady, setVideoReady] = useState(true)
  const heroVideo = siteContent.hero.videoSrc
  const showVideo = Boolean(heroVideo) && videoReady

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero animate-glow" />
        {showVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            autoPlay
            muted
            loop
            playsInline
            poster={assets.hero}
            src={heroVideo}
            onError={() => setVideoReady(false)}
          />
        )}
        {!showVideo && (
          <div className="absolute inset-0 opacity-30 flex items-center justify-center">
            <img src={assets.hero} alt="Video placeholder" className="w-48 h-48" loading="lazy" decoding="async" />
          </div>
        )}
        <div className="container-safe relative z-10 pt-24 pb-28">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display text-4xl md:text-6xl text-platinum max-w-3xl"
          >
            {siteContent.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-smoke mt-4 max-w-2xl"
          >
            {siteContent.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-6 flex gap-4"
          >
            <a href="#destinations" className="btn-gold">
              {siteContent.hero.primaryCta}
            </a>
            <Link to="/quiz" className="btn-outline">
              {siteContent.hero.secondaryCta}
            </Link>
          </motion.div>
        </div>
      </section>

      <Section title={siteContent.about.title} subtitle={siteContent.about.subtitle}>
        <div className="grid md:grid-cols-3 gap-6">
          {siteContent.about.items.map(item => (
            <div key={item.title} className="glass rounded-2xl p-6">
              <h3 className="font-display text-lg text-gold">{item.title}</h3>
              <p className="text-smoke mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="destinations" title={siteContent.homeDestinations.title} subtitle={siteContent.homeDestinations.subtitle}>
        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map(d => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </Section>

      <Section title={siteContent.homeChat.title} subtitle={siteContent.homeChat.subtitle}>
        <div className="glass rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl text-gold">{siteContent.homeChat.title}</h3>
            <p className="text-smoke mt-2 max-w-2xl">{siteContent.homeChat.subtitle}</p>
          </div>
          <button onClick={() => openChat()} className="btn-gold" type="button">
            {siteContent.homeChat.cta}
          </button>
        </div>
      </Section>
    </div>
  )
}
