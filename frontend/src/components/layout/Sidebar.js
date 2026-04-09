import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  height: 100dvh; /* Viewport height para mobile */
  background-color: #202123;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-right: 1px solid #444654;
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  
  @media (min-width: 768px) {
    transform: translateX(0);
    width: 260px;
  }
  
  /* Otimizações para mobile */
  @media (max-width: 767px) {
    padding: 8px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #343541;
  }
  
  @media (max-width: 767px) {
    padding: 10px;
    margin-bottom: 6px;
  }
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #10a37f 0%, #0d7f61 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  margin-right: 12px;
  
  @media (max-width: 767px) {
    width: 28px;
    height: 28px;
    font-size: 14px;
    margin-right: 10px;
  }
`;

const LogoText = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const NewChatButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: transparent;
  color: white;
  border: 1px solid #444654;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #343541;
  }
  
  @media (max-width: 767px) {
    padding: 10px;
    font-size: 13px;
    gap: 6px;
    margin-bottom: 6px;
  }
  
  /* Toque melhorado para mobile */
  @media (hover: none) {
    &:active {
    background-color: #343541;
    }
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  background-color: #343541;
  color: white;
  border: 1px solid #444654;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  
  &::placeholder {
    color: #8e8ea0;
  }
  
  &:focus {
    border-color: #10a37f;
  }
  
  @media (max-width: 767px) {
    padding: 8px 10px;
    font-size: 13px;
  }
  
  /* Remove zoom no input no iOS */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    font-size: 16px;
    
    @media (max-width: 767px) {
      font-size: 16px;
      padding: 8px 10px;
    }
  }
`;

const NavigationSection = styled.div`
  margin-bottom: 20px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
  gap: 12px;
  margin-bottom: 2px;
  
  &:hover {
    background-color: #343541;
  }
  
  @media (max-width: 767px) {
    padding: 8px;
    gap: 10px;
    margin-bottom: 1px;
  }
  
  /* Toque melhorado para mobile */
  @media (hover: none) {
    &:active {
      background-color: #343541;
    }
  }
`;

const NavIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  flex-shrink: 0;
`;

const NavText = styled.span`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  color: #8e8ea0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  margin-top: 16px;
  padding: 0 4px;
  font-weight: 600;
`;

const RecentChatsSection = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const RecentChat = styled.div`
  padding: 12px;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.active ? '#343541' : 'transparent'};
  
  &:hover {
    background-color: #343541;
  }
  
  @media (max-width: 767px) {
    padding: 10px;
    font-size: 13px;
  }
  
  /* Toque melhorado para mobile */
  @media (hover: none) {
    &:active {
      background-color: #343541;
    }
  }
`;

const ChatContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChatTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #8e8ea0;
`;

const ChatMessages = styled.span`
  margin-right: 8px;
`;

const ChatTime = styled.span`
  white-space: nowrap;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #8e8ea0;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  opacity: 0;
  transition: all 0.2s;
  
  ${RecentChat}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background-color: #444654;
    color: #ef4444;
  }
`;

const EmptyChats = styled.div`
  padding: 12px;
  text-align: center;
  color: #8e8ea0;
  font-size: 14px;
  font-style: italic;
`;

const UserSection = styled.div`
  padding: 12px;
  border-top: 1px solid #444654;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 767px) {
    padding: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const UserStatus = styled.div`
  font-size: 12px;
  color: #8e8ea0;
`;

const UpgradeButton = styled.button`
  padding: 6px 12px;
  background-color: transparent;
  color: #10a37f;
  border: 1px solid #10a37f;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #10a37f;
    color: white;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (min-width: 768px) {
    display: none;
  }
  
  /* Animação suave para mobile */
  @media (max-width: 767px) {
    opacity: ${props => props.isOpen ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

const Icon = ({ type }) => {
  const icons = {
    image: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    ),
    grid: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    ),
    search: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    ),
    book: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
    folder: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  };

  return <div style={{ display: 'flex', alignItems: 'center' }}>{icons[type]}</div>;
};

