import { useScrollIndex } from '@/context/scroll-index-context';
import { sectionIndex } from '@/data/portfolio';
import { useEffect, useRef } from 'react';

// Attaches an IntersectionObserver to a section root; reports the active index
// as the visitor scrolls.
export function useSectionIndex<T extends HTMLElement>(id: string) {
	const ref = useRef<T | null>(null);
	const { setActive } = useScrollIndex();
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const idx = sectionIndex.indexOf(id);
		if (idx < 0) return;
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) setActive(idx);
				});
			},
			{ rootMargin: '-45% 0px -45% 0px', threshold: 0 },
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, [id, setActive]);
	return ref;
}
