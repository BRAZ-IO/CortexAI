import { useState, useEffect } from 'react';

const AI_MODELOS = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Modelo mais avançado',
    color: '#10a37f',
    status: 'online',
    provider: 'OpenAI',
    maxTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    description: 'Assistente inteligente',
    color: '#f59e0b',
    status: 'online',
    provider: 'Anthropic',
    maxTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    description: 'Multimodal do Google',
    color: '#3b82f6',
    status: 'online',
    provider: 'Google',
    maxTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'llama-3',
    name: 'Llama 3',
    description: 'Open source da Meta',
    color: '#8b5cf6',
    status: 'online',
    provider: 'Meta',
    maxTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'mistral',
    name: 'Mistral',
    description: 'Modelo europeu',
    color: '#ec4899',
    status: 'online',
    provider: 'Mistral AI',
    maxTokens: 4096,
    temperature: 0.7
  },
  {
    id: 'grok',
    name: 'Grok',
    description: 'IA com humor',
    color: '#ef4444',
    status: 'offline',
    provider: 'xAI',
    maxTokens: 4096,
    temperature: 0.8
  }
];

export const useAI = () => {
  const [selectedAI, setSelectedAI] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Carregar IA selecionada do localStorage
    const savedAI = localStorage.getItem('cortexai_selected_ai');
    if (savedAI) {
      const ai = AI_MODELOS.find(model => model.id === savedAI);
      if (ai) setSelectedAI(ai);
    } else {
      // Default para GPT-4
      setSelectedAI(AI_MODELOS[0]);
    }
  }, []);

  useEffect(() => {
    // Escutar mudanças de IA
    const handleAIChange = (event) => {
      setSelectedAI(event.detail);
    };

    window.addEventListener('aiChanged', handleAIChange);
    return () => window.removeEventListener('aiChanged', handleAIChange);
  }, []);

  const changeAI = (aiId) => {
    const ai = AI_MODELOS.find(model => model.id === aiId);
    if (ai) {
      setSelectedAI(ai);
      localStorage.setItem('cortexai_selected_ai', aiId);
      window.dispatchEvent(new CustomEvent('aiChanged', { detail: ai }));
    }
  };

  const getAvailableAIs = () => {
    return AI_MODELOS.filter(ai => ai.status === 'online');
  };

  const getAIById = (id) => {
    return AI_MODELOS.find(ai => ai.id === id);
  };

  const isAIAvailable = (aiId) => {
    const ai = getAIById(aiId);
    return ai && ai.status === 'online';
  };

  return {
    selectedAI,
    setSelectedAI: changeAI,
    availableAIs: getAvailableAIs(),
    allAIs: AI_MODELOS,
    isLoading,
    isAIAvailable,
    getAIById
  };
};

export default useAI;
