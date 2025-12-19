
export interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string;
  isTranscription?: boolean;
}

export interface TerminalEntry {
  id: string;
  timestamp: string;
  type: 'research' | 'system' | 'alert';
  title: string;
  content: string;
  links?: { title: string; uri: string }[];
}

export interface BikePartManual {
  id: string;
  name: string;
  description: string;
  tools: string[];
  steps: string[];
  proTips: string;
}

export enum AppMode {
  CHAT = 'CHAT',
  LIVE = 'LIVE',
  DASHBOARD = 'DASHBOARD',
  TERMINAL = 'TERMINAL'
}
