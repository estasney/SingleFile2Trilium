import { useEffect, useRef, useState } from "react";

export default function useDelayedStateChange<T>(
  prop: T,
  runOn: T[],
  delay: number
) {
  /**
  This ensures that states are shown for a minimum duration before updating

   null -> runOn (set immediately)


   */
  const initProp = useRef(prop);
  const timerId = useRef<number | null>(null);
  const [state, setState] = useState<T | null>(prop);

  useEffect(() => {
    const nextDisplayUpdate = (p: T) => {
      setState(p);
      initProp.current = p;
    };

    if (runOn.includes(initProp.current)) {
      const func = () => nextDisplayUpdate(prop);
      timerId.current = window.setTimeout(func, delay);
    } else if (initProp.current === prop) {
    } else {
      nextDisplayUpdate(prop);
    }
  }, [delay, prop, runOn, state]);
  return state;
}
