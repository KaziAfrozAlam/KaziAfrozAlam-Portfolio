import { useIsTouch, useReducedMotion } from '@/hooks/use-reduced-motion';
import { useEffect, useRef } from 'react';

// Tiny square/crosshair cursor that reacts to velocity: it stretches along the
// direction of travel, rotates toward it, and briefly inverts the pixels
// beneath it (mix-blend-difference). Disabled on touch devices.
export default function Cursor() {
  const touch = useIsTouch();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (touch) return;
    document.documentElement.classList.add('cursor-lab');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let px = x;
    let py = y;
    let rx = x;
    let ry = y;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      hovering = !!t && !!t.closest('a, button, input, textarea, [data-cursor]');
    };
    const onDown = () => dotRef.current?.style.setProperty('--press', '0.6');
    const onUp = () => dotRef.current?.style.setProperty('--press', '1');

    const tick = () => {
      const vx = x - px;
      const vy = y - py;
      px = x;
      py = y;
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      const speed = Math.min(Math.hypot(vx, vy), 60);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const stretch = 1 + speed / 22;
      const squash = 1 - Math.min(speed / 120, 0.4);

      if (dotRef.current) {
        const press = dotRef.current.style.getPropertyValue('--press') || '1';
        const scale = hovering ? 2.4 : 1;
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg) scale(${stretch * scale * Number(press)}, ${squash * scale})`;
        dotRef.current.style.opacity = hovering ? '0.9' : '1';
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) rotate(${angle}deg)`;
        ringRef.current.style.width = hovering ? '46px' : '26px';
        ringRef.current.style.height = hovering ? '46px' : '26px';
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(tick);
    return () => {
      document.documentElement.classList.remove('cursor-lab');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, [touch, reduced]);

  if (touch) return null;

  return (
    <div data-ev-id="ev_c4a159a03b" aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
			<div data-ev-id="ev_507b8d0edb"
      ref={dotRef}
      style={{ mixBlendMode: 'difference' }}
      className="absolute left-0 top-0 h-[8px] w-[8px] bg-white will-change-transform" />

			<div data-ev-id="ev_de24fa9557"
      ref={ringRef}
      className="absolute left-0 top-0 h-[26px] w-[26px] border border-accent/60 will-change-transform transition-[width,height] duration-200" />

		</div>);

}