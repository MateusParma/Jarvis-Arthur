
import React from 'react';
import { BIKE_PHASES } from '../constants';

interface DashboardProps {
  onSelectPart: (partId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectPart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 md:pb-0">
      {BIKE_PHASES.map((phase) => (
        <div 
          key={phase.id} 
          onClick={() => onSelectPart(phase.id)}
          className="glass-panel p-6 rounded-3xl group hover:border-sky-400/50 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full group-hover:bg-sky-500/10 transition-all"></div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="p-3 bg-sky-500/10 rounded-2xl group-hover:bg-sky-500/20 transition-colors">
              <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div className="text-[9px] font-orbitron text-sky-500/60 uppercase tracking-widest border border-sky-500/20 px-2 py-1 rounded">MANUAL DISPONÍVEL</div>
          </div>
          
          <h3 className="font-orbitron text-lg text-sky-100 mb-2 group-hover:text-sky-400 transition-colors">{phase.name}</h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">{phase.description}</p>
          
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
             <div className="bg-sky-500 h-full w-[10%] group-hover:w-[100%] transition-all duration-1000"></div>
          </div>
          <div className="flex justify-between mt-3 text-[10px] font-orbitron text-sky-400/80">
            <span className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse"></div>
              ABRIR PROJETO
            </span>
            <span>CLIQUE PARA DETALHES</span>
          </div>
        </div>
      ))}

      {/* Safety Alert */}
      <div className="col-span-full bg-red-500/10 border border-red-500/30 p-6 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-red-500 p-3 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.4)]">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h4 className="font-orbitron text-red-400 text-sm font-bold">ALERTA DE SEGURANÇA: PROTOCOLO WHEELING</h4>
          <p className="text-slate-400 text-xs">Arthur, o sistema detectou manobras pendentes. O uso de capacete e protetores não é opcional, é inteligência pura. Não quebre o Art!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
