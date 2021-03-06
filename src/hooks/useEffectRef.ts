import { useState, useRef, useEffect, MutableRefObject } from 'react'

export default function useEffectRef<T>(defaultRefValue: any) {
  const [refToObserve, setRefToObserve] = useState<MutableRefObject<T>>()
  const refToSet = useRef<T>(defaultRefValue)
  useEffect(() => {
    setRefToObserve(refToSet)
  }, [])

  return [refToSet, refToObserve ?? null]
}
