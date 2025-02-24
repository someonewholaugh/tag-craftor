import { memo } from 'react';
import { icons, type LucideIcon } from 'lucide-react';
import { cn } from '@/utils';
import type { IconProps } from '@/types';

export const Icon = memo(
  ({ name, title, color = 'currentColor', size = 20, className, noHover, onClick }: IconProps) => {
    const LucideIcon = icons[name as keyof typeof icons] as LucideIcon | undefined;

    if (!LucideIcon) {
      console.warn(`Warning: Icon "${name}" not found. Please check the icon name.`);
      return null;
    }

    return (
      <span title={title} onClick={onClick}>
        <LucideIcon
          aria-label={name}
          color={color}
          size={size}
          className={cn(!noHover && 'hover:opacity-60 transition-opacity duration-300', className)}
        />
      </span>
    );
  }
);
