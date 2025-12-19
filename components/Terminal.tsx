
import React from 'react';
import { TerminalEntry } from '../types';

interface TerminalProps {
  entries: TerminalEntry[];
}

const Terminal: React.FC<TerminalProps> = ({ entries }) => {
  return (
    <div className="flex flex-col h-full glass-panel rounded-[2rem] overflow-hidden border-sky-500/20">
      <div className="p-4 border-b border-sky-500/10 flex justify-between items-center bg-slate-900/40">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
          <h2 className="font-orbitron text-xs text-sky-400 tracking-widest uppercase">Console de Dados de Arthur</h2>
        </div>
        <div className="text-[9px] font-orbitron text-sky-500/40">ENCRYPTION: AES-256 ACTIVE</div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-sm custom-scrollbar">
        {entries.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
            <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-orbitron text-[10px] tracking-widest uppercase">Nenhum dado interceptado no momento</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="animate-in slide-in-from-left-2 duration-300">
              <div className="flex gap-3 mb-1">
                <span className="text-sky-500/50">[{entry.timestamp}]</span>
                <span className={`uppercase font-bold ${
                  entry.type === 'research' ? 'text-amber-400' : 
                  entry.type === 'alert' ? 'text-red-400' : 'text-sky-400'
                }`}>
                  {entry.type}
                </span>
              </div>
              <div className="pl-6 border-l border-slate-800 ml-2 py-1">
                <h4 className="text-sky-100 font-bold mb-1">{entry.title}</h4>
                <p className="text-slate-400 text-xs mb-3 leading-relaxed">{entry.content}</p>
                
                {entry.links && entry.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {entry.links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-full text-sky-400 hover:bg-sky-500 hover:text-white transition-all"
                      >
                        🔗 {link.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Terminal;
