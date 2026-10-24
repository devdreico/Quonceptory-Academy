import { useMemo, useState, type FormEvent } from 'react';
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Field, Input } from '@/components/ui/Field';
import { PageHeader } from '@/components/layout/PageHeader';
import { posts } from '@/data';
import { useLocale } from '@/i18n';
import { formatDate } from '@/lib/utils';
import { readJsonStorage, writeStorage } from '@/lib/storage';
import { useMeta } from '@/lib/useMeta';

const NEWSLETTER_KEY = 'q-newsletter';

export function BlogPage() {
  const { locale, tp, t } = useLocale();
  const [category, setCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useMeta(t('blog.title') + ' — Quonceptory Academy', {
    description: t('blog.desc'),
    canonical: `/${locale}/blog`,
  });
  const categories = useMemo(() => [...new Set(posts.map((post) => post.category))], []);
  const filtered = useMemo(
    () => (category === 'all' ? posts : posts.filter((post) => post.category === category)),
    [category],
  );
  const featured = posts.find((post) => post.featured);
  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const saved = readJsonStorage<string[]>(
      NEWSLETTER_KEY,
      [],
      (value): value is string[] => Array.isArray(value) && value.every((item) => typeof item === 'string'),
    );
    const normalized = email.trim().toLowerCase();
    if (!saved.includes(normalized)) saved.push(normalized);
    if (!writeStorage(NEWSLETTER_KEY, JSON.stringify(saved))) {
      setStorageError(true);
      return;
    }
    setStorageError(false);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <>
      <PageHeader index="06" kicker={t('blog.kicker')} title={t('blog.title')} desc={t('blog.desc')} />
      <section className="shell py-12 md:py-16">
        {featured ? (
          <Link
            to={`/${locale}/blog/${featured.slug}`}
            className="group glass hover:glass-strong grid overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="grid-bg bg-surface-2/60 flex min-h-56 items-center justify-center">
              <span className="text-accent-500/20 text-8xl font-extrabold tracking-tight">Q.</span>
            </div>
            <div className="flex flex-col justify-center p-7 md:p-10">
              <Badge variant="accent">
                {t('blog.featured')} · {featured.category}
              </Badge>
              <h2 className="mt-5 text-2xl leading-tight font-extrabold md:text-3xl">{tp(featured.title)}</h2>
              <p className="text-muted mt-4 text-sm leading-relaxed">{tp(featured.excerpt)}</p>
              <span className="text-accent-500 mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                {t('blog.readArticle')}{' '}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ) : null}
        <div className="mt-12 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${category === 'all' ? 'border-accent-500 bg-accent-500 text-on-accent' : 'border-line text-ink-soft'}`}
          >
            {t('blog.filterAll')}
          </button>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${category === item ? 'border-accent-500 bg-accent-500 text-on-accent' : 'border-line text-ink-soft'}`}
            >
              {item}
            </button>
          ))}
          <span className="text-muted ml-auto text-sm">{t('blog.counter', { count: filtered.length })}</span>
        </div>
        {filtered.length ? (
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link key={post.id} to={`/${locale}/blog/${post.slug}`} className="group">
                <Card className="group-hover:border-accent-500/50 flex h-full flex-col p-6 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="neutral">{post.category}</Badge>
                    <span className="text-muted flex items-center gap-1 text-xs">
                      <Clock3 className="size-3" />
                      {post.readMinutes} {t('common.minutes')}
                    </span>
                  </div>
                  <h2 className="mt-5 text-lg leading-snug font-bold">{tp(post.title)}</h2>
                  <p className="text-muted mt-3 flex-1 text-sm leading-relaxed">{tp(post.excerpt)}</p>
                  <div className="border-line text-muted mt-5 flex items-center gap-3 border-t pt-4 text-xs">
                    <span>{post.author}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="size-3" />
                      {formatDate(post.date, locale)}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted py-16 text-center">{t('blog.empty')}</p>
        )}
      </section>
      <section className="border-line bg-surface/50 border-y">
        <div className="shell py-16 md:py-20">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">
              {t('blog.newsletterKicker')}
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">{t('blog.newsletterTitle')}</h2>
            <p className="text-muted mt-3 text-sm">{t('blog.newsletterDesc')}</p>
            {subscribed ? (
              <p
                className="border-accent-500/30 bg-accent-500/10 text-accent-500 mt-6 rounded-xl border p-4 text-sm font-semibold"
                role="status"
              >
                {t('blog.newsletterSuccess')}
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mx-auto mt-6 flex max-w-lg items-end gap-3 text-left"
              >
                <Field id="newsletter-email" label={t('blog.newsletterEmail')} className="flex-1">
                  <Input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={t('blog.newsletterPlaceholder')}
                  />
                </Field>
                <Button type="submit">{t('blog.newsletterButton')}</Button>
              </form>
            )}
            {storageError ? (
              <p className="mt-3 text-sm text-red-500" role="alert">
                {t('blog.newsletterStorageError')}
              </p>
            ) : null}
            <p className="text-muted mt-4 text-xs">{t('blog.newsletterDemo')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
