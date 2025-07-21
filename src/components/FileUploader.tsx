import React, { useState, useCallback } from 'react';
import { 
  Upload, 
  FileText, 
  Image, 
  BarChart3, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Zap,
  TrendingUp,
  Target,
  Users
} from 'lucide-react';
import { AppState } from '../App';

interface FileUploaderProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  status: 'processing' | 'completed' | 'error';
  insights?: any;
  aiSuggestions?: string[];
}

export const FileUploader: React.FC<FileUploaderProps> = ({ appState, updateAppState }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const generateInsights = (fileName: string, fileType: string) => {
    const insights = {
      summary: {
        totalRecords: Math.floor(Math.random() * 10000) + 1000,
        dataQuality: Math.floor(Math.random() * 20) + 80,
        completeness: Math.floor(Math.random() * 15) + 85,
        anomalies: Math.floor(Math.random() * 50) + 10
      },
      keyMetrics: [
        { label: 'Revenue Impact', value: `+$${(Math.random() * 500 + 100).toFixed(0)}K`, trend: 'up' },
        { label: 'Price Optimization', value: `${(Math.random() * 10 + 5).toFixed(1)}%`, trend: 'up' },
        { label: 'Market Penetration', value: `${(Math.random() * 30 + 60).toFixed(1)}%`, trend: 'up' },
        { label: 'Customer Satisfaction', value: `${(Math.random() * 20 + 75).toFixed(1)}%`, trend: 'up' }
      ],
      recommendations: [
        'Increase pricing for Premium Sugar 50kg by 8% in Kenya region',
        'Launch targeted campaign for Beverage Mix Pro in Nigeria',
        'Optimize inventory levels for seasonal demand patterns',
        'Implement dynamic pricing for Industrial Syrup products'
      ],
      dataBreakdown: {
        regions: [
          { name: 'Kenya', percentage: 45, value: '$1.2M' },
          { name: 'Nigeria', percentage: 35, value: '$950K' },
          { name: 'Tanzania', percentage: 20, value: '$280K' }
        ],
        products: [
          { name: 'Premium Sugar', percentage: 40, value: '$850K' },
          { name: 'Beverage Mix', percentage: 30, value: '$620K' },
          { name: 'Organic Sugar', percentage: 20, value: '$450K' },
          { name: 'Industrial Syrup', percentage: 10, value: '$380K' }
        ]
      }
    };

    const aiSuggestions = [
      'Create pricing campaign for high-demand products',
      'Send WhatsApp notifications to top customers',
      'Generate revenue forecast report',
      'Update inventory management system',
      'Schedule field agent visits to key regions'
    ];

    return { insights, aiSuggestions };
  };

  const handleFiles = async (files: File[]) => {
    setIsProcessing(true);
    
    for (const file of files) {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString(),
        status: 'processing'
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate file processing
      setTimeout(() => {
        const { insights, aiSuggestions } = generateInsights(file.name, file.type);
        
        setUploadedFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { ...f, status: 'completed', insights, aiSuggestions }
            : f
        ));
      }, 2000 + Math.random() * 3000);
    }
    
    setIsProcessing(false);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return Image;
    if (type.includes('text') || type.includes('csv')) return FileText;
    return BarChart3;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleQuickAction = (action: string, file: UploadedFile) => {
    // Simulate quick actions based on AI suggestions
    switch (action) {
      case 'Create pricing campaign':
        updateAppState({ searchQuery: file.name });
        // Navigate to campaigns would be handled by parent
        break;
      case 'Send WhatsApp notifications':
        // Navigate to communication center
        break;
      case 'Generate revenue forecast':
        // Navigate to revenue analytics
        break;
      default:
        console.log(`Executing: ${action}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">File Upload & AI Analysis</h1>
          <p className="text-gray-600">Upload data files to get instant AI-powered insights and recommendations</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Supported: CSV, Excel, JSON, Images
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".csv,.xlsx,.xls,.json,.jpg,.jpeg,.png,.pdf"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <Upload className={`h-12 w-12 ${dragActive ? 'text-green-500' : 'text-gray-400'}`} />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">
              {dragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-gray-600">or click to browse</p>
          </div>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4" />
              <span>CSV/Excel</span>
            </div>
            <div className="flex items-center space-x-1">
              <Image className="h-4 w-4" />
              <span>Images</span>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span>Reports</span>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-800">Processing files and generating AI insights...</span>
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Uploaded Files</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {uploadedFiles.map((file) => {
              const FileIcon = getFileIcon(file.type);
              
              return (
                <div key={file.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FileIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{file.name}</h3>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {file.status === 'processing' && (
                        <div className="flex items-center space-x-2 text-yellow-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}
                      {file.status === 'completed' && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Completed</span>
                        </div>
                      )}
                      {file.status === 'error' && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">Error</span>
                        </div>
                      )}
                      
                      <button
                        onClick={() => setSelectedFile(selectedFile?.id === file.id ? null : file)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* AI Insights */}
                  {file.status === 'completed' && file.insights && selectedFile?.id === file.id && (
                    <div className="mt-4 space-y-6">
                      {/* Summary Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <BarChart3 className="h-5 w-5 text-blue-600" />
                            <span className="text-2xl font-bold text-blue-900">
                              {file.insights.summary.totalRecords.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-blue-700 mt-1">Total Records</p>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-2xl font-bold text-green-900">
                              {file.insights.summary.dataQuality}%
                            </span>
                          </div>
                          <p className="text-sm text-green-700 mt-1">Data Quality</p>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <Target className="h-5 w-5 text-purple-600" />
                            <span className="text-2xl font-bold text-purple-900">
                              {file.insights.summary.completeness}%
                            </span>
                          </div>
                          <p className="text-sm text-purple-700 mt-1">Completeness</p>
                        </div>
                        
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <AlertCircle className="h-5 w-5 text-orange-600" />
                            <span className="text-2xl font-bold text-orange-900">
                              {file.insights.summary.anomalies}
                            </span>
                          </div>
                          <p className="text-sm text-orange-700 mt-1">Anomalies</p>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Insights</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {file.insights.keyMetrics.map((metric: any, index: number) => (
                            <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg">
                              <div className="flex items-center justify-between">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{metric.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Recommendations */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Zap className="h-4 w-4 text-yellow-500 mr-2" />
                          AI Recommendations
                        </h4>
                        <div className="space-y-2">
                          {file.insights.recommendations.map((rec: string, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <span className="text-sm text-yellow-800">{rec}</span>
                              <button className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
                                Apply
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      {file.aiSuggestions && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                          <div className="flex flex-wrap gap-2">
                            {file.aiSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickAction(suggestion, file)}
                                className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Data Breakdown Charts */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Regional Distribution</h4>
                          <div className="space-y-2">
                            {file.insights.dataBreakdown.regions.map((region: any, index: number) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{region.name}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-500 h-2 rounded-full" 
                                      style={{ width: `${region.percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 w-16 text-right">
                                    {region.value}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Product Performance</h4>
                          <div className="space-y-2">
                            {file.insights.dataBreakdown.products.map((product: any, index: number) => (
                              <div key={index} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{product.name}</span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-20 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-blue-500 h-2 rounded-full" 
                                      style={{ width: `${product.percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900 w-16 text-right">
                                    {product.value}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};