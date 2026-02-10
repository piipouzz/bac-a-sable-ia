import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ChatPanel from "./ChatPanel"
import { chatContent } from "../data/destinations"

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [prefill, setPrefill] = useState<string | undefined>(undefined)

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail
      setPrefill(detail?.message)
      setOpen(true)
    }
    window.addEventListener("open-chat", handler as EventListener)
    return () => window.removeEventListener("open-chat", handler as EventListener)
  }, [])

  const handleClose = () => {
    setOpen(false)
    setPrefill(undefined)
  }

  return (
    <div id="chat" className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ChatPanel onClose={handleClose} prefill={prefill} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(v => !v)}
        className="btn-gold shadow-gold gap-2"
        type="button"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
          <path
            fill="currentColor"
            d="M7 17.5 3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7z"
          />
        </svg>
        {open ? chatContent.widgetClose : chatContent.widgetOpen}
      </motion.button>
    </div>
  )
}
