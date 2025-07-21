import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ActiveView, AppState } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeView, 
  onViewChange, 
  appState, 
  updateAppState,
  onLogout 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeView={activeView} 
        onViewChange={onViewChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        appState={appState}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          appState={appState}
          updateAppState={updateAppState}
          onViewChange={onViewChange}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};