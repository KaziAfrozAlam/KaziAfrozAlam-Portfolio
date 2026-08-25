import Section from '@/components/ui/Section';
import { research } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Research() {
  return (
    <Section id="research" eyebrow="PUBLICATIONS" className="relative overflow-hidden py-20 lg:py-28">
      <div data-ev-id="ev_38ab943eca" className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" />
      <div data-ev-id="ev_0d095ccf81" className="relative pt-10">
        <h2 data-ev-id="ev_a7b88b8973" className="font-mono text-xs tracking-[0.2em] text-dim">PEER-REVIEWED RESEARCH — {research.length} PUBLICATIONS</h2>

        <div data-ev-id="ev_48161e282e" className="mt-10 flex flex-col gap-0">
          {research.map((r, i) =>
          <motion.article
            key={r.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group border-b border-line py-12 first:border-t">

              <div data-ev-id="ev_7b8a806378" className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr] lg:gap-12">
                <span data-ev-id="ev_06041c4e38" className="font-display text-5xl font-bold leading-none tracking-tighter text-accent lg:text-7xl">
                  {r.num}
                </span>
                <div data-ev-id="ev_78e7ad03ef" className="flex flex-col gap-4">
                  <h3 data-ev-id="ev_932bcd0148" className="max-w-3xl text-balance font-display text-2xl font-semibold leading-tight tracking-tight text-paper sm:text-3xl lg:text-4xl">
                    {r.title}
                  </h3>
                  <div data-ev-id="ev_e51f9a1b7e" className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-[0.18em] text-dim">
                    <span data-ev-id="ev_654f1f8f94" className="text-accent">{r.publisher}</span>
                    <span data-ev-id="ev_6a557bea95" className="hidden h-px w-4 bg-line sm:block" />
                    <span data-ev-id="ev_b9a6556f7e">{r.date}</span>
                  </div>
                  <p data-ev-id="ev_2c32ff7ea3" className="mt-2 max-w-3xl text-base font-light leading-relaxed text-paper/70">
                    {r.description}
                  </p>
                  <a data-ev-id="ev_b875118e80"
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link cursor-pointer mt-2 inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] text-accent transition-colors hover:text-paper">

                    VIEW PUBLICATION
                    <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          )}
        </div>
      </div>
    </Section>);

}