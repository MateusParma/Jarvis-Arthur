
import React from 'react';
import { BikePartManual } from '../types';

interface ManualModalProps {
  manual: BikePartManual;
  onClose: () => void;
}

const ManualModal: React.FC<ManualModalProps> = ({ manual, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-[3rem] overflow-hidden border-sky-500/30 flex flex-col shadow-[0_0_100px_rgba(56,189,248,0.2)]">
        <div className="p-8 border-b border-sky-500/10 flex justify-between items-start bg-slate-900/60 relative">
          <div className="scanline opacity-10"></div>
          <div>
            <h2 className="font-orbitron text-2xl text-white mb-2">{manual.name}</h2>
            <p className="text-sky-400/80 text-sm font-medium">{manual.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-slate-800 rounded-2xl text-slate-400 hover:text-white transition-colors border border-slate-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tools */}
            <div className="space-y-4">
              <h3 className="font-orbitron text-xs text-sky-500 uppercase tracking-widest">Ferramentas Necessárias</h3>
              <ul className="space-y-2">
                {manual.tools.map((tool, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                    <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Tips */}
            <div className="bg-sky-500/5 border border-sky-500/20 p-6 rounded-[2rem] h-fit">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-sky-500 p-2 rounded-lg text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-orbitron text-xs text-sky-400 uppercase tracking-widest">Dicas do JARVIS</h3>
              </div>
              <p className="text-sky-100/90 text-sm leading-relaxed italic">
                "{manual.proTips}"
              </p>
            </div>

            {/* Steps */}
            <div className="col-span-full space-y-6 mt-4">
              <h3 className="font-orbitron text-xs text-sky-500 uppercase tracking-widest">Passo a Passo da Montagem</h3>
              <div className="space-y-4">
                {manual.steps.map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 border border-sky-500/30 flex items-center justify-center font-orbitron text-sky-400 text-sm group-hover:border-sky-400 group-hover:bg-sky-900/40 transition-all">
                      {i + 1}
                    </div>
                    <div className="flex-1 bg-slate-900/40 p-4 rounded-2xl border border-slate-800 group-hover:border-sky-500/10 transition-all">
                      <p className="text-slate-200 text-sm leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-sky-500/10 text-center bg-slate-900/40">
           <p className="text-[10px] font-orbitron text-sky-500/40 uppercase tracking-[0.3em]">Protocolo de Oficina Seguro - Arthur Parma Industries</p>
        </div>
      </div>
    </div>
  );
};

export default ManualModal;
