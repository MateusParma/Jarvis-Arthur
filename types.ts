
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

export interface ProjectManual {
  id: string;
  name: string;
  description: string;
  tools: string[];
  steps: string[];
  proTips: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  progress: number;
  status: 'active' | 'pending' | 'completed';
}

export enum AppMode {
  CHAT = 'CHAT',
  LIVE = 'LIVE',
  DASHBOARD = 'DASHBOARD',
  TERMINAL = 'TERMINAL'
}
