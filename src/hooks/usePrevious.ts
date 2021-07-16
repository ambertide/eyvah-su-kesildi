import { useEffect, useRef } from "react";

/**
 * Get the previous value of a state.
 * Taken (almost) in verbatim from
 * https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
 * @param value Value of the state to get the previous value of.
 * @returns the previous value of the state.
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
