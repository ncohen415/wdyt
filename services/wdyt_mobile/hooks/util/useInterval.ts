import React, { RefObject } from "react"

export function useInterval(callback: Function, delay: number) {
  const savedCallback: any = React.useRef()

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
