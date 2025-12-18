import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [is_dark, set_is_dark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const ToggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    set_is_dark(!is_dark);
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-8 w-8"
            src="/icons/prettier-builder.png"
            alt="logo"
          />
          <div>
            <h1 className="text-xl font-bold">Prettier Config Builder</h1>
            <p className="text-muted-foreground text-xs">
              Generate .prettierrc & .prettierignore
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={ToggleTheme}>
            {is_dark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
