import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LocaleLayout } from './LocaleLayout';
import { RootRedirect } from './RootRedirect';
import { ProtectedRoute } from '@/auth/ProtectedRoute';

const HomePage = lazy(() => import('@/features/home/HomePage').then((m) => ({ default: m.HomePage })));
const CienciaPage = lazy(() =>
  import('@/features/ciencia/CienciaPage').then((m) => ({ default: m.CienciaPage })),
);
const AcademiaPage = lazy(() =>
  import('@/features/academia/AcademiaPage').then((m) => ({ default: m.AcademiaPage })),
);
const MetodoPage = lazy(() =>
  import('@/features/metodo/MetodoPage').then((m) => ({ default: m.MetodoPage })),
);
const CatalogoPage = lazy(() =>
  import('@/features/catalogo/CatalogoPage').then((m) => ({ default: m.CatalogoPage })),
);
const ProyectosPage = lazy(() =>
  import('@/features/proyectos/ProyectosPage').then((m) => ({ default: m.ProyectosPage })),
);
const ComunidadPage = lazy(() =>
  import('@/features/comunidad/ComunidadPage').then((m) => ({ default: m.ComunidadPage })),
);
const EventosPage = lazy(() =>
  import('@/features/eventos/EventosPage').then((m) => ({ default: m.EventosPage })),
);
const BlogPage = lazy(() => import('@/features/blog/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() =>
  import('@/features/blog/BlogPostPage').then((m) => ({ default: m.BlogPostPage })),
);
const ContactoPage = lazy(() =>
  import('@/features/contacto/ContactoPage').then((m) => ({ default: m.ContactoPage })),
);
const LoginPage = lazy(() => import('@/features/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const AppPage = lazy(() => import('@/features/auth/app/AppPage').then((m) => ({ default: m.AppPage })));
const NotFoundPage = lazy(() =>
  import('@/features/notfound/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

function PageFallback() {
  return (
    <div className="shell flex min-h-[60vh] items-center justify-center">
      <div className="animate-spin-slow border-line border-t-accent-500 h-10 w-10 rounded-full border-2" />
    </div>
  );
}

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<PageFallback />}>{node}</Suspense>;
}

export const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  { path: '/index.html', element: <RootRedirect /> },
  {
    path: '/:locale',
    element: <LocaleLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'ciencia', element: withSuspense(<CienciaPage />) },
      { path: 'academia', element: withSuspense(<AcademiaPage />) },
      { path: 'metodo', element: withSuspense(<MetodoPage />) },
      { path: 'herramientas', element: withSuspense(<CatalogoPage />) },
      { path: 'proyectos', element: withSuspense(<ProyectosPage />) },
      { path: 'comunidad', element: withSuspense(<ComunidadPage />) },
      { path: 'eventos', element: withSuspense(<EventosPage />) },
      { path: 'blog', element: withSuspense(<BlogPage />) },
      { path: 'blog/:slug', element: withSuspense(<BlogPostPage />) },
      { path: 'contacto', element: withSuspense(<ContactoPage />) },
      { path: 'login', element: withSuspense(<LoginPage />) },
      {
        path: 'app',
        element: <ProtectedRoute />,
        children: [{ index: true, element: withSuspense(<AppPage />) }],
      },
      { path: 'tools/:slug', element: <Navigate to="../herramientas" replace /> },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
]);
