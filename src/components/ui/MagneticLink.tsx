import { useIsTouch } from '@/hooks/use-reduced-motion';
import { useRef, type ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
}

// Sharp magnetic button/link that pulls toward the cursor.
export default function MagneticLink({ href, children, className = '', external, download, onClick, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const touch = useIsTouch();

  const onMove = (e: React.MouseEvent) => {
    if (touch) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${mx * 0.25}px, ${my * 0.3}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <a data-ev-id="ev_24a47fd074"
    ref={ref}
    href={href}
    onClick={onClick}
    onMouseMove={onMove}
    onMouseLeave={reset}
    download={download}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    aria-label={rest['aria-label']}
    className={`inline-flex items-center transition-transform duration-200 ease-out ${className}`}>

			{children}
		</a>);

}