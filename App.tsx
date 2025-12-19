
import React, { useState } from 'react';
import { AppMode, TerminalEntry, BikePartManual } from './types';
import ChatInterface from './components/ChatInterface';
import LiveAssistant from './components/LiveAssistant';
import Dashboard from './components/Dashboard';
import Terminal from './components/Terminal';
import ManualModal from './components/ManualModal';
import BootSequence from './components/BootSequence';
import { BIKE_MANUALS } from './constants';

const AlienMechaLogo = ({ className = "w-8 h-8" }) => (
  <svg className={`${className} mecha-icon`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4.5 5V9C4.5 13.5 7.5 17.5 12 22C16.5 17.5 19.5 13.5 19.5 9V5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 10L11 12M15 10L13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 15.5C8.5 16.5 10 17.5 12 17.5C14 17.5 15.5 16.5 16 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 2V5M4.5 7L7 8M19.5 7L17 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="0.5" fill="currentColor" className="animate-pulse"/>
  </svg>
);

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [showLive, setShowLive] = useState(false);
  const [isBooted, setIsBooted] = useState(false);
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>([]);
  const [activeManual, setActiveManual] = useState<BikePartManual | null>(null);

  const addTerminalEntry = (entry: Omit<TerminalEntry, 'id' | 'timestamp'>) => {
    const newEntry: TerminalEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTerminalEntries(prev => [newEntry, ...prev]);
  };

  const handleSelectPart = (partId: string) => {
    const manual = BIKE_MANUALS[partId];
    if (manual) {
      setActiveManual(manual);
    }
  };

  if (!isBooted) {
    return <BootSequence onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100 animate-in fade-in duration-1000">
      {/* Background decoration - Fixed so it doesn't scroll */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-sky-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-50"></div>
        <div className="scanline"></div>
      </div>

      <header className="sticky top-0 z-40 p-4 md:p-6 glass-panel border-b border-sky-500/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-sky-500 jarvis-glow flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-sky-500/10 animate-pulse"></div>
              <AlienMechaLogo className="w-7 h-7 text-sky-400 z-10" />
            </div>
            <div>
              <h1 className="font-orbitron text-base md:text-xl font-bold tracking-tighter text-sky-400 uppercase">J.A.R.V.I.S Dell Parma</h1>
              <p className="text-[8px] md:text-[10px] text-sky-500/60 font-orbitron uppercase tracking-widest">Protocolo: Oficina de Grau</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <button onClick={() => setMode(AppMode.DASHBOARD)} className={`font-orbitron text-[10px] tracking-widest transition-all px-4 py-2 rounded-xl ${mode === AppMode.DASHBOARD ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20' : 'text-slate-400 hover:text-sky-300'}`}>OFICINA</button>
            <button onClick={() => setMode(AppMode.CHAT)} className={`font-orbitron text-[10px] tracking-widest transition-all px-4 py-2 rounded-xl ${mode === AppMode.CHAT ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20' : 'text-slate-400 hover:text-sky-300'}`}>COMANDOS</button>
            <button onClick={() => setMode(AppMode.TERMINAL)} className={`font-orbitron text-[10px] tracking-widest transition-all px-4 py-2 rounded-xl relative ${mode === AppMode.TERMINAL ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20' : 'text-slate-400 hover:text-sky-300'}`}>
              CONSOLE
              {terminalEntries.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>}
            </button>
            <button onClick={() => setShowLive(true)} className="px-5 py-2 bg-sky-500 text-white rounded-xl font-orbitron text-[9px] hover:bg-sky-400 transition-all shadow-glow uppercase font-bold">
              MÃOS LIVRES
            </button>
          </div>
          
          <div className="flex md:hidden items-center gap-2">
             <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(56,189,248,1)]"></div>
             <span className="font-orbitron text-[8px] text-sky-400/60 tracking-[0.2em] uppercase">Link Ativo</span>
          </div>
        </div>
      </header>

      {/* Main Content Area - Natural Scroll */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 pb-32 md:pb-16 z-10 relative">
        {mode === AppMode.DASHBOARD && (
          <div className="space-y-8 md:space-y-12 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
              <h2 className="font-orbitron text-3xl md:text-5xl text-white font-bold">E aí, Arthur! 🤜🤛</h2>
              <p className="text-slate-400 text-sm md:text-lg font-medium">Sistemas 100% online. Qual o objetivo de hoje, Mestre?</p>
            </div>
            <Dashboard onSelectPart={handleSelectPart} />
          </div>
        )}
        {mode === AppMode.CHAT && (
          <div className="h-[calc(100vh-220px)] min-h-[500px] animate-in slide-in-from-bottom-4 duration-500">
            <ChatInterface />
          </div>
        )}
        {mode === AppMode.TERMINAL && (
          <div className="h-[calc(100vh-220px)] min-h-[500px] animate-in slide-in-from-bottom-4 duration-500">
            <Terminal entries={terminalEntries} />
          </div>
        )}
      </main>

      {showLive && (
        <LiveAssistant 
          onClose={() => setShowLive(false)} 
          onNewData={(entry) => addTerminalEntry(entry)}
        />
      )}
      
      {activeManual && (
        <ManualModal 
          manual={activeManual} 
          onClose={() => setActiveManual(null)} 
        />
      )}

      {/* Mobile Navigation - Fixed Bottom */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] glass-panel border border-sky-500/20 rounded-2xl p-2 flex justify-around items-center backdrop-blur-3xl z-50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
         <button onClick={() => setMode(AppMode.DASHBOARD)} className={`p-4 transition-all ${mode === AppMode.DASHBOARD ? 'text-sky-400 bg-sky-500/10 rounded-xl' : 'text-slate-500'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
         </button>
         <button onClick={() => setMode(AppMode.TERMINAL)} className={`p-4 transition-all ${mode === AppMode.TERMINAL ? 'text-sky-400 bg-sky-500/10 rounded-xl' : 'text-slate-500'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
         </button>
         <button onClick={() => setShowLive(true)} className="w-16 h-16 -mt-14 bg-sky-600 rounded-2xl flex items-center justify-center jarvis-glow border-4 border-[#020617] shadow-sky-500/50 active:scale-90 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
         </button>
         <button onClick={() => setMode(AppMode.CHAT)} className={`p-4 transition-all ${mode === AppMode.CHAT ? 'text-sky-400 bg-sky-500/10 rounded-xl' : 'text-slate-500'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
         </button>
      </nav>
    </div>
  );
};

export default App;
