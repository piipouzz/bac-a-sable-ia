export type Tag = "Culture" | "Aventure" | "Art"

export type DestinationPack = {
  name: "Standard" | "Premium" | "VIP"
  price: number
  perks: string[]
}

export type Destination = {
  id: string
  title: string
  era: string
  tags: Tag[]
  teaser: string
  description: string
  imageKey: string
  highlights: string[]
  preparation: string[]
  riskLevel: "Faible" | "Modéré" | "Élevé"
  packs: DestinationPack[]
}

export type QuizQuestion = {
  id: string
  title: string
  options: string[]
}

export const siteContent = {
  brand: "TimeTravel Agency",
  nav: [
    { label: "Destinations", type: "route", to: "/destinations" },
    { label: "Quiz", type: "route", to: "/quiz" },
    { label: "Chat", type: "chat" }
  ],
  headerCta: { label: "Réserver", to: "/quiz" },
  hero: {
    title: "Voyage temporel premium, sécurité absolue, souvenirs éternels",
    subtitle:
      "TimeTravel Agency orchestre des expériences historiques immersives sous protocoles stricts. Découvrez nos destinations exclusives et laissez-vous guider par notre concierge IA.",
    videoSrc: "/video/hero.mp4",
    primaryCta: "Explorer",
    secondaryCta: "Quiz personnalisé"
  },
  about: {
    title: "À propos de l'agence",
    subtitle: "Luxe, sécurité et respect des règles temporelles.",
    items: [
      {
        title: "Encadrement scientifique",
        text: "Nos équipes spécialisées calibrent chaque itinéraire et supervisent chaque étape du voyage."
      },
      {
        title: "Protocoles exclusifs",
        text: "Accès sécurisé, discrétion totale et respect des lignes temporelles pour une expérience irréprochable."
      },
      {
        title: "Expérience ultra-premium",
        text: "Services haut de gamme, conciergerie privée et prestations sur mesure à chaque époque."
      }
    ]
  },
  homeDestinations: {
    title: "Destinations phares",
    subtitle: "Trois voyages emblématiques pour un premier saut temporel."
  },
  homeChat: {
    title: "Chat concierge",
    subtitle: "Un assistant IA pour affiner votre expérience, vos dates et votre niveau de confort.",
    cta: "Ouvrir le chat"
  },
  footer: {
    legal: "© 2026 TimeTravel Agency — Projet pédagogique",
    credits: "Crédits: assets placeholders",
    mentions: "Mentions: protocoles temporels fictifs"
  }
} as const

export const destinationsPage = {
  title: "Destinations",
  subtitle: "Filtrez par thème pour affiner votre sélection.",
  filters: ["Tous", "Culture", "Aventure", "Art"]
} as const

export const detailContent = {
  highlightsTitle: "À ne pas manquer",
  preparationTitle: "Conseils de préparation",
  riskTitle: "Niveau de risque",
  packsTitle: "Packs & prix",
  planLabel: "Planifier ce voyage",
  chatLabel: "Ouvrir le chat",
  notFoundTitle: "Destination introuvable",
  notFoundText: "Cette destination n'existe pas ou a été retirée."
} as const

export const quizContent = {
  title: "Quiz personnalisé",
  subtitle: "Quatre questions pour affiner votre voyage idéal.",
  recommendationLabel: "Recommandation",
  premiumCta: "Générer une recommandation premium",
  chatCta: "Ouvrir le chat",
  preselectLabel: "Pré-sélection active"
} as const

export const chatContent = {
  widgetOpen: "Chat",
  widgetClose: "Fermer",
  title: "Concierge IA",
  greeting: "Bienvenue chez TimeTravel Agency. Quelle époque souhaitez-vous explorer ?",
  placeholderIdle: "Posez-moi vos questions sur les voyages temporels...",
  placeholderLoading: "Réponse en cours...",
  send: "Envoyer",
  lastLabel: "Dernier message:",
  error: "Une contrainte technique empêche la réponse. Réessayez dans un instant."
} as const

export const reservationContent = {
  title: "Formulaire de reservation",
  subtitle: "Selectionnez votre destination et vos dates ideales, puis validez la demande.",
  labels: {
    destination: "Destination",
    startDate: "Date de depart",
    endDate: "Date de retour"
  },
  cta: "Valider la demande",
  success: "Demande envoyee. Notre equipe revient vers vous rapidement.",
  errors: {
    destination: "Choisissez une destination.",
    startDate: "Indiquez une date de depart.",
    endDate: "Indiquez une date de retour.",
    dateOrder: "La date de retour doit etre apres la date de depart.",
    startPast: "La date de depart ne peut pas etre dans le passe."
  }
} as const

