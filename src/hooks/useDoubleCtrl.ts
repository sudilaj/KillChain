import { useEffect, useState } from 'react';

export function useDoubleCtrl() {
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    let lastCtrlPress = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        const now = Date.now();
        if (now - lastCtrlPress < 500) {
          setIsGameOver(true);
        }
        lastCtrlPress = now;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return isGameOver;
}
