import type { FrameworkConfig } from '@/types';

export const FRAMEWORKS: FrameworkConfig[] = [
  {
    id: 'vanilla',
    name: 'Vanilla',
    icon_id: 'vanilla',
    description: 'JavaScript/TypeScript แบบไม่ใช้ framework (ทั่วไป)',
    category: 'frontend',
    prettier_config: {
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
      html_whitespace_sensitivity: 'css'
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      'node_modules/',
      'dist/',
      'build/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      '.env',
      '.env.*',
      '!.env.example',
      '.DS_Store',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '*.tsbuildinfo',
      '.npm/',
      '.eslintcache',
      '.stylelintcache',
      '*.tgz'
    ],
    format_script: 'prettier --write "src/**/*.{js,ts,json,css,html}"',
    install: {
      dependencies: [],
      dev_dependencies: ['prettier']
    }
  },
  {
    id: 'vite',
    name: 'Vite',
    icon_id: 'vite',
    description: 'Build tool สำหรับ modern web projects (Vite)',
    category: 'frontend',
    prettier_config: {
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
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'dist-ssr/',
      'build/',
      '.cache/',
      '.vite/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      'node_modules/',
      'dist/',
      'dist-ssr/',
      '.cache/',
      '.vite/',
      'temp/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      '.env',
      '.env.*',
      '!.env.example',
      '.DS_Store',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '*.tsbuildinfo',
      '.npm/',
      '.eslintcache',
      '.stylelintcache',
      '.idea/',
      '*.tgz',
      'vite.config.js.timestamp-*',
      'vite.config.ts.timestamp-*'
    ],
    format_script: 'prettier --write "src/**/*.{js,ts,jsx,tsx,json,css,html}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    }
  },
  {
    id: 'laravel',
    name: 'Laravel',
    icon_id: 'laravel',
    description: 'PHP Framework สำหรับ Web Artisans',
    category: 'backend',
    prettier_config: {
      semi: true,
      single_quote: true,
      tab_width: 4,
      trailing_comma: 'none',
      print_width: 120,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'css',
      plugins: [
        '@prettier/plugin-php',
        'prettier-plugin-blade',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ],
      overrides: [
        {
          files: '*.blade.php',
          options: {
            tab_width: 4
          }
        }
      ]
    },
    prettier_ignore: [
      'vendor/',
      'node_modules/',
      'dist/',
      'build/',
      'storage/',
      'bootstrap/cache/',
      'public/build/',
      'public/hot',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'composer.lock',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      '/vendor/',
      'node_modules/',
      '/public/build/',
      '/public/hot',
      '/public/storage',
      '/storage/*.key',
      '/storage/pail',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'composer.lock',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.env',
      '.env.*',
      '!.env.example',
      '/.phpunit.cache',
      '.phpunit.result.cache',
      'junit.xml',
      '*.junit.xml',
      '.phpactor.json',
      '/auth.json',
      '.DS_Store',
      '/.fleet',
      '/.idea',
      '/.nova',
      '/.vscode',
      '/.zed',
      '*.tgz'
    ],
    format_script:
      'prettier --write "resources/**/*.{js,ts,vue,blade.php,css}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        '@prettier/plugin-php',
        'prettier-plugin-blade',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    }
  },
  {
    id: 'react',
    name: 'React',
    icon_id: 'react',
    description: 'JavaScript library สำหรับ building UIs',
    category: 'frontend',
    prettier_config: {
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
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'build/',
      'storybook-static/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      'node_modules/',
      'dist/',
      'build/',
      'temp/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      'storybook-static/',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      '.env',
      '.env.*',
      '!.env.example',
      '.DS_Store',
      '*.tsbuildinfo',
      '.npm/',
      '.stylelintcache',
      '.eslintcache',
      '.idea/',
      '.vscode/',
      '*.tgz'
    ],
    format_script: 'prettier --write "src/**/*.{js,jsx,ts,tsx,json,css}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    }
  },
  {
    id: 'nextjs',
    name: 'Next',
    icon_id: 'nextjs',
    description: 'React Framework สำหรับ Production',
    category: 'fullstack',
    prettier_config: {
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
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'build/',
      'out/',
      '.next/',
      '.turbo/',
      '.vercel/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      'node_modules/',
      '.next/',
      'out/',
      'dist/',
      'build/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      '.vercel/',
      '.turbo/',
      '.swc/',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      '.env',
      '.env.*',
      '!.env.example',
      '.DS_Store',
      '*.tsbuildinfo',
      '.npm/',
      '.eslintcache',
      '.stylelintcache',
      '*.tgz'
    ],
    format_script:
      'prettier --write "{app,pages,components,lib,src}/**/*.{js,jsx,ts,tsx,json,css,md}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    }
  },
  {
    id: 'vue',
    name: 'Vue',
    icon_id: 'vue',
    description: 'Progressive JavaScript Framework',
    category: 'frontend',
    prettier_config: {
      semi: false,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'none',
      print_width: 100,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'ignore',
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      '.vite/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      'node_modules/',
      'dist/',
      'temp/',
      '.vite/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.env',
      '.env.*',
      '!.env.example',
      '.DS_Store',
      '*.tsbuildinfo',
      '.npm/',
      '.eslintcache',
      '.idea/',
      '*.tgz',
      'vite.config.js.timestamp-*',
      'vite.config.ts.timestamp-*'
    ],
    format_script: 'prettier --write "src/**/*.{js,ts,vue,json,css}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    }
  },
  {
    id: 'nuxt',
    name: 'Nuxt',
    icon_id: 'nuxt',
    description: 'Vue.js Meta Framework',
    category: 'fullstack',
    prettier_config: {
      semi: false,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'none',
      print_width: 100,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'ignore',
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      '.nuxt/',
      '.output/',
      '.vercel/',
      '.netlify/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      'node_modules/',
      '.nuxt/',
      '.nuxt-*',
      '.output/',
      '.output-*',
      'dist/',
      '.data/',
      '.nitro/',
      '.cache/',
      '.vercel/',
      '.netlify/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      'test-results/',
      'playwright-report/',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.env',
      '.env.*',
      '!.env.example',
      '.DS_Store',
      '*.tsbuildinfo',
      '.npm/',
      '.eslintcache',
      '.vscode/',
      '.idea/',
      '*.tgz'
    ],
    format_script:
      'prettier --write "{app,components,composables,layouts,pages,plugins,server}/**/*.{js,ts,vue,json,css}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    }
  },
  {
    id: 'svelte',
    name: 'Svelte',
    icon_id: 'svelte',
    description: 'Cybernetically enhanced web apps',
    category: 'frontend',
    prettier_config: {
      semi: true,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'none',
      print_width: 100,
      use_tabs: true,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'ignore',
      plugins: [
        'prettier-plugin-svelte',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'build/',
      '.svelte-kit/',
      '.vercel/',
      '.netlify/',
      'coverage/',
      'test-results/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      'node_modules/',
      'build/',
      '.svelte-kit/',
      '.vercel/',
      '.netlify/',
      '.cloudflare/',
      '.turbo/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      'test-results/',
      'playwright-report/',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.pnpm-debug.log',
      '.env',
      '.env.*',
      '!.env.example',
      '.DS_Store',
      '*.tsbuildinfo',
      '.npm/',
      '.eslintcache',
      '*.tgz',
      '.idea/',
      'vite.config.js.timestamp-*',
      'vite.config.ts.timestamp-*'
    ],
    format_script: 'prettier --write "src/**/*.{js,ts,svelte,json,css}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-svelte',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    }
  },
  {
    id: 'astro',
    name: 'Astro',
    icon_id: 'astro',
    description: 'Build faster websites',
    category: 'fullstack',
    prettier_config: {
      semi: true,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'none',
      print_width: 100,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'css',
      plugins: [
        'prettier-plugin-astro',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ],
      overrides: [
        {
          files: '*.astro',
          options: {
            // parser จะถูก handle โดย plugin
          }
        }
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      '_site/',
      '.astro/',
      '.vercel/',
      '.netlify/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      'node_modules/',
      'dist/',
      '_site/',
      '.astro/',
      '.vercel/',
      '.netlify/',
      '.turbo/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      'test-results/',
      'playwright-report/',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.env',
      '.env.*',
      '!.env.example',
      '.DS_Store',
      '*.tsbuildinfo',
      '.npm/',
      '.eslintcache',
      '.pnpm-store/',
      '.idea/',
      '*.tgz'
    ],
    format_script: 'prettier --write "src/**/*.{js,ts,astro,json,css,md}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-astro',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    }
  },
  {
    id: 'angular',
    name: 'Angular',
    icon_id: 'angular',
    description: 'Platform สำหรับ building web apps',
    category: 'frontend',
    prettier_config: {
      semi: true,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'none',
      print_width: 140,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'ignore',
      plugins: [
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      '.angular/',
      '.vercel/',
      '.netlify/',
      'coverage/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      'node_modules/',
      'dist/',
      'tmp/',
      '.angular/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.ng-dev.log',
      '.env',
      '.env.*',
      '!.env.example',
      '.DS_Store',
      '*.tsbuildinfo',
      '.npm/',
      '.eslintcache',
      '.husky/_',
      '*.tgz',
      '.idea/',
      '.vscode/',
      '*.code-workspace'
    ],
    format_script: 'prettier --write "src/**/*.{js,ts,html,css,scss}"',
    install: {
      dependencies: [],
      dev_dependencies: [
        'prettier',
        'prettier-plugin-organize-imports',
        'prettier-plugin-tailwindcss'
      ]
    }
  },
  {
    id: 'nestjs',
    name: 'Nest',
    icon_id: 'nestjs',
    description:
      'Progressive Node.js framework for building server-side applications',
    category: 'backend',
    prettier_config: {
      semi: true,
      single_quote: true,
      tab_width: 2,
      trailing_comma: 'all',
      print_width: 100,
      use_tabs: false,
      bracket_spacing: true,
      bracket_same_line: false,
      arrow_parens: 'avoid',
      end_of_line: 'lf',
      prose_wrap: 'preserve',
      html_whitespace_sensitivity: 'css',
      plugins: ['prettier-plugin-organize-imports']
    },
    prettier_ignore: [
      'node_modules/',
      'dist/',
      'coverage/',
      '.nyc_output/',
      '*.d.ts',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      '*.min.js',
      '*.min.css',
      '.env',
      '.env.*'
    ],
    gitignore: [
      'node_modules/',
      'dist/',
      '*.lock',
      '*.lockb',
      'package-lock.json',
      'pnpm-lock.yaml',
      'coverage/',
      '*.lcov',
      '.nyc_output/',
      'junit.xml',
      '*.junit.xml',
      'logs/',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      '.env',
      '.env.*',
      '!.env.example',
      '.DS_Store',
      '*.tsbuildinfo',
      '.npm/',
      '.eslintcache',
      '.idea/',
      '.vscode/',
      '*.code-workspace',
      '*.tgz'
    ],
    format_script: 'prettier --write "{src,test}/**/*.ts"',
    install: {
      dependencies: [],
      dev_dependencies: ['prettier', 'prettier-plugin-organize-imports']
    }
  }
];

