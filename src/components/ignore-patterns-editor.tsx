import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  COMMON_IGNORE_PATTERNS,
  IGNORE_PATTERNS_CATEGORY_ICONS,
  IGNORE_PATTERNS_CATEGORY_LABELS,
  IGNORE_PATTERNS_CATEGORY_ORDER
} from '@/constants';
import type { CommonIgnoreCategory, IgnorePatternsEditorProps } from '@/types';
import { FileText, FolderSearch, Plus, X } from 'lucide-react';
import { useState } from 'react';

function IsCommonIgnoreCategory(value: string): value is CommonIgnoreCategory {
  return value in COMMON_IGNORE_PATTERNS;
}

export function IgnorePatternsEditor({
  patterns,
  custom_patterns,
  OnToggle,
  OnAddCustom,
  OnRemoveCustom,
  OnAddCommonPatterns
}: IgnorePatternsEditorProps) {
  const [new_pattern, set_new_pattern] = useState('');

  const category_order: CommonIgnoreCategory[] = IGNORE_PATTERNS_CATEGORY_ORDER;

  const selected_patterns = new Set(patterns);
  const custom_pattern_set = new Set(custom_patterns);

  const patterns_by_category = category_order
    .map(category => {
      const category_patterns = COMMON_IGNORE_PATTERNS[category].filter(
        pattern => selected_patterns.has(pattern)
      );

      return {
        category,
        category_patterns
      };
    })
    .filter(item => item.category_patterns.length > 0);

  const framework_specific_patterns = patterns
    .filter(pattern => {
      if (custom_pattern_set.has(pattern)) return false;

      for (const category of category_order) {
        if (COMMON_IGNORE_PATTERNS[category].includes(pattern)) return false;
      }

      return true;
    })
    .sort((a, b) => a.localeCompare(b));

  const HandleAddPattern = () => {
    if (new_pattern.trim()) {
      OnAddCustom(new_pattern.trim());
      set_new_pattern('');
    }
  };

  const HandleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      HandleAddPattern();
    }
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FolderSearch className="h-5 w-5" />
          Ignore Patterns
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Quick Add Categories</Label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(COMMON_IGNORE_PATTERNS)
              .filter(IsCommonIgnoreCategory)
              .map(category => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => OnAddCommonPatterns(category)}
                >
                  {IGNORE_PATTERNS_CATEGORY_ICONS[category]}
                  {IGNORE_PATTERNS_CATEGORY_LABELS[category]}
                </Button>
              ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-3">
          <Label>Add Custom Pattern</Label>
          <div className="flex gap-2">
            <input
              type="text"
              value={new_pattern}
              onChange={e => set_new_pattern(e.target.value)}
              onKeyDown={HandleKeyDown}
              placeholder="e.g., *.log, temp/, .DS_Store"
              className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button onClick={HandleAddPattern} size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
        {custom_patterns.length > 0 && (
          <div className="space-y-2">
            <Label>Custom Patterns</Label>
            <div className="flex flex-wrap gap-2">
              {custom_patterns.map(pattern => (
                <Badge key={pattern} variant="secondary" className="gap-1 pr-1">
                  {pattern}
                  <button
                    onClick={() => OnRemoveCustom(pattern)}
                    className="hover:bg-destructive/20 ml-1 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
        <Separator />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Active Patterns ({patterns.length})</Label>
          </div>
          <div className="max-h-60 space-y-5 overflow-y-auto rounded-lg border p-4">
            {patterns.length === 0 && (
              <p className="text-muted-foreground text-center text-sm">
                No patterns selected. Choose a framework or add custom patterns.
              </p>
            )}
            {patterns_by_category.map(item => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center gap-2">
                  {IGNORE_PATTERNS_CATEGORY_ICONS[item.category]}
                  <span className="text-muted-foreground text-xs font-medium">
                    {IGNORE_PATTERNS_CATEGORY_LABELS[item.category]}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {item.category_patterns.map(pattern => (
                    <div key={pattern} className="flex items-center gap-2">
                      <Checkbox
                        id={pattern}
                        checked={true}
                        onCheckedChange={() => OnToggle(pattern)}
                      />
                      <Label
                        htmlFor={pattern}
                        className="cursor-pointer truncate font-mono text-sm"
                      >
                        {pattern}
                      </Label>
                    </div>
                  ))}
                </div>
                <Separator className="mt-2" />
              </div>
            ))}
            {custom_patterns.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-muted-foreground text-xs font-medium">
                    Custom
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {custom_patterns.map(pattern => (
                    <div key={pattern} className="flex items-center gap-2">
                      <Checkbox
                        id={pattern}
                        checked={true}
                        onCheckedChange={() => OnToggle(pattern)}
                      />
                      <Label
                        htmlFor={pattern}
                        className="cursor-pointer truncate font-mono text-sm"
                      >
                        {pattern}
                      </Label>
                    </div>
                  ))}
                </div>
                <Separator className="mt-2" />
              </div>
            )}
            {framework_specific_patterns.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-muted-foreground text-xs font-medium">
                    Framework Specific
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {framework_specific_patterns.map(pattern => (
                    <div key={pattern} className="flex items-center gap-2">
                      <Checkbox
                        id={pattern}
                        checked={true}
                        onCheckedChange={() => OnToggle(pattern)}
                      />
                      <Label
                        htmlFor={pattern}
                        className="cursor-pointer truncate font-mono text-sm"
                      >
                        {pattern}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
