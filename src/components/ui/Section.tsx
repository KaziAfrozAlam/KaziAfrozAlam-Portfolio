import { sectionIndex } from '@/data/portfolio';
import { useSectionIndex } from '@/hooks/use-section-index';
import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  bleed?: boolean; // remove default horizontal padding
}

// Full-width section shell with a 1px top rule. Registers itself with the scroll-index observer.
export default function Section({ id, eyebrow, children, className = '', bleed = false }: SectionProps) {
  const ref = useSectionIndex<HTMLElement>(id);
  sectionIndex.indexOf(id); // register section
  return (
    <section data-ev-id="ev_ead8cdef73"
    id={id}
    ref={ref}
    className={`relative w-full border-t border-line ${bleed ? '' : 'px-5 sm:px-8 lg:px-14'} ${className}`}>


			{eyebrow &&
      <div data-ev-id="ev_693258faa7" className="pointer-events-none absolute left-5 top-4 z-10 font-mono text-[11px] tracking-[0.18em] text-accent sm:left-8 lg:left-14">
					{eyebrow}
				</div>
      }
			{children}
		</section>);

}

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = ''





}: {children: ReactNode;delay?: number;y?: number;className?: string;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}>

			{children}
		</motion.div>);

}

// Character-staggered heading that snaps into position.
export function SnapText({ text, className = '' }: {text: string;className?: string;}) {
  const words = text.split(' ');
  return (
    <span data-ev-id="ev_3e36a76bba" className={className} aria-label={text}>
			{words.map((word, wi) =>
      <span data-ev-id="ev_586556c7a0" key={wi} className="inline-block whitespace-nowrap">
					{word.split('').map((ch, ci) =>
        <motion.span
          key={ci}
          aria-hidden
          className="inline-block"
          initial={{ opacity: 0, y: '0.4em' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.3, delay: (wi * 4 + ci) * 0.02, ease: [0.16, 1, 0.3, 1] }}>

							{ch}
						</motion.span>
        )}
					{wi < words.length - 1 && <span data-ev-id="ev_450287f6dd" className="inline-block">&nbsp;</span>}
				</span>
      )}
		</span>);

}