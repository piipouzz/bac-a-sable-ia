import { motion } from "framer-motion"

type Props = {
  title: string
  options: string[]
  selected?: string
  onSelect: (value: string) => void
}

export default function QuizCard({ title, options, selected, onSelect }: Props) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display text-xl text-gold">{title}</h3>
      <div className="mt-4 grid gap-3">
        {options.map(option => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`text-left px-4 py-3 rounded-xl border transition ${selected === option ? "border-gold bg-gold/10 text-gold" : "border-gold/30 text-smoke"}`}
            onClick={() => onSelect(option)}
            type="button"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