export const quizQuestions: QuizQuestion[] = [
  {
    id: "style",
    title: "Quel style vous attire le plus ?",
    options: ["Élégance urbaine", "Exploration sauvage", "Art et ateliers"]
  },
  {
    id: "intensity",
    title: "Votre seuil d'aventure ?",
    options: ["Rassurant", "Équilibré", "Intense"]
  },
  {
    id: "focus",
    title: "Votre priorité ?",
    options: ["Culture", "Aventure", "Art"]
  },
  {
    id: "budget",
    title: "Votre budget idéal ?",
    options: ["Standard", "Premium", "VIP"]
  }
]

export const destinations: Destination[] = [
  {
    id: "paris-1889",
    title: "Paris 1889",
    era: "Belle Époque",
    tags: ["Culture", "Art"],
    teaser: "Lumières, élégance et la Tour Eiffel en construction",
    description:
      "La capitale scintille lors de l'Exposition universelle. Dîners privés, salons littéraires et vues rares sur la tour naissante composent une expérience raffinée et encadrée par nos protocoles temporels.",
    imageKey: "paris-1889",
    highlights: [
      "Exposition universelle et pavillons internationaux",
      "Soirée privée sur les toits haussmanniens",
      "Croquis exclusifs des ateliers d'ingénieurs"
    ],
    preparation: [
      "Tenue élégante conseillée pour accès VIP",
      "Briefing sur l'étiquette et les règles temporelles",
      "Appareils modernes interdits en public"
    ],
    riskLevel: "Faible",
    packs: [
      { name: "Standard", price: 4900, perks: ["Guide dédié", "Accès exposition", "Transport sécurisé"] },
      { name: "Premium", price: 8900, perks: ["Salon privé", "Dîner gastronomique", "Photographe d'époque"] },
      { name: "VIP", price: 14900, perks: ["Suite historique", "Accès exclusif tour", "Concierge 24/7"] }
    ]
  },
  {
    id: "cretace",
    title: "Crétacé -65M",
    era: "Ère préhistorique",
    tags: ["Aventure", "Culture"],
    teaser: "Jungle luxuriante et géants préhistoriques",
    description:
      "Une expédition encadrée au cœur du Crétacé. Observation des dinosaures à distance, camp sécurisé et itinéraires calibrés pour minimiser les risques biologiques et temporels.",
    imageKey: "cretace",
    highlights: [
      "Observation guidée des grands herbivores",
      "Traversée de canopées anciennes",
      "Campement sécurisé hors zones de prédation"
    ],
    preparation: [
      "Examen médical requis avant départ",
      "Équipement fourni avec protections climatiques",
      "Respect strict des couloirs temporels"
    ],
    riskLevel: "Élevé",
    packs: [
      { name: "Standard", price: 9800, perks: ["Équipement complet", "Guide scientifique", "Camp sécurisé"] },
      { name: "Premium", price: 14500, perks: ["Cabine climatisée", "Escorte renforcée", "Sessions privées"] },
      { name: "VIP", price: 21500, perks: ["Pilotage personnel", "Itinéraire sur mesure", "Médecin dédié"] }
    ]
  },
  {
    id: "florence-1504",
    title: "Florence 1504",
    era: "Renaissance italienne",
    tags: ["Art", "Culture"],
    teaser: "Ateliers d'artistes, marbre, et mécénat florentin",
    description:
      "Rencontrez l'effervescence de la Renaissance. Nos experts vous ouvrent les portes d'ateliers, marchés et ateliers d'architectes tout en respectant les protocoles de discrétion.",
    imageKey: "florence-1504",
    highlights: [
      "Visite privée d'ateliers d'artistes",
      "Architecture et sculptures majeures",
      "Soirée avec mécènes florentins"
    ],
    preparation: [
      "Briefing culturel et linguistique léger",
      "Tenue sobre pour passer inaperçu",
      "Évitement des lieux sensibles temporels"
    ],
    riskLevel: "Modéré",
    packs: [
      { name: "Standard", price: 6200, perks: ["Guide art & histoire", "Accès ateliers", "Logement boutique"] },
      { name: "Premium", price: 10400, perks: ["Rencontre mécènes", "Accès archives", "Itinéraire premium"] },
      { name: "VIP", price: 17200, perks: ["Palazzo privé", "Concierge dédié", "Accès ultra-restreint"] }
    ]
  }
]

