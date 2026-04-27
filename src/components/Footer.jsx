import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

const links = {
  company: [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Why Us', id: 'why-us' },
    { label: 'Process', id: 'process' },
    { label: 'Schedule', id: 'schedule' },
  ],
  services: [
    { label: 'Website Development', id: 'service-web-dev' },
    { label: 'AI Automations', id: 'service-ai-automations' },
    { label: 'AI Agents', id: 'service-agents' },
    { label: 'App Development', id: 'service-app-dev' },
    { label: 'Shopify', id: 'service-shopify' },
  ],
}

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Github, label: 'GitHub', href: '#' },
  { icon: Mail, label: 'Email', href: 'mailto:hello@envaire.com' },
]

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative pt-20 pb-10 overflow-hidden border-t"
      style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}
    >
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #3B82F6, #8B5CF6, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 mb-5"
            >
              <span className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{ background: 'linear-gradient(135deg,#3B82F6,#8B5CF6,#22D3EE)' }}>
                E
              </span>
              <span className="font-display font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>Envaire</span>
            </button>
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
              Building AI-powered systems, automations, and software that solve real business problems.
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
                    onMouseEnter={e => e.currentTarget.style.color = '#3B82F6'}
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
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-sm transition-colors duration-200 hover:text-blue-400"
                    style={{ color: 'var(--text-secondary)' }}
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
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-sm transition-colors duration-200 hover:text-blue-400 flex items-center gap-1 group"
                    style={{ color: 'var(--text-secondary)' }}
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
            © {year} Envaire. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <button key={item} className="text-xs transition-colors hover:text-blue-400"
                style={{ color: 'var(--text-muted)' }}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
