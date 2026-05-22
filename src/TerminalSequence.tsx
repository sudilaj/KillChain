import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BOOT_SEQUENCE = [
  "KILLCHAIN OS v1.0.4 [BUILD 8921]",
  "ESTABLISHING SECURE CONNECTION...",
  "HANDSHAKE PROTOCOL: ACCEPTED.",
  "BYPASSING FIREWALL... SUCCESS.",
  "ANALYZING CANDIDATE FINGERPRINT...",
  "MATCH FOUND.",
  "AUTHORIZING ACCESS...",
  "WELCOME TO THE INITIATIVE."
];

export function TerminalSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, BOOT_SEQUENCE[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 400);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#050505] text-red-600 font-mono p-8 flex flex-col justify-end pb-24"
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-2 uppercase text-sm md:text-base tracking-widest"
        >
          &gt; {line}
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="w-3 h-5 bg-red-600 mt-2"
      />
    </motion.div>
  );
}
