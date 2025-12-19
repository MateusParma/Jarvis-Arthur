
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { JARVIS_SYSTEM_INSTRUCTION } from '../constants';
import { decodeBase64, encodeBase64, decodeAudioData } from '../services/geminiService';
import { TerminalEntry } from '../types';

interface SearchResult {
  title: string;
  uri: string;
}

interface LiveAssistantProps {
  onClose: () => void;
  onNewData: (entry: Omit<TerminalEntry, 'id' | 'timestamp'>) => void;
}

const LiveAssistant: React.FC<LiveAssistantProps> = ({ onClose, onNewData }) => {
  const [isActive, setIsActive] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [volume, setVolume] = useState(0);
  const [status, setStatus] = useState('Sincronizando satélites...');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [transcription, setTranscription] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const animationFrameRef = useRef<number>(null);
  
  const pendingLinksRef = useRef<SearchResult[]>([]);

  const updateVolume = useCallback(() => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
      setVolume(sum / dataArray.length);
    }
    animationFrameRef.current = requestAnimationFrame(updateVolume);
  }, []);

  const startSession = useCallback(async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const micSource = audioContextRef.current.createMediaStreamSource(stream);
      micSource.connect(analyserRef.current);
      animationFrameRef.current = requestAnimationFrame(updateVolume);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setStatus('Pode falar, Art. O sistema tá pronto.');
            setIsActive(true);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = { data: encodeBase64(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
              sessionPromise.then((session) => session.sendRealtimeInput({ media: pcmBlob }));
            };
            micSource.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.modelTurn) setIsThinking(false); 
            
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + message.serverContent!.outputTranscription!.text);
            }

            if (message.serverContent?.groundingMetadata?.groundingChunks) {
              const chunks = message.serverContent.groundingMetadata.groundingChunks;
              const links: SearchResult[] = chunks
                .filter((c: any) => c.web)
                .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));
              
              if (links.length > 0) {
                pendingLinksRef.current = [...pendingLinksRef.current, ...links];
              }
            }

            if (message.serverContent?.turnComplete) {
              if (pendingLinksRef.current.length > 0) {
                const uniqueLinks = Array.from(new Set(pendingLinksRef.current.map(l => l.uri)))
                  .map(uri => pendingLinksRef.current.find(l => l.uri === uri)!)
                  .slice(0, 3);

                setSearchResults(uniqueLinks);
                onNewData({
                  type: 'research',
                  title: 'Top 3 Resultados Interceptados',
                  content: 'JARVIS filtrou os melhores dados da rede para sua última solicitação. Confira os links abaixo:',
                  links: uniqueLinks
                });
                pendingLinksRef.current = [];
              }
            }

            const modelTurn = message.serverContent?.modelTurn;
            const audioData = modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (audioData && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decodeBase64(audioData), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) {
                  setIsThinking(false);
                  setTranscription('');
                }
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setTranscription('');
              pendingLinksRef.current = [];
            }
          },
          onerror: () => setStatus('Sinal fraco, Capitão...'),
          onclose: () => { setIsActive(false); setStatus('Sistemas em standby.'); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: JARVIS_SYSTEM_INSTRUCTION,
          tools: [{ googleSearch: {} }],
          outputAudioTranscription: {},
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } } }
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { setStatus('Falha crítica na rede neural.'); }
  }, [updateVolume, onNewData]);

  useEffect(() => {
    startSession();
    return () => {
      if (sessionRef.current) sessionRef.current.close();
      if (audioContextRef.current) audioContextRef.current.close();
      if (outputAudioContextRef.current) outputAudioContextRef.current.close();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [startSession]);

  const scale = 1 + (volume / 200);

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row items-center justify-center bg-slate-950/98 backdrop-blur-3xl p-4 md:p-8 gap-6">
      <div className="scanline"></div>
      
      <div className="glass-panel w-full max-w-2xl p-10 md:p-16 rounded-[4rem] text-center relative overflow-hidden border-sky-500/20 shadow-glow flex-shrink-0">
        <button onClick={onClose} className="absolute top-8 right-8 text-sky-400/30 hover:text-sky-400 transition-colors z-50">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="mb-4">
            <h2 className="font-orbitron text-sm text-sky-400 tracking-[0.4em] uppercase">Deep Neural Link</h2>
            <div className="text-[10px] text-sky-300/40 font-orbitron mt-1 tracking-widest">ARTHUR PARMA EDITION</div>
        </div>
        
        <div className="flex justify-center my-12 relative h-48 md:h-64">
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-75" style={{ transform: `scale(${scale})` }}>
            <div className={`blob blob-3 absolute w-56 h-56 md:w-64 md:h-64 ${isThinking ? 'bg-amber-500/10' : 'bg-sky-500/5'}`}></div>
            <div className={`blob blob-2 absolute w-48 h-48 md:w-56 md:h-56 ${isThinking ? 'bg-orange-500/20' : 'bg-sky-500/10'}`}></div>
            <div className={`blob blob-1 absolute w-40 h-40 md:w-48 md:h-48 ${isThinking ? 'bg-yellow-400/30' : 'bg-sky-400/20'}`}></div>
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${isThinking ? 'bg-amber-400 shadow-[0_0_60px_rgba(251,191,36,0.8)]' : 'bg-sky-400 shadow-[0_0_50px_rgba(56,189,248,0.7)]'}`}>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-white/40 flex items-center justify-center animate-pulse">
                   <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]"></div>
                </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
            <div className={`font-orbitron text-base md:text-xl min-h-[3rem] transition-all duration-300 ${isThinking ? 'text-amber-400' : 'text-sky-100'}`}>
                {isThinking ? 'BUSCANDO NA REDE...' : status}
            </div>
            {transcription && (
              <div className="bg-sky-500/5 p-4 rounded-2xl border border-sky-500/10 text-sky-300/80 text-xs font-medium italic animate-in fade-in slide-in-from-bottom-2">
                "{transcription}"
              </div>
            )}
        </div>
      </div>

      <div className={`w-full max-w-sm h-full max-h-[500px] transition-all duration-500 flex flex-col ${searchResults.length > 0 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none hidden md:flex'}`}>
          <div className="glass-panel h-full rounded-[3rem] p-6 border-sky-400/30 overflow-hidden flex flex-col">
              <div className="flex items-center gap-2 mb-6 border-b border-sky-500/20 pb-4">
                  <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping"></div>
                  <h3 className="font-orbitron text-xs text-sky-400 tracking-widest uppercase">Console: Top 3</h3>
                  <button onClick={() => setSearchResults([])} className="ml-auto text-sky-500/40 hover:text-sky-400 text-[10px] font-orbitron">LIMPAR</button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                  {searchResults.map((res, i) => (
                      <a key={i} href={res.uri} target="_blank" rel="noopener noreferrer" className="block p-4 rounded-2xl bg-sky-500/5 border border-sky-500/10 hover:border-sky-400/40 hover:bg-sky-500/10 transition-all group">
                          <div className="text-[10px] text-sky-500 font-orbitron mb-1 group-hover:text-sky-400 uppercase">Sugestão #{i+1}</div>
                          <div className="text-sm text-sky-100 font-semibold truncate mb-1">{res.title}</div>
                          <div className="text-[9px] text-slate-500 truncate">{res.uri}</div>
                      </a>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t border-sky-500/10 text-center">
                  <span className="text-[9px] font-orbitron text-sky-500/40">SINCRO DE DADOS FINALIZADA</span>
              </div>
          </div>
      </div>
    </div>
  );
};

export default LiveAssistant;
