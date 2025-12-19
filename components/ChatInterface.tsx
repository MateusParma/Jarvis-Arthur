
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'E aí, Arthur! O sistema tá pronto. O que vamos aprontar hoje? Montar a bike, resolver aquele dever de casa chato ou só trocar uma ideia? Manda a boa!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = { role: 'user', text: input, image: selectedImage || undefined };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(input || "Dá uma olhada nisso aqui, JARVIS.", userMessage.image);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Ixi, Arthur, deu um bug aqui no meu cérebro digital.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Erro crítico! Acho que algum esquilo mastigou meus cabos.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-[2.5rem] overflow-hidden relative border-sky-500/20 shadow-2xl">
      <div className="scanline opacity-5"></div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-3xl ${
              m.role === 'user' 
                ? 'bg-sky-600/20 border border-sky-500/30 text-sky-50 rounded-tr-none' 
                : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              {m.image && <img src={m.image} alt="Upload" className="w-full max-h-72 object-cover rounded-2xl mb-3 border border-sky-400/20" />}
              <p className="whitespace-pre-wrap text-sm leading-relaxed tracking-tight">{m.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-900/60 p-5 rounded-3xl rounded-tl-none animate-bounce text-sky-400 font-orbitron text-[10px] tracking-[0.2em]">
              CEREBRANDO...
            </div>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="p-3 bg-sky-950/40 border-t border-sky-500/20 flex items-center gap-3 backdrop-blur-md">
          <img src={selectedImage} alt="Preview" className="h-14 w-14 object-cover rounded-xl border-2 border-sky-400 shadow-glow" />
          <span className="text-[10px] font-orbitron text-sky-400 uppercase tracking-widest">Scanner Ativo</span>
          <button onClick={() => setSelectedImage(null)} className="ml-auto p-2 text-red-400 hover:bg-red-500/20 rounded-full transition-colors">&times;</button>
        </div>
      )}

      <div className="p-6 bg-slate-950/90 border-t border-sky-500/10 flex items-end gap-3">
        <label className="p-4 bg-slate-900 rounded-2xl cursor-pointer hover:bg-slate-800 border border-transparent hover:border-sky-500/40 shadow-inner group transition-all">
          <svg className="w-6 h-6 text-sky-400 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
          placeholder="Manda o papo, Arthur..."
          className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-sky-50 focus:ring-1 focus:ring-sky-500 focus:border-sky-500/50 resize-none max-h-40 text-sm placeholder:text-slate-600 transition-all"
          rows={1}
        />
        <button onClick={handleSend} disabled={isLoading} className="p-4 bg-sky-600 text-white rounded-2xl hover:bg-sky-500 transition-all disabled:opacity-30 shadow-glow group">
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
