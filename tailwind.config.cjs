module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0B0B10",
        coal: "#111118",
        gold: "#C9A86A",
        goldBright: "#E6C784",
        platinum: "#E9E7E2",
        smoke: "#A6A3A0"
      },
      fontFamily: {
        display: ["\"Playfair Display\"", "serif"],
        body: ["\"Source Sans 3\"", "sans-serif"]
      },
      boxShadow: {
        gold: "0 0 30px rgba(201,168,106,0.25)"
      },
      backgroundImage: {
        hero: "radial-gradient(1200px 500px at 50% -50%, rgba(201,168,106,0.35), transparent), linear-gradient(135deg, #0B0B10 0%, #111118 100%)"
      },
      animation: {
        glow: "glow 6s ease-in-out infinite",
        float: "float 8s ease-in-out infinite"
      },
      keyframes: {
        glow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      }
    }
  },
  plugins: []
}
