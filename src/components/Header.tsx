import { Link, NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { siteContent } from "../data/destinations"
import { cn, openChat } from "../lib/utils"

const navBase = "text-xs tracking-[0.3em] uppercase text-smoke hover:text-gold transition"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-night/80 backdrop-blur border-b border-gold/20">
      <div className="container-safe flex items-center justify-between py-4">
        <Link to="/" className="font-display text-lg tracking-wider text-gold">
          {siteContent.brand}
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {siteContent.nav.map(item =>
            item.type === "route" ? (
              <NavLink key={item.label} to={item.to} className={({ isActive }) => cn(navBase, isActive && "text-gold")}>
                {item.label}
              </NavLink>
            ) : (
              <button key={item.label} onClick={() => openChat()} className={navBase} type="button">
                {item.label}
              </button>
            )
          )}
        </nav>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
          <Link to={siteContent.headerCta.to} className="btn-gold text-sm">
            {siteContent.headerCta.label}
          </Link>
        </motion.div>
      </div>
    </header>
  )
}
