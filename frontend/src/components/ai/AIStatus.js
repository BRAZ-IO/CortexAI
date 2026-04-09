import React from 'react';
import styled from 'styled-components';
import { useAI } from '../../hooks/useAI';

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 12px;
  color: #8e8ea0;
`;

const AIIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background: ${props => props.color || '#10a37f'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 10px;
`;

const AIName = styled.span`
  font-weight: 500;
  color: white;
`;

const AIProvider = styled.span`
  color: #8e8ea0;
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.online ? '#10a37f' : '#ef4444'};
`;

const AIStatus = () => {
  const { selectedAI } = useAI();

  if (!selectedAI) return null;

  return (
    <StatusContainer>
      <AIIcon color={selectedAI.color}>
        {selectedAI.name.charAt(0)}
      </AIIcon>
      <AIName>{selectedAI.name}</AIName>
      <AIProvider>· {selectedAI.provider}</AIProvider>
      <StatusDot online={selectedAI.status === 'online'} />
    </StatusContainer>
  );
};

export default AIStatus;
