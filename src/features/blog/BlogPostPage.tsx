import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { LinkButton } from '@/components/ui/Button';
import { PageHeader } from '@/components/layout/PageHeader';
import { posts } from '@/data';
import { useLocale } from '@/i18n';
import { formatDate } from '@/lib/utils';
import { useMeta } from '@/lib/useMeta';

export function BlogPostPage() {
  const { slug } = useParams();
  const { locale, tp, t } = useLocale();
  const post = posts.find((item) => item.slug === slug);
  useMeta(post ? `${tp(post.title)} — Quonceptory Academy` : t('blog.notFoundTitle'), post ? tp(post.excerpt) : t('blog.notFoundDesc'));
  if (!post) {
    return <section className="shell py-24 text-center"><p className="text-xs font-bold uppercase tracking-widest text-accent-500">404</p><h1 className="mt-3 text-4xl font-extrabold">{t('blog.notFoundTitle')}</h1><p className="mt-3 text-muted">{t('blog.notFoundDesc')}</p><LinkButton to={`/${locale}/blog`} className="mt-7">{t('blog.backToBlog')}</LinkButton></section>;
  }
  const related = posts.filter((item) => item.category === post.category && item.id !== post.id).slice(0, 3);
  return (
    <>
      <PageHeader kicker={post.category} title={tp(post.title)} desc={tp(post.excerpt)}>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted"><span className="flex items-center gap-1.5"><CalendarDays className="size-4" />{formatDate(post.date, locale)}</span><span className="flex items-center gap-1.5"><Clock3 className="size-4" />{post.readMinutes} {t('common.minutes')}</span><span>{t('blog.authorLabel')}: {post.author}</span><Badge variant="neutral">{post.category}</Badge></div>
      </PageHeader>
      <article className="shell py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Link to={`/${locale}/blog`} className="inline-flex items-center gap-2 text-sm font-semibold text-accent-500"><ArrowLeft className="size-4" />{t('blog.backToBlog')}</Link>
          <div className="mt-9 space-y-6 text-base leading-8 text-ink-soft md:text-lg">{post.body.map((paragraph, index) => <p key={`${post.id}-${index}`}>{tp(paragraph)}</p>)}</div>
          <div className="mt-10 border-t border-line pt-6 text-sm text-muted">{t('blog.authorLabel')}: <span className="font-semibold text-ink">{post.author}</span></div>
        </div>
      </article>
      {related.length ? <section className="border-t border-line bg-surface/50"><div className="shell py-14"><h2 className="text-2xl font-extrabold">{t('blog.relatedTitle')}</h2><p className="mt-2 text-sm text-muted">{t('blog.relatedDesc')}</p><div className="mt-6 grid gap-4 md:grid-cols-3">{related.map((item) => <Link key={item.id} to={`/${locale}/blog/${item.slug}`} className="rounded-2xl border border-line bg-bg p-5 font-bold transition-colors hover:border-accent-500/50">{tp(item.title)}<span className="mt-4 block text-xs font-normal text-muted">{item.readMinutes} {t('common.minutes')}</span></Link>)}</div></div></section> : null}
    </>
  );
}
