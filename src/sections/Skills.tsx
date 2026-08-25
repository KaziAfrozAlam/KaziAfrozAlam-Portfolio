import Section from '@/components/ui/Section';
import { skillGroups } from '@/data/portfolio';
import { motion } from 'motion/react';

export default function Skills() {
  return (
    <Section id="skills" eyebrow="SKILLS" className="relative overflow-hidden py-20 lg:py-28">
			<div data-ev-id="ev_2581fa6447" className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25]" />
			<div data-ev-id="ev_9e91685dad" className="relative pt-10">
				<div data-ev-id="ev_3e7c21f671" className="flex flex-col items-start gap-2">
					<span data-ev-id="ev_ff22cfed05" className="font-mono text-xs tracking-[0.2em] text-dim">TECHNICAL DEPENDENCY GRAPH</span>
					<h2 data-ev-id="ev_a027274b7d" className="font-display text-4xl font-bold tracking-tight text-paper sm:text-6xl">
						AI <span data-ev-id="ev_3cd8e1c977" className="text-accent">ENGINEERING</span>
					</h2>
				</div>

				<div data-ev-id="ev_f3f00b31ae" className="mt-12 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
					{skillGroups.map((g, gi) =>
          <motion.div
            key={g.group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ delay: gi * 0.06, duration: 0.5 }}
            className="group bg-ink p-6 transition-colors hover:bg-panel">

							<div data-ev-id="ev_e8d54803fd" className="flex items-center gap-2">
								<span data-ev-id="ev_c45b66157a" className="h-1.5 w-1.5 bg-accent" />
								<h3 data-ev-id="ev_eb0ba8ab8e" className="font-mono text-xs tracking-[0.18em] text-accent">{g.group}</h3>
							</div>
							<div data-ev-id="ev_23d7b62151" className="mt-5 flex flex-wrap gap-x-4 gap-y-2.5">
								{g.items.map((item, ii) =>
              <motion.span
                key={item + ii}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.06 + ii * 0.04 }}
                className="font-display text-lg font-medium tracking-tight text-paper/80 transition-colors group-hover:text-paper sm:text-xl">

										{item}
									</motion.span>
              )}
							</div>
						</motion.div>
          )}
				</div>
			</div>
		</Section>);

}