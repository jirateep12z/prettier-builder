import type { CommonIgnoreCategory } from '@/types';
import {
  FileText,
  FolderClosed,
  Lock,
  Monitor,
  Package,
  Shield,
  Zap
} from 'lucide-react';
import type { ReactNode } from 'react';
import { createElement } from 'react';

export const IGNORE_PATTERNS_CATEGORY_ORDER: CommonIgnoreCategory[] = [
  'dependencies',
  'build',
  'cache',
  'coverage',
  'lock_files',
  'minified',
  'environment',
  'ide',
  'logs'
];

export const IGNORE_PATTERNS_CATEGORY_ICONS: Record<
  CommonIgnoreCategory,
  ReactNode
> = {
  dependencies: createElement(Package, { className: 'h-4 w-4' }),
  build: createElement(Zap, { className: 'h-4 w-4' }),
  cache: createElement(FolderClosed, { className: 'h-4 w-4' }),
  coverage: createElement(Shield, { className: 'h-4 w-4' }),
  lock_files: createElement(Lock, { className: 'h-4 w-4' }),
  minified: createElement(FileText, { className: 'h-4 w-4' }),
  environment: createElement(Lock, { className: 'h-4 w-4' }),
  ide: createElement(Monitor, { className: 'h-4 w-4' }),
  logs: createElement(FileText, { className: 'h-4 w-4' })
};

export const IGNORE_PATTERNS_CATEGORY_LABELS: Record<
  CommonIgnoreCategory,
  string
> = {
  dependencies: 'Dependencies',
  build: 'Build Output',
  cache: 'Cache',
  coverage: 'Coverage',
  lock_files: 'Lock Files',
  minified: 'Minified',
  environment: 'Environment',
  ide: 'IDE',
  logs: 'Logs'
};
