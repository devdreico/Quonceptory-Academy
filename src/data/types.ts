export type Locale = 'es' | 'en';

export type BiString = { es: string; en: string };

export type ToolType = 'open' | 'freemium' | 'paid' | 'api' | 'local';
export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface Tool {
  id: string;
  slug: string;
  name: string;
  desc: BiString;
  category: string;
  type: ToolType;
  level: Level;
  tags: string[];
  url?: string;
  featured?: boolean;
}

export interface Program {
  id: string;
  slug: string;
  title: BiString;
  desc: BiString;
  track: string;
  duration: BiString;
  level: Level;
  price: BiString;
  modules: number;
  format: 'selfpaced' | 'live' | 'hybrid';
  featured?: boolean;
}

export interface Topic {
  id: string;
  slug: string;
  title: BiString;
  desc: BiString;
  track: string;
  level: Level;
  hours: number;
}

export interface Project {
  id: string;
  slug: string;
  title: BiString;
  desc: BiString;
  domain: string;
  status: 'active' | 'shipped' | 'lab';
  stack: string[];
  metrics: BiString[];
  year: number;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  slug: string;
  title: BiString;
  desc: BiString;
  type: 'webinar' | 'workshop' | 'hackathon' | 'meetup';
  date: string;
  location: BiString;
  online: boolean;
  seats?: number;
}

export interface Post {
  id: string;
  slug: string;
  title: BiString;
  excerpt: BiString;
  body: BiString[];
  category: string;
  date: string;
  readMinutes: number;
  author: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: BiString;
  country: string;
  quote: BiString;
}

export interface Service {
  id: string;
  title: BiString;
  desc: BiString;
  icon: string;
}

export interface FaqItem {
  id: string;
  q: BiString;
  a: BiString;
}

export interface Stat {
  id: string;
  value: number;
  suffix?: string;
  label: BiString;
}

export interface Track {
  id: string;
  slug: string;
  title: BiString;
  desc: BiString;
  icon: string;
  phase: 1 | 2 | 3 | 4;
  hours: number;
  topicsCount: number;
}
