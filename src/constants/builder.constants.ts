import type { PrettierConfigState } from '@/types';

export const DEFAULT_PRETTIER_CONFIG: PrettierConfigState = {
  semi: true,
  single_quote: true,
  tab_width: 2,
  trailing_comma: 'none',
  print_width: 80,
  use_tabs: false,
  bracket_spacing: true,
  bracket_same_line: false,
  arrow_parens: 'avoid',
  end_of_line: 'lf',
  prose_wrap: 'preserve',
  html_whitespace_sensitivity: 'css',
  plugins: []
};
