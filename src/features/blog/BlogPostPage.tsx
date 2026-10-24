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
  useMeta(post ? `${tp(post.title)} — Quonceptory Academy` : t('blog.notFoundTitle'), {
    description: post ? tp(post.excerpt) : t('blog.notFoundDesc'),
    canonical: post ? `/${locale}/blog/${post.slug}` : undefined,
    noindex: !post,
    type: 'article',
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title[locale],
          description: post.excerpt[locale],
          datePublished: post.date,
          author: { '@type': 'Person', name: post.author },
          publisher: { '@type': 'Organization', name: 'Quonceptory Academy' },
          inLanguage: locale,
          mainEntityOfPage: `https://quonceptory.com/${locale}/blog/${post.slug}`,
        }
      : undefined,
  });
  if (!post) {
    return (
      <section className="shell py-24 text-center">
        <p className="text-accent-500 text-xs font-bold tracking-widest uppercase">404</p>
        <h1 className="mt-3 text-4xl font-extrabold">{t('blog.notFoundTitle')}</h1>
        <p className="text-muted mt-3">{t('blog.notFoundDesc')}</p>
        <LinkButton to={`/${locale}/blog`} className="mt-7">
          {t('blog.backToBlog')}
        </LinkButton>
      </section>
    );
  }
  const related = posts.filter((item) => item.category === post.category && item.id !== post.id).slice(0, 3);
  return (
    <>
      <PageHeader kicker={post.category} title={tp(post.title)} desc={tp(post.excerpt)}>
        <div className="text-muted flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {formatDate(post.date, locale)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 className="size-4" />
            {post.readMinutes} {t('common.minutes')}
          </span>
          <span>
            {t('blog.authorLabel')}: {post.author}
          </span>
          <Badge variant="neutral">{post.category}</Badge>
        </div>
      </PageHeader>
      <article className="shell py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            to={`/${locale}/blog`}
            className="text-accent-500 inline-flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft className="size-4" />
            {t('blog.backToBlog')}
          </Link>
          <div className="text-ink-soft mt-9 space-y-6 text-base leading-8 md:text-lg">
            {post.body.map((paragraph, index) => (
              <p key={`${post.id}-${index}`}>{tp(paragraph)}</p>
            ))}
          </div>
          <div className="border-line text-muted mt-10 border-t pt-6 text-sm">
            {t('blog.authorLabel')}: <span className="text-ink font-semibold">{post.author}</span>
          </div>
        </div>
      </article>
      {related.length ? (
        <section className="border-line bg-surface/50 border-t">
          <div className="shell py-14">
            <h2 className="text-2xl font-extrabold">{t('blog.relatedTitle')}</h2>
            <p className="text-muted mt-2 text-sm">{t('blog.relatedDesc')}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/${locale}/blog/${item.slug}`}
                  className="border-line bg-bg hover:border-accent-500/50 rounded-2xl border p-5 font-bold transition-colors"
                >
                  {tp(item.title)}
                  <span className="text-muted mt-4 block text-xs font-normal">
                    {item.readMinutes} {t('common.minutes')}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
