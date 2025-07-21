import React from 'react';
import { MapPin, TrendingUp } from 'lucide-react';

export const RegionMap: React.FC = () => {
  const regions = [
    { name: 'Kenya', revenue: '$1.2M', growth: '+15%', campaigns: 5, status: 'active' },
    { name: 'Nigeria', revenue: '$950K', growth: '+12%', campaigns: 4, status: 'active' },
    { name: 'Tanzania', revenue: '$280K', growth: '+8%', campaigns: 2, status: 'active' },
    { name: 'Uganda', revenue: '$125K', growth: '+5%', campaigns: 1, status: 'pending' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Performance</h3>
      
      <div className="space-y-4">
        {regions.map((region, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="font-medium text-gray-900">{region.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  region.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {region.status}
                </span>
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                {region.growth}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Revenue</p>
                <p className="font-semibold text-gray-900">{region.revenue}</p>
              </div>
              <div>
                <p className="text-gray-600">Campaigns</p>
                <p className="font-semibold text-gray-900">{region.campaigns}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>Expansion Opportunity:</strong> Ghana and South Africa showing high market potential
        </p>
      </div>
    </div>
  );
};