import React, { useState } from 'react';
import { Wheat, Mail, Lock, Eye, EyeOff, Globe, Shield, Users, BarChart3 } from 'lucide-react';
import { User } from '../App';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [loginType, setLoginType] = useState<'admin' | 'manager' | 'agent'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userTypes = [
    {
      type: 'admin' as const,
      title: 'System Administrator',
      description: 'Full platform access with user management',
      icon: Shield,
      color: 'purple',
      defaultEmail: 'admin@aggree.ai',
      permissions: ['campaigns', 'pricing', 'analytics', 'api', 'users', 'settings']
    },
    {
      type: 'manager' as const,
      title: 'Regional Manager',
      description: 'Campaign and pricing management',
      icon: BarChart3,
      color: 'blue',
      defaultEmail: 'manager@aggree.ai',
      permissions: ['campaigns', 'pricing', 'analytics', 'communication']
    },
    {
      type: 'agent' as const,
      title: 'Field Agent',
      description: 'Communication and field operations',
      icon: Users,
      color: 'green',
      defaultEmail: 'agent@aggree.ai',
      permissions: ['communication', 'campaigns']
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const selectedUserType = userTypes.find(ut => ut.type === loginType)!;
    
    const userData: User = {
      id: `${loginType}-001`,
      name: loginType === 'admin' ? 'Sarah Mwangi' : loginType === 'manager' ? 'John Okafor' : 'Grace Ndovu',
      email: email || selectedUserType.defaultEmail,
      role: selectedUserType.title,
      region: loginType === 'admin' ? 'All Regions' : loginType === 'manager' ? 'Kenya' : 'Tanzania',
      permissions: selectedUserType.permissions
    };

    setIsLoading(false);
    onLogin(userData);
  };

  const handleQuickLogin = (type: typeof loginType) => {
    const userType = userTypes.find(ut => ut.type === type)!;
    setLoginType(type);
    setEmail(userType.defaultEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
            <div className="p-3 bg-green-500 rounded-xl">
              <Wheat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Aggree.ai</h1>
              <p className="text-sm text-gray-600">AgriTech Platform</p>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Modernize your <span className="text-green-600">Agri-Value Chain</span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            AI-powered SaaS platform for dynamic pricing, field communication, and GTM intelligence across Africa's agricultural sectors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <Globe className="h-6 w-6 text-green-500 mb-2" />
              <h3 className="font-semibold text-gray-900">Multi-Region</h3>
              <p className="text-sm text-gray-600">Kenya, Nigeria, Tanzania</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <BarChart3 className="h-6 w-6 text-blue-500 mb-2" />
              <h3 className="font-semibold text-gray-900">AI-Powered</h3>
              <p className="text-sm text-gray-600">Dynamic pricing engine</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
              <Users className="h-6 w-6 text-purple-500 mb-2" />
              <h3 className="font-semibold text-gray-900">Field-First</h3>
              <p className="text-sm text-gray-600">WhatsApp/SMS integration</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h3>
            <p className="text-gray-600">Choose your role and sign in to continue</p>
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {userTypes.map((userType) => (
              <button
                key={userType.type}
                onClick={() => handleQuickLogin(userType.type)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  loginType === userType.type
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    userType.color === 'purple' ? 'bg-purple-100' :
                    userType.color === 'blue' ? 'bg-blue-100' :
                    'bg-green-100'
                  }`}>
                    <userType.icon className={`h-5 w-5 ${
                      userType.color === 'purple' ? 'text-purple-600' :
                      userType.color === 'blue' ? 'text-blue-600' :
                      'text-green-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{userType.title}</h4>
                    <p className="text-sm text-gray-600">{userType.description}</p>
                  </div>
                  {loginType === userType.type && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Admin: admin@aggree.ai / demo123</p>
              <p>• Manager: manager@aggree.ai / demo123</p>
              <p>• Agent: agent@aggree.ai / demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};