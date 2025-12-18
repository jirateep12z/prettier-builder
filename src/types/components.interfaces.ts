import type {
  CommonIgnoreCategory,
  OutputFormat,
  PackageManager
} from '@/types';
import type {
  GeneratedOutput,
  PrettierConfigState
} from './builder.interfaces';

export interface PrettierConfigEditorProps {
  config: PrettierConfigState;
  OnUpdate: <K extends keyof PrettierConfigState>(
    key: K,
    value: PrettierConfigState[K]
  ) => void;
}

export interface IgnorePatternsEditorProps {
  patterns: string[];
  custom_patterns: string[];
  OnToggle: (pattern: string) => void;
  OnAddCustom: (pattern: string) => void;
  OnRemoveCustom: (pattern: string) => void;
  OnAddCommonPatterns: (category: CommonIgnoreCategory) => void;
}

export interface OutputPreviewProps {
  output: GeneratedOutput;
  output_format: OutputFormat;
  OnFormatChange: (format: OutputFormat) => void;
  OnCopy: (text: string) => Promise<boolean>;
  OnDownload: (content: string, filename: string) => void;
  GenerateInstallCommand: (package_manager: PackageManager) => string;
}

export interface FrameworkSelectorProps {
  selected_framework: string | null;
  OnSelect: (framework_id: string) => void;
}
