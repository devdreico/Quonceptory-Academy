import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider } from './AuthProvider';
import { LocaleProvider } from '@/i18n';

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

function renderRoute(initialPath: string) {
  window.localStorage.setItem('q-locale', 'es');
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <LocaleProvider>
        <AuthProvider>
          <Routes>
            <Route path="/es/login" element={<LocationProbe />} />
            <Route path="/es/app" element={<ProtectedRoute />}>
              <Route
                index
                element={
                  <>
                    <LocationProbe />
                    <div>panel</div>
                  </>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe('ProtectedRoute', () => {
  it('redirects anonymous visitors to the login page', () => {
    renderRoute('/es/app');
    expect(screen.getByTestId('location')).toHaveTextContent('/es/login');
    expect(screen.queryByText('panel')).not.toBeInTheDocument();
  });

  it('lets authenticated users render the protected outlet', () => {
    window.localStorage.setItem(
      'q-auth',
      JSON.stringify({ name: 'Ana', email: 'ana@x.com', joinedAt: '2026-01-01', track: 'ia' }),
    );
    renderRoute('/es/app');
    expect(screen.getByTestId('location')).toHaveTextContent('/es/app');
    expect(screen.getByText('panel')).toBeInTheDocument();
  });

  it('rejects malformed saved demo sessions', () => {
    window.localStorage.setItem('q-auth', JSON.stringify({ name: '', email: 'ana@x.com' }));
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    renderRoute('/es/app');

    expect(screen.getByTestId('location')).toHaveTextContent('/es/login');
    expect(screen.queryByText('panel')).not.toBeInTheDocument();
  });
});
