import { assets, fallbackAsset } from "../assets"

export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ")

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)

export const resolveAsset = (key?: string) => (key && assets[key as keyof typeof assets]) || fallbackAsset

export const openChat = (message?: string) => {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent("open-chat", { detail: { message } }))
}
