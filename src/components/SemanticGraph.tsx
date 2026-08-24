import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  label?: string;
  pulse: number;
}

interface Props {
  density?: number; // base node count on desktop
  labels?: string[];
  className?: string;
  interactive?: boolean;
  connectDist?: number;
  fade?: boolean; // fade edges toward bottom (hero transition)
}

// Performant 2D canvas “living engineering system”. Nodes drift, connect,
// disconnect, and respond to the cursor. Degrades to fewer nodes on mobile and
// to a static frame under prefers-reduced-motion.
export default function SemanticGraph({
  density = 90,
  labels = [],
  className = '',
  interactive = true,
  connectDist = 130,
  fade = false
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const count = Math.max(18, Math.round(density * (isMobile ? 0.4 : 1)));
    const cd = isMobile ? connectDist * 0.85 : connectDist;

    const build = () => {
      const rect = parent.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.7,
        pulse: Math.random() * Math.PI * 2,
        label: i < labels.length ? labels[i] : undefined
      }));
      // ensure labelled nodes are spread a bit
      nodes.forEach((n, i) => {
        if (n.label) n.r = 2.2;
        n.x = i * 137.5 % 100 / 100 * w * 0.9 + w * 0.05;
        if (i >= labels.length) return;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (!reduced) {
          a.x += a.vx;
          a.y += a.vy;
          a.pulse += 0.02;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
          if (interactive) {
            const dx = a.x - mouse.x;
            const dy = a.y - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < 120 && d > 0.01) {
              const f = (120 - d) / 120 * 0.6;
              a.x += dx / d * f;
              a.y += dy / d * f;
            }
          }
        }
      }
      // edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < cd) {
            let o = (1 - d / cd) * 0.5;
            if (fade) o *= 1 - Math.min(1, Math.max(a.y, b.y) / h);
            const mdx = (a.x + b.x) / 2 - mouse.x;
            const mdy = (a.y + b.y) / 2 - mouse.y;
            const near = interactive && Math.hypot(mdx, mdy) < 130;
            ctx.strokeStyle = near ?
            `rgba(34,211,238,${Math.min(0.85, o + 0.35)})` :
            `rgba(150,150,150,${o})`;
            ctx.lineWidth = near ? 0.8 : 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const near = interactive && Math.hypot(mdx, mdy) < 130;
        const tw = 0.6 + Math.sin(a.pulse) * 0.4;
        ctx.fillStyle = near || a.label ? `rgba(34,211,238,${a.label ? 0.95 : 0.9})` : `rgba(210,210,210,${0.35 * tw + 0.2})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r + (near ? 1 : 0), 0, Math.PI * 2);
        ctx.fill();
        if (a.label) {
          ctx.fillStyle = near ? 'rgba(34,211,238,0.95)' : 'rgba(180,180,180,0.55)';
          ctx.font = '9px "Space Grotesk", monospace';
          ctx.fillText(a.label, a.x + 6, a.y - 6);
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    build();
    draw();
    const ro = new ResizeObserver(build);
    ro.observe(parent);
    if (interactive) {
      window.addEventListener('mousemove', onMove);
      parent.addEventListener('mouseleave', onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, [density, labels, interactive, connectDist, fade, reduced]);

  return <canvas data-ev-id="ev_1c7c2dc4d5" ref={canvasRef} className={className} aria-hidden />;
}