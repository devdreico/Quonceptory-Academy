import type { Tool, BiString, ToolType, Level } from '../types';
import { toolsLlms } from './llms';
import { toolsCoding } from './coding';
import { toolsAgents } from './agents';
import { toolsImage } from './image';
import { toolsVideo } from './video';
import { toolsAudio } from './audio';
import { toolsData } from './data';
import { toolsResearch } from './research';
import { toolsDesign } from './design';
import { toolsProductivity } from './productivity';
import { toolsEducation } from './education';
import { toolsBusiness } from './business';
import { toolsSecurity } from './security';
import { toolsInfra } from './infra';
import { toolsScience } from './science';
import { toolsGeneral } from './general';

export const allTools: Tool[] = [
  ...toolsLlms,
  ...toolsCoding,
  ...toolsAgents,
  ...toolsImage,
  ...toolsVideo,
  ...toolsAudio,
  ...toolsData,
  ...toolsResearch,
  ...toolsDesign,
  ...toolsProductivity,
  ...toolsEducation,
  ...toolsBusiness,
  ...toolsSecurity,
  ...toolsInfra,
  ...toolsScience,
  ...toolsGeneral,
];

const categoryLabels: { id: string; label: BiString }[] = [
  { id: 'llms', label: { es: 'Modelos y Chat', en: 'LLMs & Chat' } },
  { id: 'coding', label: { es: 'Programación', en: 'Coding & Dev' } },
  { id: 'agents', label: { es: 'Agentes y Automatización', en: 'Agents & Automation' } },
  { id: 'image', label: { es: 'Imagen', en: 'Image' } },
  { id: 'video', label: { es: 'Vídeo', en: 'Video' } },
  { id: 'audio', label: { es: 'Audio', en: 'Audio' } },
  { id: 'data', label: { es: 'Datos y Análisis', en: 'Data & Analytics' } },
  { id: 'research', label: { es: 'Investigación', en: 'Research' } },
  { id: 'design', label: { es: 'Diseño', en: 'Design' } },
  { id: 'productivity', label: { es: 'Productividad', en: 'Productivity' } },
  { id: 'education', label: { es: 'Educación', en: 'Education' } },
  { id: 'business', label: { es: 'Negocios y Marketing', en: 'Business & Marketing' } },
  { id: 'security', label: { es: 'Seguridad', en: 'Security' } },
  { id: 'infra', label: { es: 'Infraestructura y MLOps', en: 'Infrastructure & MLOps' } },
  { id: 'science', label: { es: 'Ciencia y Biotech', en: 'Science & Biotech' } },
  { id: 'general', label: { es: 'Utilidades y Directorios', en: 'Utilities & Directories' } },
];

export const toolCategories: { id: string; label: BiString; count?: number }[] =
  categoryLabels.map((c) => ({
    ...c,
    count: allTools.filter((t) => t.category === c.id).length,
  }));

export const toolTypeLabels: Record<ToolType, BiString> = {
  open: { es: 'Código abierto', en: 'Open source' },
  freemium: { es: 'Freemium', en: 'Freemium' },
  paid: { es: 'De pago', en: 'Paid' },
  api: { es: 'API', en: 'API' },
  local: { es: 'Local', en: 'Local' },
};

export const toolLevelLabels: Record<Level, BiString> = {
  beginner: { es: 'Principiante', en: 'Beginner' },
  intermediate: { es: 'Intermedio', en: 'Intermediate' },
  advanced: { es: 'Avanzado', en: 'Advanced' },
};

export function getTool(slug: string): Tool | undefined {
  return allTools.find((t) => t.slug === slug);
}
