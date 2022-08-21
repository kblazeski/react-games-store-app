import { useEffect, useRef } from 'react'

export const useDidComponentUpdate = (effect, deps) => {
  const firstLoad = useRef(true)

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false
      return;
    }

    effect(firstLoad.current)
  }, deps)
}
