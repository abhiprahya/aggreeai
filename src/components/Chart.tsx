import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

export const Chart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-600">+12.5% vs last month</span>
        </div>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        {[
          { month: 'Jan', value: 65, color: 'bg-blue-500' },
          { month: 'Feb', value: 78, color: 'bg-green-500' },
          { month: 'Mar', value: 52, color: 'bg-blue-500' },
          { month: 'Apr', value: 89, color: 'bg-green-500' },
          { month: 'May', value: 76, color: 'bg-blue-500' },
          { month: 'Jun', value: 95, color: 'bg-green-500' },
          { month: 'Jul', value: 88, color: 'bg-green-500' },
          { month: 'Aug', value: 92, color: 'bg-green-500' },
        ].map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex justify-center mb-2">
              <div
                className={`w-8 rounded-t ${item.color} hover:opacity-80 transition-opacity cursor-pointer`}
                style={{ height: `${item.value}%` }}
                title={`${item.month}: ${item.value}%`}
              ></div>
            </div>
            <span className="text-xs text-gray-600">{item.month}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>Kenya</span>
        <span>Nigeria</span>
        <span>Tanzania</span>
      </div>
    </div>
  );
};