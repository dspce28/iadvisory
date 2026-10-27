import type { Metadata } from 'next';
import HeroLab from '@/components/HeroLab';

export const metadata: Metadata = {
  title: 'Hero field — options',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HeroLab />;
}
