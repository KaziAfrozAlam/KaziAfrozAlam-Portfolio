/**
 * ⚠️ ROUTING RULES:
 * - Router is in main.tsx. Do NOT add another <BrowserRouter> here or anywhere.
 * - Use <Routes> + <Route> components ONLY. Do NOT use useRoutes().
 * - STATIC IMPORTS ONLY — no React.lazy() or dynamic import().
 * - Import from 'react-router' — NOT 'react-router-dom' (does not exist).
 */
import Index from '@/pages/index';
import { Route, Routes } from 'react-router';

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Index />} />
		</Routes>
	);
}
