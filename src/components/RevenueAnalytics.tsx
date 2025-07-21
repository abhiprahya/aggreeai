import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Download,
  Calendar,
  Filter,
  MapPin,
  Target,
  Users,
  Package
} from 'lucide-react';

export const RevenueAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const revenueData = [
    { month: 'Jan', kenya: 450000, nigeria: 380000, tanzania: 120000 },
    { month: 'Feb', kenya: 520000, nigeria: 420000, tanzania: 150000 },
    { month: 'Mar', kenya: 490000, nigeria: 460000, tanzania: 180000 },
    { month: 'Apr', kenya: 580000, nigeria: 510000, tanzania: 210000 },
    { month: 'May', kenya: 640000, nigeria: 580000, tanzania: 240000 },
    { month: 'Jun', kenya: 710000, nigeria: 620000, tanzania: 280000 },
  ];

  const products = [
    { name: 'Premium Sugar 50kg', revenue: 850000, margin: 23, growth: 15, volume: 3400 },
    { name: 'Beverage Mix Pro', revenue: 620000, margin: 18, growth: 12, volume: 2800 },
    { name: 'Organic Cane Sugar', revenue: 450000, margin: 28, growth: 8, volume: 1800 },
    { name: 'Industrial Syrup', revenue: 380000, margin: 15, growth: 5, volume: 1200 },
  ];

  const regions = [
    { name: 'Kenya', revenue: 1200000, target: 1100000, growth: 15, customers: 450 },
    { name: 'Nigeria', revenue: 950000, target: 900000, growth: 12, customers: 380 },
    { name: 'Tanzania', revenue: 280000, target: 250000, growth: 8, customers: 120 },
  ];

  const exportReport = () => {
    // Simulate report export
    alert('Revenue report exported successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Revenue Analytics</h1>
          <p className="text-gray-600">Comprehensive revenue insights and performance tracking</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 90 days</option>
              <option value="year">Last 12 months</option>
            </select>
          </div>
          <button
            onClick={exportReport}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            title: 'Total Revenue', 
            value: '$2.43M', 
            change: '+12.5%',
            icon: DollarSign, 
            color: 'green'
          },
          { 
            title: 'Monthly Growth', 
            value: '+18.2%', 
            change: '+2.3% vs last month',
            icon: TrendingUp, 
            color: 'blue'
          },
          { 
            title: 'Active Customers', 
            value: '950', 
            change: '+47 this month',
            icon: Users, 
            color: 'purple'
          },
          { 
            title: 'Avg. Order Value', 
            value: '$2,560', 
            change: '+8.7%',
            icon: Package, 
            color: 'orange'
          }
        ].map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <metric.icon className={`h-6 w-6 ${
                metric.color === 'green' ? 'text-green-500' :
                metric.color === 'blue' ? 'text-blue-500' :
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
            <div className="flex items-center space-x-2">
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">All Regions</option>
                <option value="kenya">Kenya</option>
                <option value="nigeria">Nigeria</option>
                <option value="tanzania">Tanzania</option>
              </select>
            </div>
          </div>
          
          <div className="h-80 flex items-end justify-between space-x-2">
            {revenueData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex justify-center mb-2 space-x-1">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-4 bg-green-500 rounded-t hover:bg-green-600 transition-colors cursor-pointer"
                      style={{ height: `${(item.kenya / 10000)}px` }}
                      title={`Kenya: $${item.kenya.toLocaleString()}`}
                    ></div>
                    <div
                      className="w-4 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                      style={{ height: `${(item.nigeria / 10000)}px` }}
                      title={`Nigeria: $${item.nigeria.toLocaleString()}`}
                    ></div>
                    <div
                      className="w-4 bg-purple-500 rounded-t hover:bg-purple-600 transition-colors cursor-pointer"
                      style={{ height: `${(item.tanzania / 10000)}px` }}
                      title={`Tanzania: $${item.tanzania.toLocaleString()}`}
                    ></div>
                  </div>
                </div>
                <span className="text-xs text-gray-600">{item.month}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
              <span className="text-gray-600">Kenya</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-gray-600">Nigeria</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-2"></div>
              <span className="text-gray-600">Tanzania</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Target</h3>
          <div className="space-y-4">
            {regions.map((region, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="font-medium text-gray-900">{region.name}</span>
                  </div>
                  <span className="text-sm text-green-600">+{region.growth}%</span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Revenue: ${region.revenue.toLocaleString()}</span>
                    <span>Target: ${region.target.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((region.revenue / region.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <span>{region.customers} customers</span>
                  <span className="mx-2">•</span>
                  <span>{Math.round((region.revenue / region.target) * 100)}% of target</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span>Revenue: ${product.revenue.toLocaleString()}</span>
                    <span>Margin: {product.margin}%</span>
                    <span>Volume: {product.volume} units</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="font-medium">+{product.growth}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Distribution</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">By Region</h4>
              <div className="space-y-2">
                {regions.map((region, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{region.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(region.revenue / 1200000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-16 text-right">
                        ${(region.revenue / 1000)}K
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">By Product Category</h4>
              <div className="space-y-2">
                {[
                  { name: 'Sugar Products', value: 68 },
                  { name: 'Beverage Mix', value: 22 },
                  { name: 'Syrups', value: 10 },
                ].map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${category.value}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">
                        {category.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};