import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Users, Network, ShieldAlert, CheckCircle } from 'lucide-react';
import { VHSOverlay, GlitchText, TypingText } from './components/Effects';
import { NodesBackground } from './components/NodesBackground';
import { TerminalSequence } from './components/TerminalSequence';
import { SecretPage } from './components/SecretPage';
import { GameOver } from './components/GameOver';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useDoubleCtrl } from './hooks/useDoubleCtrl';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'booting' | 'dashboard' | 'headset'>('landing');
  const isKonamiUnlocked = useKonamiCode();
  const isGameOver = useDoubleCtrl();

  const handleEnter = () => {
    setCurrentView('booting');
  };

  const handleBootComplete = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-900 selection:text-white font-mono relative overflow-x-hidden">
      <VHSOverlay />
      <NodesBackground />
      
      {isKonamiUnlocked && <SecretPage />}
      {isGameOver && currentView !== 'landing' && currentView !== 'booting' && <GameOver />}

      <AnimatePresence>
        {currentView === 'booting' && <TerminalSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentView === 'landing' && !isKonamiUnlocked && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="fixed inset-0 flex flex-col items-center justify-center z-40 px-4"
          >
            <div className="absolute top-8 left-8 text-xs text-red-800 tracking-widest opacity-50 flex items-center gap-2">
              <Terminal size={12} /> SYS.READY
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] mb-4 text-white uppercase">
                <GlitchText text="KILLCHAIN" />
              </h1>
              
              <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900 to-transparent my-8 opacity-50" />
              
              <h2 className="text-xl md:text-2xl tracking-widest font-light text-red-600 mb-2">
                <TypingText text="YOU HAVE BEEN SELECTED FOR A BETA TEST" />
              </h2>
              <p className="text-xs md:text-sm tracking-widest text-gray-500 opacity-60 mb-12">
                ONLY A LIMITED NUMBER OF CANDIDATES HAVE BEEN CHOSEN.
              </p>

              <button
                onClick={handleEnter}
                className="relative group px-8 py-4 bg-transparent border border-red-900 hover:border-red-500 transition-colors uppercase tracking-widest text-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-red-900 opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="relative z-10 text-red-500 group-hover:text-red-400 transition-colors">
                  ENTER THE PROGRAM
                </span>
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {currentView === 'dashboard' && !isKonamiUnlocked && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-5xl"
          >
            <Header />
            <div className="h-px w-full bg-red-900/30 my-8" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2 space-y-8">
                <AboutSection />
                <HardwareSection onLinkPress={() => setCurrentView('headset')} />
              </div>
              <div className="space-y-8">
                <DashboardPanel />
                <VerificationForm />
              </div>
            </div>

            <Footer />
          </motion.div>
        )}

        {currentView === 'headset' && !isKonamiUnlocked && (
          <HeadsetPage />
        )}
      </AnimatePresence>
    </div>
  );
}

