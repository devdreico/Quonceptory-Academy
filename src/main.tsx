import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { ThemeProvider } from '@/theme/ThemeProvider';
import { LocaleProvider } from '@/i18n';
import { AuthProvider } from '@/auth/AuthProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import '@/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <LocaleProvider>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </LocaleProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
