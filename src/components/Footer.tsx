import { siteContent } from "../data/destinations"

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 mt-24">
      <div className="container-safe py-10 text-sm text-smoke flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p>{siteContent.footer.legal}</p>
        <div className="flex gap-4">
          <span>{siteContent.footer.credits}</span>
          <span>{siteContent.footer.mentions}</span>
        </div>
      </div>
    </footer>
  )
}
