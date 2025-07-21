import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Database,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Monitor,
  Save,
  RefreshCw
} from 'lucide-react';
import { AppState } from '../App';

interface SettingsPanelProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ appState, updateAppState }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'integrations' | 'appearance'>('general');
  const [settings, setSettings] = useState({
    general: {
      language: 'English',
      timezone: 'Africa/Nairobi',
      dateFormat: 'DD/MM/YYYY',
      currency: 'USD',
      autoSave: true,
      defaultRegion: 'all'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      priceAlerts: true,
      campaignUpdates: true,
      systemAlerts: true,
      weeklyReports: true,
      marketingEmails: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      loginNotifications: true,
      apiKeyRotation: true,
      auditLogs: true,
      ipWhitelist: false
    },
    integrations: {
      sapErp: true,
      oracleErp: false,
      whatsappApi: true,
      weatherApi: true,
      telcoGateway: true,
      autoSync: true,
      syncInterval: 15,
      retryAttempts: 3
    },
    appearance: {
      theme: 'light',
      compactMode: false,
      showAnimations: true,
      highContrast: false,
      fontSize: 'medium',
      sidebarCollapsed: false
    }
  });

  const handleSettingChange = (category: keyof typeof settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    console.log('Settings saved:', settings);
    // You would typically send this to an API
  };

  const handleResetSettings = () => {
    // Reset to default settings
    setSettings({
      general: {
        language: 'English',
        timezone: 'Africa/Nairobi',
        dateFormat: 'DD/MM/YYYY',
        currency: 'USD',
        autoSave: true,
        defaultRegion: 'all'
      },
      notifications: {
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        priceAlerts: true,
        campaignUpdates: true,
        systemAlerts: true,
        weeklyReports: true,
        marketingEmails: false
      },
      security: {
        twoFactorAuth: false,
        sessionTimeout: 30,
        loginNotifications: true,
        apiKeyRotation: true,
        auditLogs: true,
        ipWhitelist: false
      },
      integrations: {
        sapErp: true,
        oracleErp: false,
        whatsappApi: true,
        weatherApi: true,
        telcoGateway: true,
        autoSync: true,
        syncInterval: 15,
        retryAttempts: 3
      },
      appearance: {
        theme: 'light',
        compactMode: false,
        showAnimations: true,
        highContrast: false,
        fontSize: 'medium',
        sidebarCollapsed: false
      }
    });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your application preferences and configurations</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleResetSettings}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset to Defaults</span>
          </button>
          <button
            onClick={handleSaveSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-6 text-sm font-medium flex items-center space-x-2 ${
                  activeTab === tab.id 
                    ? 'border-b-2 border-green-500 text-green-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>English</option>
                    <option>Swahili</option>
                    <option>French</option>
                    <option>Arabic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>Africa/Nairobi</option>
                    <option>Africa/Lagos</option>
                    <option>Africa/Dar_es_Salaam</option>
                    <option>Africa/Kampala</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={settings.general.dateFormat}
                    onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={settings.general.currency}
                    onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>USD</option>
                    <option>KES</option>
                    <option>NGN</option>
                    <option>TZS</option>
                    <option>UGX</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Region</label>
                  <select
                    value={settings.general.defaultRegion}
                    onChange={(e) => handleSettingChange('general', 'defaultRegion', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">All Regions</option>
                    <option value="kenya">Kenya</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="tanzania">Tanzania</option>
                    <option value="uganda">Uganda</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Auto-save</h4>
                    <p className="text-sm text-gray-600">Automatically save changes as you work</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.general.autoSave}
                      onChange={(e) => handleSettingChange('general', 'autoSave', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.notifications.emailNotifications}
                      onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-green-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-600">Receive browser push notifications</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.notifications.pushNotifications}
                      onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-purple-500" />
                    <div>
                      <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={settings.notifications.smsNotifications}
                      onChange={(e) => handleSettingChange('notifications', 'smsNotifications', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Notification Types</h4>
                <div className="space-y-3">
                  {[
                    { key: 'priceAlerts', label: 'Price Alerts', description: 'Price approval requests and changes' },
                    { key: 'campaignUpdates', label: 'Campaign Updates', description: 'Campaign performance and milestones' },
                    { key: 'systemAlerts', label: 'System Alerts', description: 'System errors and maintenance' },
                    { key: 'weeklyReports', label: 'Weekly Reports', description: 'Automated weekly performance reports' },
                    { key: 'marketingEmails', label: 'Marketing Emails', description: 'Product updates and newsletters' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.label}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                          onChange={(e) => handleSettingChange('notifications', item.key, e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Appearance Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'light', label: 'Light', icon: Sun },
                    { value: 'dark', label: 'Dark', icon: Moon },
                    { value: 'system', label: 'System', icon: Monitor }
                  ].map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => handleSettingChange('appearance', 'theme', theme.value)}
                      className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 ${
                        settings.appearance.theme === theme.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <theme.icon className="h-6 w-6 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                <select
                  value={settings.appearance.fontSize}
                  onChange={(e) => handleSettingChange('appearance', 'fontSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'compactMode', label: 'Compact Mode', description: 'Reduce spacing and padding for more content' },
                  { key: 'showAnimations', label: 'Show Animations', description: 'Enable smooth transitions and animations' },
                  { key: 'highContrast', label: 'High Contrast', description: 'Increase contrast for better visibility' },
                  { key: 'sidebarCollapsed', label: 'Collapsed Sidebar', description: 'Start with sidebar collapsed by default' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.label}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.appearance[item.key as keyof typeof settings.appearance] as boolean}
                        onChange={(e) => handleSettingChange('appearance', item.key, e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add other tab content here */}
        </div>
      </div>
    </div>
  );
};