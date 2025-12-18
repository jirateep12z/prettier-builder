import { FrameworkIcon } from '@/components/framework-icons';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FRAMEWORKS } from '@/constants';
import type { FrameworkConfig, FrameworkSelectorProps } from '@/types';
import { Cn } from '@/utils';

export function FrameworkSelector({
  selected_framework,
  OnSelect
}: FrameworkSelectorProps) {
  const GetCategoryColor = (category: FrameworkConfig['category']) => {
    switch (category) {
      case 'frontend':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'backend':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'fullstack':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const GetCategoryLabel = (category: FrameworkConfig['category']) => {
    switch (category) {
      case 'frontend':
        return 'Frontend';
      case 'backend':
        return 'Backend';
      case 'fullstack':
        return 'Full Stack';
      default:
        return category;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">เลือก Framework</h2>
        <p className="text-muted-foreground text-sm">
          {selected_framework
            ? '1 framework selected'
            : 'เลือก framework เพื่อเริ่มต้น'}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {FRAMEWORKS.map(framework => (
          <Card
            key={framework.id}
            className={Cn(
              'hover:border-primary/50 cursor-pointer transition-all hover:shadow-md',
              selected_framework === framework.id &&
                'border-primary bg-primary/5 ring-primary/20 ring-2'
            )}
            onClick={() => OnSelect(framework.id)}
          >
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <FrameworkIcon
                icon_id={framework.icon_id}
                class_name="text-foreground h-8 w-8"
              />
              <div className="space-y-1">
                <h3 className="font-medium">{framework.name}</h3>
                <Badge
                  variant="outline"
                  className={Cn(
                    'text-xs',
                    GetCategoryColor(framework.category)
                  )}
                >
                  {GetCategoryLabel(framework.category)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
