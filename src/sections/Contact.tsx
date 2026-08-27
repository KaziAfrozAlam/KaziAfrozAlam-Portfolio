import Section, { SnapText } from '@/components/ui/Section';
import { profile } from '@/data/portfolio';
import { ArrowUpRight, Calendar, Check, Github, Linkedin, Mail } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';

const CALENDLY_URL = 'https://calendly.com/afrozalam-8760/30min';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!values.name.trim()) e.name = 'Required';
    if (!values.email.trim()) e.email = 'Required';else
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = 'Invalid email';
    if (!values.message.trim()) e.message = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;

    if (!supabase) {
      // No backend configured — fall back to a local confirmation.
      setSent(true);
      setValues({ name: '', email: '', message: '' });
      return;
    }

    setSending(true);
    setSubmitError(null);
    const { error } = await supabase.functions.invoke('contact', {
      body: {
        name: values.name,
        email: values.email,
        message: values.message,
        source: 'website',
      },
    });
    setSending(false);

    if (error) {
      setSubmitError('Could not send your message right now. Please email me directly — afrozalam.8760@gmail.com.');
      return;
    }
    setSent(true);
    setValues({ name: '', email: '', message: '' });
  };

  const field = (
  name: keyof typeof values,
  label: string,
  placeholder: string,
  textarea = false) => {
  const errId = `contact-${name}-error`;
  const invalid = !!errors[name];
  return (
  <div data-ev-id="ev_2db44ae474" className="flex flex-col gap-2.5">
      <label data-ev-id="ev_23d127c563"
    htmlFor={name}
    className="flex items-center justify-between font-mono text-xs tracking-[0.15em] text-dim uppercase">

        <span data-ev-id="ev_86cfb08594">{label}</span>
        {invalid && <span data-ev-id="ev_a7072d5616" id={errId} role="alert" className="text-accent">{errors[name]}</span>}
      </label>
      {textarea ?
          <textarea data-ev-id="ev_8bc9b56bb5"
    id={name}
    name={name}
    rows={5}
    maxLength={5000}
    value={values[name]}
    onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
    aria-invalid={invalid}
    aria-describedby={invalid ? errId : undefined}
    className="resize-none border border-line bg-ink/50 px-4 py-3.5 font-body text-base text-paper outline-none transition-colors placeholder:text-dim/60 focus:border-accent"
    placeholder={placeholder} /> :


    <input data-ev-id="ev_41c0e0d7dc"
    id={name}
    name={name}
    type={name === 'email' ? 'email' : 'text'}
    autoComplete={name === 'email' ? 'email' : name === 'name' ? 'name' : 'off'}
    maxLength={name === 'email' ? 254 : 120}
    value={values[name]}
    onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
    aria-invalid={invalid}
    aria-describedby={invalid ? errId : undefined}
    className="border border-line bg-ink/50 px-4 py-3.5 font-body text-base text-paper outline-none transition-colors placeholder:text-dim/60 focus:border-accent"
    placeholder={placeholder} />

    }
    </div>
  );
};


  return (
    <Section id="contact" eyebrow="CONTACT" className="bg-ink py-24 lg:py-32">
      <div data-ev-id="ev_817ea3da5a" className="pt-10">
        <h2 data-ev-id="ev_d4fe0ee147" className="max-w-5xl text-balance font-display text-5xl font-bold leading-[0.9] tracking-tight text-paper sm:text-7xl lg:text-8xl">
          <SnapText text="LET'S BUILD SOMETHING INTELLIGENT." />
        </h2>
        <p data-ev-id="ev_0cf00a2f0d" className="mt-6 font-mono text-xs tracking-[0.2em] text-accent sm:text-sm">
          AI SYSTEMS / BACKEND / MACHINE LEARNING / DATA
        </p>

        <div data-ev-id="ev_fc3134d7d0" className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left - Contact Links */}
          <div data-ev-id="ev_1d9d2ae483" className="flex flex-col gap-10">
            {/* Primary CTAs */}
            <div data-ev-id="ev_8ac6ffe036" className="flex flex-col gap-3">
              <a data-ev-id="ev_37dd1d2bc3"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer inline-flex items-center justify-center gap-3 bg-accent px-8 py-4 font-mono text-sm tracking-[0.15em] text-accent-foreground transition-all hover:bg-paper">

                <Calendar size={18} />
                BOOK A CALL
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <p data-ev-id="ev_91e80f5d46" className="text-center font-mono text-xs tracking-[0.15em] text-dim">30 MIN MEETING</p>

              <a data-ev-id="ev_bff7b67641"
              href={`mailto:${profile.email}`}
              className="group cursor-pointer inline-flex items-center justify-center gap-3 border border-line bg-transparent px-8 py-4 font-mono text-sm tracking-[0.15em] text-paper transition-all hover:border-accent hover:text-accent">

                <Mail size={18} />
                SEND EMAIL
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Connect Section */}
            <div data-ev-id="ev_f517d6f20a" className="border-t border-line pt-8">
              <h3 data-ev-id="ev_9d14182751" className="font-mono text-sm tracking-[0.2em] text-accent">CONNECT</h3>
              <p data-ev-id="ev_e052fd3db5" className="mt-3 text-base leading-relaxed text-paper/70">
                Open to building intelligent systems, collaborating on technical projects, and discussing new opportunities.
              </p>

              <div data-ev-id="ev_40753e5a28" className="mt-8 flex flex-col gap-0">
                {/* Email */}
                <a data-ev-id="ev_e0c14a332d"
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 border-b border-line py-4 transition-colors hover:text-accent">

                  <Mail size={20} className="text-dim group-hover:text-accent" />
                  <div data-ev-id="ev_cea273e674" className="flex flex-col">
                    <span data-ev-id="ev_ca6e2594d3" className="font-mono text-xs tracking-[0.15em] text-dim">EMAIL</span>
                    <span data-ev-id="ev_911a55a4ee" className="font-mono text-sm text-paper group-hover:text-accent">{profile.email}</span>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-dim transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* LinkedIn */}
                <a data-ev-id="ev_09bc6bc66c"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border-b border-line py-4 transition-colors hover:text-accent">

                  <Linkedin size={20} className="text-dim group-hover:text-accent" />
                  <div data-ev-id="ev_0be23fa0d1" className="flex flex-col">
                    <span data-ev-id="ev_dc6229b0c4" className="font-mono text-xs tracking-[0.15em] text-dim">LINKEDIN</span>
                    <span data-ev-id="ev_b9a4a7da72" className="font-mono text-sm text-paper group-hover:text-accent">linkedin.com/in/kazi-afroz-alam/</span>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-dim transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* GitHub */}
                <a data-ev-id="ev_0cfed337c6"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border-b border-line py-4 transition-colors hover:text-accent">

                  <Github size={20} className="text-dim group-hover:text-accent" />
                  <div data-ev-id="ev_bf5ebd5e60" className="flex flex-col">
                    <span data-ev-id="ev_e803333447" className="font-mono text-xs tracking-[0.15em] text-dim">GITHUB</span>
                    <span data-ev-id="ev_bcf11b95a7" className="font-mono text-sm text-paper group-hover:text-accent">github.com/KaziAfrozAlam</span>
                  </div>
                  <ArrowUpRight size={14} className="ml-auto text-dim transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Availability Statement */}
            <div data-ev-id="ev_57abf0b640" className="flex items-center gap-3 font-mono text-xs tracking-[0.15em] text-dim">
              <span data-ev-id="ev_da7ad81b18" className="inline-block h-2 w-2 animate-pulse bg-accent" />
              OPEN TO AI / ML / BACKEND OPPORTUNITIES
            </div>
          </div>

          {/* Right - Contact Form */}
          <div data-ev-id="ev_ec95e74c34">
            <h3 data-ev-id="ev_3dbf9071d5" className="font-mono text-sm tracking-[0.2em] text-paper mb-6">SEND A MESSAGE</h3>
            {sent ?
            <div data-ev-id="ev_437e7602dc" role="status" className="flex flex-col items-start justify-center gap-4 border border-accent/40 bg-panel/40 p-10">
                <Check size={32} className="text-accent" />
                <p data-ev-id="ev_6e51416a57" className="font-display text-2xl font-semibold tracking-tight text-paper">MESSAGE QUEUED.</p>
                <p data-ev-id="ev_8d78d4c0cd" className="font-mono text-sm tracking-[0.12em] text-dim">
                  THANK YOU — I'LL RESPOND SHORTLY.
                </p>
              </div> :

			<form data-ev-id="ev_189fedf340"
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-5">

                {submitError &&
                <p data-ev-id="ev_9f1c2d3e4f" role="alert" className="border border-accent/40 bg-panel/40 px-4 py-3 font-mono text-xs tracking-[0.12em] text-accent">
                  {submitError}
                </p>
                }
                {field('name', 'NAME', 'Your name')}
                {field('email', 'EMAIL', 'Your email')}
                {field('message', 'MESSAGE', 'Tell me about your project or opportunity', true)}
                <button data-ev-id="ev_669d41d0c6"
              type="submit"
              disabled={sending || !values.name || !values.email || !values.message}
              className="group cursor-pointer inline-flex items-center justify-center gap-2 bg-accent px-6 py-4 font-mono text-sm tracking-[0.15em] text-accent-foreground transition-colors hover:bg-paper disabled:opacity-50">

                  {sending ? 'SENDING…' : 'SEND MESSAGE'}
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </Section>);

}