function HeadsetPage() {
  const [status, setStatus] = useState<'selecting' | 'pairing' | 'connected' | 'static'>('selecting');
  const [selectedHeadset, setSelectedHeadset] = useState('');

  const handleSelect = (headset: string) => {
    setSelectedHeadset(headset);
    setStatus('pairing');
    setTimeout(() => {
      setStatus('connected');
      setTimeout(() => {
        setStatus('static');
      }, 1500);
    }, 2500);
  };

  if (status === 'static') {
    return (
      <motion.div 
        key="static"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 flex flex-wrap opacity-50 mix-blend-screen overflow-hidden">
           {/* Fake static noise using CSS cells */}
           {Array.from({ length: 150 }).map((_, i) => (
             <div 
               key={i} 
               className="w-16 h-16 bg-white mix-blend-overlay"
               style={{
                 opacity: Math.random(),
                 animation: `crtFlicker ${0.05 + Math.random() * 0.1}s infinite steps(2)`
               }}
             />
           ))}
        </div>
        <div className="scanlines z-10 opacity-60" />
        <div className="flicker z-10 opacity-100 animate-pulse" />
        <div className="z-20 text-red-600 font-mono text-2xl md:text-5xl tracking-[0.3em] font-bold">
          <GlitchText text="INITIALIZING NEURAL LINK" />
        </div>
        <div className="z-20 text-xs text-red-900 mt-4 tracking-widest animate-pulse">DO NOT REMOVE HARDWARE</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="headset-select"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-[#050505] flex flex-col items-center justify-center px-4 font-mono text-white"
    >
      <div className="max-w-xl w-full border border-red-900/40 bg-[#0A0A0A]/80 p-8 backdrop-blur-sm">
        {status === 'selecting' && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <h2 className="text-xl text-red-500 uppercase tracking-widest border-b border-red-900/50 pb-4 text-center">
              Select Hardware Protocol
            </h2>
            <div className="grid gap-4">
              {['Oculus / Meta', 'Valve Index', 'HTC Vive', 'Neural Interface (BETA)'].map(h => (
                <button 
                  key={h}
                  onClick={() => handleSelect(h)}
                  className="group relative border border-gray-800 hover:border-red-500 bg-black py-4 text-sm tracking-widest text-gray-400 hover:text-red-400 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-red-900/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  <span className="relative z-10 uppercase">{h}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {status === 'pairing' && (
          <div className="py-12 flex flex-col items-center justify-center gap-6">
            <span className="w-4 h-4 rounded-full bg-yellow-600 animate-pulse" />
            <div className="text-yellow-600 text-sm tracking-widest uppercase animate-pulse">
              Pairing to {selectedHeadset}...
            </div>
            <div className="text-xs text-gray-600 tracking-widest">Establishing secure handshake</div>
          </div>
        )}

        {status === 'connected' && (
          <div className="py-12 flex flex-col items-center justify-center gap-6">
            <CheckCircle size={32} className="text-green-600" />
            <div className="text-green-600 text-sm tracking-widest uppercase">
              Connected: {selectedHeadset}
            </div>
            <div className="text-xs text-green-800 tracking-widest">Calibration sequence starting...</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Header() {
  return (
    <header className="flex justify-between items-end">
      <div>
        <h2 className="text-2xl tracking-[0.2em] font-bold text-white uppercase flex items-center gap-3">
          <ShieldAlert className="text-red-600" size={24} />
          KILLCHAIN
        </h2>
        <p className="text-xs tracking-widest text-red-800 mt-2">SECURE PORTAL VER. 4.9.2</p>
      </div>
      <div className="text-right hidden md:block">
        <div className="text-xs text-red-600 tracking-widest opacity-80 flex items-center justify-end gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          CONNECTION SECURE
        </div>
        <p className="text-[10px] text-gray-600">REQ_ID: KC-{Math.floor(Math.random() * 9000) + 1000}</p>
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <section className="border border-[#1A1A1A] bg-[#0A0A0A]/80 p-6 md:p-8 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-red-900/20 to-transparent" />
      <h3 className="text-red-500 uppercase tracking-widest text-sm mb-4 border-b border-red-900/30 pb-2 inline-block">
        <TypingText text="ABOUT THE INITIATIVE" />
      </h3>
      <div className="space-y-4 text-sm text-gray-400 leading-relaxed font-sans">
        <p>
          KillChain is an experimental adaptive strategy simulation developed by a secretive technology group. It is not designed for entertainment.
        </p>
        <p>
          The system continuously evaluates subjects on decision making, social behavior manipulation patterns, and survival instinct under duress. The AI monitors physiological heuristics (where legal clearance permits) to adapt simulation parameters in real-time.
        </p>
        <p className="text-red-700 font-mono text-xs opacity-80 pt-2 pointer-events-none selection:bg-transparent">
          &gt; ERROR: REDACTED_BLOCK_0x44. The observer effect is heavily pronounced. Do not trust other candidates.
        </p>
      </div>
    </section>
  );
}

function HardwareSection({ onLinkPress }: { onLinkPress: () => void }) {
  return (
    <section className="border border-red-900/40 bg-[#0A0A0A]/80 p-6 md:p-8 backdrop-blur-sm relative">
      <div className="absolute -left-px top-10 bottom-10 w-[2px] bg-red-600/50 blur-sm" />
      
      <div className="flex items-center gap-3 mb-6">
        <Network className="text-red-500" size={20} />
        <h3 className="text-red-500 uppercase tracking-widest text-sm">
          Hardware Interface
        </h3>
      </div>
      
      <p className="text-xs text-gray-400 mb-8 border-l border-red-900/50 pl-4 py-1">
        Immersion protocol requires an external neural or optical hardware device.
      </p>

      <button 
        onClick={onLinkPress}
        className="w-full bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 text-red-500 py-4 text-sm tracking-widest uppercase transition-colors"
      >
        Link Headset
      </button>
    </section>
  );
}

function DashboardPanel() {
  return (
    <div className="border border-[#1A1A1A] bg-[#0A0A0A]/80 p-6 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 to-transparent" />
      <h3 className="text-gray-400 uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
        <Users size={14} /> Subject Status
      </h3>
      
      <div className="space-y-4 mb-8">
        <StatusRow label="ACCESS TIER" value="PROSPECT" color="text-red-500" />
        <StatusRow label="CANDIDATE SCORE" value="UNKNOWN" color="text-gray-500" />
      </div>

      <h4 className="text-gray-500 uppercase tracking-widest text-[10px] mb-3 border-b border-[#1a1a1a] pb-2">Player List</h4>
      <div className="space-y-3">
        <PlayerRow name="Cipher_0x" status="ONLINE" isMe />
        <PlayerRow name="Ghost_Protocol" status="IN SIMULATION" />
        <PlayerRow name="Null_Void" status="OFFLINE" />
        <PlayerRow name="Subject_84" status="UNKNOWN" />
      </div>
    </div>
  );
}

function PlayerRow({ name, status, isMe = false }: { name: string, status: string, isMe?: boolean }) {
  return (
    <div className="flex justify-between items-center text-[10px] tracking-widest">
      <span className={`${isMe ? 'text-red-500' : 'text-gray-400'}`}>{name}{isMe ? ' (YOU)' : ''}</span>
      <span className={status === 'ONLINE' ? 'text-green-600' : status === 'IN SIMULATION' ? 'text-red-600' : 'text-gray-600'}>{status}</span>
    </div>
  );
}

function StatusRow({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="flex justify-between items-center border-b border-[#1A1A1A] pb-2 last:border-0 last:pb-0">
      <span className="text-xs text-gray-600 tracking-widest">{label}</span>
      <span className={`text-xs tracking-widest ${color}`}>{value}</span>
    </div>
  );
}

function VerificationForm() {
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'accepted'>('idle');
  const [formText, setFormText] = useState('LOGIN');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('analyzing');
    setFormText('EVALUATING PATTERNS...');
    
    setTimeout(() => {
      setFormText('AWAITING AUTHORIZATION');
      setTimeout(() => {
        setStatus('accepted');
        setFormText('CANDIDATE ACCEPTED');
      }, 2000);
    }, 1500);
  };

  if (status === 'accepted') {
    return (
      <div className="border border-green-900/50 bg-[#0A0A0A] p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <CheckCircle className="text-green-600 mb-4" size={32} />
        <GlitchText text="VERIFIED" className="text-2xl text-green-500 font-bold tracking-widest mb-2" />
        <p className="text-xs text-green-700 tracking-widest">AWAIT FURTHER INSTRUCTIONS.</p>
      </div>
    );
  }

  return (
    <div className="border border-red-900/30 bg-[#0A0A0A]/80 p-6 relative overflow-hidden block">
      {status === 'analyzing' && (
        <div className="absolute inset-0 bg-red-900/20 backdrop-blur-sm z-10 flex items-center justify-center border border-red-500 animate-pulse">
          <GlitchText text="ANALYZING..." className="text-red-500 text-sm tracking-widest" />
        </div>
      )}
      
      <h3 className="text-white uppercase tracking-widest text-sm mb-6">Login</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-0">
        <label className="block w-full">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">Primary Alias</span>
          <input required type="text" className="fake-input w-full pb-2 text-sm" placeholder="e.g. Cipher_0x" />
        </label>
        
        <label className="block w-full">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">Secure Comms (Email)</span>
          <input required type="email" className="fake-input w-full pb-2 text-sm" placeholder="candidate@domain.com" />
        </label>

        <button 
          type="submit"
          className="w-full bg-red-900/20 border border-red-900 hover:bg-red-900/40 text-red-500 py-3 text-xs tracking-widest uppercase transition-colors"
        >
          {formText}
        </button>
      </form>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-[#1A1A1A] pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-gray-600 gap-4">
      <div className="flex gap-4">
        <span>KILLCHAIN INITIATIVE</span>
        <span className="text-red-900/50">|</span>
        <span>NO EXTERNAL DISTRIBUTION</span>
      </div>
      <div>
        © 2026 OMNICORP SYSTEMS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}