const Sidebar = ({ isOpen = true, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  // Carregar chats do localStorage ao montar
  useEffect(() => {
    const savedChats = localStorage.getItem('cortexai_chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    } else {
      // Chats iniciais de exemplo
      const initialChats = [
        { id: 1, title: 'Nome para projeto IA', messages: 5, timestamp: Date.now() - 3600000 },
        { id: 2, title: 'Ajuda com React', messages: 12, timestamp: Date.now() - 7200000 },
        { id: 3, title: 'API REST Design', messages: 8, timestamp: Date.now() - 86400000 },
      ];
      setChats(initialChats);
      localStorage.setItem('cortexai_chats', JSON.stringify(initialChats));
    }
  }, []);

  const navigationItems = [
    { icon: 'image', text: 'Imagens', path: '/images' },
    { icon: 'grid', text: 'Aplicativos', path: '/apps' },
    { icon: 'search', text: 'Investigação', path: '/research' },
    { icon: 'book', text: 'Codex', path: '/codex' },
    { icon: 'folder', text: 'Projetos', path: '/projects' },
  ];

  // Filtrar chats baseado na busca
  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Criar novo chat
  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `Novo chat ${chats.length + 1}`,
      messages: 0,
      timestamp: Date.now()
    };
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    localStorage.setItem('cortexai_chats', JSON.stringify(updatedChats));
    setActiveChatId(newChat.id);
    navigate('/');
    if (onClose) onClose();
  };

  // Selecionar chat
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    navigate(`/chat/${chatId}`);
    if (onClose) onClose();
  };

  // Navegar para página de navegação
  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  // Deletar chat
  const handleDeleteChat = (e, chatId) => {
    e.stopPropagation();
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    localStorage.setItem('cortexai_chats', JSON.stringify(updatedChats));
    if (activeChatId === chatId) {
      setActiveChatId(null);
      navigate('/');
    }
  };

  // Formatar timestamp
  const formatTimestamp = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (hours < 1) return 'Agora';
    if (hours < 24) return `${hours}h atrás`;
    if (days < 7) return `${days}d atrás`;
    return new Date(timestamp).toLocaleDateString('pt-BR');
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <LogoSection onClick={() => navigate('/')}>
          <LogoIcon>AI</LogoIcon>
          <LogoText>CortexAI</LogoText>
        </LogoSection>

        <NewChatButton onClick={handleNewChat}>
          <span>+</span>
          Novo chat
        </NewChatButton>

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar em chats"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

      <NavigationSection>
        {navigationItems.map((item, index) => (
          <NavItem key={index} onClick={() => handleNavigation(item.path)}>
            <NavIcon>
              <Icon type={item.icon} />
            </NavIcon>
            <NavText>{item.text}</NavText>
          </NavItem>
        ))}
      </NavigationSection>

      <RecentChatsSection>
        <SectionTitle>Recentes</SectionTitle>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <RecentChat 
              key={chat.id} 
              active={activeChatId === chat.id}
              onClick={() => handleSelectChat(chat.id)}
            >
              <ChatContent>
                <ChatTitle>{chat.title}</ChatTitle>
                <ChatMeta>
                  <ChatMessages>{chat.messages} mensagens</ChatMessages>
                  <ChatTime>{formatTimestamp(chat.timestamp)}</ChatTime>
                </ChatMeta>
              </ChatContent>
              <DeleteButton onClick={(e) => handleDeleteChat(e, chat.id)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </DeleteButton>
            </RecentChat>
          ))
        ) : (
          <EmptyChats>
            {searchQuery ? 'Nenhum chat encontrado' : 'Nenhum chat ainda'}
          </EmptyChats>
        )}
      </RecentChatsSection>

      <UserSection>
        <UserInfo>
          <UserAvatar>TE</UserAvatar>
          <UserDetails>
            <UserName>Vinicius B</UserName>
            <UserStatus>Free</UserStatus>
          </UserDetails>
        </UserInfo>
        <UpgradeButton>Fazer upgrade</UpgradeButton>
      </UserSection>
    </SidebarContainer>
    {isOpen && onClose && (
      <Overlay onClick={onClose} />
    )}
    </>
  );
};

export default Sidebar;
