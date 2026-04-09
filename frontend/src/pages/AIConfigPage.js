import React, { useState } from 'react';
import styled from 'styled-components';
import { useAI } from '../hooks/useAI';

const ConfigContainer = styled.div`
  padding: 2rem;
  min-height: calc(100vh - 60px);
  background-color: #343541;
  
  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const ConfigHeader = styled.div`
  margin-bottom: 2rem;
`;

const ConfigTitle = styled.h1`
  color: white;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const ConfigSubtitle = styled.p`
  color: #8e8ea0;
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
`;

const AISection = styled.div`
  background-color: #444654;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #565869;
  
  @media (max-width: 767px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

const SectionTitle = styled.h2`
  color: white;
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const AIGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const AICard = styled.div`
  background-color: #343541;
  border: 1px solid #565869;
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  
  &:hover {
    transform: translateY(-2px);
    border-color: #10a37f;
  }
  
  ${props => props.selected && `
    border-color: #10a37f;
    box-shadow: 0 0 0 2px rgba(16, 163, 127, 0.2);
  `}
  
  @media (max-width: 767px) {
    padding: 1rem;
  }
  
  /* Toque melhorado para mobile */
  @media (hover: none) {
    &:active {
      transform: translateY(-1px);
      border-color: #10a37f;
    }
  }
`;

const AIHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1rem;
`;

const AIAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.color || '#10a37f'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const AIInfo = styled.div`
  flex: 1;
`;

const AIName = styled.div`
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 4px;
`;

const AIProvider = styled.div`
  color: #8e8ea0;
  font-size: 0.9rem;
`;

const AIDescription = styled.div`
  color: #ececf1;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const AIStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.online ? '#10a37f' : '#ef4444'};
`;

const StatusText = styled.span`
  color: ${props => props.online ? '#10a37f' : '#ef4444'};
`;

const APISection = styled.div`
  background-color: #444654;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #565869;
  
  @media (max-width: 767px) {
    padding: 1rem;
    margin-bottom: 1rem;
  }
`;

const APIForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  background-color: #343541;
  color: white;
  border: 1px solid #565869;
  border-radius: 6px;
  padding: 0.8rem;
  font-size: 0.9rem;
  
  &::placeholder {
    color: #8e8ea0;
  }
  
  &:focus {
    outline: none;
    border-color: #10a37f;
  }
  
  @media (max-width: 767px) {
    font-size: 16px; /* Previne zoom no iOS */
  }
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #10a37f, #0d7f61);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  @media (max-width: 767px) {
    width: 100%;
    padding: 1rem;
  }
  
  /* Toque melhorado para mobile */
  @media (hover: none) {
    &:active {
      transform: translateY(0);
    }
  }
`;

const SelectedBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #10a37f;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  
  @media (max-width: 767px) {
    top: 8px;
    right: 8px;
    font-size: 0.6rem;
    padding: 3px 6px;
  }
`;

const AIConfigPage = () => {
  const { selectedAI, allAIs, setSelectedAI } = useAI();
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    google: '',
    meta: '',
    mistral: '',
    xai: ''
  });

  const handleAISelect = (ai) => {
    if (ai.status === 'online') {
      setSelectedAI(ai.id);
    }
  };

  const handleApiKeyChange = (provider, value) => {
    setApiKeys(prev => ({
      ...prev,
      [provider]: value
    }));
  };

  const handleSaveKeys = (e) => {
    e.preventDefault();
    // Salvar API keys no localStorage (em produção, usar backend seguro)
    localStorage.setItem('cortexai_api_keys', JSON.stringify(apiKeys));
    alert('Chaves de API salvas com sucesso!');
  };

  return (
    <ConfigContainer>
      <ConfigHeader>
        <ConfigTitle>Configurações de IA</ConfigTitle>
        <ConfigSubtitle>Gerencie seus modelos de IA e integrações</ConfigSubtitle>
      </ConfigHeader>

      <AISection>
        <SectionTitle>Modelos Disponíveis</SectionTitle>
        <AIGrid>
          {allAIs.map((ai) => (
            <AICard
              key={ai.id}
              selected={selectedAI?.id === ai.id}
              onClick={() => handleAISelect(ai)}
              style={{ opacity: ai.status === 'online' ? 1 : 0.6 }}
            >
              {selectedAI?.id === ai.id && <SelectedBadge>Ativo</SelectedBadge>}
              <AIHeader>
                <AIAvatar color={ai.color}>
                  {ai.name.charAt(0)}
                </AIAvatar>
                <AIInfo>
                  <AIName>{ai.name}</AIName>
                  <AIProvider>{ai.provider}</AIProvider>
                </AIInfo>
              </AIHeader>
              <AIDescription>{ai.description}</AIDescription>
              <AIStatus>
                <StatusDot online={ai.status === 'online'} />
                <StatusText online={ai.status === 'online'}>
                  {ai.status === 'online' ? 'Online' : 'Offline'}
                </StatusText>
              </AIStatus>
            </AICard>
          ))}
        </AIGrid>
      </AISection>

      <APISection>
        <SectionTitle>Chaves de API</SectionTitle>
        <APIForm onSubmit={handleSaveKeys}>
          <FormGroup>
            <Label>OpenAI API Key</Label>
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKeys.openai}
              onChange={(e) => handleApiKeyChange('openai', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Anthropic API Key</Label>
            <Input
              type="password"
              placeholder="sk-ant-..."
              value={apiKeys.anthropic}
              onChange={(e) => handleApiKeyChange('anthropic', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Google AI API Key</Label>
            <Input
              type="password"
              placeholder="AIza..."
              value={apiKeys.google}
              onChange={(e) => handleApiKeyChange('google', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Meta Llama API Key</Label>
            <Input
              type="password"
              placeholder="meta-..."
              value={apiKeys.meta}
              onChange={(e) => handleApiKeyChange('meta', e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Mistral API Key</Label>
            <Input
              type="password"
              placeholder="..."
              value={apiKeys.mistral}
              onChange={(e) => handleApiKeyChange('mistral', e.target.value)}
            />
          </FormGroup>
          <SaveButton type="submit">
            Salvar Chaves de API
          </SaveButton>
        </APIForm>
      </APISection>
    </ConfigContainer>
  );
};

export default AIConfigPage;
