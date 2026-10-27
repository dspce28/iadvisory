import type { Metadata } from 'next';
import WordSpace from '@/components/WordSpace';

export const metadata: Metadata = {
  title: 'Scene',
  robots: { index: false, follow: false },
};

/** The arrival scene on its own, so it can be judged as a still before any
 *  of the choreography is wired to it. Unlisted and noindex. */
export default function Page() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000' }}>
      <WordSpace />
    </div>
  );
}
