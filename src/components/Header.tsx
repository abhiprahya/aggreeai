import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Globe, 
  Settings, 
  LogOut,
  ChevronDown,
  Filter,
  Download,
  Upload
} from 'lucide-react';
import { ActiveView, AppState } from '../App';

interface HeaderProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
  onViewChange: (view: ActiveView) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  appState, 
  updateAppState, 
  onViewChange,
  onLogout 
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRegionMenu, setShowRegionMenu] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const regions = [
    { id: 'all', name: 'All Regions', flag: '🌍' },
    { id: 'kenya', name: 'Kenya', flag: '🇰🇪' },
    { id: 'nigeria', name: 'Nigeria', flag: '🇳🇬' },
    { id: 'tanzania', name: 'Tanzania', flag: '🇹🇿' },
    { id: 'uganda', name: 'Uganda', flag: '🇺🇬' }
  ];

  const searchData = [
    { type: 'campaign', title: 'Q1 Sugar Bundle Promotion', subtitle: 'Active campaign in Kenya', action: () => onViewChange('campaigns') },
    { type: 'product', title: 'Premium Sugar 50kg', subtitle: 'Price: $125, Margin: 23%', action: () => onViewChange('pricing') },
    { type: 'user', title: 'John Okafor', subtitle: 'Sales Manager - Nigeria', action: () => onViewChange('users') },
    { type: 'report', title: 'Revenue Analytics', subtitle: 'Monthly performance report', action: () => onViewChange('revenue') },
    { type: 'integration', title: 'SAP ERP Integration', subtitle: 'Connected - Last sync 2h ago', action: () => onViewChange('api') }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setShowRegionMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    updateAppState({ searchQuery: query });
    
    if (query.length > 0) {
      const filtered = searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleRegionChange = (regionId: string) => {
    updateAppState({ selectedRegion: regionId });
    setShowRegionMenu(false);
  };

  const handleExportData = () => {
    // Simulate export functionality
    const data = {
      timestamp: new Date().toISOString(),
      region: appState.selectedRegion,
      searchQuery: appState.searchQuery,
      exportType: 'dashboard_summary'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aggree-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const selectedRegion = regions.find(r => r.id === appState.selectedRegion) || regions[0];
  const unreadNotifications = appState.notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search campaigns, products, users, reports..."
              value={appState.searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-80"
            />
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      result.action();
                      setShowSearchResults(false);
                      updateAppState({ searchQuery: '' });
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        result.type === 'campaign' ? 'bg-blue-500' :
                        result.type === 'product' ? 'bg-green-500' :
                        result.type === 'user' ? 'bg-purple-500' :
                        result.type === 'report' ? 'bg-orange-500' :
                        'bg-gray-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{result.title}</p>
                        <p className="text-xs text-gray-500">{result.subtitle}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onViewChange('upload')}
              className="flex items-center space-x-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </button>
            
            <button
              onClick={handleExportData}
              className="flex items-center space-x-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Region Selector */}
          <div className="relative" ref={regionRef}>
            <button
              onClick={() => setShowRegionMenu(!showRegionMenu)}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span>{selectedRegion.flag} {selectedRegion.name}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            
            {showRegionMenu && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleRegionChange(region.id)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 ${
                      region.id === appState.selectedRegion ? 'bg-green-50 text-green-600' : 'text-gray-700'
                    }`}
                  >
                    <span>{region.flag}</span>
                    <span>{region.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                onViewChange('notifications');
              }}
              className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>
          
          {/* Settings */}
          <button
            onClick={() => onViewChange('settings')}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Settings className="h-5 w-5" />
          </button>
          
          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{appState.user?.name}</div>
                <div className="text-xs text-gray-500">{appState.user?.role}</div>
              </div>
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </button>
            
            {showProfileMenu && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{appState.user?.name}</p>
                  <p className="text-xs text-gray-500">{appState.user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    onViewChange('profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    onViewChange('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <hr className="my-1" />
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};