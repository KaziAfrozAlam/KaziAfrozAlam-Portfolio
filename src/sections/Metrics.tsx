import Counter from '@/components/Counter';
import Section from '@/components/ui/Section';
import { metrics } from '@/data/portfolio';

export default function Metrics() {
  return (
    <Section id="metrics" bleed>
			<div data-ev-id="ev_0471e2f75f" className="grid grid-cols-2 lg:grid-cols-4">
				{metrics.map((m, i) =>
        <div data-ev-id="ev_8a05b88aa6"
        key={m.label}
        className={`flex flex-col justify-between px-5 py-10 sm:px-8 lg:px-10 lg:py-14 ${
        i !== 0 ? 'border-line lg:border-l' : ''} ${
        i % 2 !== 0 ? 'border-l border-line lg:border-l' : ''} ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''}`}>

						<div data-ev-id="ev_8b0463fa17" className="font-display text-[16vw] font-bold leading-none tracking-tighter text-paper sm:text-6xl lg:text-7xl">
							<Counter to={m.value} pad={m.pad} />
							<span data-ev-id="ev_a058cb941c" className="text-accent">{m.suffix}</span>
						</div>
						<p data-ev-id="ev_19698e9678" className="mt-4 font-mono text-[11px] tracking-[0.2em] text-dim">{m.label}</p>
					</div>
        )}
			</div>
		</Section>);

}