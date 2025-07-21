import React from 'react';
import { 
  LayoutDashboard, 
  Megaphone, 
  DollarSign, 
  MessageSquare, 
  BarChart3, 
  Plug, 
  Users,
  Wheat
} from 'lucide-react';
import { ActiveView } from '../App';

interface SidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' as ActiveView },
  { name: 'GTM Campaigns', icon: Megaphone, view: 'campaigns' as ActiveView },
  { name: 'Dynamic Pricing', icon: DollarSign, view: 'pricing' as ActiveView },
  { name: 'Communication', icon: MessageSquare, view: 'communication' as ActiveView },
  { name: 'Revenue Analytics', icon: BarChart3, view: 'revenue' as ActiveView },
  { name: 'API Integrations', icon: Plug, view: 'api' as ActiveView },
  { name: 'User Management', icon: Users, view: 'users' as ActiveView },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="bg-white w-64 shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500 rounded-lg">
            <Wheat className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Aggree.ai</h1>
            <p className="text-xs text-gray-500">AgriTech Platform</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => onViewChange(item.view)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeView === item.view
                    ? 'bg-green-50 text-green-600 border-r-2 border-green-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-8 px-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800 mb-2">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Active Campaigns</span>
              <span className="font-medium text-green-800">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Revenue This Month</span>
              <span className="font-medium text-green-800">$2.4M</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Price Updates</span>
              <span className="font-medium text-green-800">248</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};