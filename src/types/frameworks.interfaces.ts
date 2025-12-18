import type { FrameworkIconId } from '@/types';

export interface FrameworkConfig {
  id: string;
  name: string;
  icon_id: FrameworkIconId;
  description: string;
  category: 'frontend' | 'backend' | 'fullstack';
  prettier_config: PrettierConfig;
  prettier_ignore: string[];
  gitignore: string[];
  format_script: string;
  install: InstallConfig;
}

export interface InstallConfig {
  dependencies: string[];
  dev_dependencies: string[];
}

export interface PrettierConfig {
  semi: boolean;
  single_quote: boolean;
  tab_width: number;
  trailing_comma: 'none' | 'es5' | 'all';
  print_width: number;
  use_tabs: boolean;
  bracket_spacing: boolean;
  bracket_same_line: boolean;
  arrow_parens: 'always' | 'avoid';
  end_of_line: 'lf' | 'crlf' | 'cr' | 'auto';
  prose_wrap: 'always' | 'never' | 'preserve';
  html_whitespace_sensitivity: 'css' | 'strict' | 'ignore';
  plugins?: string[];
  overrides?: PrettierOverride[];
}

export interface PrettierOverride {
  files: string | string[];
  options: Partial<PrettierConfig>;
}
