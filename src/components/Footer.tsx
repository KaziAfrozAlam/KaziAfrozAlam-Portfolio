import { profile } from '@/data/portfolio';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const iconLinks = [
  { label: 'GITHUB', href: profile.github, icon: Github, external: true },
  { label: 'LINKEDIN', href: profile.linkedin, icon: Linkedin, external: true },
  { label: '↓ Resume', href: profile.cv, icon: FileText, external: false, download: true },
  { label: 'EMAIL', href: `mailto:${profile.email}`, icon: Mail, external: false }];

  return (
    <footer data-ev-id="ev_cf25a0f9b2" className="w-full border-t border-line bg-ink">
			<div data-ev-id="ev_cd0fe62ad4" className="px-5 py-12 sm:px-8 lg:px-14">
				<div data-ev-id="ev_dc41513041" className="flex flex-wrap items-center justify-between gap-6">
					<div data-ev-id="ev_d964139280" className="flex flex-col gap-1.5 font-mono text-[11px] tracking-[0.18em] text-dim">
						<span data-ev-id="ev_a0ce479db5" className="text-paper">BACKEND AI ENGINEER</span>
						<span data-ev-id="ev_194a3b53e9">BANGALORE / INDIA</span>
						<span data-ev-id="ev_661d0ac11b">© {year} Kazi Afroz Alam. All rights reserved.</span>
					</div>
					<div data-ev-id="ev_772d99585b" className="flex flex-wrap gap-4">
						{iconLinks.map((l) =>
            <a data-ev-id="ev_bc7c4e9417"
            key={l.label}
            href={l.href}
            download={l.download}
            target={l.external ? '_blank' : undefined}
            rel={l.external ? 'noopener noreferrer' : undefined}
            className="cursor-pointer inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-dim transition-colors hover:text-accent">

								<l.icon size={15} /> {l.label}
							</a>
            )}
					</div>
				</div>
			</div>


		</footer>);

}