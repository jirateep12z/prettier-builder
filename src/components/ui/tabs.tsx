'use client';

import {
  Content as TabsContent_,
  List as TabsList_,
  Root as TabsRoot,
  Trigger as TabsTrigger_
} from '@radix-ui/react-tabs';
import type { ComponentProps } from 'react';

import { Cn } from '@/utils';

function Tabs({ className, ...props }: ComponentProps<typeof TabsRoot>) {
  return (
    <TabsRoot
      data-slot="tabs"
      className={Cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: ComponentProps<typeof TabsList_>) {
  return (
    <TabsList_
      data-slot="tabs-list"
      className={Cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsTrigger_>) {
  return (
    <TabsTrigger_
      data-slot="tabs-trigger"
      className={Cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsContent_>) {
  return (
    <TabsContent_
      data-slot="tabs-content"
      className={Cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
