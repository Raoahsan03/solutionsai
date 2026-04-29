import { useMemo, useState } from 'react'
import { BarChart3, Bot, Code, Database, Globe, Layers, ShieldCheck, ShoppingCart, Smartphone, Workflow } from 'lucide-react'

const CATEGORIES = ['All', 'Web', 'AI', 'Automation', 'Data', 'Commerce', 'Ops']

const FEATURES = [
  {
    title: 'Web Platforms',
    desc: 'Modern marketing sites and product hubs engineered for speed, SEO, and conversion.',
    category: 'Web',
    icon: Globe,
  },
  {
    title: 'Mobile Apps',
    desc: 'iOS and Android experiences with clean UX, secure data, and rapid iteration cycles.',
    category: 'Web',
    icon: Smartphone,
  },
  {
    title: 'AI Automations',
    desc: 'Workflow automation, AI copilots, and orchestration that remove manual steps.',
    category: 'Automation',
    icon: Workflow,
  },
  {
    title: 'RAG Systems',
    desc: 'Knowledge bases and retrieval systems that bring trusted answers to teams.',
    category: 'AI',
    icon: Bot,
  },
  {
    title: 'Data Pipelines',
    desc: 'Structured data pipelines with monitoring, QA, and BI-ready outputs.',
    category: 'Data',
    icon: Database,
  },
  {
    title: 'Commerce Ops',
    desc: 'Shopify and ecommerce stacks with operational automation and analytics.',
    category: 'Commerce',
    icon: ShoppingCart,
  },
  {
    title: 'Product Engineering',
    desc: 'Full-stack builds with clean APIs, modular code, and future-proof infra.',
    category: 'Ops',
    icon: Code,
  },
  {
    title: 'Security & QA',
    desc: 'Threat modeling, test automation, and reliability checks before launch.',
    category: 'Ops',
    icon: ShieldCheck,
  },
  {
    title: 'Analytics Layer',
    desc: 'Dashboards, KPI tracking, and growth insights stitched across tools.',
    category: 'Data',
    icon: BarChart3,
  },
  {
    title: 'System Design',
    desc: 'Architecture, service boundaries, and scalable foundations for teams.',
    category: 'Ops',
    icon: Layers,
  },
]

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All')

  const visibleFeatures = useMemo(() => {
    if (activeCategory === 'All') return FEATURES
    return FEATURES.filter(feature => feature.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="solutions" className="relative py-28" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 reveal">
          <div className="section-eyebrow mb-6">Solutions</div>
          <h2
            className="font-display font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: 'var(--text-primary)' }}
          >
            Product-grade services built for
            <span className="gradient-text"> real outcomes</span>
          </h2>
          <p className="text-lg mt-4 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Pick a sector to see how we package design, engineering, and AI into focused delivery pods.
          </p>
        </div>

        <div className="filter-bar reveal" style={{ justifyContent: 'center' }}>
          {CATEGORIES.map(category => (
            <button
              key={category}
              type="button"
              className={`filter-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {visibleFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="feature-card reveal"
                style={{ '--reveal-delay': `${index * 80}ms` }}
              >
                <div className="feature-icon">
                  <Icon size={18} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
