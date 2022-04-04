import { useState, useEffect } from 'react'

export default function useDetectScrollIntoView(
  elem: HTMLElement | null | undefined,
  options: IntersectionObserverInit | undefined
) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!elem) return

    const observerCb: IntersectionObserverCallback = ([entry]: IntersectionObserverEntry[], observer) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(elem)
      }
    }
    const observer = new IntersectionObserver(observerCb, options)

    // start observation of elem
    observer.observe(elem)

    // disconnect observer and close
    return () => {
      observer.disconnect()
    }
  }, [elem, options])

  return isInView
}