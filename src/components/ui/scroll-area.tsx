import {
  Corner as ScrollAreaCorner,
  Root as ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Viewport as ScrollAreaViewport
} from '@radix-ui/react-scroll-area';
import type { ComponentProps } from 'react';

import { Cn } from '@/utils';

function ScrollArea({
  className,
  children,
  ...props
}: ComponentProps<typeof ScrollAreaRoot>) {
  return (
    <ScrollAreaRoot
      data-slot="scroll-area"
      className={Cn('relative', className)}
      {...props}
    >
      <ScrollAreaViewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaViewport>
      <ScrollBar />
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: ComponentProps<typeof ScrollAreaScrollbar>) {
  return (
    <ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={Cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent',
        className
      )}
      {...props}
    >
      <ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
