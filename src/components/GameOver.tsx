import { motion } from 'framer-motion';
import { GlitchText } from './Effects';

export function GameOver() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center font-mono overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(210,0,0,0.15)_100%)] pointer-events-none" />
      <div className="scanlines z-10 opacity-70" />
      <div className="flicker z-10 opacity-100" />
      
      <div className="z-20 text-center flex flex-col items-center justify-center space-y-12">
        <GlitchText 
          text="GAME OVER" 
          className="text-6xl md:text-9xl font-bold text-red-600 tracking-[0.2em]" 
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <GlitchText 
            text="LOOKING FOR NEW PLAYER" 
            className="text-2xl md:text-5xl font-bold text-red-500 tracking-[0.3em] animate-pulse" 
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
