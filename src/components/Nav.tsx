import { nav, profile } from '@/data/portfolio';
import { Github, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header data-ev-id="ev_ca62c391e5"
    className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
    scrolled ? 'border-b border-line bg-ink/80 backdrop-blur-md' : 'border-b border-transparent'}`
    }>

			<nav data-ev-id="ev_ffbb9b2649" className="flex items-center justify-between px-5 py-3 sm:px-8 lg:px-14">
				<a data-ev-id="ev_9bdea858e5" href="#hero" className="font-display text-xs font-bold tracking-[0.2em] text-paper sm:text-sm">
					{profile.name}
				</a>

				<ul data-ev-id="ev_5c843ae247" className="hidden items-center gap-6 lg:flex">
					{nav.map((item) =>
          <li data-ev-id="ev_d842b0db2c" key={item.id}>
							<a data-ev-id="ev_9961d63a34"
            href={`#${item.id}`}
            className="font-mono text-[11px] tracking-[0.18em] text-dim transition-colors hover:text-accent">

								{item.label}
							</a>
						</li>
          )}
				</ul>

				<div data-ev-id="ev_0ef47d29b7" className="flex items-center gap-4">
					<a data-ev-id="ev_bf281f1167"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-dim transition-colors hover:text-paper">

						<Github size={17} />
					</a>
					<a data-ev-id="ev_4744045ad7"
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-dim transition-colors hover:text-paper">

						<Linkedin size={17} />
					</a>
					<a data-ev-id="ev_3f10cc2549"
          href={profile.cv}
          download
          className="cursor-pointer border border-line px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-paper transition-colors hover:border-accent hover:text-accent">

						↓ Resume
					</a>
				</div>
			</nav>
		</header>);

}
