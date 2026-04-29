import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'

const About = lazy(() => import('../components/About'))
const WhyUs = lazy(() => import('../components/WhyUs'))
const ProcessTimeline = lazy(() => import('../components/ProcessTimeline'))
const Services = lazy(() => import('../components/Services'))
const Portfolio = lazy(() => import('../components/Portfolio'))
const FAQ = lazy(() => import('../components/FAQ'))

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <WhyUs />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <ProcessTimeline />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>
    </main>
  )
}
