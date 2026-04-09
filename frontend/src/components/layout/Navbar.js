import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import AISelector from '../ai/AISelector';

const NavbarContainer = styled.div`
  height: 60px;
  background-color: #343541;
  border-bottom: 1px solid #444654;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 767px) {
    height: 56px;
    padding: 0 12px;
  }
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  min-width: 0;
  
  @media (max-width: 767px) {
    gap: 8px;
  }
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 767px) {
    gap: 8px;
  }
`;

const Brand = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 767px) {
    font-size: 16px;
    gap: 6px;
  }
`;

const BrandIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #10a37f 0%, #0d7f61 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  
  @media (max-width: 767px) {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.active ? 'white' : '#8e8ea0'};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '400'};
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
  font-size: 14px;
  white-space: nowrap;
  
  &:hover {
    background-color: #444654;
    color: white;
  }
  
  @media (max-width: 767px) {
    display: none;
  }
  
  /* Mostrar apenas alguns links em mobile */
  @media (max-width: 480px) {
    &:not(:first-child) {
      display: none;
    }
  }
`;

const NavButton = styled.button`
  background: transparent;
  border: 1px solid #444654;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background-color: #444654;
    border-color: #10a37f;
  }
  
  @media (max-width: 767px) {
    padding: 6px 10px;
    font-size: 12px;
    
    span {
      display: none;
    }
  }
  
  /* Toque melhorado para mobile */
  @media (hover: none) {
    &:active {
      background-color: #444654;
    }
  }
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  @media (min-width: 768px) {
    display: none;
  }
  
  &:hover {
    background-color: #444654;
  }
  
  @media (max-width: 767px) {
    padding: 6px;
  }
  
  /* Toque melhorado para mobile */
  @media (hover: none) {
    &:active {
      background-color: #444654;
    }
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 767px) {
    width: 28px;
    height: 28px;
    font-size: 10px;
  }
  
  /* Toque melhorado para mobile */
  @media (hover: none) {
    &:active {
      transform: scale(0.95);
    }
  }
`;

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Chat' },
    { path: '/history', label: 'Histórico' },
    { path: '/ai-config', label: 'Modelos IA' },
    { path: '/settings', label: 'Configurações' }
  ];

  return (
    <NavbarContainer>
      <NavbarLeft>
        <MenuButton onClick={onMenuClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </MenuButton>
        <Brand>
          <BrandIcon>AI</BrandIcon>
          CortexAI
        </Brand>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            active={location.pathname === item.path ? 1 : 0}
          >
            {item.label}
          </NavLink>
        ))}
      </NavbarLeft>
      <NavbarRight>
        <AISelector />
        <NavButton>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 1.54l4.24 4.24M20.46 20.46l-4.24-4.24M1.54 20.46l4.24-4.24"></path>
          </svg>
          Compartilhar
        </NavButton>
        <UserAvatar>VB</UserAvatar>
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;
