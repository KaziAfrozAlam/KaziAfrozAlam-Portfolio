import { TOTAL_INDEX } from '@/data/portfolio';
import { createContext, useContext } from 'react';

export interface ScrollIndexValue {
	active: number; // 0-based
	total: number;
	setActive: (i: number) => void;
}

export const ScrollIndexContext = createContext<ScrollIndexValue | null>(null);

export function useScrollIndex(): ScrollIndexValue {
	const ctx = useContext(ScrollIndexContext);
	if (!ctx) return { active: 0, total: TOTAL_INDEX, setActive: () => {} };
	return ctx;
}
