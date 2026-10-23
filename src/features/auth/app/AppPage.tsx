import { BookOpen, LogOut, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthProvider';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { tracks } from '@/data';
import { useLocale } from '@/i18n';
import { useMeta } from '@/lib/useMeta';

export function AppPage() {
  const { locale, tp } = useLocale();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const en = locale === 'en';
  useMeta(en ? 'Learning portal — Quonceptory Academy' : 'Portal de aprendizaje — Quonceptory Academy');
  const signOut = () => {
    logout();
    navigate(`/${locale}/login`, { replace: true });
  };
  return (
    <section className="shell py-14 md:py-20">
      <div className="flex flex-wrap items-start justify-between gap-5"><div><Badge variant="accent">{en ? 'Local demo portal' : 'Portal demo local'}</Badge><h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">{en ? `Welcome, ${user?.name}` : `Te damos la bienvenida, ${user?.name}`}</h1><p className="mt-3 text-muted">{user?.email}</p></div><Button variant="outline" onClick={signOut}><LogOut className="size-4" />{en ? 'Sign out' : 'Cerrar sesión'}</Button></div>
      <div className="mt-8 rounded-2xl border border-line bg-surface p-5 text-sm leading-relaxed text-muted">{en ? 'This portal is a functional prototype: your demo profile is stored only in this browser. Course progress, payments and student records require a secure backend and are not active.' : 'Este portal es un prototipo funcional: tu perfil demo se guarda solo en este navegador. El progreso de cursos, pagos y expedientes requieren un backend seguro y aún no están activos.'}</div>
      <div className="mt-12 flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-accent-500">{en ? 'Suggested starting point' : 'Punto de partida sugerido'}</p><h2 className="mt-2 text-2xl font-extrabold">{en ? 'Explore your learning tracks' : 'Explora tus rutas de aprendizaje'}</h2></div><BookOpen className="size-6 text-accent-500" /></div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{tracks.slice(0, 6).map((track) => <Card key={track.id} className="p-5"><Sparkles className="size-5 text-accent-500" /><h3 className="mt-4 font-bold">{tp(track.title)}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{tp(track.desc)}</p><p className="mt-4 text-xs font-semibold text-accent-500">{track.hours} h · {track.topicsCount} {en ? 'topics' : 'temas'}</p></Card>)}</div>
    </section>
  );
}
