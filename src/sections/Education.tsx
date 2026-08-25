import Section, { Reveal, SnapText } from '@/components/ui/Section';
import { education, educationBranch } from '@/data/portfolio';
import { motion } from 'motion/react';

export default function Education() {
  return (
    <Section id="education" eyebrow="EDUCATION" className="relative overflow-hidden py-20 lg:py-28">
			<div data-ev-id="ev_a6dfee6db9" className="pointer-events-none absolute inset-0 bg-grid opacity-[0.3]" />
			<div data-ev-id="ev_9bebb4922d" className="relative pt-10">
				<h2 data-ev-id="ev_f675a9bf0b" className="max-w-3xl text-balance font-display text-4xl font-bold leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-7xl">
					<SnapText text="THE ENGINEERING FOUNDATION." />
				</h2>

				<div data-ev-id="ev_8b142ecd3b" className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
					{/* Vertical technical timeline */}
					<div data-ev-id="ev_def31f6dda" className="flex flex-col">
						{education.map((e, i) =>
            <Reveal key={e.title} delay={i * 0.1}>
								<div data-ev-id="ev_8ccd93de74" className="relative border-l border-line pl-8 pb-12 last:pb-0">
									<span data-ev-id="ev_e80159b11b"
                className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 ${
                e.foundation ? 'bg-accent' : 'bg-line-strong'}`
                } />

									<span data-ev-id="ev_c0c73cdfbe" className="font-mono text-xs tracking-[0.18em] text-accent">{e.year}</span>
									<h3 data-ev-id="ev_14b3925623" className="mt-2 font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl">
										{e.title}
									</h3>
									<p data-ev-id="ev_f89edfc7df" className="mt-1.5 font-mono text-sm tracking-[0.1em] text-paper/70">{e.institution}</p>
									<p data-ev-id="ev_20c73210c9" className="font-mono text-[11px] tracking-[0.15em] text-dim">{e.meta}</p>
									<p data-ev-id="ev_3ff69f4f3c" className="mt-2 font-mono text-sm tracking-[0.12em] text-paper">{e.score}</p>
									{e.foundation &&
                <span data-ev-id="ev_23732d4eb6" className="mt-2 inline-block font-mono text-[10px] tracking-[0.2em] text-accent">
											■ FOUNDATION NODE
										</span>
                }
								</div>
							</Reveal>
            )}
					</div>

					{/* Branch diagram — conceptual labels only */}
					<div data-ev-id="ev_e0346b73e5" className="border border-line bg-panel/40 p-6">
						<p data-ev-id="ev_a68bd7ac20" className="font-mono text-[11px] tracking-[0.18em] text-dim">CONCEPTUAL BRANCH — f(cs)</p>
						<div data-ev-id="ev_55cfb90b75" className="mt-6 flex flex-col">
							{educationBranch.map((b, i) =>
              <motion.div
                key={b}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex items-center gap-3"
                style={{ paddingLeft: `${i * 14}px` }}>

									{i > 0 && <span data-ev-id="ev_8cae61ce46" className="font-mono text-xs text-accent">→</span>}
									<span data-ev-id="ev_baa633dec9"
                className={`border px-3 py-1.5 font-mono text-[10px] tracking-widest ${
                i === 0 ? 'border-accent text-accent' : 'border-line text-paper/80'}`
                }>

										{b}
									</span>
								</motion.div>
              )}
						</div>
						<p data-ev-id="ev_646580ac12" className="mt-6 font-mono text-[9px] leading-relaxed tracking-widest text-dim">
							* CONCEPTUAL LABELS — NOT OFFICIAL SPECIALIZATIONS
						</p>
					</div>
				</div>
			</div>
		</Section>);

}