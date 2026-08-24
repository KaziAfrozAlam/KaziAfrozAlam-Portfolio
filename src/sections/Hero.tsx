import SemanticGraph from '@/components/SemanticGraph';
import TypingCycle from '@/components/TypingCycle';
import { profile } from '@/data/portfolio';
import { useSectionIndex } from '@/hooks/use-section-index';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const GRAPH_LABELS = ['RAG', 'EMBEDDINGS', 'RETRIEVAL', 'API', 'ML', 'AWS', 'DATA'];

export default function Hero() {
  const ref = useSectionIndex<HTMLElement>('hero');
  return (
    <section data-ev-id="ev_5a18ba708e" id="hero" ref={ref} className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink">
			<div data-ev-id="ev_cfdbcb3204" className="absolute inset-0">
				<SemanticGraph density={110} labels={GRAPH_LABELS} connectDist={140} fade className="h-full w-full" />
			</div>
			<div data-ev-id="ev_85913a9d62" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />

			<div data-ev-id="ev_eeb23f8459" className="relative z-10 flex flex-1 flex-col px-5 pt-24 sm:px-8 lg:px-14">
				<motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-mono text-[11px] tracking-[0.2em] text-dim sm:text-xs">

					{profile.kicker}
				</motion.p>

				<div data-ev-id="ev_6b4e7da11b" className="mt-auto max-w-5xl">
					<h1 data-ev-id="ev_c16a065c30" className="font-display font-bold leading-[0.82] tracking-[-0.03em] text-paper">
						{[profile.first, profile.middle, profile.last].map((line, i) =>
            <motion.span
              key={line}
              className="block text-[16vw] sm:text-[14vw] lg:text-[11rem]"
              initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>

								{line}
							</motion.span>
            )}
					</h1>

					<motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-5">

						<TypingCycle />
					</motion.div>

					<motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-4 max-w-xl text-pretty text-lg font-light text-paper/80 sm:text-xl">

						{profile.tagline}
					</motion.p>
					<p data-ev-id="ev_0dbe6f3916" className="mt-2 font-mono text-xs tracking-[0.15em] text-dim">{profile.supporting}</p>

					<motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-7 flex flex-wrap gap-3">

						<a data-ev-id="ev_1194684e69"
            href="#projects"
            className="group cursor-pointer inline-flex items-center gap-2 bg-accent px-6 py-3 font-mono text-xs tracking-[0.18em] text-accent-foreground transition-colors hover:bg-paper">

							EXPLORE PROJECTS
							<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
						</a>
						<a data-ev-id="ev_6ce04ab729"
            href="#contact"
            className="group cursor-pointer inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-xs tracking-[0.18em] text-paper transition-colors hover:border-accent hover:text-accent">

							CONNECT
							<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
						</a>
					</motion.div>
				</div>

				<div data-ev-id="ev_5e8b2eca60" className="mt-auto flex items-end justify-between pb-6 pt-10">
					<div data-ev-id="ev_d4480deb04" className="flex flex-col gap-1 font-mono text-[11px] tracking-[0.18em] text-dim">
						<span data-ev-id="ev_473aa85366">STATUS / <span data-ev-id="ev_e36b9a725c" className="text-accent">{profile.status}</span></span>
						<span data-ev-id="ev_32ead9bf0c">LOCATION / {profile.locationShort}</span>
						<span data-ev-id="ev_bbdff8dbad">YEAR / {profile.year}</span>
					</div>
				</div>
			</div>
		</section>);

}