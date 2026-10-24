import { useState, type FormEvent } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthProvider';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Field, Input } from '@/components/ui/Field';
import { useLocale } from '@/i18n';
import { useMeta } from '@/lib/useMeta';

export function LoginPage() {
  const { locale } = useLocale();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const en = locale === 'en';
  useMeta(en ? 'Sign in — Quonceptory Academy' : 'Acceder — Quonceptory Academy', {
    canonical: `/${locale}/login`,
    noindex: true,
    type: 'profile',
  });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ name, email });
    const from = (location.state as { from?: string } | null)?.from;
    navigate(from?.startsWith(`/${locale}/`) ? from : `/${locale}/app`, { replace: true });
  };
  return (
    <section className="shell grid min-h-[70vh] place-items-center py-16">
      <Card className="w-full max-w-md p-7 md:p-9">
        <div className="flex items-center gap-3">
          <div className="bg-accent-500/10 text-accent-500 grid size-11 place-items-center rounded-xl">
            <LockKeyhole className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">{en ? 'Member access' : 'Acceso al portal'}</h1>
            <p className="text-muted mt-1 text-sm">
              {en ? 'Continue to your learning space.' : 'Continúa a tu espacio de aprendizaje.'}
            </p>
          </div>
        </div>
        <div className="border-accent-500/20 bg-accent-500/5 mt-6 rounded-xl border p-4">
          <Badge variant="accent">{en ? 'Demo mode' : 'Modo demo'}</Badge>
          <p className="text-muted mt-2 text-xs leading-relaxed">
            {en
              ? 'This prototype has no connected authentication service. Any valid name and email create a local demo session on this device.'
              : 'Este prototipo no tiene un servicio de autenticación conectado. Un nombre y correo válidos crean una sesión de demostración local en este dispositivo.'}
          </p>
        </div>
        <form onSubmit={submit} className="mt-7 space-y-5">
          <Field id="login-name" label={en ? 'Name' : 'Nombre'} required>
            <Input
              id="login-name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={80}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={en ? 'Your name' : 'Tu nombre'}
            />
          </Field>
          <Field id="login-email" label={en ? 'Email address' : 'Correo electrónico'} required>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@email.com"
            />
          </Field>
          <Button type="submit" className="w-full">
            {en ? 'Enter the portal' : 'Entrar al portal'} <ArrowRight className="size-4" />
          </Button>
        </form>
        <p className="text-muted mt-5 text-center text-xs">
          {en
            ? 'Your demo session stays in this browser and can be removed by signing out.'
            : 'La sesión demo permanece en este navegador y puedes eliminarla al salir.'}
        </p>
      </Card>
    </section>
  );
}
