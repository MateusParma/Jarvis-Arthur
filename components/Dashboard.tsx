
import React from 'react';
import { ACTIVE_PROJECTS } from '../constants';

interface DashboardProps {
  onSelectProject: (projectId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectProject }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 md:pb-0">
      {/* Lista de Projetos Ativos */}
      {ACTIVE_PROJECTS.map((project) => (
        <div 
          key={project.id} 
          onClick={() => onSelectProject(project.id)}
          className="glass-panel p-6 rounded-[2.5rem] group hover:border-sky-400/60 transition-all cursor-pointer relative overflow-hidden flex flex-col h-64 border-white/10"
        >
          <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full transition-all opacity-30 ${
            project.status === 'active' ? 'bg-cyan-500' : 'bg-slate-500'
          }`}></div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`p-3 rounded-2xl transition-colors ${
              project.status === 'active' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-500/20 text-slate-400'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="text-[9px] font-orbitron text-white/60 tracking-widest uppercase border border-white/20 px-2 py-1 rounded bg-black/20">
              {project.category}
            </div>
          </div>
          
          <h3 className="font-orbitron text-lg text-white mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{project.name}</h3>
          <p className="text-xs text-white/70 leading-relaxed mb-auto line-clamp-2 font-medium">{project.description}</p>
          
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-[9px] font-orbitron text-white/50 uppercase tracking-widest">
              <span>Status Neural</span>
              <span className="text-cyan-400">{project.progress}%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
               <div 
                 className="bg-cyan-500 h-full transition-all duration-1000 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
                 style={{ width: `${project.progress}%` }}
               ></div>
            </div>
          </div>
        </div>
      ))}

      {/* Card: Novo Projeto */}
      <div 
        className="glass-panel p-6 rounded-[2.5rem] border-dashed border-white/20 hover:border-cyan-400/40 transition-all cursor-pointer group flex flex-col items-center justify-center text-center space-y-4 min-h-[16rem] bg-white/[0.02]"
      >
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors border border-white/5">
          <svg className="w-8 h-8 text-white/40 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h4 className="font-orbitron text-[10px] text-white/60 uppercase tracking-[0.3em] group-hover:text-cyan-400 transition-colors">Novo Protocolo</h4>
          <p className="text-[10px] text-white/30 mt-1 uppercase">Expandir Oficina</p>
        </div>
      </div>

      {/* Alerta de Seguranca Global */}
      <div className="col-span-full bg-cyan-500/10 border border-cyan-400/20 p-6 rounded-[2.5rem] flex items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 backdrop-blur-3xl">
        <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.3)] animate-pulse">
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-orbitron text-cyan-400 text-[10px] font-bold tracking-[0.4em] uppercase mb-1">Central de Inteligência Arthur Parma</h4>
          <p className="text-white/70 text-xs font-medium">Aguardando seleção de blueprint para carregar esquemas técnicos e manuais de montagem.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
