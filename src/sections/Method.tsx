import Section from '@/components/ui/Section';
import { method } from '@/data/portfolio';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Method() {
  const [active, setActive] = useState(0);
  return (
    <Section id="method" eyebrow="METHOD" className="py-20 lg:py-28">
			<div data-ev-id="ev_f9f27171a8" className="pt-10">
				<h2 data-ev-id="ev_c74d082a59" className="font-display text-4xl font-bold tracking-tight text-paper sm:text-6xl">HOW I BUILD</h2>

				<div data-ev-id="ev_68c37282a3" className="mt-12 flex flex-col gap-0 border-t border-line lg:flex-row lg:gap-0">
					{method.map((m, i) =>
          <button data-ev-id="ev_bbe517673f"
          key={m.step}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          className={`group relative flex flex-1 flex-col items-start gap-2 border-b border-line px-2 py-6 text-left transition-colors lg:border-b-0 lg:border-r lg:last:border-r-0 ${
          active === i ? 'bg-panel' : ''}`
          }>

							<div data-ev-id="ev_3541f9d11d" className="flex w-full items-center justify-between">
								<span data-ev-id="ev_84d2dfa32e" className="font-mono text-[11px] tracking-[0.18em] text-dim">{String(i + 1).padStart(2, '0')}</span>
								{i < method.length - 1 && <span data-ev-id="ev_3da0e0c4f8" className="font-mono text-xs text-accent lg:hidden">→</span>}
							</div>
							<span data-ev-id="ev_6cf4cea8ea"
            className={`font-display text-xl font-bold tracking-tight transition-colors sm:text-2xl ${
            active === i ? 'text-accent' : 'text-paper'}`
            }>

								{m.step}
							</span>
							<motion.p
              initial={false}
              animate={{ opacity: active === i ? 1 : 0.4 }}
              className="text-sm font-light leading-relaxed text-paper/60">

								{m.note}
							</motion.p>
						</button>
          )}
				</div>
			</div>
		</Section>);

}