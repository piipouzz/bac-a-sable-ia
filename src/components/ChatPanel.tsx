import { useEffect, useMemo, useState } from "react"
import { sendChat, ChatMessage } from "../lib/apiClient"
import { isValidMessage } from "../lib/validators"
import { chatContent } from "../data/destinations"

type Props = {
  onClose: () => void
  prefill?: string
}

export default function ChatPanel({ onClose, prefill }: Props) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: chatContent.greeting }
  ])

  useEffect(() => {
    if (prefill) setInput(prefill)
  }, [prefill])

  const lastUserMessage = useMemo(() => {
    const userMessages = messages.filter(m => m.role === "user")
    return userMessages.length ? userMessages[userMessages.length - 1].content : undefined
  }, [messages])

  const handleSend = async () => {
    if (!isValidMessage(input) || loading) return
    const userMessage: ChatMessage = { role: "user", content: input.trim() }
    const next = [...messages, userMessage]
    setMessages(next)
    setInput("")
    setLoading(true)
    try {
      const reply = await sendChat(next, "chat")
      const assistantMessage: ChatMessage = { role: "assistant", content: reply }
      setMessages([...next, assistantMessage])
    } catch {
      const assistantMessage: ChatMessage = { role: "assistant", content: chatContent.error }
      setMessages([...next, assistantMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[360px] sm:w-[440px] glass rounded-2xl overflow-hidden border border-gold/30 shadow-gold">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gold/20">
        <div className="font-display text-gold">{chatContent.title}</div>
        <button onClick={onClose} className="text-smoke hover:text-gold transition" type="button">
          ×
        </button>
      </div>
      <div className="p-4 max-h-[480px] overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div key={`${m.role}-${i}`} className={`text-sm leading-relaxed ${m.role === "user" ? "text-gold" : "text-platinum"}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gold/20 flex gap-2">
        <input
          className="flex-1 bg-night text-platinum border border-gold/30 rounded-full px-3 py-2 text-sm focus:outline-none"
          placeholder={loading ? chatContent.placeholderLoading : chatContent.placeholderIdle}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleSend()
          }}
        />
        <button onClick={handleSend} className="btn-gold text-xs px-4" type="button">
          {chatContent.send}
        </button>
      </div>
      {lastUserMessage && (
        <div className="px-4 pb-3 text-xs text-smoke">
          {chatContent.lastLabel} {lastUserMessage}
        </div>
      )}
    </div>
  )
}
