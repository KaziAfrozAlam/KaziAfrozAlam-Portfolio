import { ScrollIndexContext } from '@/context/scroll-index-context';
import { TOTAL_INDEX } from '@/data/portfolio';
import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';

export function ScrollIndexProvider({ children }: { children: ReactNode }) {
	const [active, setActiveState] = useState(0);
	const last = useRef(0);
	const setActive = useCallback((i: number) => {
		if (i === last.current) return;
		last.current = i;
		setActiveState(i);
	}, []);
	const value = useMemo(() => ({ active, total: TOTAL_INDEX, setActive }), [active, setActive]);
	return <ScrollIndexContext.Provider value={value}>{children}</ScrollIndexContext.Provider>;
}
