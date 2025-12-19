
import React, { useState } from 'react';
import { AppMode, TerminalEntry, BikePartManual } from './types';
import ChatInterface from './components/ChatInterface';
import LiveAssistant from './components/LiveAssistant';
import Dashboard from './components/Dashboard';
import Terminal from './components/Terminal';
import ManualModal from './components/ManualModal';
import { BIKE_MANUALS } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [showLive, setShowLive] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-sky-500/30 overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
      </div>

      <header className="sticky top-0 z-40 p-4 md:p-6 glass-panel border-b border-sky-500/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-sky-500 jarvis-glow flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-sky-500/20 animate-pulse"></div>
              <svg className="w-7 h-7 text-sky-400 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="font-orbitron text-xl font-bold tracking-tighter text-sky-400 uppercase">JARVIS</h1>
              <p className="text-[10px] text-sky-500/60 font-orbitron uppercase tracking-widest">Neural Terminal: Arthur Parma</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setMode(AppMode.DASHBOARD)} className={`font-orbitron text-xs tracking-widest transition-all px-4 py-2 rounded-full ${mode === AppMode.DASHBOARD ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20' : 'text-slate-400 hover:text-sky-300'}`}>OFICINA</button>
            <button onClick={() => setMode(AppMode.CHAT)} className={`font-orbitron text-xs tracking-widest transition-all px-4 py-2 rounded-full ${mode === AppMode.CHAT ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20' : 'text-slate-400 hover:text-sky-300'}`}>COMANDOS</button>
            <button onClick={() => setMode(AppMode.TERMINAL)} className={`font-orbitron text-xs tracking-widest transition-all px-4 py-2 rounded-full relative ${mode === AppMode.TERMINAL ? 'text-sky-400 bg-sky-500/10 border border-sky-500/20' : 'text-slate-400 hover:text-sky-300'}`}>
              CONSOLE
              {terminalEntries.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>}
            </button>
            <button onClick={() => setShowLive(true)} className="px-6 py-2 bg-sky-500 text-white rounded-full font-orbitron text-[10px] hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)]">
              MÃOS LIVRES
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 overflow-y-auto custom-scrollbar z-10 relative">
        {mode === AppMode.DASHBOARD && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
              <h2 className="font-orbitron text-3xl text-white">Fala, Lenda Arthur! 🤜🤛</h2>
              <p className="text-slate-400 text-sm font-medium">Todos os sistemas carregados. Qual peça vamos tunar hoje?</p>
            </div>
            <Dashboard onSelectPart={handleSelectPart} />
          </div>
        )}
        {mode === AppMode.CHAT && (
          <div className="h-[calc(100vh-200px)] animate-in slide-in-from-bottom-4 duration-500">
            <ChatInterface />
          </div>
        )}
        {mode === AppMode.TERMINAL && (
          <div className="h-[calc(100vh-200px)] animate-in slide-in-from-bottom-4 duration-500">
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

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-sky-500/10 p-4 flex justify-around backdrop-blur-xl z-50">
         <button onClick={() => setMode(AppMode.DASHBOARD)} className={mode === AppMode.DASHBOARD ? 'text-sky-400' : 'text-slate-500'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
         </button>
         <button onClick={() => setMode(AppMode.TERMINAL)} className={mode === AppMode.TERMINAL ? 'text-sky-400' : 'text-slate-500'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
         </button>
         <button onClick={() => setShowLive(true)} className="w-14 h-14 -mt-10 bg-sky-600 rounded-full flex items-center justify-center jarvis-glow border-4 border-slate-950 shadow-2xl">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
         </button>
         <button onClick={() => setMode(AppMode.CHAT)} className={mode === AppMode.CHAT ? 'text-sky-400' : 'text-slate-500'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
         </button>
      </nav>
    </div>
  );
};

export default App;
