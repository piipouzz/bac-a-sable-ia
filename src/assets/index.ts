import parisHero from "./paris-hero.jpg"
import cretaceHero from "./cretace-hero.jpg"
import florenceHero from "./florence-hero.jpg"
import hero from "./hero-video-placeholder.svg"

export const assets = {
  "paris-1889": parisHero,
  cretace: cretaceHero,
  "florence-1504": florenceHero,
  hero
} as const

export const fallbackAsset = hero
