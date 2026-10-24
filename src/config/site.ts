import type { BiString } from '@/data/types';

export type SocialIconName = 'instagram' | 'tiktok' | 'youtube' | 'linkedin' | 'x' | 'github' | 'discord';

export const siteConfig = {
  name: 'Quonceptory',
  url: 'https://quonceptory.com',
  fullName: { es: 'Quonceptory Academy', en: 'Quonceptory Academy' } satisfies BiString,
  tagline: {
    es: 'De un punto concreto a una solución aplicable. Inteligencia artificial con método.',
    en: 'From a concrete point to an applicable solution. Artificial intelligence with method.',
  } satisfies BiString,
  description: {
    es: 'Academia de inteligencia artificial que forma profesionales capaces de delegar grandes fuerzas computacionales de investigación y análisis de datos para llegar a resultados concretos aplicables a la realidad. Comunidad internacional de +2000 profesionales.',
    en: 'Artificial intelligence academy training professionals able to delegate large computational forces of research and data analysis to reach concrete, real-world applicable results. International community of +2000 professionals.',
  } satisfies BiString,
  email: 'hello@quonceptory.com',
  admissionsEmail: 'admissions@quonceptory.com',
  phone: '+34 600 000 000',
  whatsapp: 'https://wa.me/34600000000',
  calendly: 'https://calendly.com/quonceptory/30min',
  headquarters: {
    es: 'Operamos en remoto desde y hacia todo el mundo.',
    en: 'We operate remotely from and to the whole world.',
  } satisfies BiString,
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/allerihe', icon: 'instagram' },
    { label: 'TikTok', href: 'https://tiktok.com/@allerihe', icon: 'tiktok' },
    { label: 'YouTube', href: 'https://youtube.com/@allerihe', icon: 'youtube' },
    { label: 'LinkedIn', href: 'https://allerihe.presentto.online/', icon: 'linkedin' },
    { label: 'X', href: 'https://x.com/quonceptory', icon: 'x' },
    { label: 'GitHub', href: 'https://github.com/quonceptory', icon: 'github' },
    { label: 'Discord', href: 'https://discord.gg/quonceptory', icon: 'discord' },
  ] satisfies ReadonlyArray<{ label: string; href: string; icon: SocialIconName }>,
  logo: {
    src: '/logo.png',
    alt: 'Quonceptory Academy',
  },
  communityStats: {
    members: 2000,
    countries: 40,
    projects: 120,
    hours: 48000,
  },
} as const;

export type SiteConfig = typeof siteConfig;
