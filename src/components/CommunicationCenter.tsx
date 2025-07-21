import React, { useState } from 'react';
import { 
  MessageSquare, 
  Phone, 
  Send, 
  Users, 
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Plus,
  Download
} from 'lucide-react';

export const CommunicationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'sms' | 'campaigns'>('whatsapp');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const messages = [
    {
      id: '1',
      type: 'whatsapp',
      recipient: 'John Kamau',
      phone: '+254712345678',
      message: 'New pricing for Premium Sugar 50kg: $125. Accept or reject?',
      status: 'delivered',
      timestamp: '2024-01-15 10:30',
      response: 'Accept',
      campaign: 'Q1 Sugar Bundle Promotion'
    },
    {
      id: '2',
      type: 'sms',
      recipient: 'Mary Okafor',
      phone: '+2348012345678',
      message: 'Beverage Mix Pro launch: Special offer 20% off. Reply YES to order.',
      status: 'pending',
      timestamp: '2024-01-15 09:15',
      response: null,
      campaign: 'Beverage Mix Launch'
    },
    {
      id: '3',
      type: 'whatsapp',
      recipient: 'David Mwangi',
      phone: '+254722345678',
      message: 'Weather alert: Rain expected. Adjust harvest schedule accordingly.',
      status: 'read',
      timestamp: '2024-01-15 08:45',
      response: 'Acknowledged',
      campaign: 'Weather Advisory'
    },
    {
      id: '4',
      type: 'sms',
      recipient: 'Grace Ndovu',
      phone: '+255712345678',
      message: 'Organic Cane Sugar available. Price: $140/50kg. Bulk discounts available.',
      status: 'failed',
      timestamp: '2024-01-15 07:30',
      response: null,
      campaign: 'Seasonal Harvest Offer'
    }
  ];

  const campaigns = [
    {
      id: '1',
      name: 'Q1 Sugar Bundle Promotion',
      type: 'pricing',
      recipients: 1247,
      sent: 1247,
      delivered: 1198,
      responded: 892,
      status: 'active'
    },
    {
      id: '2',
      name: 'Beverage Mix Launch',
      type: 'product',
      recipients: 1850,
      sent: 1850,
      delivered: 1789,
      responded: 1234,
      status: 'active'
    },
    {
      id: '3',
      name: 'Weather Advisory',
      type: 'advisory',
      recipients: 890,
      sent: 890,
      delivered: 876,
      responded: 654,
      status: 'completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'read': return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication Center</h1>
          <p className="text-gray-600">Field engagement via WhatsApp and SMS</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <Plus className="h-4 w-4" />
            <span>New Message</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            title: 'Messages Sent', 
            value: '4,987', 
            icon: Send, 
            color: 'blue',
            change: '+12.3%'
          },
          { 
            title: 'Delivered', 
            value: '4,863', 
            icon: CheckCircle, 
            color: 'green',
            change: '+11.8%'
          },
          { 
            title: 'Response Rate', 
            value: '78%', 
            icon: MessageSquare, 
            color: 'purple',
            change: '+5.2%'
          },
          { 
            title: 'Active Contacts', 
            value: '2,456', 
            icon: Users, 
            color: 'orange',
            change: '+8.7%'
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
              <span className="text-sm text-green-600">{metric.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
            <p className="text-sm text-gray-600">{metric.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'whatsapp' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Messages</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('sms')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'sms' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>SMS Messages</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-4 px-6 text-sm font-medium ${
                activeTab === 'campaigns' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Campaigns</span>
              </div>
            </button>
          </nav>
        </div>

        {activeTab === 'campaigns' ? (
          <div className="p-6">
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{campaign.type} campaign</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Recipients</p>
                      <p className="text-lg font-semibold text-gray-900">{campaign.recipients.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sent</p>
                      <p className="text-lg font-semibold text-gray-900">{campaign.sent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Delivered</p>
                      <p className="text-lg font-semibold text-gray-900">{campaign.delivered.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Responded</p>
                      <p className="text-lg font-semibold text-gray-900">{campaign.responded.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Response Rate</span>
                      <span>{Math.round((campaign.responded / campaign.sent) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(campaign.responded / campaign.sent) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages
                    .filter(msg => activeTab === 'whatsapp' ? msg.type === 'whatsapp' : msg.type === 'sms')
                    .map((message) => (
                    <tr key={message.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{message.recipient}</div>
                          <div className="text-sm text-gray-500">{message.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{message.message}</div>
                        <div className="text-sm text-gray-500">{message.timestamp}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(message.status)}
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(message.status)}`}>
                            {message.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {message.response ? (
                          <span className="text-sm text-green-600 font-medium">{message.response}</span>
                        ) : (
                          <span className="text-sm text-gray-400">No response</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{message.campaign}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Send Price Update</p>
                  <p className="text-sm text-gray-500">Notify contacts about price changes</p>
                </div>
                <Send className="h-4 w-4 text-gray-400" />
              </div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Weather Alert</p>
                  <p className="text-sm text-gray-500">Send weather-based advisories</p>
                </div>
                <AlertCircle className="h-4 w-4 text-gray-400" />
              </div>
            </button>
            <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Product Launch</p>
                  <p className="text-sm text-gray-500">Announce new product availability</p>
                </div>
                <Plus className="h-4 w-4 text-gray-400" />
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>John Kamau:</strong> "Great pricing on sugar. Will order 20 bags."
              </p>
              <p className="text-xs text-green-600 mt-1">2 hours ago</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Mary Okafor:</strong> "Need more information about beverage mix ingredients."
              </p>
              <p className="text-xs text-yellow-600 mt-1">4 hours ago</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>David Mwangi:</strong> "Weather alert very helpful. Adjusting harvest schedule."
              </p>
              <p className="text-xs text-blue-600 mt-1">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};