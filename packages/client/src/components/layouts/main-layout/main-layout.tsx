import React from 'react'
import MainHeader from '../../main-header/main-header';

interface MainLayoutProps {
  hasHeader?: boolean; 
  hasAside?: boolean; 
  children: any; 
}

const MainLayout: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const {
    hasHeader
  } = props; 

  return <div className="main-layout">
    {
      hasHeader && <header>
        <MainHeader/>
      </header>
    }

    <main className="main-app">
      {props.children}
    </main>
  </div>
}

export default MainLayout