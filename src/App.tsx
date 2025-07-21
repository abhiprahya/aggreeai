import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { CampaignManager } from './components/CampaignManager';
import { PricingEngine } from './components/PricingEngine';
import { CommunicationCenter } from './components/CommunicationCenter';
import { RevenueAnalytics } from './components/RevenueAnalytics';
import { APIIntegrations } from './components/APIIntegrations';
import { UserManagement } from './components/UserManagement';
import { FileUploader } from './components/FileUploader';
import { NotificationCenter } from './components/NotificationCenter';
import { UserProfile } from './components/UserProfile';
import { SettingsPanel } from './components/SettingsPanel';

export type ActiveView = 'dashboard' | 'campaigns' | 'pricing' | 'communication' | 'revenue' | 'api' | 'users' | 'upload' | 'notifications' | 'profile' | 'settings';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  region: string;
  avatar?: string;
  permissions: string[];
}

export interface AppState {
  searchQuery: string;
  selectedRegion: string;
  notifications: any[];
  user: User | null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [appState, setAppState] = useState<AppState>({
    searchQuery: '',
    selectedRegion: 'all',
    notifications: [
      { id: '1', title: 'Price approval needed', message: 'Premium Sugar 50kg price update requires approval', type: 'warning', time: '2 hours ago' },
      { id: '2', title: 'Campaign completed', message: 'Q1 Sugar Bundle Promotion has ended successfully', type: 'success', time: '4 hours ago' },
      { id: '3', title: 'Weather alert', message: 'Heavy rains expected in Kenya region', type: 'info', time: '6 hours ago' }
    ],
    user: null
  });

  const handleLogin = (userData: User) => {
    setAppState(prev => ({ ...prev, user: userData }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAppState(prev => ({ ...prev, user: null }));
    setActiveView('dashboard');
  };

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard appState={appState} updateAppState={updateAppState} />;
      case 'campaigns':
        return <CampaignManager appState={appState} updateAppState={updateAppState} />;
      case 'pricing':
        return <PricingEngine appState={appState} updateAppState={updateAppState} />;
      case 'communication':
        return <CommunicationCenter appState={appState} updateAppState={updateAppState} />;
      case 'revenue':
        return <RevenueAnalytics appState={appState} updateAppState={updateAppState} />;
      case 'api':
        return <APIIntegrations appState={appState} updateAppState={updateAppState} />;
      case 'users':
        return <UserManagement appState={appState} updateAppState={updateAppState} />;
      case 'upload':
        return <FileUploader appState={appState} updateAppState={updateAppState} />;
      case 'notifications':
        return <NotificationCenter appState={appState} updateAppState={updateAppState} />;
      case 'profile':
        return <UserProfile appState={appState} updateAppState={updateAppState} />;
      case 'settings':
        return <SettingsPanel appState={appState} updateAppState={updateAppState} />;
      default:
        return <Dashboard appState={appState} updateAppState={updateAppState} />;
    }
  };

  return (
    <Layout 
      activeView={activeView} 
      onViewChange={setActiveView}
      appState={appState}
      updateAppState={updateAppState}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;