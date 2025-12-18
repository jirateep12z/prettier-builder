import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { Cn } from '@/utils';
import { BADGE_VARIANTS } from './badge.variants';

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: ComponentProps<'span'> &
  VariantProps<typeof BADGE_VARIANTS> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={Cn(BADGE_VARIANTS({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
