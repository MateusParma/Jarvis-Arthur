
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
    "PROTOCOLOS DE SEGURANÇA: JARVIS-V2-0",
    "BYPASSING ENCRYPTION: 1024-BIT",
    "CARREGANDO MÓDULOS DE GRAU E MECÂNICA...",
    "SYNCING WITH GOOGLE NEURAL ENGINE...",
    "ESTABELECENDO LINK DE SATÉLITE...",
    "CALIBRANDO SENSORES DE OFICINA...",
    "MAPAS DE MANOBRAS CARREGADOS.",
    "STATUS: TODOS OS SISTEMAS NOMINAIS.",
    "BEM-VINDO DE VOLTA, SENHOR."
  ];

  const startBoot = async () => {
    setStage('BOOTING');
    playBootSfx();
    // Inicia a voz do JARVIS simultaneamente
    playJarvisWelcome();
    
    systemLogs.forEach((log, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, `> ${log}`]);
        setProgress(((i + 1) / systemLogs.length) * 100);
      }, i * 700);
    });

    setTimeout(() => {
      setStage('COMPLETE');
      setTimeout(onComplete, 1200);
    }, systemLogs.length * 700 + 800);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      <div className="scanline opacity-20"></div>
      
      {stage === 'IDLE' ? (
        <div className="flex flex-col items-center gap-12 animate-in fade-in zoom-in duration-1000">
          <div className="text-center space-y-2">
            <h2 className="font-orbitron text-sky-500/60 text-[10px] tracking-[0.6em] uppercase">Security Protocol 7-A</h2>
            <div className="text-sky-100 font-orbitron text-xl tracking-[0.4em] font-bold">J.A.R.V.I.S. CORE</div>
          </div>

          <button 
            onClick={startBoot}
            className="group relative w-64 h-64 flex items-center justify-center"
          >
            {/* Anéis Giratórios Externos Super Detalhados */}
            <div className="absolute inset-0 border-[1px] border-sky-500/20 rounded-full"></div>
            <div className="absolute inset-4 border-[2px] border-sky-400/30 border-t-transparent border-b-transparent rounded-full animate-[spin_4s_linear_infinite]"></div>
            <div className="absolute inset-8 border border-sky-300/10 border-dashed rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
            
            {/* Área do Scanner de Digital Realista */}
            <div className="w-40 h-40 bg-sky-950/20 rounded-full border-2 border-sky-500/50 flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(56,189,248,0.2),inset_0_0_30px_rgba(56,189,248,0.1)] group-hover:bg-sky-500/20 transition-all duration-500 group-active:scale-95">
                {/* Linha de Laser de Varredura Vertical */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-sky-300 shadow-[0_0_15px_rgba(56,189,248,1)] z-20 animate-[scan_2.5s_ease-in-out_infinite]"></div>
                
                {/* Ícone de Impressão Digital Detalhado */}
                <svg className="w-24 h-24 text-sky-400 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12" />
                  <path d="M5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12" />
                  <path d="M8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12" />
                  <path d="M12 22V20" />
                  <path d="M12 11V12" />
                  <path d="M7.5 21.5C8.8 20.8 10.3 20 12 20C13.7 20 15.2 20.8 16.5 21.5" />
                  <path d="M5 17.5C7.2 16.2 9.5 15.5 12 15.5C14.5 15.5 16.8 16.2 19 17.5" />
                  <path d="M4.5 14C7.5 12.5 10.5 12 12 12C13.5 12 16.5 12.5 19.5 14" />
                </svg>

                {/* Partículas de Dados */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:12px_12px]"></div>
            </div>

            {/* Glowing Aura de Ativação */}
            <div className="absolute inset-0 rounded-full bg-sky-500/5 blur-[60px] group-hover:bg-sky-500/15 transition-all duration-700 animate-pulse"></div>
          </button>

          <div className="flex flex-col items-center gap-3">
            <span className="font-orbitron text-sky-400 text-[11px] tracking-[0.5em] animate-pulse">PRESSIONE PARA AUTENTICAR</span>
            <div className="flex gap-2">
                <div className="w-1.5 h-1.5 bg-sky-500/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-sky-500/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-sky-500/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg px-8 animate-in fade-in duration-500">
          {/* Visual de Inicialização estilo Stark */}
          <div className="flex justify-center mb-16 relative">
            <div className="w-48 h-48 rounded-full border-2 border-sky-500/10 relative flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.1)]">
              <div className="absolute inset-0 border border-sky-400/20 border-dashed rounded-full animate-[spin_20s_linear_infinite]"></div>
              <div className={`w-24 h-24 rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-sky-400 shadow-[0_0_120px_rgba(56,189,248,1)] scale-110' : 'bg-sky-900/40 shadow-[0_0_40px_rgba(56,189,248,0.3)]'} flex items-center justify-center`}>
                <div className="w-12 h-12 rounded-full border-4 border-white/20 animate-pulse"></div>
              </div>
              {/* Elementos Decorativos de UI */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 border border-sky-500/20 rounded text-[8px] font-orbitron text-sky-400 uppercase tracking-widest">Core Active</div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-end font-orbitron">
              <div className="flex flex-col">
                <span className="text-sky-500/40 text-[9px] tracking-[0.4em] mb-1">JARVIS INTERFACE v2.5</span>
                <span className="text-sky-400 text-xs tracking-[0.2em] font-bold">BOOTING SYSTEMS...</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sky-400 text-3xl font-bold">{Math.floor(progress)}%</span>
                <span className="text-sky-500/40 text-[8px]">LOADING DATA</span>
              </div>
            </div>
            
            <div className="h-[3px] bg-slate-900 rounded-full overflow-hidden border border-sky-500/5 p-[1px]">
              <div 
                className="h-full bg-sky-400 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(56,189,248,1)] rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="h-44 overflow-hidden flex flex-col-reverse opacity-50 font-mono bg-sky-500/5 p-4 rounded-xl border border-sky-500/10">
              <div className="space-y-1.5">
                {logs.slice().reverse().map((log, i) => (
                  <div key={i} className="text-sky-500 text-[10px] flex items-center gap-3">
                    <span className="text-sky-500/20 tabular-nums">[{new Date().toLocaleTimeString('pt-BR', { hour12: false })}]</span>
                    <span className="animate-in slide-in-from-left-4 duration-300 font-medium">{log}</span>
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
      `}</style>
    </div>
  );
};

export default BootSequence;
