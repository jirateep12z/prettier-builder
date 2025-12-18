export interface BuilderState {
  selected_framework: string | null;
  prettier_config: PrettierConfigState;
  ignore_patterns: string[];
  custom_patterns: string[];
}

export interface PrettierConfigState {
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
  plugins: string[];
}

export interface GeneratedOutput {
  prettierrc: string;
  prettierignore: string;
  gitignore: string;
  format_script: string;
}
