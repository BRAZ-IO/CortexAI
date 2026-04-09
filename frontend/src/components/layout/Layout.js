import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0;
  width: 100%;
  
  @media (min-width: 768px) {
    margin-left: 260px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  background-color: #343541;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  
  /* Otimizações para mobile */
  @media (max-width: 767px) {
    padding-bottom: 60px; /* Espaço para elementos fixos */
  }
`;

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <LayoutContainer>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      <MainContent>
        <Navbar onMenuClick={toggleSidebar} />
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;
