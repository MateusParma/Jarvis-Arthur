
import React, { useState, useMemo } from 'react';
import { playBootSfx, playJarvisWelcome } from '../services/audioService';

interface BootSequenceProps {
  onComplete: () => void;
}

const FuturisticAlienMecha = ({ className = "w-full h-full" }) => (
  <svg className={`${className} animate-pulse`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4.5 5.5V11C4.5 15.1421 7.85786 18.5 12 18.5C16.1421 18.5 19.5 15.1421 19.5 11V5.5L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10L10 12.5M17 10L14 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 16L12 17L14 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    <path d="M9 7L12 8.5L15 7" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round"/>
    <path d="M12 18.5V22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2"/>
    <rect x="11.5" y="12" width="1" height="1" fill="currentColor" className="animate-ping"/>
  </svg>
);

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'IDLE' | 'BOOTING' | 'COMPLETE'>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const systemLogs = useMemo(() => {
    const hasVisited = localStorage.getItem('jarvis_visited');
    const welcomeLog = hasVisited 
      ? "BEM-VINDO DE VOLTA, ARTHUR." 
      : "BEM-VINDO AO FUTURO, ARTHUR.";
    
    return [
      "RECONHECIMENTO BIOMÉTRICO: ARTHUR",
      "AUTENTICANDO CREDENCIAIS J.A.R.V.I.S.",
      "INTERFACE MECHA-ALIEN: ONLINE",
      "CARREGANDO MÓDULOS DE OFICINA...",
      "CONECTANDO À NEURAL LINK GOOGLE...",
      "SINCRONIZANDO MAPAS DE MANOBRAS...",
      "ESTABELECENDO CONEXÃO DE VOZ...",
      "STATUS: TODOS OS SISTEMAS NOMINAIS.",
      welcomeLog
    ];
  }, []);

  const startBoot = async () => {
    playBootSfx();
    playJarvisWelcome();
    
    setStage('BOOTING');
    
    systemLogs.forEach((log, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `> ${log}`]);
        setProgress(((i + 1) / systemLogs.length) * 100);
      }, i * 450);
    });

    setTimeout(() => {
      setStage('COMPLETE');
      setTimeout(onComplete, 1200);
    }, systemLogs.length * 450 + 600);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center overflow-y-auto">
      <div className="w-full min-h-full flex flex-col items-center justify-center p-6 md:p-12 relative">
        {stage === 'IDLE' ? (
          <div className="flex flex-col items-center justify-center w-full max-w-md animate-in fade-in zoom-in duration-1000 py-10">
            <div className="text-center mb-16">
              <h2 className="font-orbitron text-sky-500/40 text-[9px] md:text-[10px] tracking-[0.8em] uppercase mb-4">Dell Parma Systems</h2>
              <div className="text-sky-100 font-orbitron text-3xl md:text-5xl tracking-tighter font-bold drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">J.A.R.V.I.S.</div>
              <div className="text-sky-400/60 font-orbitron text-[8px] md:text-[9px] mt-2 tracking-[0.2em] uppercase">Advanced Neural Interface</div>
            </div>

            <button 
              onClick={startBoot}
              className="group relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center transition-all active:scale-95"
            >
              {/* Anéis de Design Futurista */}
              <div className="absolute inset-0 border border-sky-500/10 rounded-full"></div>
              <div className="absolute inset-8 border-2 border-sky-400/20 border-t-transparent border-b-transparent rounded-full animate-[spin_8s_linear_infinite]"></div>
              <div className="absolute inset-16 border border-dashed border-sky-300/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              
              {/* Logo Central Alien Mecha */}
              <div className="w-48 h-48 md:w-56 md:h-56 bg-sky-950/40 rounded-3xl border-2 border-sky-500/30 flex items-center justify-center relative overflow-hidden shadow-[0_0_60px_rgba(56,189,248,0.2)] group-hover:border-sky-300 transition-all duration-700">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-sky-300 shadow-[0_0_15px_rgba(56,189,248,1)] z-20 animate-[scan_2.5s_linear_infinite]"></div>
                  
                  <div className="w-32 h-32 md:w-40 md:h-40 text-sky-400 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                    <FuturisticAlienMecha />
                  </div>

                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:10px_10px]"></div>
              </div>

              {/* Brilho de Fundo */}
              <div className="absolute inset-0 rounded-full bg-sky-500/5 blur-[100px] group-hover:bg-sky-500/10 transition-all animate-pulse"></div>
            </button>

            <div className="mt-16 flex flex-col items-center gap-4">
              <span className="font-orbitron text-sky-400 text-[10px] md:text-[11px] tracking-[0.5em] animate-pulse uppercase">Iniciar Sequência de Boot</span>
              <div className="w-20 h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-sky-500 animate-[loading_1s_infinite]"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg flex flex-col items-center justify-center animate-in fade-in duration-500 py-10">
            {/* Núcleo de Processamento */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 mb-16 md:mb-20">
              <div className="absolute inset-0 border-4 border-sky-500/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-32 h-32 md:w-36 md:h-36 rounded-2xl rotate-45 transition-all duration-1000 ${progress === 100 ? 'bg-sky-400 shadow-[0_0_150px_rgba(56,189,248,1)]' : 'bg-sky-900/30 shadow-[0_0_50px_rgba(56,189,248,0.2)]'} flex items-center justify-center`}>
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white/20 animate-ping -rotate-45"></div>
                  </div>
              </div>
            </div>

            <div className="w-full space-y-10">
              <div className="flex justify-between items-end font-orbitron">
                <div className="max-w-[70%]">
                  <div className="text-sky-500/40 text-[8px] md:text-[9px] tracking-[0.5em] mb-1 uppercase">Sincronizando Módulos Arthur</div>
                  <div className="text-sky-400 text-lg md:text-xl font-bold tracking-widest uppercase">BOOTING J.A.R.V.I.S.</div>
                </div>
                <div className="text-sky-400 text-3xl md:text-5xl font-bold tabular-nums">{Math.floor(progress)}%</div>
              </div>
              
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-sky-500 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(56,189,248,1)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="h-48 w-full overflow-hidden font-mono bg-sky-950/20 p-5 rounded-3xl border border-sky-500/10 flex flex-col-reverse text-[10px] md:text-xs">
                <div className="space-y-2">
                  {logs.slice().reverse().map((log, i) => (
                    <div key={i} className="text-sky-400/80 flex items-center gap-3">
                      <span className="text-sky-500/30 tabular-nums">0{i}:</span>
                      <span className="animate-in slide-in-from-left-4 duration-500">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          15%, 85% { opacity: 1; }
          50% { top: 100%; }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default BootSequence;
