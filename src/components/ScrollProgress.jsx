import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #ff7a45, #f2b866)',
          transition: 'width 0.05s linear',
        }}
      />
    </div>
  );
}
