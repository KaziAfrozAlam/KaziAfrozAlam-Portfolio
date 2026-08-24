import { type ReactNode } from 'react';

/**
 * ⚠️ App-wide providers. Add new providers here — they'll be available in all routes.
 * Providers MUST wrap <BrowserRouter> to be accessible everywhere.
 *
 * Example:
 *   import { QueryClientProvider } from '@tanstack/react-query';
 *   import { AuthProvider } from '@/contexts/AuthContext';
 *
 *   export function AppProviders({ children }: { children: ReactNode }) {
 *     return (
 *       <QueryClientProvider client={queryClient}>
 *         <AuthProvider>
 *           {children}
 *         </AuthProvider>
 *       </QueryClientProvider>
 *     );
 *   }
 */
export function AppProviders({ children }: { children: ReactNode }) {
	return <>{children}</>;
}
