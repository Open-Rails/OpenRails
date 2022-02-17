import React from 'react'
import MainHeader from '../../main-header/main-header';
import MainLayoutContainer from './main-layout-style';

interface MainLayoutProps {
  hasHeader?: boolean; 
  hasAside?: boolean; 
  children: any; 
}

const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const {
    hasHeader
  } = props; 

  return <MainLayoutContainer className="main-layout">
    {
      hasHeader && <header>
        <MainHeader/>
      </header>
    }

    <main className="main-app">
      {props.children}
    </main>
  </MainLayoutContainer>
}

export default MainLayout