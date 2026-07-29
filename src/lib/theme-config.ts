import { CalendarTheme } from '../types/calendar';

export const THEMES: CalendarTheme[] = [
  {
    id: 'github-dark',
    name: 'GitHub Dark',
    isDark: true,
    levels: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    bgCard: 'bg-slate-900/90 backdrop-blur-md border-slate-800',
    borderCard: 'border-slate-800',
    textColor: 'text-slate-100',
    subtextColor: 'text-slate-400',
    gridBorder: 'border-slate-800/80',
  },
  {
    id: 'github-light',
    name: 'GitHub Light',
    isDark: false,
    levels: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    bgCard: 'bg-white border-slate-200 shadow-sm',
    borderCard: 'border-slate-200',
    textColor: 'text-slate-900',
    subtextColor: 'text-slate-600',
    gridBorder: 'border-slate-200',
  },
  {
    id: 'halloween',
    name: 'Halloween (Spooky)',
    isDark: true,
    levels: ['#161b22', '#631c03', '#bd561d', '#fa7a18', '#fddf68'],
    bgCard: 'bg-amber-950/40 backdrop-blur-md border-amber-900/50',
    borderCard: 'border-amber-900/50',
    textColor: 'text-amber-100',
    subtextColor: 'text-amber-400',
    gridBorder: 'border-amber-900/40',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    isDark: true,
    levels: ['#0f172a', '#0369a1', '#0284c7', '#38bdf8', '#38bdf8'],
    bgCard: 'bg-sky-950/40 backdrop-blur-md border-sky-800/50',
    borderCard: 'border-sky-800/50',
    textColor: 'text-sky-100',
    subtextColor: 'text-sky-300',
    gridBorder: 'border-sky-900/40',
  },
  {
    id: 'violet-glow',
    name: 'Violet Glow',
    isDark: true,
    levels: ['#180e29', '#4c1d95', '#6d28d9', '#8b5cf6', '#c084fc'],
    bgCard: 'bg-purple-950/40 backdrop-blur-md border-purple-800/50',
    borderCard: 'border-purple-800/50',
    textColor: 'text-purple-100',
    subtextColor: 'text-purple-300',
    gridBorder: 'border-purple-900/40',
  },
  {
    id: 'emerald',
    name: 'Vibrant Emerald',
    isDark: true,
    levels: ['#022c22', '#065f46', '#059669', '#10b981', '#34d399'],
    bgCard: 'bg-emerald-950/40 backdrop-blur-md border-emerald-800/50',
    borderCard: 'border-emerald-800/50',
    textColor: 'text-emerald-100',
    subtextColor: 'text-emerald-300',
    gridBorder: 'border-emerald-900/40',
  },
];

export function getThemeById(id: string): CalendarTheme {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}
