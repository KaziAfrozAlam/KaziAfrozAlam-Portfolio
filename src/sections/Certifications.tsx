import Section from '@/components/ui/Section';
import { Award, Brain } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

// Original 6 certifications
const certifications = [
{ name: 'MACHINE LEARNING SPECIALIZATION', issuer: 'DEEPLEARNING.AI + STANFORD ONLINE' },
{ name: 'FOUNDATION: INTRODUCTION TO LANGCHAIN - PYTHON', issuer: 'LANGCHAIN' },
{ name: 'DATABRICKS FUNDAMENTALS', issuer: 'DATABRICKS ACADEMY' },
{ name: 'CLOUD COMPUTING', issuer: 'NPTEL' },
{ name: 'SQL BASIC', issuer: 'HACKERRANK' },
{ name: 'PYTHON BASIC', issuer: 'HACKERRANK' }];


// 25 Anthropic / AI Learning certifications
const anthropicCerts = [
{ name: 'AI FLUENCY FOUNDATIONS', issuer: 'ANTHROPIC' },
{ name: 'AI FLUENCY', issuer: 'ANTHROPIC' },
{ name: 'AI FLUENCY FOR BUSINESS', issuer: 'ANTHROPIC' },
{ name: 'AI FLUENCY FOR STUDENTS', issuer: 'ANTHROPIC' },
{ name: 'AI FLUENCY FOR NONPROFITS', issuer: 'ANTHROPIC' },
{ name: 'AI POLICY: AI CAPABILITIES & LIMITATIONS', issuer: 'ANTHROPIC' },
{ name: 'CLAUDE 101', issuer: 'ANTHROPIC' },
{ name: 'CLAUDE PLATFORM 101', issuer: 'ANTHROPIC' },
{ name: 'CLAUDE WITH THE ANTHROPIC API', issuer: 'ANTHROPIC' },
{ name: 'CLAUDE WITH GOOGLE VERTEX AI', issuer: 'ANTHROPIC' },
{ name: 'CLAUDE WITH AMAZON BEDROCK', issuer: 'ANTHROPIC' },
{ name: 'INTRODUCTION TO CLAUDE CODE', issuer: 'ANTHROPIC' },
{ name: 'INTRODUCTION TO MODEL CONTEXT PROTOCOL (MCP)', issuer: 'ANTHROPIC' },
{ name: 'MODEL CONTEXT PROTOCOL: ADVANCED TOPICS', issuer: 'ANTHROPIC' },
{ name: 'INTRODUCTION TO AGENT SKILLS', issuer: 'ANTHROPIC' },
{ name: 'INTRODUCTION TO CLAUDE COWORK', issuer: 'ANTHROPIC' },
{ name: 'AI CAPABILITIES AND LIMITATIONS', issuer: 'ANTHROPIC' },
{ name: 'AI FLUENCY FOR SMALL BUSINESSES', issuer: 'ANTHROPIC' },
{ name: 'AI FLUENCY FOR EDUCATORS', issuer: 'ANTHROPIC' },
{ name: 'TEACHING AI FLUENCY', issuer: 'ANTHROPIC' },
{ name: 'AI FLUENCY FOR BUILDERS', issuer: 'ANTHROPIC' },
{ name: 'CLAUDE CODE 101', issuer: 'ANTHROPIC' },
{ name: 'CLAUDE CODE IN ACTION', issuer: 'ANTHROPIC' },
{ name: 'BUILDING WITH THE CLAUDE API', issuer: 'ANTHROPIC' },
{ name: 'INTRODUCTION TO SUBAGENTS', issuer: 'ANTHROPIC' }];


type FilterType = 'all' | 'certifications' | 'anthropic';

function CertCard({ cert, index }: {cert: {name: string;issuer: string;};index: number;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ delay: index * 0.03, duration: 0.5 }}
      className="group flex flex-col gap-3 bg-ink p-6 transition-all hover:bg-panel hover:-translate-y-0.5 hover:border-accent border border-transparent cursor-default">

      <div data-ev-id="ev_03915b26fb" className="flex items-center justify-between">
        <span data-ev-id="ev_c142c11fdd" className="font-mono text-[11px] tracking-[0.18em] text-accent">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span data-ev-id="ev_ad48655f15" className="h-1.5 w-1.5 bg-accent transition-transform group-hover:scale-150" />
      </div>
      <h3 data-ev-id="ev_8e5cc6833d" className="font-display text-lg font-semibold leading-tight tracking-tight text-paper transition-colors group-hover:text-accent sm:text-xl">
        {cert.name}
      </h3>
      <p data-ev-id="ev_079ceae3af" className="mt-auto font-mono text-[11px] tracking-[0.15em] text-dim">{cert.issuer}</p>
    </motion.div>);

}

export default function Certifications() {
  const [filter, setFilter] = useState<FilterType>('all');

  const filters: {key: FilterType;label: string;}[] = [
  { key: 'all', label: 'ALL' },
  { key: 'certifications', label: 'CERTIFICATIONS' },
  { key: 'anthropic', label: 'ANTHROPIC / AI' }];


  return (
    <Section id="certifications" eyebrow="CERTIFICATIONS" className="py-20 lg:py-28">
      <div data-ev-id="ev_33db79ab56" className="pt-10">
        {/* Filter Navigation */}
        <div data-ev-id="ev_7abfc2cc37" className="flex items-center gap-6 border-b border-line pb-4">
          {filters.map((f) =>
          <button data-ev-id="ev_1d9c552818"
          key={f.key}
          onClick={() => setFilter(f.key)}
          className={`cursor-pointer font-mono text-xs tracking-[0.18em] transition-colors ${
          filter === f.key ? 'text-accent' : 'text-dim hover:text-paper'}`
          }>

              {f.label}
            </button>
          )}
        </div>

        {/* Certifications Section */}
        {(filter === 'all' || filter === 'certifications') &&
        <div data-ev-id="ev_ce9bd74025" className="mt-10">
            <div data-ev-id="ev_446b624f23" className="flex items-center gap-4">
              <Award size={28} className="text-accent" />
              <h2 data-ev-id="ev_accf94601e" className="font-display text-4xl font-bold tracking-tight text-paper sm:text-6xl">CERTIFICATIONS</h2>
            </div>
            <p data-ev-id="ev_05737d4e37" className="mt-4 font-mono text-xs tracking-[0.18em] text-dim">
              VERIFIED CREDENTIALS — {certifications.length} CERTIFICATIONS
            </p>

            <div data-ev-id="ev_5d6bbcac12" className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((c, i) =>
            <CertCard key={c.name} cert={c} index={i} />
            )}
            </div>
          </div>
        }

        {/* Anthropic / AI Learning Section */}
        {(filter === 'all' || filter === 'anthropic') &&
        <div data-ev-id="ev_20dc2295e9" className={filter === 'all' ? 'mt-20' : 'mt-10'}>
            <div data-ev-id="ev_b34f75ad7d" className="flex items-center gap-4">
              <Brain size={28} className="text-accent" />
              <h2 data-ev-id="ev_16418d8a81" className="font-display text-4xl font-bold tracking-tight text-paper sm:text-6xl">ANTHROPIC / AI LEARNING</h2>
            </div>
            <p data-ev-id="ev_5399f09ac2" className="mt-4 font-mono text-[11px] tracking-widest text-dim">
              AI LEARNING — {anthropicCerts.length} CERTIFICATIONS
            </p>

            <div data-ev-id="ev_1968ef17d6" className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {anthropicCerts.map((c, i) =>
            <CertCard key={c.name} cert={c} index={i} />
            )}
            </div>
          </div>
        }
      </div>
    </Section>);

}