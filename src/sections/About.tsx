import Section, { Reveal, SnapText } from '@/components/ui/Section';
import { about } from '@/data/portfolio';

export default function About() {
  return (
    <Section id="about" eyebrow="ABOUT" className="py-20 lg:py-28">
			<div data-ev-id="ev_fb5e219972" className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[30%_1fr] lg:gap-14">
				{/* Monochrome abstract engineering portrait treatment */}
				<Reveal>
					<div data-ev-id="ev_9edc60643f" className="relative aspect-[3/4] w-full overflow-hidden border border-line bg-graphite">
						<div data-ev-id="ev_76bed37161" className="absolute inset-0 bg-grid opacity-40" />
						<div data-ev-id="ev_ff009ed9b2" className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-screen" />
						<div data-ev-id="ev_5207050380" className="absolute inset-0 flex items-center justify-center">
							<span data-ev-id="ev_83ebd96fef" className="font-display text-[8rem] font-bold leading-none text-paper/10">KA</span>
						</div>
						<div data-ev-id="ev_ff21947163" className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-ink/60 px-4 py-2.5 font-mono text-[10px] tracking-[0.18em] text-dim backdrop-blur-sm">
							<span data-ev-id="ev_0b358b88ab">ENGINEER / ARCHIVE</span>
							<span data-ev-id="ev_6d39ac7225" className="text-accent">MONOCHROME</span>
						</div>
					</div>
				</Reveal>

				<div data-ev-id="ev_4f68ebe4ff" className="flex flex-col">
					<h2 data-ev-id="ev_0862804a72" className="max-w-3xl text-balance font-display text-4xl font-bold leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-7xl">
						<SnapText text={about.statement} />
					</h2>
					<Reveal delay={0.1}>
						<p data-ev-id="ev_711f73d831" className="mt-8 max-w-xl text-pretty text-lg font-light leading-relaxed text-paper/70">
							{about.summary}
						</p>
					</Reveal>

					<div data-ev-id="ev_6689a494ee" className="mt-10 max-w-2xl border-t border-line">
						{about.table.map((row, i) =>
            <Reveal key={row.k} delay={0.05 * i}>
								<div data-ev-id="ev_8d2d741c4f" className="grid grid-cols-[110px_1fr] items-center gap-4 border-b border-line py-3.5 sm:grid-cols-[160px_1fr]">
									<span data-ev-id="ev_dcfba61dc4" className="font-mono text-[11px] tracking-[0.18em] text-dim">{row.k}</span>
									<span data-ev-id="ev_da36a82948" className="font-mono text-sm tracking-wide text-paper">{row.v}</span>
								</div>
							</Reveal>
            )}
					</div>
				</div>
			</div>
		</Section>);

}