export const COMMON_IGNORE_PATTERNS: Record<string, string[]> = {
  dependencies: ['node_modules/', 'vendor/'],
  build: [
    'dist/',
    'build/',
    'out/',
    '.next/',
    '.nuxt/',
    '.output/',
    '.svelte-kit/',
    '.astro/',
    '.angular/'
  ],
  cache: ['.cache/', '.parcel-cache/', '.turbo/', '.vercel/', '.netlify/'],
  coverage: ['coverage/', '.nyc_output/', 'junit.xml', '*.junit.xml'],
  lock_files: [
    '*.lock',
    '*.lockb',
    'package-lock.json',
    'pnpm-lock.yaml',
    'composer.lock'
  ],
  minified: ['*.min.js', '*.min.css', '*.min.html'],
  environment: ['.env', '.env.*'],
  ide: ['.idea/', '.vscode/', '*.swp', '*.swo', '.DS_Store'],
  logs: [
    'logs/',
    '*.log',
    'npm-debug.log*',
    'yarn-debug.log*',
    'yarn-error.log*'
  ]
};

export const PRETTIER_OPTIONS_INFO = {
  semi: {
    label: 'Semicolons',
    description: 'เพิ่ม semicolon ท้ายคำสั่ง'
  },
  single_quote: {
    label: 'Single Quotes',
    description: 'ใช้ single quotes แทน double quotes'
  },
  tab_width: {
    label: 'Tab Width',
    description: 'จำนวน spaces ต่อ indentation level'
  },
  trailing_comma: {
    label: 'Trailing Comma',
    description: 'เพิ่ม trailing commas'
  },
  print_width: {
    label: 'Print Width',
    description: 'ความยาวบรรทัดสูงสุด'
  },
  use_tabs: {
    label: 'Use Tabs',
    description: 'ใช้ tabs แทน spaces สำหรับ indentation'
  },
  bracket_spacing: {
    label: 'Bracket Spacing',
    description: 'เพิ่ม spaces ใน object literals'
  },
  bracket_same_line: {
    label: 'Bracket Same Line',
    description: 'วาง > ของ element ไว้บรรทัดเดียวกัน'
  },
  arrow_parens: {
    label: 'Arrow Parens',
    description: 'วงเล็บรอบ arrow function parameter'
  },
  end_of_line: {
    label: 'End of Line',
    description: 'รูปแบบ line ending'
  },
  prose_wrap: {
    label: 'Prose Wrap',
    description: 'วิธีการ wrap markdown text'
  },
  html_whitespace_sensitivity: {
    label: 'HTML Whitespace',
    description: 'ความไวต่อ whitespace ใน HTML'
  }
};
