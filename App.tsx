
import React, { useState } from 'react';
import { AppMode, TerminalEntry, ProjectManual } from './types';
import ChatInterface from './components/ChatInterface';
import LiveAssistant from './components/LiveAssistant';
import Dashboard from './components/Dashboard';
import Terminal from './components/Terminal';
import ManualModal from './components/ManualModal';
import BootSequence from './components/BootSequence';
import { PROJECT_MANUALS } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.DASHBOARD);
  const [showLive, setShowLive] = useState(false);
  const [isBooted, setIsBooted] = useState(false);
  const [terminalEntries, setTerminalEntries] = useState<TerminalEntry[]>([]);
  const [activeManual, setActiveManual] = useState<ProjectManual | null>(null);

  const addTerminalEntry = (entry: Omit<TerminalEntry, 'id' | 'timestamp'>) => {
    const newEntry: TerminalEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTerminalEntries(prev => [newEntry, ...prev]);
  };

  const handleSelectProject = (projectId: string) => {
    const manual = PROJECT_MANUALS[projectId];
    if (manual) {
      setActiveManual(manual);
    }
  };

  if (!isBooted) {
    return <BootSequence onComplete={() => setIsBooted(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#010206] text-slate-100 selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-cyan-600/5 blur-[160px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-indigo-600/5 blur-[140px] rounded-full"></div>
      </div>

      <header className="sticky top-0 z-40 p-4 md:p-6 glass-panel border-b border-white/10 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border border-white/20 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-cyan-500/10 animate-pulse"></div>
              <svg className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="font-orbitron text-sm md:text-base font-bold tracking-[0.2em] text-white uppercase">J.A.R.V.I.S.</h1>
              <p className="text-[7px] md:text-[8px] text-white/50 font-orbitron uppercase tracking-[0.4em] hidden xs:block">Neural Lab Arthur Parma</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <button onClick={() => setMode(AppMode.DASHBOARD)} className={`font-orbitron text-[9px] tracking-[0.4em] transition-all px-6 py-2 rounded-full uppercase ${mode === AppMode.DASHBOARD ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-400/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>Oficina</button>
            <button onClick={() => setMode(AppMode.CHAT)} className={`font-orbitron text-[9px] tracking-[0.4em] transition-all px-6 py-2 rounded-full uppercase ${mode === AppMode.CHAT ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-400/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>Comandos</button>
            <button onClick={() => setMode(AppMode.TERMINAL)} className={`font-orbitron text-[9px] tracking-[0.4em] transition-all px-6 py-2 rounded-full uppercase relative ${mode === AppMode.TERMINAL ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-400/40' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              Console
              {terminalEntries.length > 0 && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>}
            </button>
            <button onClick={() => setShowLive(true)} className="px-6 py-2 bg-sky-500 text-black rounded-full font-orbitron text-[9px] hover:bg-cyan-400 transition-all font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              Mãos Livres
            </button>
          </div>
          
          <div className="flex md:hidden items-center gap-3">
             <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 pb-32 md:pb-6 z-10 relative overflow-y-visible">
        {mode === AppMode.DASHBOARD && (
          <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col gap-1 md:gap-2">
              <h2 className="font-orbitron text-3xl md:text-5xl text-white tracking-tighter">Blueprints Ativos 🦾</h2>
              <p className="text-white/60 text-[10px] md:text-xs font-medium uppercase tracking-[0.3em]">Protocolos de montagem em tempo real.</p>
            </div>
            <Dashboard onSelectProject={handleSelectProject} />
          </div>
        )}
        {mode === AppMode.CHAT && (
          <div className="h-[calc(100vh-180px)] md:h-[calc(100vh-220px)] min-h-[500px] animate-in slide-in-from-bottom-4 duration-700">
            <ChatInterface />
          </div>
        )}
        {mode === AppMode.TERMINAL && (
          <div className="h-[calc(100vh-180px)] md:h-[calc(100vh-220px)] min-h-[500px] animate-in slide-in-from-bottom-4 duration-700">
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
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] glass-panel border border-white/20 rounded-full p-2 flex justify-around items-center backdrop-blur-3xl z-50 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]">
         <button onClick={() => setMode(AppMode.DASHBOARD)} className={`p-4 transition-colors ${mode === AppMode.DASHBOARD ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
         </button>
         <button onClick={() => setMode(AppMode.TERMINAL)} className={`p-4 transition-colors ${mode === AppMode.TERMINAL ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
         </button>
         <button onClick={() => setShowLive(true)} className="w-14 h-14 -mt-14 bg-sky-500 rounded-full flex items-center justify-center border-4 border-[#010206] shadow-[0_0_30px_rgba(56,189,248,0.5)] active:scale-90 transition-transform">
            <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
         </button>
         <button onClick={() => setMode(AppMode.CHAT)} className={`p-4 transition-colors ${mode === AppMode.CHAT ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
         </button>
      </nav>
    </div>
  );
};

export default App;
