import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Destinations from "./pages/Destinations"
import DestinationDetail from "./pages/DestinationDetail"
import Quiz from "./pages/Quiz"
import ChatWidget from "./components/ChatWidget"

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
}

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-night text-platinum font-body">
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.main
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Home />
              </motion.main>
            }
          />
          <Route
            path="/destinations"
            element={
              <motion.main
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Destinations />
              </motion.main>
            }
          />
          <Route
            path="/destinations/:id"
            element={
              <motion.main
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <DestinationDetail />
              </motion.main>
            }
          />
          <Route
            path="/quiz"
            element={
              <motion.main
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Quiz />
              </motion.main>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
      <ChatWidget />
    </div>
  )
}
