
import React, { useState, useEffect } from 'react';
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
    setStage('BOOTING');
    playBootSfx();
    playJarvisWelcome();
    
    systemLogs.forEach((log, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `> ${log}`]);
        setProgress(((i + 1) / systemLogs.length) * 100);
      }, i * 600);
    });

    setTimeout(() => {
      setStage('COMPLETE');
      setTimeout(onComplete, 1000);
    }, systemLogs.length * 600 + 800);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center overflow-hidden p-6">
      <div className="scanline opacity-10"></div>
      
      {stage === 'IDLE' ? (
        <div className="flex flex-col items-center justify-center w-full max-w-md animate-in fade-in zoom-in duration-1000">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-sky-500/40 text-[10px] tracking-[0.8em] uppercase mb-4">Security Protocol</h2>
            <div className="text-sky-100 font-orbitron text-4xl tracking-tighter font-bold shadow-sky-500/20 drop-shadow-2xl">J.A.R.V.I.S.</div>
            <div className="text-sky-400/60 font-orbitron text-[9px] mt-2 tracking-[0.2em]">ARTHUR PARMA SPECIAL EDITION</div>
          </div>

          <button 
            onClick={startBoot}
            className="group relative w-72 h-72 flex items-center justify-center transition-transform active:scale-95"
          >
            {/* Anéis de UI Estilo Stark */}
            <div className="absolute inset-0 border-[1px] border-sky-500/10 rounded-full"></div>
            <div className="absolute inset-4 border-[2px] border-sky-400/20 border-t-transparent border-b-transparent rounded-full animate-[spin_6s_linear_infinite]"></div>
            <div className="absolute inset-8 border border-sky-300/10 border-dashed rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
            
            {/* O Scanner Biométrico */}
            <div className="w-44 h-44 bg-sky-950/20 rounded-full border-2 border-sky-500/40 flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.15),inset_0_0_30px_rgba(56,189,248,0.1)] group-hover:border-sky-400 transition-all duration-500">
                {/* Laser de Varredura */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-sky-300 shadow-[0_0_20px_rgba(56,189,248,1)] z-20 animate-[scan_2s_ease-in-out_infinite]"></div>
                
                {/* Impressão Digital Detalhada */}
                <svg className="w-28 h-28 text-sky-400 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M50 10 C30 10 15 25 15 50 M25 50 C25 35 35 25 50 25 M50 25 C65 25 75 35 75 50 M85 50 C85 25 70 10 50 10" strokeLinecap="round" />
                  <path d="M40 90 C30 85 20 70 20 50 M80 50 C80 70 70 85 60 90" strokeLinecap="round" />
                  <path d="M50 40 C45 40 40 45 40 50 C40 55 45 60 50 60 C55 60 60 55 60 50" strokeLinecap="round" />
                  <path d="M50 75 C35 75 30 65 30 50 M70 50 C70 65 65 75 50 75" strokeLinecap="round" />
                  <path d="M50 15 C60 15 70 20 75 30 M25 30 C30 20 40 15 50 15" strokeLinecap="round" />
                  <path d="M50 85 C65 85 75 75 75 50 M25 50 C25 75 35 85 50 85" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="2" fill="currentColor" />
                </svg>

                {/* Grid Hexagonal Subjacente */}
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>

            {/* Brilho Externo Ativo */}
            <div className="absolute inset-0 rounded-full bg-sky-500/5 blur-[80px] group-hover:bg-sky-500/10 transition-all duration-700 animate-pulse"></div>
          </button>

          <div className="mt-16 flex flex-col items-center gap-4">
            <span className="font-orbitron text-sky-400 text-[11px] tracking-[0.6em] animate-pulse">BIOMETRIA NECESSÁRIA</span>
            <div className="w-12 h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-sky-500 animate-[loading_1.5s_infinite]"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg flex flex-col items-center justify-center animate-in fade-in duration-500">
          {/* Arc Reactor Core */}
          <div className="relative w-56 h-56 mb-20">
            <div className="absolute inset-0 border-2 border-sky-500/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-4 border border-sky-400/20 border-dashed rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-28 h-28 rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-sky-400 shadow-[0_0_150px_rgba(56,189,248,1)]' : 'bg-sky-900/30 shadow-[0_0_40px_rgba(56,189,248,0.2)]'} flex items-center justify-center`}>
                    <div className="w-16 h-16 rounded-full border-4 border-white/10 animate-pulse"></div>
                </div>
            </div>
          </div>

          <div className="w-full space-y-10">
            <div className="flex justify-between items-end font-orbitron">
              <div>
                <div className="text-sky-500/40 text-[8px] tracking-[0.5em] mb-1 uppercase">Protocol Override</div>
                <div className="text-sky-400 text-lg font-bold tracking-widest">BOOTING J.A.R.V.I.S.</div>
              </div>
              <div className="text-sky-400 text-4xl font-bold">{Math.floor(progress)}%</div>
            </div>
            
            <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
              <div 
                className="h-full bg-sky-500 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(56,189,248,1)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="h-40 overflow-hidden font-mono bg-sky-950/20 p-5 rounded-2xl border border-sky-500/10 flex flex-col-reverse">
              <div className="space-y-1">
                {logs.slice().reverse().map((log, i) => (
                  <div key={i} className="text-sky-400/80 text-[10px] flex items-center gap-3">
                    <span className="text-sky-500/20">[{new Date().getSeconds() + i}s]</span>
                    <span className="animate-in slide-in-from-left-4 duration-500">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
