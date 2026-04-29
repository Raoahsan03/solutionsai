import { useEffect } from 'react'

export function useReveal(selector = '.reveal') {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = Array.from(document.querySelectorAll(selector))

    if (prefersReduced) {
      elements.forEach(el => el.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )

    const observeNode = node => {
      if (!(node instanceof HTMLElement)) return
      if (node.matches(selector)) observer.observe(node)
      node.querySelectorAll?.(selector).forEach(el => observer.observe(el))
    }

    elements.forEach(el => observer.observe(el))

    const mutation = new MutationObserver(mutations => {
      mutations.forEach(mutationRecord => {
        mutationRecord.addedNodes.forEach(node => observeNode(node))
      })
    })

    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [selector])
}
