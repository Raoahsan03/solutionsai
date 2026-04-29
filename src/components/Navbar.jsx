import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react'
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
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <svg width={compact ? 18 : 20} height={compact ? 18 : 20} viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f4c81" />
            <stop offset="60%" stopColor="#1386a6" />
            <stop offset="100%" stopColor="#1aa3b5" />
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
  const [megaOpen, setMegaOpen] = useState(false)
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
    { label: 'Solutions', id: 'solutions' },
    { label: 'Process', id: 'process' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Portfolio', id: 'portfolio' },
  ]

  const featureGroups = [
    {
      title: 'Platforms',
      items: ['Web Platforms', 'Mobile Apps', 'Internal Tools'],
    },
    {
      title: 'AI & Data',
      items: ['RAG Systems', 'AI Automations', 'Analytics Pipelines'],
    },
    {
      title: 'Growth',
      items: ['Commerce Ops', 'Workflow Ops', 'Customer Portals'],
    },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'var(--header-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 24px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
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
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <button className="nav-link flex items-center gap-1" type="button">
                Solutions
                <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-4 w-[640px] p-6 rounded-2xl"
                    style={{
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    }}
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {featureGroups.map(group => (
                        <div key={group.title}>
                          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                            {group.title}
                          </p>
                          <div className="space-y-2">
                            {group.items.map(item => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => { handleNav('solutions'); setMegaOpen(false) }}
                                className="w-full text-left px-3 py-2 rounded-lg text-sm"
                                style={{ color: 'var(--text-secondary)' }}
                                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.filter(link => link.id !== 'solutions').map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="nav-link"
                type="button"
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
                background: 'var(--bg-primary)',
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
              className="btn-primary text-sm"
            >
              Get a Quote
            </button>
          </div>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg"
            style={{ color: 'var(--text-primary)', background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}
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
            className="fixed top-[64px] left-0 right-0 z-40 p-4"
            style={{
              background: theme === 'dark' ? 'rgba(15,19,26,0.97)' : 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(16px)',
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
                  style={{ color: 'var(--text-secondary)', background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}
                >
                  {theme === 'dark' ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
                </button>
                <button
                  onClick={() => { onOpenQuote(); setMobileOpen(false) }}
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
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
