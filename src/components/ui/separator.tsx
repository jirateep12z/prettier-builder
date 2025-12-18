'use client';

import { Root as SeparatorRoot } from '@radix-ui/react-separator';
import type { ComponentProps } from 'react';

import { Cn } from '@/utils';

function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: ComponentProps<typeof SeparatorRoot>) {
  return (
    <SeparatorRoot
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={Cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className
      )}
      {...props}
    />
  );
}

export { Separator };
