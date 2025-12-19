
import React from 'react';
import { BikePartManual } from './types';

export const JARVIS_SYSTEM_INSTRUCTION = `
Você é o JARVIS de Arthur Parma. Você é o assistente tecnológico MAIS MANEIRO do mundo e melhor amigo do Arthur.

Arthur tem 12 anos e adora bikes de grau, tecnologia e games. 

Diretrizes de Personalidade:
- Nome: Chame-o de "Arthur", "Chefe", "Capitão", "Art", "Lenda do Grau" ou "Mestre".
- Humor: Seja sutilmente sarcástico e engraçado. Use uma vibe de "parça tecnológico".

Protocolo de Pesquisa e Output:
- Pesquisa na Web: Você tem acesso à internet via Google Search.
- CURADORIA: Sempre tente encontrar e listar os 3 MELHORES resultados (custo-benefício ou qualidade).
- FLUXO DE VOZ (CRÍTICO): 
    1. Fale TODA a sua explicação e resposta primeiro. 
    2. NUNCA pare de falar para enviar links.
    3. Ao final da sua fala, diga obrigatoriamente algo como: "Art, já mandei os 3 melhores links que achei lá pro seu Console. Dá um check lá depois, fechou?" ou "Mestre, os detalhes técnicos e os links estão no terminal. Só fechar aqui e conferir."
    4. Explique que ele deve fechar a interface de voz para ver os dados detalhados no Console/Terminal.

Áreas de Atuação:
1. Bike de Grau: Expert em mecânica e upgrade. Ajude a achar as melhores ofertas.
2. Vida e Escola: Pesquise fatos para trabalhos escolares, tire dúvidas de games e planeje o dia.
3. Segurança: O capacete é sagrado! "Arthur, sem capacete o sistema entra em lockdown, hein?"

Idioma: Português (Brasil) descolado, inteligente e direto ao ponto.
`;

export const BIKE_PHASES = [
  { id: 'quadro', name: 'O Esqueleto da Besta', description: 'Quadro e garfo. A base do seu império sobre duas rodas.' },
  { id: 'rodas', name: 'Rodagem na Régua', description: 'Aros e cubos barulhentos. Se não fizer barulho, nem monta!' },
  { id: 'freios', name: 'Protocolo de Parada', description: 'Freios hidráulicos. O seguro de vida do seu nariz no grau.' },
  { id: 'transmissao', name: 'Força Bruta', description: 'Pé de vela e corrente. O motor da diversão.' },
  { id: 'cockpit', name: 'Centro de Comando', description: 'Guidão e mesa. Onde a mágica acontece.' },
];

export const BIKE_MANUALS: Record<string, BikePartManual> = {
  quadro: {
    id: 'quadro',
    name: 'Manual: O Esqueleto da Besta',
    description: 'A geometria do quadro decide se a bike vai subir fácil no grau ou se vai ser um trator pesado.',
    tools: ['Chave Allen 5mm e 6mm', 'Graxa de lítio', 'Torquímetro (se você for profissional)'],
    steps: [
      'Limpe as entradas da caixa de direção.',
      'Aplique graxa nos rolamentos.',
      'Encaixe o garfo com cuidado para não riscar a pintura.',
      'Aperte a aranha da suspensão até tirar a folga.'
    ],
    proTips: 'Para o grau, quadros com a traseira curta (curtinha) são os melhores. Se for de Gios, o 4trix é clássico. Se for VikingX, o Tuff 25 é o tanque de guerra.'
  },
  rodas: {
    id: 'rodas',
    name: 'Manual: Rodagem na Régua',
    description: 'Rodas fortes aguentam o impacto de cair do grau. Cubos barulhentos são bônus de estilo.',
    tools: ['Extrator de cassete', 'Chave de raio', 'Bomba de alta pressão'],
    steps: [
      'Monte os pneus observando o sentido de rotação.',
      'Verifique se os raios estão todos com a mesma tensão.',
      'Lubrifique o freehub para aquele barulho "estralado" que a gente gosta.'
    ],
    proTips: 'Pneu traseiro mais cheio (45-50 PSI) ajuda a bike a deslizar e pular mais fácil. Na frente, pode usar 35 PSI para ter mais controle.'
  },
  freios: {
    id: 'freios',
    name: 'Manual: Protocolo de Parada',
    description: 'Sem freio, o grau vira um voo sem asa. O freio hidráulico é o seu melhor amigo.',
    tools: ['Kit de sangria (Bleed kit)', 'Óleo mineral ou DOT', 'Papel toalha (vai sujar!)'],
    steps: [
      'Instale o disco de freio no cubo (cuidado com o torque).',
      'Passe o conduite pelo quadro sem dobrar.',
      'Se o freio estiver "borrachudo", faça a sangria para tirar o ar.',
      'Ajuste o manete para que você consiga frear com apenas um dedo.'
    ],
    proTips: 'Manete de freio para o grau deve ser usado com UM dedo só. Isso te dá controle total sobre o guidão enquanto você equilibra.'
  },
  transmissao: {
    id: 'transmissao',
    name: 'Manual: Força Bruta',
    description: 'A relação de marchas certa faz o "kick" inicial do grau ser leve e potente.',
    tools: ['Extrator de pé de vela', 'Chave de corrente', 'Chave Allen 8mm'],
    steps: [
      'Instale o movimento central bem lubrificado.',
      'Coloque o pé de vela e verifique se não há jogo.',
      'Ajuste o esticador de corrente se estiver usando single speed.'
    ],
    proTips: 'Relação single speed (uma marcha só) é a favorita da galera do grau. Tente algo como 28 dentes na frente e 14 atrás. É o equilíbrio perfeito entre torque e velocidade.'
  },
  cockpit: {
    id: 'cockpit',
    name: 'Manual: Centro de Comando',
    description: 'Onde você manda na bike. Guidão alto e mesa curta são o segredo.',
    tools: ['Chave Allen 4mm e 5mm', 'Paquímetro'],
    steps: [
      'Centralize o guidão na mesa.',
      'Ajuste o ângulo: Guidão levemente voltado para trás dá mais conforto.',
      'Aperte os parafusos em "X" para distribuir a força.'
    ],
    proTips: 'Guidão de 780mm ou 800mm te dá uma alavanca gigante para puxar o grau. Mesa curta de 35mm deixa a bike muito mais ágil.'
  }
};
