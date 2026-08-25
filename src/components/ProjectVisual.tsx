import type { projects } from '@/data/portfolio';
import { motion } from 'motion/react';

type Project = (typeof projects)[number];

// Each project renders its own distinct visual system.
export default function ProjectVisual({ project }: {project: Project;}) {
  const accent = project.accent;

  if (project.kind === 'bi' || project.kind === 'tableau') {
    const bars = project.bars ?? [];
    return (
      <div data-ev-id="ev_5015feca75" className="flex h-full w-full flex-col justify-end gap-4 p-6">
				<div data-ev-id="ev_674220b936" className="flex flex-1 items-end gap-2">
					{bars.map((b, i) =>
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${b}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
            style={{ backgroundColor: accent, opacity: 0.35 + i % 3 * 0.22 }} />

          )}
				</div>
				<div data-ev-id="ev_153e5a8ec3" className="flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] tracking-[0.18em] text-dim">
					<span data-ev-id="ev_eaa7378100">{project.kind === 'bi' ? 'DAX / POWER QUERY' : 'LOD / PARAMETERS'}</span>
					<span data-ev-id="ev_95f5a196dc" style={{ color: accent }}>KPI STREAM</span>
				</div>
			</div>);

  }

  // flow / ml / stream — horizontal animated architecture
  const flow = project.flow ?? [];
  return (
    <div data-ev-id="ev_e61a501d8b" className="flex h-full w-full flex-col justify-center gap-8 p-6">
			<div data-ev-id="ev_b48d78ba17" className="flex flex-wrap items-center gap-2">
				{flow.map((step, i) =>
        <div data-ev-id="ev_6431cbdf11" key={step} className="flex items-center gap-2">
						<motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="border px-3 py-2 font-mono text-[11px] tracking-[0.15em]"
            style={{ borderColor: `${accent}66`, color: accent }}>

							{step}
						</motion.span>
						{i < flow.length - 1 &&
          <div data-ev-id="ev_baf59f1dbc" className="relative h-px w-5 overflow-hidden bg-line-strong">
								<motion.span
              className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: accent }}
              initial={{ left: '-10%' }}
              animate={{ left: ['-10%', '110%'] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2, ease: 'linear' }} />

							</div>
          }
					</div>
        )}
			</div>
			{project.cloud &&
      <div data-ev-id="ev_7c0de33b74" className="flex flex-wrap gap-2">
					{project.cloud.map((c) =>
        <span data-ev-id="ev_a72aac7d88" key={c} className="border border-line px-2 py-1 font-mono text-[9px] tracking-widest text-dim">
							AWS / {c}
						</span>
        )}
				</div>
      }
			{project.metrics.length > 0 &&
      <div data-ev-id="ev_15c4296d8a" className="flex flex-wrap gap-8">
					{project.metrics.map((m) =>
        <div data-ev-id="ev_3a8ed60e28" key={m.small}>
							<div data-ev-id="ev_ec2cb3bab2" className="font-display text-4xl font-bold leading-none tracking-tighter" style={{ color: accent }}>
								{m.big}
							</div>
							<div data-ev-id="ev_e5a03c45f3" className="mt-1 font-mono text-[9px] tracking-widest text-dim">{m.small}</div>
						</div>
        )}
				</div>
      }
		</div>);

}