import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, X, Filter, BookMarked as MarkAsRead, Trash2, Settings } from 'lucide-react';
import { AppState } from '../App';

interface NotificationCenterProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  time: string;
  read: boolean;
  category: string;
  actionUrl?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ appState, updateAppState }) => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'success' | 'warning' | 'error' | 'info'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Price Approval Required',
      message: 'Premium Sugar 50kg price update from $120 to $125 requires your approval',
      type: 'warning',
      time: '2 hours ago',
      read: false,
      category: 'Pricing',
      actionUrl: '/pricing'
    },
    {
      id: '2',
      title: 'Campaign Performance Alert',
      message: 'Q1 Sugar Bundle Promotion has exceeded target by 15% in Kenya region',
      type: 'success',
      time: '4 hours ago',
      read: false,
      category: 'Campaigns'
    },
    {
      id: '3',
      title: 'Weather Advisory',
      message: 'Heavy rains expected in Tanzania region. Consider adjusting harvest schedules.',
      type: 'info',
      time: '6 hours ago',
      read: true,
      category: 'Weather'
    },
    {
      id: '4',
      title: 'API Integration Error',
      message: 'SAP ERP connection failed. Last successful sync was 8 hours ago.',
      type: 'error',
      time: '8 hours ago',
      read: false,
      category: 'System'
    },
    {
      id: '5',
      title: 'New User Registration',
      message: 'David Mwangi has been added as Field Agent for Kenya region',
      type: 'info',
      time: '1 day ago',
      read: true,
      category: 'Users'
    },
    {
      id: '6',
      title: 'Revenue Milestone',
      message: 'Monthly revenue target of $2M achieved 5 days ahead of schedule',
      type: 'success',
      time: '1 day ago',
      read: true,
      category: 'Revenue'
    },
    {
      id: '7',
      title: 'WhatsApp Rate Limit',
      message: 'WhatsApp API rate limit reached. Some messages may be delayed.',
      type: 'warning',
      time: '2 days ago',
      read: false,
      category: 'Communication'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return AlertCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All notifications read'}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={clearAll}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'success', label: 'Success', count: notifications.filter(n => n.type === 'success').length },
              { key: 'warning', label: 'Warnings', count: notifications.filter(n => n.type === 'warning').length },
              { key: 'error', label: 'Errors', count: notifications.filter(n => n.type === 'error').length },
              { key: 'info', label: 'Info', count: notifications.filter(n => n.type === 'info').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filter === tab.key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    filter === tab.key
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-200">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                {filter === 'all' ? 'You have no notifications' : `No ${filter} notifications`}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = getIcon(notification.type);
              
              return (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg border ${getTypeColor(notification.type)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{notification.time}</span>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          notification.type === 'success' ? 'bg-green-100 text-green-800' :
                          notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          notification.type === 'error' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {notification.category}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          {notification.actionUrl && (
                            <button className="text-xs text-green-600 hover:text-green-800 font-medium">
                              View Details
                            </button>
                          )}
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs text-red-600 hover:text-red-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Notification Preferences
        </h3>
        
        <div className="space-y-4">
          {[
            { label: 'Price approval requests', description: 'Get notified when price changes need approval' },
            { label: 'Campaign performance alerts', description: 'Receive updates on campaign milestones' },
            { label: 'System integration errors', description: 'Alert me when API integrations fail' },
            { label: 'Weather advisories', description: 'Get weather-related notifications for your regions' },
            { label: 'Revenue milestones', description: 'Notify when revenue targets are reached' },
            { label: 'User management updates', description: 'Get notified about user additions and changes' }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{setting.label}</p>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};