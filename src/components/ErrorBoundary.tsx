import { Component, type ErrorInfo, type ReactNode } from 'react';
import { useLocale } from '@/i18n';

function DefaultFallback() {
  const { locale, t } = useLocale();
  const en = locale === 'en';
  return (
    <div className="shell flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight">{t('common.errorTitle')}</h1>
      <p className="text-ink-soft max-w-md">
        {en
          ? 'An unexpected error occurred. Reload the page to continue.'
          : 'Se ha producido un error inesperado. Recarga la página para continuar.'}
      </p>
      <p className="text-muted font-mono text-xs">{t('common.retry')}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="bg-accent-600 hover:bg-accent-700 rounded-full px-6 py-3 text-sm font-semibold text-white transition"
      >
        {en ? 'Reload' : 'Recargar'}
      </button>
    </div>
  );
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled UI error', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return this.props.fallback ?? <DefaultFallback />;
  }
}
