import type { NavigateFunction, Location } from 'react-router-dom'

export type HomeNavigationState = {
  scrollTo?: string
  category?: string | null
  faqId?: string | null
}

export function navigateToSection(
  navigate: NavigateFunction,
  location: Location,
  sectionId: string,
  options?: { category?: string | null; faqId?: string | null }
) {
  const state: HomeNavigationState = {
    scrollTo: sectionId,
    category: options?.category,
    faqId: options?.faqId,
  }

  if (location.pathname !== '/') {
    navigate('/', { state })
    return
  }

  navigate('/', { state, replace: true })

  requestAnimationFrame(() => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  })
}

export function applyHomeNavigationState(
  state: HomeNavigationState | null,
  onCategoryChange: (category: string | null) => void,
  onFaqOpen?: (faqId: string | null) => void
) {
  if (!state) return

  if (state.category !== undefined) {
    onCategoryChange(state.category)
  }

  if (state.faqId !== undefined && onFaqOpen) {
    onFaqOpen(state.faqId)
  }

  if (state.scrollTo) {
    setTimeout(() => {
      document.getElementById(state.scrollTo!)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }
}
