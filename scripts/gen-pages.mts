import { mkdirSync, writeFileSync } from 'node:fs';

const pages: Array<[string, string, string]> = [
  ['home', 'HomePage', 'Quonceptory'],
  ['academia', 'AcademiaPage', 'Academia'],
  ['catalogo', 'CatalogoPage', 'Herramientas'],
  ['proyectos', 'ProyectosPage', 'Proyectos'],
  ['comunidad', 'ComunidadPage', 'Comunidad'],
  ['eventos', 'EventosPage', 'Eventos'],
  ['blog', 'BlogPage', 'Blog'],
  ['blog', 'BlogPostPage', 'Blog'],
  ['contacto', 'ContactoPage', 'Contacto'],
  ['auth', 'LoginPage', 'Acceder'],
  ['auth/app', 'AppPage', 'Portal'],
  ['notfound', 'NotFoundPage', '404'],
];

for (const [dir, comp, title] of pages) {
  mkdirSync(`src/features/${dir}`, { recursive: true });
  const content = `import { useT } from '@/i18n';
import { useMeta } from '@/lib/useMeta';

export function ${comp}() {
  const t = useT();
  useMeta('${title} — Quonceptory Academy');

  return (
    <div className="shell py-32">
      <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">${title}</h1>
      <p className="mt-4 text-muted">{t('common.loading')}</p>
    </div>
  );
}
`;
  writeFileSync(`src/features/${dir}/${comp}.tsx`, content);
}

console.log(`Created ${pages.length} placeholder pages`);
