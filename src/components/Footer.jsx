import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const links = {
  company: [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Schedule', href: '/schedule' },
  ],
  services: [
    { label: 'Web Platforms', id: 'solutions' },
    { label: 'AI Automations', id: 'solutions' },
    { label: 'RAG Systems', id: 'solutions' },
    { label: 'Mobile Apps', id: 'solutions' },
    { label: 'Commerce Ops', id: 'solutions' },
  ],
}

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@avaira.com' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function LogoMark() {
  return (
    <div
      className="rounded-xl flex items-center justify-center"
      style={{
        width: 36,
        height: 36,
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="footer-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f4c81" />
            <stop offset="60%" stopColor="#1386a6" />
            <stop offset="100%" stopColor="#1aa3b5" />
          </linearGradient>
        </defs>
        <path d="M6 18c2.2-5 6.1-7.5 10-7.5S23.8 13 26 18" fill="none" stroke="url(#footer-g)" strokeWidth="3" strokeLinecap="round" />
        <path d="M6 14c2.2 5 6.1 7.5 10 7.5S23.8 19 26 14" fill="none" stroke="url(#footer-g)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2.6" fill="url(#footer-g)" />
      </svg>
    </div>
  )
}

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  const year = new Date().getFullYear()

  const handleNav = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => scrollTo(id), 120)
      return
    }
    scrollTo(id)
  }

  return (
    <footer
      className="relative pt-20 pb-10 overflow-hidden border-t"
      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}
    >
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(15, 76, 129, 0.22), rgba(19, 134, 166, 0.18), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 mb-5"
            >
              <LogoMark />
              <span className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>Avaira</span>
            </button>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
              Building AI and software systems that help teams launch, scale, and automate.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(s => {
                const SocialIcon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <SocialIcon size={15} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Company links */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: 'var(--text-muted)' }}>Company</p>
            <ul className="space-y-3">
              {links.company.map(l => (
                <li key={l.id || l.label}>
                  <button
                    onClick={() => (l.href ? navigate(l.href) : handleNav(l.id))}
                    className="text-sm link-accent"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: 'var(--text-muted)' }}>Services</p>
            <ul className="space-y-3">
              {links.services.map(l => (
                <li key={l.label}>
                  <button
                    onClick={() => handleNav(l.id)}
                    className="text-sm link-accent flex items-center gap-1 group"
                  >
                    {l.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {year} Avaira. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <button key={item} className="text-xs link-muted">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
