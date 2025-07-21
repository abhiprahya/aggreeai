import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  CheckCircle,
  Clock,
  Settings,
  BarChart3,
  Target
} from 'lucide-react';

export const PricingEngine: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [pendingPrice, setPendingPrice] = useState<any>(null);

  const products = [
    {
      id: '1',
      name: 'Premium Sugar 50kg',
      currentPrice: 120,
      suggestedPrice: 125,
      region: 'Kenya',
      demand: 'high',
      elasticity: 0.85,
      margin: 23,
      lastUpdate: '2 hours ago',
      status: 'pending_approval'
    },
    {
      id: '2',
      name: 'Beverage Mix Pro',
      currentPrice: 85,
      suggestedPrice: 88,
      region: 'Nigeria',
      demand: 'medium',
      elasticity: 0.92,
      margin: 18,
      lastUpdate: '4 hours ago',
      status: 'approved'
    },
    {
      id: '3',
      name: 'Organic Cane Sugar',
      currentPrice: 145,
      suggestedPrice: 140,
      region: 'Tanzania',
      demand: 'low',
      elasticity: 0.78,
      margin: 28,
      lastUpdate: '1 day ago',
      status: 'rejected'
    },
    {
      id: '4',
      name: 'Industrial Syrup',
      currentPrice: 200,
      suggestedPrice: 205,
      region: 'Kenya',
      demand: 'high',
      elasticity: 0.65,
      margin: 15,
      lastUpdate: '6 hours ago',
      status: 'auto_approved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'auto_approved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleApprovePrice = (product: any) => {
    setPendingPrice(product);
    setShowApprovalModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dynamic Pricing Engine</h1>
          <p className="text-gray-600">AI-powered pricing optimization with approval workflows</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Settings className="h-4 w-4" />
            <span>Configure Rules</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            title: 'Pending Approvals', 
            value: '3', 
            icon: Clock, 
            color: 'yellow',
            description: 'Price updates awaiting approval'
          },
          { 
            title: 'Auto-Approved', 
            value: '12', 
            icon: CheckCircle, 
            color: 'green',
            description: 'Automatically approved this week'
          },
          { 
            title: 'Avg. Margin Impact', 
            value: '+2.3%', 
            icon: TrendingUp, 
            color: 'blue',
            description: 'Margin improvement from AI pricing'
          },
          { 
            title: 'Price Elasticity', 
            value: '0.82', 
            icon: Target, 
            color: 'purple',
            description: 'Average elasticity across products'
          }
        ].map((metric, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <metric.icon className={`h-5 w-5 ${
                metric.color === 'yellow' ? 'text-yellow-500' :
                metric.color === 'green' ? 'text-green-500' :
                metric.color === 'blue' ? 'text-blue-500' :
                'text-purple-500'
              }`} />
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
            </div>
            <p className="text-sm font-medium text-gray-900 mt-2">{metric.title}</p>
            <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Price Optimization Dashboard</h2>
            <div className="flex items-center space-x-2">
              <select 
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Products</option>
                <option value="sugar">Sugar Products</option>
                <option value="beverage">Beverage Products</option>
                <option value="syrup">Syrup Products</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                <option>All Regions</option>
                <option>Kenya</option>
                <option>Nigeria</option>
                <option>Tanzania</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suggested Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Demand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Elasticity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.region}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.currentPrice}</div>
                    <div className="text-sm text-gray-500">Margin: {product.margin}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">${product.suggestedPrice}</span>
                      {product.suggestedPrice > product.currentPrice ? (
                        <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                      ) : product.suggestedPrice < product.currentPrice ? (
                        <TrendingDown className="h-4 w-4 text-red-500 ml-2" />
                      ) : null}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.suggestedPrice > product.currentPrice ? '+' : ''}
                      {(((product.suggestedPrice - product.currentPrice) / product.currentPrice) * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getDemandColor(product.demand)}`}>
                      {product.demand}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.elasticity}</div>
                    <div className="text-sm text-gray-500">Updated {product.lastUpdate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(product.status)}`}>
                      {product.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {product.status === 'pending_approval' && (
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleApprovePrice(product)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <AlertCircle className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Optimization Rules</h3>
          <div className="space-y-3">
            {[
              { rule: 'Auto-approve price changes < 5%', status: 'active' },
              { rule: 'Require approval for margin drop > 3%', status: 'active' },
              { rule: 'Block price increases during low demand', status: 'active' },
              { rule: 'Consider competitor pricing data', status: 'pending' },
            ].map((rule, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-900">{rule.rule}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {rule.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">Demand Surge</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Sugar demand increased 15% in Kenya due to seasonal demand
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-yellow-800">Price Sensitivity</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Beverage mix showing high elasticity in Nigeria market
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-800">Market Trend</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Organic products showing 20% price premium acceptance
              </p>
            </div>
          </div>
        </div>
      </div>

      {showApprovalModal && pendingPrice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approve Price Change</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Product</p>
                <p className="font-medium text-gray-900">{pendingPrice.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Current Price</p>
                  <p className="font-medium text-gray-900">${pendingPrice.currentPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Suggested Price</p>
                  <p className="font-medium text-gray-900">${pendingPrice.suggestedPrice}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Impact Analysis</p>
                <div className="mt-2 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    Expected revenue increase: +$2,300/month
                  </p>
                  <p className="text-sm text-green-800">
                    Margin improvement: +1.2%
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Approval Notes (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add any notes about this price change..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setPendingPrice(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setPendingPrice(null);
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};