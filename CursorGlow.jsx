import { useEffect, useRef } from 'react';

export default function CursorGlow({ reducedMotion }) {
  const ref = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const tick = () => {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx - 200}px, ${cy - 200}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[400px] w-[400px] rounded-full mix-blend-screen"
      style={{
        background:
          'radial-gradient(circle, rgba(255,122,69,0.14) 0%, rgba(242,184,102,0.06) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}
