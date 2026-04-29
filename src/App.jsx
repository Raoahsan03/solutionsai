import { HashRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Schedule from './components/Schedule'
import GetQuoteModal from './components/GetQuoteModal'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [quoteOpen, setQuoteOpen] = useState(false)

  return (
    <HashRouter>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Navbar theme={theme} toggleTheme={toggleTheme} onOpenQuote={() => setQuoteOpen(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
        <Footer />
        <GetQuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
      </div>
    </HashRouter>
  )
}
