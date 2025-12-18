import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { OutputFormat, OutputPreviewProps, PackageManager } from '@/types';
import { Check, Copy, Download, Terminal } from 'lucide-react';
import { useState } from 'react';

export function OutputPreview({
  output,
  output_format,
  OnFormatChange,
  OnCopy,
  OnDownload,
  GenerateInstallCommand
}: OutputPreviewProps) {
  const [copied_prettierrc, set_copied_prettierrc] = useState(false);
  const [copied_prettierignore, set_copied_prettierignore] = useState(false);
  const [copied_gitignore, set_copied_gitignore] = useState(false);
  const [copied_format_script, set_copied_format_script] = useState(false);
  const [copied_install, set_copied_install] = useState(false);
  const [package_manager, set_package_manager] =
    useState<PackageManager>('npm');

  const HandleCopyPrettierrc = async () => {
    const success = await OnCopy(output.prettierrc);
    if (success) {
      set_copied_prettierrc(true);
      setTimeout(() => set_copied_prettierrc(false), 2000);
    }
  };

  const HandleCopyPrettierignore = async () => {
    const success = await OnCopy(output.prettierignore);
    if (success) {
      set_copied_prettierignore(true);
      setTimeout(() => set_copied_prettierignore(false), 2000);
    }
  };

  const HandleCopyInstall = async () => {
    const success = await OnCopy(GenerateInstallCommand(package_manager));
    if (success) {
      set_copied_install(true);
      setTimeout(() => set_copied_install(false), 2000);
    }
  };

  const HandleCopyGitignore = async () => {
    const success = await OnCopy(output.gitignore);
    if (success) {
      set_copied_gitignore(true);
      setTimeout(() => set_copied_gitignore(false), 2000);
    }
  };

  const HandleCopyFormatScript = async () => {
    const success = await OnCopy(output.format_script);
    if (success) {
      set_copied_format_script(true);
      setTimeout(() => set_copied_format_script(false), 2000);
    }
  };

  const GetPrettierrcFilename = () => {
    switch (output_format) {
      case 'json':
        return '.prettierrc';
      case 'yaml':
        return '.prettierrc.yaml';
      case 'js':
        return '.prettierrc.js';
      default:
        return '.prettierrc';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span>📄</span>
            Generated Files
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Format:</span>
            <Select
              value={output_format}
              onValueChange={(value: OutputFormat) => OnFormatChange(value)}
            >
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="yaml">YAML</SelectItem>
                <SelectItem value="js">JS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="install" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="install" className="gap-1.5">
              <Terminal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Install</span>
            </TabsTrigger>
            <TabsTrigger value="prettierrc" className="gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {GetPrettierrcFilename()}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="prettierignore" className="gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                .prettierignore
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="gitignore" className="gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                .gitignore
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="format" className="gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                format
              </Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="install" className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Select
                value={package_manager}
                onValueChange={(value: PackageManager) =>
                  set_package_manager(value)
                }
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="npm">npm</SelectItem>
                  <SelectItem value="yarn">yarn</SelectItem>
                  <SelectItem value="pnpm">pnpm</SelectItem>
                  <SelectItem value="bun">bun</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={HandleCopyInstall}
              >
                {copied_install ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied_install ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted overflow-auto rounded-lg p-4 font-mono text-sm">
              <code>{GenerateInstallCommand(package_manager)}</code>
            </pre>
            <p className="text-muted-foreground text-xs">
              รันคำสั่งนี้ใน terminal เพื่อติดตั้ง Prettier และ plugins
              ที่จำเป็น
            </p>
          </TabsContent>
          <TabsContent value="prettierrc" className="mt-4 space-y-3">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={HandleCopyPrettierrc}
              >
                {copied_prettierrc ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied_prettierrc ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() =>
                  OnDownload(output.prettierrc, GetPrettierrcFilename())
                }
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <pre className="bg-muted max-h-80 overflow-auto rounded-lg p-4 font-mono text-sm">
              <code>
                {output.prettierrc ||
                  '// Select a framework to generate configuration'}
              </code>
            </pre>
          </TabsContent>
          <TabsContent value="prettierignore" className="mt-4 space-y-3">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={HandleCopyPrettierignore}
              >
                {copied_prettierignore ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied_prettierignore ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() =>
                  OnDownload(output.prettierignore, '.prettierignore')
                }
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <pre className="bg-muted max-h-80 overflow-auto rounded-lg p-4 font-mono text-sm">
              <code>
                {output.prettierignore ||
                  '# Select a framework to generate ignore patterns'}
              </code>
            </pre>
          </TabsContent>
          <TabsContent value="gitignore" className="mt-4 space-y-3">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={HandleCopyGitignore}
              >
                {copied_gitignore ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied_gitignore ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => OnDownload(output.gitignore, '.gitignore')}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>
            <pre className="bg-muted max-h-80 overflow-auto rounded-lg p-4 font-mono text-sm">
              <code>
                {output.gitignore ||
                  '# Select a framework to generate gitignore'}
              </code>
            </pre>
          </TabsContent>
          <TabsContent value="format" className="mt-4 space-y-3">
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={HandleCopyFormatScript}
              >
                {copied_format_script ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied_format_script ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <pre className="bg-muted overflow-auto rounded-lg p-4 font-mono text-sm">
              <code>
                {output.format_script ||
                  '// Select a framework to generate format script'}
              </code>
            </pre>
            <p className="text-muted-foreground text-xs">
              เพิ่ม script นี้ใน package.json เพื่อ format โค้ดด้วย Prettier
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
