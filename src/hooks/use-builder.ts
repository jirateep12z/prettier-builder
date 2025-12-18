import {
  COMMON_IGNORE_PATTERNS,
  DEFAULT_PRETTIER_CONFIG,
  FRAMEWORKS,
  IGNORE_PATTERNS_CATEGORY_ORDER
} from '@/constants';
import type {
  BuilderState,
  CommonIgnoreCategory,
  GeneratedOutput,
  OutputFormat,
  PackageManager,
  PrettierConfigState
} from '@/types';
import { ConvertToYaml } from '@/utils';
import { useCallback, useMemo, useState } from 'react';

export function UseBuilder() {
  const [state, set_state] = useState<BuilderState>({
    selected_framework: null,
    prettier_config: DEFAULT_PRETTIER_CONFIG,
    ignore_patterns: [],
    custom_patterns: []
  });

  const [output_format, set_output_format] = useState<OutputFormat>('json');

  const selected_framework_data = useMemo(() => {
    if (!state.selected_framework) return null;
    return (
      FRAMEWORKS.find(framework => framework.id === state.selected_framework) ||
      null
    );
  }, [state.selected_framework]);

  const SelectFramework = useCallback((framework_id: string) => {
    const framework = FRAMEWORKS.find(f => f.id === framework_id);
    if (!framework) return;
    set_state({
      selected_framework: framework_id,
      prettier_config: {
        ...DEFAULT_PRETTIER_CONFIG,
        plugins: framework.prettier_config.plugins || []
      },
      ignore_patterns: [...framework.prettier_ignore],
      custom_patterns: []
    });
  }, []);
  const UpdatePrettierConfig = useCallback(
    <K extends keyof PrettierConfigState>(
      key: K,
      value: PrettierConfigState[K]
    ) => {
      set_state(prev => ({
        ...prev,
        prettier_config: {
          ...prev.prettier_config,
          [key]: value
        }
      }));
    },
    []
  );

  const ToggleIgnorePattern = useCallback((pattern: string) => {
    set_state(prev => {
      const is_included = prev.ignore_patterns.includes(pattern);
      return {
        ...prev,
        ignore_patterns: is_included
          ? prev.ignore_patterns.filter(p => p !== pattern)
          : [...prev.ignore_patterns, pattern]
      };
    });
  }, []);

  const AddCustomPattern = useCallback((pattern: string) => {
    if (!pattern.trim()) return;
    set_state(prev => ({
      ...prev,
      custom_patterns: [...prev.custom_patterns, pattern.trim()],
      ignore_patterns: [...prev.ignore_patterns, pattern.trim()]
    }));
  }, []);

  const RemoveCustomPattern = useCallback((pattern: string) => {
    set_state(prev => ({
      ...prev,
      custom_patterns: prev.custom_patterns.filter(p => p !== pattern),
      ignore_patterns: prev.ignore_patterns.filter(p => p !== pattern)
    }));
  }, []);

  const AddCommonPatterns = useCallback((category: CommonIgnoreCategory) => {
    const patterns = COMMON_IGNORE_PATTERNS[category];
    set_state(prev => ({
      ...prev,
      ignore_patterns: [...new Set([...prev.ignore_patterns, ...patterns])]
    }));
  }, []);

  const ResetToFrameworkDefaults = useCallback(() => {
    if (!state.selected_framework) return;
    SelectFramework(state.selected_framework);
  }, [state.selected_framework, SelectFramework]);

  const GeneratePrettierrc = useCallback(
    (format: OutputFormat): string => {
      const config: Record<string, unknown> = {
        semi: state.prettier_config.semi,
        singleQuote: state.prettier_config.single_quote,
        tabWidth: state.prettier_config.tab_width,
        trailingComma: state.prettier_config.trailing_comma,
        printWidth: state.prettier_config.print_width,
        useTabs: state.prettier_config.use_tabs,
        bracketSpacing: state.prettier_config.bracket_spacing,
        bracketSameLine: state.prettier_config.bracket_same_line,
        arrowParens: state.prettier_config.arrow_parens,
        endOfLine: state.prettier_config.end_of_line,
        proseWrap: state.prettier_config.prose_wrap,
        htmlWhitespaceSensitivity:
          state.prettier_config.html_whitespace_sensitivity
      };
      if (state.prettier_config.plugins.length > 0) {
        config.plugins = state.prettier_config.plugins;
      }
      if (format === 'json') {
        return JSON.stringify(config, null, 2);
      }
      if (format === 'yaml') {
        return ConvertToYaml(config);
      }
      if (format === 'js') {
        return `module.exports = ${JSON.stringify(config, null, 2)};`;
      }
      return JSON.stringify(config, null, 2);
    },
    [state.prettier_config]
  );

  const GeneratePrettierignore = useCallback((): string => {
    const all_patterns = [...new Set(state.ignore_patterns)];
    const custom_patterns = [...new Set(state.custom_patterns)];
    const framework_id = selected_framework_data?.id || 'vanilla';
    const category_order: CommonIgnoreCategory[] =
      IGNORE_PATTERNS_CATEGORY_ORDER;
    const used_patterns = new Set<string>();
    const sections: string[] = [];
    for (const category of category_order) {
      const category_patterns = COMMON_IGNORE_PATTERNS[category].filter(
        pattern => all_patterns.includes(pattern)
      );
      if (category_patterns.length === 0) continue;
      for (const pattern of category_patterns) {
        used_patterns.add(pattern);
      }
      sections.push(`# ${category}`, ...category_patterns, '');
    }
    const framework_specific_map: Record<string, Record<string, string[]>> = {
      vanilla: {},
      vite: {
        vite: ['dist-ssr/', '.vite/']
      },
      react: {
        react: ['storybook-static/']
      },
      nextjs: {
        nextjs: ['.next/', 'out/'],
        vercel: ['.vercel/', '.turbo/']
      },
      vue: {
        vue: ['.vite/']
      },
      nuxt: {
        nuxt: ['.nuxt/', '.output/'],
        deployment: ['.vercel/', '.netlify/']
      },
      svelte: {
        sveltekit: ['.svelte-kit/'],
        deployment: ['.vercel/', '.netlify/'],
        testing: ['test-results/']
      },
      astro: {
        astro: ['.astro/', '_site/'],
        deployment: ['.vercel/', '.netlify/']
      },
      angular: {
        angular: ['.angular/'],
        deployment: ['.vercel/', '.netlify/']
      },
      nestjs: {
        nestjs: ['.nyc_output/', '*.d.ts']
      },
      laravel: {
        laravel: [
          'vendor/',
          'storage/',
          'bootstrap/cache/',
          'public/build/',
          'public/hot'
        ]
      }
    };
    const framework_categories = framework_specific_map[framework_id] || {};
    for (const [category, patterns] of Object.entries(framework_categories)) {
      const category_patterns = patterns.filter(pattern =>
        all_patterns.includes(pattern)
      );
      if (category_patterns.length === 0) continue;
      for (const pattern of category_patterns) {
        used_patterns.add(pattern);
      }
      sections.push(`# ${category}`, ...category_patterns, '');
    }
    if (custom_patterns.length > 0) {
      for (const pattern of custom_patterns) {
        used_patterns.add(pattern);
      }
      sections.push('# custom', ...custom_patterns, '');
    }
    const remaining_patterns = all_patterns
      .filter(
        pattern => !used_patterns.has(pattern) && !pattern.startsWith('#')
      )
      .sort((a, b) => a.localeCompare(b));
    if (remaining_patterns.length > 0) {
      sections.push('# other', ...remaining_patterns, '');
    }
    return sections.join('\n').trim();
  }, [state.ignore_patterns, state.custom_patterns, selected_framework_data]);

  const GenerateGitignore = useCallback((): string => {
    if (!selected_framework_data) return '';
    const gitignore_patterns = selected_framework_data.gitignore;
    const framework_id = selected_framework_data.id;
    const sections: string[] = [];
    const common_category_map: Record<string, string[]> = {
      dependencies: [
        'node_modules/',
        '/vendor/',
        'vendor/',
        'bower_components/'
      ],
      lock_files: [
        '*.lock',
        '*.lockb',
        'package-lock.json',
        'yarn.lock',
        'pnpm-lock.yaml',
        'bun.lock',
        'bun.lockb',
        'composer.lock'
      ],
      build: ['dist/', 'build/', 'out/', 'storybook-static/'],
      cache: ['.cache/', '.npm/'],
      coverage: [
        'coverage/',
        '*.lcov',
        '.nyc_output/',
        'junit.xml',
        '*.junit.xml'
      ],
      environment: [
        '.env',
        '.env.*',
        '.env.backup',
        '.env.production',
        '!.env.example'
      ],
      logs: [
        'logs/',
        '*.log',
        'npm-debug.log*',
        'yarn-debug.log*',
        'yarn-error.log*',
        'lerna-debug.log*'
      ],
      ide: ['.DS_Store', '.idea/', '*.tsbuildinfo', '.eslintcache']
    };
    const framework_specific_map: Record<string, Record<string, string[]>> = {
      vanilla: {
        misc: ['.stylelintcache', '*.tgz']
      },
      vite: {
        vite: ['dist-ssr/', '.vite/', 'temp/', '*.local'],
        vite_cache: [
          'vite.config.js.timestamp-*',
          'vite.config.ts.timestamp-*'
        ],
        misc: ['.stylelintcache', '*.tgz']
      },
      react: {
        react: ['storybook-static/'],
        misc: ['.stylelintcache', '.vscode/', '*.local', '*.tgz']
      },
      nextjs: {
        nextjs: ['.next/', 'out/', '.swc/'],
        vercel: ['.vercel/', '.turbo/'],
        misc: ['.stylelintcache', '*.tgz']
      },
      vue: {
        vue: ['.vite/', 'temp/', '*.local'],
        vite_cache: [
          'vite.config.js.timestamp-*',
          'vite.config.ts.timestamp-*'
        ],
        misc: ['*.tgz']
      },
      nuxt: {
        nuxt: [
          '.nuxt/',
          '.nuxt-*',
          '.output/',
          '.output-*',
          '.data/',
          '.nitro/'
        ],
        deployment: ['.vercel/', '.netlify/'],
        testing: ['test-results/', 'playwright-report/'],
        misc: ['.vscode/', '*.tgz']
      },
      svelte: {
        sveltekit: ['.svelte-kit/'],
        deployment: ['.vercel/', '.netlify/', '.cloudflare/', '.turbo/'],
        testing: ['test-results/', 'playwright-report/'],
        svelte_logs: ['.pnpm-debug.log'],
        vite_cache: [
          'vite.config.js.timestamp-*',
          'vite.config.ts.timestamp-*'
        ],
        misc: ['*.tgz']
      },
      astro: {
        astro: ['.astro/', '_site/'],
        deployment: ['.vercel/', '.netlify/', '.turbo/'],
        testing: ['test-results/', 'playwright-report/'],
        pnpm: ['.pnpm-store/'],
        misc: ['*.env', '*.tgz']
      },
      angular: {
        angular: ['.angular/', 'tmp/'],
        angular_logs: ['.ng-dev.log'],
        husky: ['.husky/_'],
        misc: ['.vscode/', '*.code-workspace', '*.tgz']
      },
      nestjs: {
        misc: ['.vscode/', '*.code-workspace', '*.tgz']
      },
      laravel: {
        laravel: [
          '/public/build/',
          '/public/hot',
          '/public/storage',
          '/storage/*.key',
          '/storage/pail'
        ],
        php_testing: ['/.phpunit.cache', '.phpunit.result.cache'],
        php_tools: ['.phpactor.json', '/auth.json'],
        laravel_ide: ['/.fleet', '/.idea', '/.nova', '/.vscode', '/.zed'],
        misc: ['*.tgz']
      }
    };
    const used_patterns = new Set<string>();
    const common_category_order = [
      'dependencies',
      'lock_files',
      'build',
      'cache',
      'coverage',
      'environment',
      'logs',
      'ide'
    ];
    for (const category of common_category_order) {
      const category_patterns = common_category_map[category].filter(pattern =>
        gitignore_patterns.includes(pattern)
      );
      if (category_patterns.length === 0) continue;
      for (const pattern of category_patterns) {
        used_patterns.add(pattern);
      }
      sections.push(`# ${category}`, ...category_patterns, '');
    }
    const framework_categories = framework_specific_map[framework_id] || {};
    for (const [category, patterns] of Object.entries(framework_categories)) {
      const category_patterns = patterns.filter(pattern =>
        gitignore_patterns.includes(pattern)
      );
      if (category_patterns.length === 0) continue;
      for (const pattern of category_patterns) {
        used_patterns.add(pattern);
      }
      sections.push(`# ${category}`, ...category_patterns, '');
    }
    const remaining_patterns = gitignore_patterns
      .filter(
        pattern => !used_patterns.has(pattern) && !pattern.startsWith('#')
      )
      .sort((a, b) => a.localeCompare(b));
    if (remaining_patterns.length > 0) {
      sections.push('# other', ...remaining_patterns, '');
    }
    return sections.join('\n').trim();
  }, [selected_framework_data]);

  const GenerateOutput = useCallback((): GeneratedOutput => {
    return {
      prettierrc: GeneratePrettierrc(output_format),
      prettierignore: GeneratePrettierignore(),
      gitignore: GenerateGitignore(),
      format_script: selected_framework_data?.format_script || ''
    };
  }, [
    GeneratePrettierrc,
    GeneratePrettierignore,
    GenerateGitignore,
    output_format,
    selected_framework_data
  ]);

  const CopyToClipboard = useCallback(
    async (text: string): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        return false;
      }
    },
    []
  );

  const DownloadFile = useCallback((content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const GenerateInstallCommand = useCallback(
    (package_manager: PackageManager): string => {
      if (!selected_framework_data) {
        return `npm install -D prettier`;
      }
      const all_packages = [
        ...selected_framework_data.install.dependencies,
        ...selected_framework_data.install.dev_dependencies
      ];
      if (all_packages.length === 0) {
        return `npm install -D prettier`;
      }
      switch (package_manager) {
        case 'npm':
          return `npm install -D ${all_packages.join(' ')}`;
        case 'yarn':
          return `yarn add -D ${all_packages.join(' ')}`;
        case 'pnpm':
          return `pnpm add -D ${all_packages.join(' ')}`;
        case 'bun':
          return `bun add -D ${all_packages.join(' ')}`;
        default:
          return `npm install -D ${all_packages.join(' ')}`;
      }
    },
    [selected_framework_data]
  );

  return {
    state,
    output_format,
    selected_framework_data,
    set_output_format,
    SelectFramework,
    UpdatePrettierConfig,
    ToggleIgnorePattern,
    AddCustomPattern,
    RemoveCustomPattern,
    AddCommonPatterns,
    ResetToFrameworkDefaults,
    GenerateOutput,
    GenerateInstallCommand,
    CopyToClipboard,
    DownloadFile
  };
}
