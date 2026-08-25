import ProjectVisual from '@/components/ProjectVisual';
import Section from '@/components/ui/Section';
import { projects } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  return (
    <Section id="projects" eyebrow="PROJECTS" bleed>
			<div data-ev-id="ev_769944320f" className="px-5 pt-10 sm:px-8 lg:px-14">
				<h2 data-ev-id="ev_c479f599e1" className="font-mono text-xs tracking-[0.2em] text-dim">ENGINEERING SYSTEMS — {projects.length} PROJECTS</h2>
			</div>
			<div data-ev-id="ev_58cb6d3b8b">
				{projects.map((p) =>
					<div data-ev-id="ev_3cf40dfb2d" key={p.num} className="border-t border-line bg-ink lg:sticky lg:top-0">
						<div data-ev-id="ev_9c034e80fe" className="grid grid-cols-1 lg:grid-cols-[1fr_40%] lg:min-h-[100svh]">
							{/* Left — documentation */}
							<div data-ev-id="ev_c954f31f3a" className="flex flex-col justify-between px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
								<div data-ev-id="ev_d8bdd5f494" className="flex items-start gap-4">
									<span data-ev-id="ev_60aa3d5853"
                className="font-display text-6xl font-bold leading-none tracking-tighter lg:text-8xl"
                style={{ color: p.accent }}>

										{p.num}
									</span>
									<span data-ev-id="ev_71f8f12034" className="mt-2 font-mono text-[11px] tracking-[0.2em] text-dim">PROJECT</span>
								</div>

								<div data-ev-id="ev_38fb10a1fb" className="mt-8 max-w-2xl">
									<h3 data-ev-id="ev_638e2400d6" className="text-balance font-display text-3xl font-bold leading-[0.95] tracking-tight text-paper sm:text-5xl lg:text-6xl">
										{p.title}
									</h3>
									<p data-ev-id="ev_33c652869a" className="mt-4 font-mono text-[11px] tracking-[0.15em]" style={{ color: p.accent }}>
										{p.stack}
									</p>
									<ul data-ev-id="ev_74a7d40650" className="mt-6 flex flex-col gap-3">
										{p.points.map((pt, i) =>
                  <li data-ev-id="ev_ba4e47a88e" key={i} className="flex gap-3 text-base font-light leading-relaxed text-paper/70">
												<span data-ev-id="ev_45fb87787b" className="mt-2 h-px w-4 shrink-0" style={{ backgroundColor: p.accent }} />
												{pt}
											</li>
                  )}
									</ul>
									{p.github &&
                <a data-ev-id="ev_4db9696862"
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-dim transition-colors hover:text-accent">

										VIEW ON GITHUB
										<ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
									</a>
                }
								</div>

								<div data-ev-id="ev_72b4e59f6e" className="mt-8 font-mono text-[11px] tracking-[0.15em] text-dim">
									PROJECT {p.num} / {String(projects.length).padStart(2, '0')}
								</div>
							</div>

							{/* Right — distinct visual system */}
							<div data-ev-id="ev_0f4a6b91a1" className="relative min-h-[45svh] border-t border-line bg-panel/30 lg:border-l lg:border-t-0">
								<div data-ev-id="ev_33feeb5a3d" className="absolute inset-0 bg-grid opacity-20" />
								<div data-ev-id="ev_4fb8fe9fa8" className="relative h-full">
									<ProjectVisual project={p} />
								</div>
							</div>
						</div>
					</div>
        )}
			</div>
		</Section>);

}