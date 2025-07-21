import React, { useState } from 'react';
import { Plug, Cloud, Database, CheckCircle, AlertCircle, Settings, Key, Zap, Globe, RefreshCw as Refresh } from 'lucide-react';

export const APIIntegrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'integrations' | 'logs' | 'settings'>('integrations');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const integrations = [
    {
      id: 'sap',
      name: 'SAP ERP',
      description: 'Enterprise resource planning system integration',
      status: 'connected',
      lastSync: '2024-01-15 10:30',
      endpoint: 'https://api.sap.com/v1',
      requests: 1247,
      uptime: '99.8%',
      icon: Database
    },
    {
      id: 'weather',
      name: 'Weather API',
      description: 'Real-time weather data for agricultural insights',
      status: 'connected',
      lastSync: '2024-01-15 11:45',
      endpoint: 'https://api.weather.com/v1',
      requests: 892,
      uptime: '99.9%',
      icon: Cloud
    },
    {
      id: 'oracle',
      name: 'Oracle ERP',
      description: 'Oracle enterprise system integration',
      status: 'error',
      lastSync: '2024-01-14 15:20',
      endpoint: 'https://api.oracle.com/v2',
      requests: 456,
      uptime: '97.2%',
      icon: Database
    },
    {
      id: 'telco',
      name: 'Africa Telco Gateway',
      description: 'SMS and communication services',
      status: 'connected',
      lastSync: '2024-01-15 11:50',
      endpoint: 'https://api.telco.africa/v1',
      requests: 2134,
      uptime: '99.5%',
      icon: Globe
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business API',
      description: 'WhatsApp messaging integration',
      status: 'warning',
      lastSync: '2024-01-15 09:15',
      endpoint: 'https://api.whatsapp.com/v1',
      requests: 1678,
      uptime: '98.7%',
      icon: Zap
    }
  ];

  const apiLogs = [
    {
      id: '1',
      timestamp: '2024-01-15 11:45:23',
      endpoint: 'Weather API',
      method: 'GET',
      status: 200,
      responseTime: '245ms',
      message: 'Weather data retrieved successfully'
    },
    {
      id: '2',
      timestamp: '2024-01-15 11:44:12',
      endpoint: 'SAP ERP',
      method: 'POST',
      status: 201,
      responseTime: '1.2s',
      message: 'Product pricing updated'
    },
    {
      id: '3',
      timestamp: '2024-01-15 11:42:55',
      endpoint: 'WhatsApp API',
      method: 'POST',
      status: 429,
      responseTime: '890ms',
      message: 'Rate limit exceeded'
    },
    {
      id: '4',
      timestamp: '2024-01-15 11:41:33',
      endpoint: 'Oracle ERP',
      method: 'GET',
      status: 500,
      responseTime: '2.5s',
      message: 'Internal server error'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusCodeColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 400 && status < 500) return 'text-yellow-600';
    if (status >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Integrations</h1>
          <p className="text-gray-600">Manage ERP, weather, and communication integrations</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Refresh className="h-4 w-4" />
            <span>Sync All</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <Plug className="h-4 w-4" />
            <span>Add Integration</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            title: 'Active Integrations', 
            value: '5', 
            icon: Plug, 
            color: 'blue',
            description: 'Connected systems'
          },
          { 
            title: 'API Requests', 
            value: '12.4K', 
            icon: Zap, 
            color: 'green',
            description: 'Last 24 hours'
          },
          { 
            title: 'Avg Response Time', 
            value: '650ms', 
            icon: CheckCircle, 
            color: 'purple',
            description: 'System performance'
          },
          { 
            title: 'Success Rate', 
            value: '98.7%', 
            icon: Globe, 
            color: 'orange',
            description: 'API reliability'
          }
        ].map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <metric.icon className={`h-5 w-5 ${
                metric.color === 'blue' ? 'text-blue-500' :
                metric.color === 'green' ? 'text-green-500' :
                metric.color === 'purple' ? 'text-purple-500' :
                'text-orange-500'
              }`} />
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
            </div>
            <p className="text-sm font-medium text-gray-900 mt-2">{metric.title}</p>
            <p className="text-xs text-gray-500">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('integrations')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'integrations' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Plug className="h-4 w-4" />
                <span>Integrations</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'logs' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>API Logs</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'settings' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </div>
            </button>
          </nav>
        </div>

        {activeTab === 'integrations' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integration) => (
                <div key={integration.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <integration.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(integration.status)}
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(integration.status)}`}>
                        {integration.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Requests (24h)</p>
                      <p className="font-semibold text-gray-900">{integration.requests.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Uptime</p>
                      <p className="font-semibold text-gray-900">{integration.uptime}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <p>Last sync: {integration.lastSync}</p>
                    <p className="truncate">Endpoint: {integration.endpoint}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedIntegration(integration.id);
                        setShowKeyModal(true);
                      }}
                      className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <Settings className="h-3 w-3" />
                      <span>Configure</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      <Refresh className="h-3 w-3" />
                      <span>Sync</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Endpoint
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {apiLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.endpoint}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {log.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${getStatusCodeColor(log.status)}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.responseTime}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {log.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Timeout (ms)
                    </label>
                    <input
                      type="number"
                      defaultValue="5000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retry Attempts
                    </label>
                    <input
                      type="number"
                      defaultValue="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rate Limit (requests/minute)
                    </label>
                    <input
                      type="number"
                      defaultValue="1000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Log Level
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option>INFO</option>
                      <option>DEBUG</option>
                      <option>ERROR</option>
                      <option>WARN</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Enable API Key Rotation</p>
                      <p className="text-sm text-gray-600">Automatically rotate API keys every 90 days</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Enable Request Logging</p>
                      <p className="text-sm text-gray-600">Log all API requests for debugging</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                  Reset
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Configure API Keys</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your API key"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                  />
                  <Key className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Secret</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your API secret"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent pr-10"
                  />
                  <Key className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endpoint URL</label>
                <input
                  type="url"
                  placeholder="https://api.example.com/v1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};