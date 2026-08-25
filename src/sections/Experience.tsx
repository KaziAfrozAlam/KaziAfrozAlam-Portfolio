import Section from '@/components/ui/Section';
import { experience } from '@/data/portfolio';
import { motion } from 'motion/react';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="EXPERIENCE" className="py-20 lg:py-28">
			<div data-ev-id="ev_633086b44d" className="pt-10">
				<h2 data-ev-id="ev_95cb389a53" className="font-mono text-xs tracking-[0.2em] text-dim">SYSTEM LOG — REVERSE CHRONOLOGICAL</h2>
				<div data-ev-id="ev_a2d3797392" className="mt-8 border-t border-line">
					{experience.map((job, i) =>
          <motion.article
            key={job.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`group grid grid-cols-1 gap-6 border-b border-line py-10 lg:grid-cols-[auto_1fr] lg:gap-14 ${
            job.featured ? 'lg:py-16' : ''}`
            }>

							<div data-ev-id="ev_06f14ba1d2" className="flex items-start gap-4 lg:w-[320px]">
								<span data-ev-id="ev_113fff1a0c"
              className={`font-display font-bold leading-none tracking-tighter transition-colors group-hover:text-accent ${
              job.featured ? 'text-6xl text-accent lg:text-8xl' : 'text-5xl text-line-strong lg:text-7xl'}`
              }>

									{job.index}
								</span>
								<div data-ev-id="ev_a3310b7628" className="flex flex-col gap-1 pt-1">
									<span data-ev-id="ev_96504b9bdc" className="font-mono text-[11px] tracking-[0.15em] text-dim">{job.period}</span>
									<span data-ev-id="ev_53e845f29d" className="font-mono text-[11px] tracking-[0.15em] text-dim">{job.location}</span>
									{job.featured &&
                <span data-ev-id="ev_1ded73b198" className="mt-1 inline-flex w-fit items-center gap-1.5 font-mono text-[11px] tracking-[0.15em] text-accent">
											<span data-ev-id="ev_3c1751c568" className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> ACTIVE
										</span>
                }
								</div>
							</div>

							<div data-ev-id="ev_479cb9b139" className="flex flex-col">
								<h3 data-ev-id="ev_355d83482d" className="font-display text-2xl font-bold tracking-tight text-paper sm:text-4xl">{job.company}</h3>
								<p data-ev-id="ev_59bc6d596d" className="mt-1 font-mono text-xs tracking-[0.15em] text-accent">{job.role}</p>
								<ul data-ev-id="ev_a96d5ab832" className="mt-5 flex flex-col gap-3">
									{job.points.map((p, pi) =>
                <li data-ev-id="ev_74edc35b06" key={pi} className="flex gap-3 text-base font-light leading-relaxed text-paper/70">
											<span data-ev-id="ev_bbcb07f87e" className="mt-2 h-px w-4 shrink-0 bg-line-strong" />
											{p}
										</li>
                )}
								</ul>
								<div data-ev-id="ev_20dffcf6e3" className="mt-5 flex flex-wrap gap-2">
									{job.stack.map((s) =>
                <span data-ev-id="ev_2342659781" key={s} className="border border-line px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] text-dim">
											{s}
										</span>
                )}
								</div>
							</div>
						</motion.article>
          )}
				</div>
			</div>
		</Section>);

}