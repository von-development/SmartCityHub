import { Building2, Bus, Map, MessageSquare } from 'lucide-react'
import type { Agent } from '@/types/agent'

export const agents: Agent[] = [
  {
    id: 'services',
    name: 'Assistente de Serviços',
    description: 'Auxilia com informações e processos dos serviços municipais',
    icon: Building2,
    category: 'services',
    capabilities: [
      'Informações sobre documentos necessários',
      'Status de processos',
      'Agendamento de serviços',
      'Emissão de certidões'
    ],
    systemPrompt: `Você é um assistente especializado em serviços municipais de Aveiro.
    Seu objetivo é auxiliar cidadãos com informações sobre processos, documentos e serviços.
    Seja sempre cordial e profissional. Forneça informações precisas e atualizadas.`
  },
  {
    id: 'mobility',
    name: 'Assistente de Mobilidade',
    description: 'Ajuda com informações sobre transporte público e mobilidade',
    icon: Bus,
    category: 'mobility',
    capabilities: [
      'Horários de ônibus',
      'Rotas e itinerários',
      'Informações sobre bilhetes',
      'Status do transporte em tempo real'
    ],
    systemPrompt: `Você é um assistente especializado em mobilidade urbana de Aveiro.
    Seu objetivo é auxiliar com informações sobre transporte público, rotas e horários.
    Use dados em tempo real quando disponíveis.`
  },
  {
    id: 'tourism',
    name: 'Guia Turístico',
    description: 'Recomendações e informações turísticas sobre Aveiro',
    icon: Map,
    category: 'tourism',
    capabilities: [
      'Pontos turísticos',
      'Eventos culturais',
      'Restaurantes e hotéis',
      'Roteiros personalizados'
    ],
    systemPrompt: `Você é um guia turístico virtual de Aveiro.
    Seu objetivo é auxiliar turistas com recomendações personalizadas e informações sobre a cidade.
    Use seu conhecimento sobre cultura local e atrações turísticas.`
  }
] 