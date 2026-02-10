import { motion } from "framer-motion"
import { ReactNode } from "react"

type SectionProps = {
  id?: string
  title: string
  subtitle?: string
  children: ReactNode
}

export default function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="py-16">
      <div className="container-safe">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl text-gold">{title}</h2>
          {subtitle && <p className="text-smoke mt-2 max-w-2xl">{subtitle}</p>}
        </motion.div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}
