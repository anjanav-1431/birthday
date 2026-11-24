import { motion } from 'framer-motion';
import { finalVideo } from '../config/content';

export default function FinalVideoScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[96] bg-[var(--c-void)]"
    >
      <video
        src={finalVideo.src}
        autoPlay
        playsInline
        loop
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
    </motion.div>
  );
}
