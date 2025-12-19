
import React from 'react';
import { ProjectManual } from '../types';

interface ManualModalProps {
  manual: ProjectManual;
  onClose: () => void;
}

const ManualModal: React.FC<ManualModalProps> = ({ manual, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-3xl animate-in fade-in duration-500">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-[3.5rem] overflow-hidden border-white/5 flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-start bg-white/[0.02] relative">
          <div className="scanline opacity-10"></div>
          <div>
            <h2 className="font-orbitron text-2xl text-white mb-2 tracking-tighter uppercase">{manual.name}</h2>
            <p className="text-cyan-400 text-[10px] font-orbitron tracking-[0.4em] uppercase">{manual.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-4 bg-white/5 rounded-full text-white/40 hover:text-white transition-all border border-white/10 hover:bg-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Tools */}
            <div className="space-y-6">
              <h3 className="font-orbitron text-[9px] text-white/30 uppercase tracking-[0.5em]">Ferramental Necessário</h3>
              <ul className="space-y-3">
                {manual.tools.map((tool, i) => (
                  <li key={i} className="flex items-center gap-4 text-white/80 text-sm bg-white/5 p-4 rounded-3xl border border-white/5">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Tips */}
            <div className="bg-cyan-500/5 border border-cyan-400/20 p-8 rounded-[3rem] h-fit relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 blur-3xl rounded-full"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="bg-cyan-500 p-2.5 rounded-2xl text-black">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-orbitron text-[9px] text-cyan-400 uppercase tracking-[0.4em]">Hack do JARVIS</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic relative z-10">
                "{manual.proTips}"
              </p>
            </div>

            {/* Steps */}
            <div className="col-span-full space-y-8 mt-4">
              <h3 className="font-orbitron text-[9px] text-white/30 uppercase tracking-[0.5em]">Log de Execução Passo a Passo</h3>
              <div className="space-y-6">
                {manual.steps.map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-orbitron text-white/40 text-sm group-hover:border-cyan-400/50 group-hover:text-cyan-400 transition-all">
                      {i + 1}
                    </div>
                    <div className="flex-1 bg-white/[0.02] p-6 rounded-[2.2rem] border border-white/5 group-hover:border-white/10 transition-all">
                      <p className="text-white/80 text-sm leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-white/5 text-center bg-white/[0.01]">
           <p className="text-[8px] font-orbitron text-white/10 uppercase tracking-[0.6em]">Protocolo de Oficina Sincronizado - Arthur Parma Neural Lab</p>
        </div>
      </div>
    </div>
  );
};

export default ManualModal;
