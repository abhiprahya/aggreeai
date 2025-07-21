import React from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Calendar
} from 'lucide-react';
import { MetricCard } from './MetricCard';
import { Chart } from './Chart';
import { RegionMap } from './RegionMap';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
          <p className="text-gray-600">Real-time insights across your agri-value chain operations</p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
          </select>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$2.4M"
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Active Campaigns"
          value="12"
          change="+3 this week"
          trend="up"
          icon={Activity}
          color="blue"
        />
        <MetricCard
          title="Field Contacts"
          value="1,247"
          change="+8.2%"
          trend="up"
          icon={Users}
          color="purple"
        />
        <MetricCard
          title="Price Updates"
          value="248"
          change="-2.1%"
          trend="down"
          icon={TrendingUp}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Chart />
        </div>
        <div>
          <RegionMap />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Price update approved', product: 'Sugar Bundle A', region: 'Kenya', time: '2 hours ago', status: 'approved' },
              { action: 'Campaign launched', product: 'Beverage Mix Pro', region: 'Nigeria', time: '4 hours ago', status: 'active' },
              { action: 'WhatsApp message sent', product: 'Seasonal Promo', region: 'Kenya', time: '6 hours ago', status: 'sent' },
              { action: 'Revenue threshold reached', product: 'Premium Sugar', region: 'Tanzania', time: '1 day ago', status: 'milestone' },
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  item.status === 'approved' ? 'bg-green-500' :
                  item.status === 'active' ? 'bg-blue-500' :
                  item.status === 'sent' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.product} • {item.region}</p>
                </div>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Premium Sugar 50kg', revenue: '$245K', margin: '23%', growth: '+15%' },
              { name: 'Beverage Mix Pro', revenue: '$189K', margin: '18%', growth: '+12%' },
              { name: 'Organic Cane Sugar', revenue: '$156K', margin: '28%', growth: '+8%' },
              { name: 'Industrial Syrup', revenue: '$134K', margin: '15%', growth: '+5%' },
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">Margin: {product.margin}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                  <p className="text-xs text-green-600">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};