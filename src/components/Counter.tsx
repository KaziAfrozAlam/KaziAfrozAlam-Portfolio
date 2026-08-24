import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export default function Counter({ to, pad = false }: {to: number;pad?: boolean;}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduced]);

  const display = pad ? String(val).padStart(2, '0') : String(val);
  return <span data-ev-id="ev_ee335eee25" ref={ref}>{display}</span>;
}