import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Plus, 
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  UserCheck,
  UserX
} from 'lucide-react';

export const UserManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const users = [
    {
      id: '1',
      name: 'Sarah Mwangi',
      email: 'sarah.mwangi@aggree.ai',
      role: 'Regional Manager',
      region: 'Kenya',
      status: 'active',
      lastLogin: '2024-01-15 10:30',
      phone: '+254712345678',
      campaigns: 12,
      permissions: ['campaigns', 'pricing', 'analytics']
    },
    {
      id: '2',
      name: 'John Okafor',
      email: 'john.okafor@aggree.ai',
      role: 'Sales Manager',
      region: 'Nigeria',
      status: 'active',
      lastLogin: '2024-01-15 09:15',
      phone: '+2348012345678',
      campaigns: 8,
      permissions: ['campaigns', 'communication']
    },
    {
      id: '3',
      name: 'Grace Ndovu',
      email: 'grace.ndovu@aggree.ai',
      role: 'Field Agent',
      region: 'Tanzania',
      status: 'inactive',
      lastLogin: '2024-01-14 16:45',
      phone: '+255712345678',
      campaigns: 3,
      permissions: ['communication']
    },
    {
      id: '4',
      name: 'David Mwangi',
      email: 'david.mwangi@aggree.ai',
      role: 'Analytics Manager',
      region: 'Kenya',
      status: 'active',
      lastLogin: '2024-01-15 11:20',
      phone: '+254722345678',
      campaigns: 0,
      permissions: ['analytics', 'api']
    },
    {
      id: '5',
      name: 'Mary Kamau',
      email: 'mary.kamau@aggree.ai',
      role: 'Admin',
      region: 'All Regions',
      status: 'active',
      lastLogin: '2024-01-15 08:00',
      phone: '+254733345678',
      campaigns: 25,
      permissions: ['campaigns', 'pricing', 'analytics', 'api', 'users']
    }
  ];

  const roles = [
    { name: 'Admin', permissions: ['campaigns', 'pricing', 'analytics', 'api', 'users'] },
    { name: 'Regional Manager', permissions: ['campaigns', 'pricing', 'analytics'] },
    { name: 'Sales Manager', permissions: ['campaigns', 'communication'] },
    { name: 'Field Agent', permissions: ['communication'] },
    { name: 'Analytics Manager', permissions: ['analytics', 'api'] }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Regional Manager': return 'bg-blue-100 text-blue-800';
      case 'Sales Manager': return 'bg-green-100 text-green-800';
      case 'Field Agent': return 'bg-yellow-100 text-yellow-800';
      case 'Analytics Manager': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage team members and their permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            title: 'Total Users', 
            value: '24', 
            icon: Users, 
            color: 'blue',
            description: 'Active team members'
          },
          { 
            title: 'Active Sessions', 
            value: '18', 
            icon: UserCheck, 
            color: 'green',
            description: 'Currently logged in'
          },
          { 
            title: 'Pending Invites', 
            value: '3', 
            icon: Mail, 
            color: 'yellow',
            description: 'Awaiting activation'
          },
          { 
            title: 'Suspended', 
            value: '1', 
            icon: UserX, 
            color: 'red',
            description: 'Inactive accounts'
          }
        ].map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <metric.icon className={`h-5 w-5 ${
                metric.color === 'blue' ? 'text-blue-500' :
                metric.color === 'green' ? 'text-green-500' :
                metric.color === 'yellow' ? 'text-yellow-500' :
                'text-red-500'
              }`} />
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
            </div>
            <p className="text-sm font-medium text-gray-900 mt-2">{metric.title}</p>
            <p className="text-xs text-gray-500">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
            <div className="flex items-center space-x-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Regional Manager</option>
                <option>Sales Manager</option>
                <option>Field Agent</option>
                <option>Analytics Manager</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>All Regions</option>
                <option>Kenya</option>
                <option>Nigeria</option>
                <option>Tanzania</option>
                <option>Uganda</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaigns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{user.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.campaigns}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
          <div className="space-y-4">
            {roles.map((role, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(role.name)}`}>
                    {role.name}
                  </span>
                  <Shield className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { user: 'Sarah Mwangi', action: 'Updated campaign pricing', time: '2 hours ago' },
              { user: 'John Okafor', action: 'Sent WhatsApp messages', time: '4 hours ago' },
              { user: 'David Mwangi', action: 'Generated analytics report', time: '6 hours ago' },
              { user: 'Mary Kamau', action: 'Added new user', time: '1 day ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-xs">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Select a role</option>
                  <option>Regional Manager</option>
                  <option>Sales Manager</option>
                  <option>Field Agent</option>
                  <option>Analytics Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Select a region</option>
                  <option>Kenya</option>
                  <option>Nigeria</option>
                  <option>Tanzania</option>
                  <option>Uganda</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};