
import React, { useState } from 'react';
import { playBootSfx, playJarvisWelcome } from '../services/audioService';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'IDLE' | 'BOOTING' | 'COMPLETE'>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const systemLogs = [
    "RECONHECIMENTO BIOMÉTRICO: ARTHUR PARMA",
    "AUTENTICANDO CREDENCIAIS J.A.R.V.I.S.",
    "BYPASSING ENCRYPTION: 2048-BIT SSL",
    "CARREGANDO MÓDULOS DE OFICINA...",
    "CONECTANDO À NEURAL LINK GOOGLE...",
    "SINCRONIZANDO MAPAS DE MANOBRAS...",
    "STATUS: TODOS OS SISTEMAS NOMINAIS.",
    "BEM-VINDO DE VOLTA, SENHOR."
  ];

  const startBoot = async () => {
    // IMPORTANTE: Tocar o áudio imediatamente no clique para o mobile autorizar
    playBootSfx();
    playJarvisWelcome();
    
    setStage('BOOTING');
    
    systemLogs.forEach((log, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `> ${log}`]);
        setProgress(((i + 1) / systemLogs.length) * 100);
      }, i * 500);
    });

    setTimeout(() => {
      setStage('COMPLETE');
      setTimeout(onComplete, 1000);
    }, systemLogs.length * 500 + 500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex items-center justify-center overflow-y-auto overflow-x-hidden">
      <div className="scanline opacity-10 pointer-events-none"></div>
      
      <div className="w-full min-h-full flex flex-col items-center justify-center p-6 md:p-12">
        {stage === 'IDLE' ? (
          <div className="flex flex-col items-center justify-center w-full max-w-md animate-in fade-in zoom-in duration-1000 py-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-orbitron text-sky-500/40 text-[9px] md:text-[10px] tracking-[0.8em] uppercase mb-4">Security Protocol</h2>
              <div className="text-sky-100 font-orbitron text-3xl md:text-5xl tracking-tighter font-bold drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]">J.A.R.V.I.S.</div>
              <div className="text-sky-400/60 font-orbitron text-[8px] md:text-[9px] mt-2 tracking-[0.2em]">ARTHUR PARMA EDITION</div>
            </div>

            <button 
              onClick={startBoot}
              className="group relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transition-transform active:scale-95"
            >
              {/* Anéis Estilo Stark */}
              <div className="absolute inset-0 border-[1px] border-sky-500/10 rounded-full"></div>
              <div className="absolute inset-4 border-[2px] border-sky-400/20 border-t-transparent border-b-transparent rounded-full animate-[spin_6s_linear_infinite]"></div>
              
              {/* Scanner Biométrico - Digital Realista */}
              <div className="w-44 h-44 md:w-52 md:h-52 bg-sky-950/40 rounded-full border-2 border-sky-500/40 flex items-center justify-center relative overflow-hidden shadow-[0_0_60px_rgba(56,189,248,0.2)] group-hover:border-sky-300 transition-all duration-500">
                  {/* Laser de Varredura */}
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-sky-300 shadow-[0_0_20px_rgba(56,189,248,1)] z-20 animate-[scan_2s_linear_infinite]"></div>
                  
                  {/* Ícone de Impressão Digital (Humano Realista) */}
                  <svg className="w-28 h-28 md:w-36 md:h-36 text-sky-400 opacity-80 group-hover:opacity-100 transition-all duration-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 12.5523 2.44772 13 3 13C3.55228 13 4 12.5523 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C10.1585 20 8.48152 19.3755 7.15195 18.324C6.71328 17.9771 6.08271 18.0469 5.7358 18.4856C5.3889 18.9242 5.45869 19.5548 5.89736 19.9017C7.57551 21.229 9.69741 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" />
                    <path d="M12 6C8.68629 6 6 8.68629 6 12C6 12.5523 6.44772 13 7 13C7.55228 13 8 12.5523 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z" />
                    <path d="M12 10C10.8954 10 10 10.8954 10 12C10 12.5523 10.4477 13 11 13C11.5523 13 12 12.5523 12 12C12 11.4477 12.4477 11 13 11C13.5523 11 14 11.4477 14 12C14 13.1046 13.1046 14 12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8" />
                  </svg>

                  {/* Grid Digital */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:12px_12px]"></div>
              </div>

              {/* Brilho Externo Ativo */}
              <div className="absolute inset-0 rounded-full bg-sky-500/5 blur-[80px] group-hover:bg-sky-500/15 transition-all duration-700 animate-pulse"></div>
            </button>

            <div className="mt-12 md:mt-16 flex flex-col items-center gap-4">
              <span className="font-orbitron text-sky-400 text-[10px] md:text-[11px] tracking-[0.6em] animate-pulse uppercase">Autenticação Biométrica</span>
              <div className="w-16 h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-sky-500 animate-[loading_1.5s_infinite]"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg flex flex-col items-center justify-center animate-in fade-in duration-500 py-10">
            {/* Arc Reactor Core */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 mb-16 md:mb-20">
              <div className="absolute inset-0 border-2 border-sky-500/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-32 h-32 md:w-36 md:h-36 rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-sky-400 shadow-[0_0_150px_rgba(56,189,248,1)]' : 'bg-sky-900/30 shadow-[0_0_50px_rgba(56,189,248,0.2)]'} flex items-center justify-center`}>
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/10 animate-pulse"></div>
                  </div>
              </div>
            </div>

            <div className="w-full space-y-8 md:space-y-12">
              <div className="flex justify-between items-end font-orbitron">
                <div>
                  <div className="text-sky-500/40 text-[8px] md:text-[9px] tracking-[0.5em] mb-1 uppercase">Protocol Override</div>
                  <div className="text-sky-400 text-lg md:text-xl font-bold tracking-widest">BOOTING J.A.R.V.I.S.</div>
                </div>
                <div className="text-sky-400 text-3xl md:text-5xl font-bold">{Math.floor(progress)}%</div>
              </div>
              
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-sky-500 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(56,189,248,1)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="h-44 md:h-52 overflow-hidden font-mono bg-sky-950/20 p-5 rounded-2xl border border-sky-500/10 flex flex-col-reverse text-[10px] md:text-xs">
                <div className="space-y-1.5">
                  {logs.slice().reverse().map((log, i) => (
                    <div key={i} className="text-sky-400/80 flex items-center gap-3">
                      <span className="text-sky-500/20 tabular-nums">[{new Date().getSeconds() + i}s]</span>
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
