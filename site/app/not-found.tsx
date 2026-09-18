import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="phero" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <h1>Page <span style={{ color: 'var(--red)' }}>not found</span></h1>
        <p>That page does not exist. It may have moved.</p>
        <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <Link className="btn btn-red btn-lg" href="/">Back to home</Link>
          <Link className="btn btn-ghost btn-lg" href="/loans/">Browse loans</Link>
        </div>
      </div>
    </div>
  );
}
