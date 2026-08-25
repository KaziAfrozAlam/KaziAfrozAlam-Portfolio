import { profile } from '@/data/portfolio';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useEffect, useState } from 'react';

export default function TypingCycle() {
  const phrases = profile.typingCycle;
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (reduced) {
      setText(phrases[0]);
      return;
    }
    const full = phrases[i];
    let t: ReturnType<typeof setTimeout>;
    if (!del && text === full) {
      t = setTimeout(() => setDel(true), 1400);
    } else if (del && text === '') {
      setDel(false);
      setI((p) => (p + 1) % phrases.length);
    } else {
      t = setTimeout(
        () => {
          setText((prev) => del ? prev.slice(0, -1) : full.slice(0, prev.length + 1));
        },
        del ? 45 : 75
      );
    }
    return () => clearTimeout(t);
  }, [text, del, i, phrases, reduced]);

  return (
    <span data-ev-id="ev_6a7f66fd8e" className="font-mono text-base tracking-[0.15em] text-accent sm:text-lg">
			[ {text}
			<span data-ev-id="ev_d5159570be" className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.12em] animate-blink bg-accent" />
			{' ]'}
		</span>);

}