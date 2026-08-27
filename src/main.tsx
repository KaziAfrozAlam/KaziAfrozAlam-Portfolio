import { StrictMode, Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { MotionConfig } from 'motion/react';
import { AppProviders } from './providers';
import App from './App';
import './index.css';

// Renders a safe fallback instead of unmounting the whole tree if any
// section throws during render. Prevents a single bad data point / component
// from white-screening the entire portfolio.
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    // Log the failure; never surface internal details to the visitor.
    console.error('Portfolio render error:', error.message);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#080808] px-6 text-center font-mono">
          <h1 className="text-2xl font-bold tracking-[0.2em] text-[#22d3ee]">SOMETHING WENT WRONG</h1>
          <p className="max-w-md text-sm text-[#a3a3a3]">
            The page hit an unexpected error. Please refresh — if it continues, email me at
            afrozalam.8760@gmail.com.
          </p>
        </main>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

createRoot(rootElement).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <AppProviders>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </AppProviders>
    </MotionConfig>
  </StrictMode>,
);
