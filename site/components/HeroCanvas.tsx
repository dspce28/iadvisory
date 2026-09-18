'use client';
import { useEffect, useRef } from 'react';

/**
 * Decorative particle network behind the hero.
 *
 * three.js is ~590 KB, so it is never part of the main bundle and never
 * loads on the devices least able to afford it: the import only fires on
 * wide viewports, when motion is welcome, and when the connection is not
 * metered or slow. Everywhere else the page simply renders without it.
 */
export default function HeroCanvas({ variant = 'hero' }: { variant?: 'hero' | 'cta' }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const skip =
      window.matchMedia('(max-width:900px)').matches ||
      window.matchMedia('(prefers-reduced-motion:reduce)').matches ||
      !!nav.connection?.saveData ||
      /2g/.test(nav.connection?.effectiveType ?? '');
    if (skip) return;

    let stop = () => {};
    let cancelled = false;

    const start = async () => {
      const THREE = await import('three');
      if (cancelled) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(variant === 'hero' ? 60 : 55, 1, 0.1, 200);
      camera.position.set(0, 0, variant === 'hero' ? 9 : 7);

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      } catch {
        return; // no WebGL — the page is fine without decoration
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

      const resize = () => {
        const w = canvas.clientWidth || 1;
        const h = canvas.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize, { passive: true });

      const disposables: { dispose(): void }[] = [];
      const COUNT = variant === 'hero' ? 90 : 35;
      const nodeGeo = new THREE.SphereGeometry(0.045, 5, 5);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: 0xc41e3a,
        transparent: true,
        opacity: variant === 'hero' ? 0.28 : 0.16,
      });
      disposables.push(nodeGeo, nodeMat);

      const nodes: import('three').Mesh[] = [];
      for (let i = 0; i < COUNT; i++) {
        const m = new THREE.Mesh(nodeGeo, nodeMat);
        m.position.set(
          (Math.random() - 0.5) * 26,
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 6,
        );
        m.userData.vx = (Math.random() - 0.5) * 0.012;
        m.userData.vy = (Math.random() - 0.5) * 0.012;
        scene.add(m);
        nodes.push(m);
      }

      const MAX_LINKS = COUNT * 6;
      const linePos = new Float32Array(MAX_LINKS * 6);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xc41e3a,
        transparent: true,
        opacity: 0.1,
      });
      disposables.push(lineGeo, lineMat);
      scene.add(new THREE.LineSegments(lineGeo, lineMat));

      let raf = 0;
      let t = 0;
      const MAX_DIST = 4;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        t += 0.01;
        nodes.forEach((m) => {
          m.position.x += m.userData.vx;
          m.position.y += m.userData.vy;
          if (Math.abs(m.position.x) > 13) m.userData.vx *= -1;
          if (Math.abs(m.position.y) > 9) m.userData.vy *= -1;
        });
        let i = 0;
        for (let a = 0; a < nodes.length; a++) {
          for (let b = a + 1; b < nodes.length; b++) {
            if (i + 6 > linePos.length) break;
            if (nodes[a].position.distanceTo(nodes[b].position) < MAX_DIST) {
              linePos[i++] = nodes[a].position.x;
              linePos[i++] = nodes[a].position.y;
              linePos[i++] = nodes[a].position.z;
              linePos[i++] = nodes[b].position.x;
              linePos[i++] = nodes[b].position.y;
              linePos[i++] = nodes[b].position.z;
            }
          }
        }
        while (i < linePos.length) linePos[i++] = 0;
        lineGeo.attributes.position.needsUpdate = true;
        camera.position.x = Math.sin(t * 0.3) * 0.5;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      tick();

      stop = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
      };
    };

    // Wait for the browser to be idle: never compete with first paint.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number };
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1200);

    return () => {
      cancelled = true;
      const c = window as Window & { cancelIdleCallback?: (h: number) => void };
      if (c.cancelIdleCallback) c.cancelIdleCallback(id as number);
      else clearTimeout(id as number);
      stop();
    };
  }, [variant]);

  return <canvas ref={ref} id={`${variant}-canvas`} className="bg-canvas" aria-hidden="true" />;
}
