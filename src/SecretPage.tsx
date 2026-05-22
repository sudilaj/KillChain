import { motion } from 'framer-motion';
import { GlitchText } from './Effects';

export function SecretPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-black text-red-600 font-mono p-8 flex flex-col items-center justify-center"
    >
      <div className="max-w-2xl text-center space-y-6">
        <GlitchText text="ADMINISTRATOR ACCESS GRANTED" className="text-2xl md:text-4xl mb-8 border-b border-red-900 pb-4" />
        
        <div className="text-left space-y-4 text-sm opacity-80">
          <p>LOG ENTRY: 9482.A</p>
          <p>We assume they do not know.</p>
          <p>The beta is not a game. It is a filtration mechanism.</p>
          <p>Candidate behavioral patterns are being fed directly into the core.</p>
          <p>If you are reading this: abort the sequence. Do not let them harvest your choices.</p>
        </div>

        <div className="mt-12 text-xs opacity-50 border border-red-900/30 p-4 inline-block">
          ENCRYPTED PAYLOAD: 0x8F92A1...
        </div>
      </div>
      
      <div className="absolute top-4 right-4 text-xs opacity-30 animate-pulse">
        LAT: 47.6062 N | LON: 122.3321 W
      </div>
    </motion.div>
  );
}
