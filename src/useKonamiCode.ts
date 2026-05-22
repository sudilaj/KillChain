import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
];

export function useKonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      setSequence(prev => {
        const newSequence = [...prev, key];
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }
        
        if (newSequence.join(',') === KONAMI_CODE.join(',')) {
          setUnlocked(true);
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return unlocked;
}
