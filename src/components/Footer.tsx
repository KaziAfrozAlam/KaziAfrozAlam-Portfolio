import { profile } from '@/data/portfolio';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';

// Official FlyRank verification URL (do not edit the query string).
const FLYRANK_VERIFY =
  'https://internship.flyrank.ai/verify?id=FR-D1-T668H-R789R&first_name=Kazi%20Afroz';

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
					<div data-ev-id="ev_772d99585b" className="flex flex-col items-start gap-4 sm:items-end">
						<a
							data-ev-id="ev_flyrank_badge"
							href={FLYRANK_VERIFY}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Verify Kazi Afroz Alam's FlyRank AI Internship credential FR-D1-T668H-R789R"
							style={{
								boxSizing: 'border-box',
								margin: '0',
								padding: '6px 14px 6px 11px',
								border: '1px solid rgba(255,255,255,0.1)',
								background: '#051F21',
								textDecoration: 'none',
								fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
								fontStyle: 'normal',
								lineHeight: '1.25',
								textTransform: 'none',
								float: 'none',
								WebkitFontSmoothing: 'antialiased',
								display: 'inline-flex',
								alignItems: 'center',
								gap: '8px',
								borderRadius: '9999px',
								verticalAlign: 'middle',
								whiteSpace: 'nowrap',
							}}
						>
							<svg
								width="11"
								height="15"
								viewBox="26 18 44 60"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								focusable="false"
								style={{
									display: 'block',
									flex: 'none',
									opacity: '1',
									transform: 'none',
									maxWidth: 'none',
								}}
							>
								<path
									d="M28.2354 74.2202V67.9039C29.6419 68.4369 31.3724 68.7055 33.4311 68.7055C35.3235 68.7055 36.8153 68.2396 37.8979 67.3079C38.9805 66.3762 39.9566 64.8695 40.8218 62.792L42.6887 58.3139L29.8976 29.2879C35.0038 29.2879 39.6028 32.3307 41.5294 36.9893L47.0746 50.3985L56.0126 28.6038C57.9221 23.9452 62.5168 20.894 67.6187 20.894L50.0795 63.5936C48.4556 67.5936 46.5205 70.5102 44.2743 72.3484C42.0281 74.1867 39.1169 75.1058 35.5451 75.1058C32.6212 75.1058 30.1875 74.812 28.2354 74.2244V74.2202Z"
									fill="#54E399"
								/>
							</svg>

							<span
								style={{
									margin: '0',
									padding: '0',
									border: '0',
									background: 'none',
									color: '#FFFFFF',
									fontWeight: '600',
									fontStyle: 'normal',
									letterSpacing: 'normal',
									textTransform: 'none',
									textDecoration: 'none',
									whiteSpace: 'normal',
									float: 'none',
									fontSize: '13px',
								}}
							>
								FlyRank verified
							</span>

							<span
								style={{
									margin: '0',
									padding: '0',
									border: '0',
									background: 'rgba(255,255,255,0.1)',
									color: 'inherit',
									fontWeight: '400',
									fontStyle: 'normal',
									letterSpacing: 'normal',
									textTransform: 'none',
									textDecoration: 'none',
									whiteSpace: 'normal',
									float: 'none',
									width: '1px',
									height: '14px',
									flex: 'none',
								}}
							></span>

							<span
								style={{
									margin: '0',
									padding: '0',
									border: '0',
									background: 'none',
									color: 'rgba(255,255,255,0.55)',
									fontWeight: '400',
									fontStyle: 'normal',
									letterSpacing: 'normal',
									textTransform: 'none',
									textDecoration: 'none',
									whiteSpace: 'normal',
									float: 'none',
									fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace',
									fontSize: '11px',
								}}
							>
								FR-D1-T668H-R789R
							</span>
						</a>
						<div data-ev-id="ev_iconlinks" className="flex flex-wrap gap-4">
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
			</div>


		</footer>);

}