import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GlitchText } from './Effects';
import { motion } from 'framer-motion';

function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] opacity-80" />
      <div className="scanlines" />
      <div className="text-center relative z-10 z-[100] bg-black p-12 border border-red-900/50">
        <GlitchText text="ERROR 404" className="text-red-600 text-6xl font-bold mb-4" />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-red-800 tracking-widest uppercase text-sm mt-8"
        >
          YOU WERE NOT SUPPOSED TO BE HERE
        </motion.p>
      </div>
    </div>
  );
}

const isNotFound = window.location.pathname !== '/' && window.location.pathname !== '/index.html' && !window.location.pathname.startsWith('/access/');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isNotFound ? <NotFound /> : <App />}
  </StrictMode>,
);

