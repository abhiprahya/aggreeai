import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  MapPin, 
  Target, 
  Play, 
  Pause, 
  BarChart3,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

export const CampaignManager: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const campaigns = [
    {
      id: '1',
      name: 'Q1 Sugar Bundle Promotion',
      product: 'Premium Sugar 50kg',
      region: 'Kenya',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      budget: '$25,000',
      spent: '$18,500',
      reach: '12,450',
      conversions: '2,890',
      performance: 92
    },
    {
      id: '2',
      name: 'Beverage Mix Launch',
      product: 'Beverage Mix Pro',
      region: 'Nigeria',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-04-01',
      budget: '$35,000',
      spent: '$22,100',
      reach: '18,750',
      conversions: '4,230',
      performance: 87
    },
    {
      id: '3',
      name: 'Seasonal Harvest Offer',
      product: 'Organic Cane Sugar',
      region: 'Tanzania',
      status: 'paused',
      startDate: '2024-01-20',
      endDate: '2024-03-20',
      budget: '$15,000',
      spent: '$8,900',
      reach: '7,890',
      conversions: '1,560',
      performance: 78
    },
    {
      id: '4',
      name: 'Industrial Syrup B2B',
      product: 'Industrial Syrup',
      region: 'Kenya',
      status: 'scheduled',
      startDate: '2024-03-01',
      endDate: '2024-05-01',
      budget: '$40,000',
      spent: '$0',
      reach: '0',
      conversions: '0',
      performance: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">GTM Campaign Manager</h1>
          <p className="text-gray-600">Create and manage go-to-market campaigns across regions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Active Campaigns', value: '12', color: 'green' },
          { title: 'Total Reach', value: '45.2K', color: 'blue' },
          { title: 'Avg. Performance', value: '87%', color: 'purple' },
          { title: 'Budget Utilization', value: '74%', color: 'orange' }
        ].map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">{metric.title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Campaign Overview</h2>
            <div className="flex items-center space-x-2">
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>All Regions</option>
                <option>Kenya</option>
                <option>Nigeria</option>
                <option>Tanzania</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>All Status</option>
                <option>Active</option>
                <option>Paused</option>
                <option>Scheduled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.product}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{campaign.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.budget}</div>
                    <div className="text-sm text-gray-500">Spent: {campaign.spent}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${campaign.performance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{campaign.performance}%</span>
                    </div>
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

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Campaign</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Premium Sugar 50kg</option>
                  <option>Beverage Mix Pro</option>
                  <option>Organic Cane Sugar</option>
                  <option>Industrial Syrup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Kenya</option>
                  <option>Nigeria</option>
                  <option>Tanzania</option>
                  <option>Uganda</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter budget amount"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};