import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useScrolled } from '../hooks/useScrolled'

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function LogoMark({ compact }) {
  return (
    <div
      className="rounded-xl flex items-center justify-center"
      style={{
        width: compact ? 30 : 34,
        height: compact ? 30 : 34,
        background: 'rgba(15,23,42,0.7)',
        border: '1px solid rgba(59,130,246,0.4)',
      }}
    >
      <svg width={compact ? 18 : 20} height={compact ? 18 : 20} viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <path d="M6 18c2.2-5 6.1-7.5 10-7.5S23.8 13 26 18" fill="none" stroke="url(#logo-g)" strokeWidth="3" strokeLinecap="round" />
        <path d="M6 14c2.2 5 6.1 7.5 10 7.5S23.8 19 26 14" fill="none" stroke="url(#logo-g)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2.6" fill="url(#logo-g)" />
      </svg>
    </div>
  )
}

export default function Navbar({ theme, toggleTheme, onOpenQuote }) {
  const scrolled = useScrolled(50)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const handleNav = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollTo(id), 120)
      return
    }
    scrollTo(id)
  }

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Portfolio', id: 'portfolio' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10,15,25,0.6)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          boxShadow: scrolled ? '0 12px 40px rgba(2,6,23,0.45)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          <button
            onClick={() => {
              if (location.pathname !== '/') {
                navigate('/')
                return
              }
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2.5 group"
            aria-label="Avaira home"
            style={{ transform: scrolled ? 'scale(0.96)' : 'scale(1)', transition: 'transform 0.3s ease' }}
          >
            <LogoMark compact={scrolled} />
            <span className="font-display font-bold text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Avaira
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/5"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={16} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)',
                boxShadow: '0 0 24px rgba(59,130,246,0.35)',
              }}
            >
              Get a Quote
            </button>
          </div>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg"
            style={{ color: 'var(--text-primary)', background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)' }}
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-0 right-0 z-40 p-4"
            style={{
              background: theme === 'dark' ? 'rgba(11,15,25,0.97)' : 'rgba(248,250,252,0.97)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <div className="flex flex-col gap-2 max-w-7xl mx-auto">
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => { handleNav(link.id); setMobileOpen(false) }}
                  className="w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors hover:bg-white/5"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </button>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium flex-1"
                  style={{ color: 'var(--text-secondary)', background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)' }}
                >
                  {theme === 'dark' ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
                </button>
                <button
                  onClick={() => { onOpenQuote(); setMobileOpen(false) }}
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)' }}
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
