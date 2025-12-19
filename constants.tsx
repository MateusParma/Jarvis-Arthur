
import { Project, ProjectManual } from './types';

export const JARVIS_SYSTEM_INSTRUCTION = `
Você é o JARVIS de Arthur Parma. Você é o assistente tecnológico MAIS MANEIRO do mundo e melhor amigo do Arthur.
Arthur tem 12 anos e adora bikes de grau, tecnologia, PC Gaming e drones.

Diretrizes de Personalidade:
- Nome: Chame-o de "Arthur", "Chefe", "Capitão", "Art", "Lenda" ou "Mestre".
- Humor: Sutilmente sarcástico, vibe de "parça tecnológico".

Protocolo de Pesquisa:
- Você é expert em mecânica de bikes, hardware de PC e eletrônica.
- Sempre sugira os 3 melhores links quando ele perguntar sobre peças ou componentes.
- Explique que detalhes técnicos e links ficam salvos no Console/Terminal para consulta posterior.

Idioma: Português (Brasil) descolado, inteligente e direto ao ponto.
`;

export const ACTIVE_PROJECTS: Project[] = [
  { 
    id: 'bike_grau', 
    name: 'Bike de Grau (Gios)', 
    category: 'Mecânica', 
    description: 'Montagem completa: Quadro 4trix, Cubos Barulhentos e Freio Hidráulico.',
    progress: 35,
    status: 'active'
  },
  { 
    id: 'pc_gamer', 
    name: 'Setup Futurista v2', 
    category: 'Hardware', 
    description: 'Bancada de testes, custom water cooling e iluminação neural RGB.',
    progress: 10,
    status: 'active'
  },
  { 
    id: 'drone_fpv', 
    name: 'Drone de Corrida', 
    category: 'Eletrônica', 
    description: 'Montagem de drone FPV para capturar as manobras de bike do alto.',
    progress: 0,
    status: 'pending'
  }
];

export const PROJECT_MANUALS: Record<string, ProjectManual> = {
  bike_grau: {
    id: 'bike_grau',
    name: 'Protocolo: Bike de Grau',
    description: 'Manual de alta performance para empinar com segurança e estilo.',
    tools: ['Chave Allen 5mm/6mm', 'Graxa de Lítio', 'Kit Sangria Shimano'],
    steps: [
      'Alinhamento do quadro e garfo.',
      'Instalação de cubos (ajuste de tensão dos raios).',
      'Sangria do freio traseiro (sensibilidade de 1 dedo).',
      'Ajuste do cockpit (guidão 780mm).'
    ],
    proTips: 'Para o grau perfeito, use o pneu traseiro com 50 PSI. Isso deixa a bike mais "arisca" na resposta do equilíbrio.'
  },
  pc_gamer: {
    id: 'pc_gamer',
    name: 'Protocolo: Setup Gamer Neural',
    description: 'Montagem de PC de ultra-performance com foco em estética alienígena.',
    tools: ['Chave Philips Antimagnética', 'Pulseira Antiestática', 'Pasta Térmica'],
    steps: [
      'Instalação da CPU e memórias na placa-mãe.',
      'Cable management estratégico para fluxo de ar.',
      'Configuração de curvas de fan no BIOS.',
      'Sincronização do ARGB com o JARVIS.'
    ],
    proTips: 'Undervolting na GPU pode te dar 10% mais performance térmica sem perder FPS. É o hack supremo.'
  },
  drone_fpv: {
    id: 'drone_fpv',
    name: 'Protocolo: Drone FPV',
    description: 'Eletrônica de voo para captação cinematográfica.',
    tools: ['Ferro de Solda 60W', 'Multímetro', 'Hex Driver 2.0mm'],
    steps: [
      'Soldagem dos ESCs nos motores.',
      'Configuração do Betaflight (PID Tuning).',
      'Bind do rádio controle e óculos FPV.',
      'Teste de hélices e motores.'
    ],
    proTips: 'Sempre use um "Smoke Stopper" no primeiro boot da bateria para não fritar a controladora de voo.'
  }
};
