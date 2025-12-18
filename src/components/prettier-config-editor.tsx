import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PRETTIER_OPTIONS_INFO } from '@/constants';
import type { PrettierConfigEditorProps } from '@/types';

export function PrettierConfigEditor({
  config,
  OnUpdate
}: PrettierConfigEditorProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span>⚙️</span>
          Prettier Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="semi">{PRETTIER_OPTIONS_INFO.semi.label}</Label>
              <p className="text-muted-foreground text-xs">
                {PRETTIER_OPTIONS_INFO.semi.description}
              </p>
            </div>
            <Switch
              id="semi"
              checked={config.semi}
              onCheckedChange={checked => OnUpdate('semi', checked)}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="single_quote">
                {PRETTIER_OPTIONS_INFO.single_quote.label}
              </Label>
              <p className="text-muted-foreground text-xs">
                {PRETTIER_OPTIONS_INFO.single_quote.description}
              </p>
            </div>
            <Switch
              id="single_quote"
              checked={config.single_quote}
              onCheckedChange={checked => OnUpdate('single_quote', checked)}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="use_tabs">
                {PRETTIER_OPTIONS_INFO.use_tabs.label}
              </Label>
              <p className="text-muted-foreground text-xs">
                {PRETTIER_OPTIONS_INFO.use_tabs.description}
              </p>
            </div>
            <Switch
              id="use_tabs"
              checked={config.use_tabs}
              onCheckedChange={checked => OnUpdate('use_tabs', checked)}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="bracket_spacing">
                {PRETTIER_OPTIONS_INFO.bracket_spacing.label}
              </Label>
              <p className="text-muted-foreground text-xs">
                {PRETTIER_OPTIONS_INFO.bracket_spacing.description}
              </p>
            </div>
            <Switch
              id="bracket_spacing"
              checked={config.bracket_spacing}
              onCheckedChange={checked => OnUpdate('bracket_spacing', checked)}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="bracket_same_line">
                {PRETTIER_OPTIONS_INFO.bracket_same_line.label}
              </Label>
              <p className="text-muted-foreground text-xs">
                {PRETTIER_OPTIONS_INFO.bracket_same_line.description}
              </p>
            </div>
            <Switch
              id="bracket_same_line"
              checked={config.bracket_same_line}
              onCheckedChange={checked =>
                OnUpdate('bracket_same_line', checked)
              }
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.tab_width.label}</Label>
            <Select
              value={config.tab_width.toString()}
              onValueChange={value => OnUpdate('tab_width', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 spaces</SelectItem>
                <SelectItem value="4">4 spaces</SelectItem>
                <SelectItem value="8">8 spaces</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.print_width.label}</Label>
            <Select
              value={config.print_width.toString()}
              onValueChange={value => OnUpdate('print_width', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="80">80 characters</SelectItem>
                <SelectItem value="100">100 characters</SelectItem>
                <SelectItem value="120">120 characters</SelectItem>
                <SelectItem value="140">140 characters</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.trailing_comma.label}</Label>
            <Select
              value={config.trailing_comma}
              onValueChange={(value: 'none' | 'es5' | 'all') =>
                OnUpdate('trailing_comma', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="es5">ES5</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.arrow_parens.label}</Label>
            <Select
              value={config.arrow_parens}
              onValueChange={(value: 'always' | 'avoid') =>
                OnUpdate('arrow_parens', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="always">Always</SelectItem>
                <SelectItem value="avoid">Avoid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{PRETTIER_OPTIONS_INFO.end_of_line.label}</Label>
            <Select
              value={config.end_of_line}
              onValueChange={(value: 'lf' | 'crlf' | 'cr' | 'auto') =>
                OnUpdate('end_of_line', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lf">LF (Unix)</SelectItem>
                <SelectItem value="crlf">CRLF (Windows)</SelectItem>
                <SelectItem value="cr">CR</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>
              {PRETTIER_OPTIONS_INFO.html_whitespace_sensitivity.label}
            </Label>
            <Select
              value={config.html_whitespace_sensitivity}
              onValueChange={(value: 'css' | 'strict' | 'ignore') =>
                OnUpdate('html_whitespace_sensitivity', value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="strict">Strict</SelectItem>
                <SelectItem value="ignore">Ignore</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {config.plugins.length > 0 && (
          <div className="space-y-2">
            <Label>Plugins</Label>
            <div className="flex flex-wrap gap-2">
              {config.plugins.map(plugin => (
                <Badge key={plugin} variant="secondary">
                  {plugin}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
