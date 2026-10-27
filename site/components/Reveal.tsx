'use client';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Marks a block for the scroll reveal that <Motion/> drives.
 *
 * Deliberately not a client-side observer of its own: one observer for the
 * whole document is cheaper than one per block, and it means a reveal works
 * the same whether it was server-rendered or arrived with a route change.
 */
export default function Reveal({
  children,
  dir = 'up',
  delay = 0,
  className = '',
  as: Tag = 'div',
  style,
}: {
  children: ReactNode;
  dir?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'figure';
  style?: CSSProperties;
}) {
  const cls = [
    'reveal',
    dir === 'left' ? 'reveal-x' : dir === 'right' ? 'reveal-xr' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={cls}
      style={delay ? { ...style, transitionDelay: `${delay * 90}ms` } : style}
    >
      {children}
    </Tag>
  );
}
