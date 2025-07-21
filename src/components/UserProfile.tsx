import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Edit,
  Save,
  Camera,
  Key,
  Activity,
  Award,
  Clock
} from 'lucide-react';
import { AppState } from '../App';

interface UserProfileProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ appState, updateAppState }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'activity' | 'security'>('profile');
  const [formData, setFormData] = useState({
    name: appState.user?.name || '',
    email: appState.user?.email || '',
    phone: '+254712345678',
    region: appState.user?.region || '',
    role: appState.user?.role || '',
    bio: 'Experienced agricultural technology professional with 8+ years in agri-value chain optimization.',
    timezone: 'Africa/Nairobi',
    language: 'English'
  });

  const userStats = [
    { label: 'Campaigns Managed', value: '24', icon: Activity, color: 'blue' },
    { label: 'Price Approvals', value: '156', icon: Shield, color: 'green' },
    { label: 'Revenue Generated', value: '$2.4M', icon: Award, color: 'purple' },
    { label: 'Days Active', value: '342', icon: Clock, color: 'orange' }
  ];

  const recentActivity = [
    { action: 'Approved price change for Premium Sugar 50kg', time: '2 hours ago', type: 'approval' },
    { action: 'Created Q2 Beverage Mix campaign', time: '4 hours ago', type: 'campaign' },
    { action: 'Updated user permissions for John Okafor', time: '1 day ago', type: 'user' },
    { action: 'Generated revenue analytics report', time: '2 days ago', type: 'report' },
    { action: 'Configured SAP ERP integration', time: '3 days ago', type: 'system' }
  ];

  const handleSave = () => {
    // Update user data
    if (appState.user) {
      const updatedUser = {
        ...appState.user,
        name: formData.name,
        email: formData.email,
        region: formData.region
      };
      updateAppState({ user: updatedUser });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: appState.user?.name || '',
      email: appState.user?.email || '',
      phone: '+254712345678',
      region: appState.user?.region || '',
      role: appState.user?.role || '',
      bio: 'Experienced agricultural technology professional with 8+ years in agri-value chain optimization.',
      timezone: 'Africa/Nairobi',
      language: 'English'
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="h-24 w-24 bg-green-500 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50">
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{appState.user?.name}</h2>
            <p className="text-gray-600">{appState.user?.role}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>{appState.user?.email}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{appState.user?.region}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <stat.icon className={`h-6 w-6 ${
                stat.color === 'blue' ? 'text-blue-500' :
                stat.color === 'green' ? 'text-green-500' :
                stat.color === 'purple' ? 'text-purple-500' :
                'text-orange-500'
              }`} />
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'profile' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'activity' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Recent Activity
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'security' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Security Settings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                  {isEditing ? (
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option>All Regions</option>
                      <option>Kenya</option>
                      <option>Nigeria</option>
                      <option>Tanzania</option>
                      <option>Uganda</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{formData.region}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <p className="text-gray-900">{formData.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  {isEditing ? (
                    <select
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option>Africa/Nairobi</option>
                      <option>Africa/Lagos</option>
                      <option>Africa/Dar_es_Salaam</option>
                      <option>Africa/Kampala</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{formData.timezone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{formData.bio}</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'approval' ? 'bg-green-500' :
                      activity.type === 'campaign' ? 'bg-blue-500' :
                      activity.type === 'user' ? 'bg-purple-500' :
                      activity.type === 'report' ? 'bg-orange-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Password</h4>
                      <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Key className="h-4 w-4" />
                      <span>Change Password</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Login Notifications</h4>
                      <p className="text-sm text-gray-600">Get notified of new sign-ins</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Active Sessions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-gray-900">Current Session</p>
                        <p className="text-gray-600">Chrome on MacOS • Nairobi, Kenya</p>
                      </div>
                      <span className="text-green-600">Active</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-gray-900">Mobile App</p>
                        <p className="text-gray-600">iOS App • Last seen 2 hours ago</p>
                      </div>
                      <button className="text-red-600 hover:text-red-800">Revoke</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};