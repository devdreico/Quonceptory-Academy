import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LocaleProvider } from '@/i18n';
import { HomePage } from './HomePage';

function renderHomePage() {
  window.localStorage.setItem('q-locale', 'es');
  return render(
    <MemoryRouter initialEntries={['/es']}>
      <LocaleProvider>
        <HomePage />
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe('HomePage', () => {
  it('removes the community stats block and displays featured tools', () => {
    renderHomePage();

    expect(screen.queryByText('La comunidad en cifras')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Herramientas destacadas' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Herramientas destacadas' })).toBeInTheDocument();
  });

  it('lets visitors navigate between scientific quotes', async () => {
    renderHomePage();

    expect(document.querySelector('h1')?.textContent?.replaceAll('\u00a0', ' ')).toContain(
      'La ciencia es la cultura de la duda.',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Cita siguiente' }));

    await waitFor(() =>
      expect(
        [...document.querySelectorAll('h1')].some((heading) =>
          heading.textContent?.replaceAll('\u00a0', ' ').includes('Nada en la vida debe ser temido'),
        ),
      ).toBe(true),
    );
    expect(screen.getByText('Marie Curie')).toBeInTheDocument();
  });

  it('links the founder social section to Allerihe profiles', () => {
    renderHomePage();

    expect(
      screen.getByText('Sigue a Allerihe, founder de Quonceptory, en sus redes personales.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Allerihe' })).toBeInTheDocument();

    const hrefs = [...document.querySelectorAll('a')].map((anchor) => anchor.href);
    expect(hrefs).toContain('https://youtube.com/@allerihe');
    expect(hrefs).toContain('https://instagram.com/allerihe');
    expect(hrefs).toContain('https://tiktok.com/@allerihe');
    expect(hrefs).toContain('https://allerihe.presentto.online/');
    expect(hrefs.some((href) => href.includes('youtube.com/results?search_query='))).toBe(false);
  });
});
