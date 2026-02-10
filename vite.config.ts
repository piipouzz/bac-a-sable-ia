import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import { handleChat } from "./server/chatCore"

const chatDevPlugin = () => ({
  name: "chat-dev",
  configureServer(server: any) {
    server.middlewares.use("/api/chat", (req: any, res: any) => {
      let data = ""
      req.on("data", (chunk: string) => {
        data += chunk
      })
      req.on("end", async () => {
        if (data.length > 0) {
          try {
            req.body = JSON.parse(data)
          } catch {
            res.statusCode = 400
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: "Invalid JSON" }))
            return
          }
        } else {
          req.body = {}
        }
        await handleChat(req, res)
      })
    })
  }
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  Object.assign(process.env, env)
  return {
    plugins: [react(), chatDevPlugin()],
    server: {
      port: 5173
    }
  }
})
