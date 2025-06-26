import React, { useState, useEffect } from 'react'
import { Database, Activity, AlertCircle, CheckCircle, Clock, HardDrive } from 'lucide-react'
import { useAnalytics, useCache } from '../../hooks/useDatabaseIntegration'
import { checkDatabaseConnection } from '../../lib/database/config'

const DatabaseStatus: React.FC = () => {
  const { systemHealth, loading } = useAnalytics()
  const { getStats } = useCache()
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [cacheStats, setCacheStats] = useState<any>(null)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await checkDatabaseConnection()
        setConnectionStatus(isConnected ? 'connected' : 'error')
      } catch (error) {
        setConnectionStatus('error')
      }
    }

    checkConnection()
    setCacheStats(getStats())

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [getStats])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500 animate-spin" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'healthy':
        return 'text-green-600 bg-green-50'
      case 'warning':
        return 'text-yellow-600 bg-yellow-50'
      case 'error':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="w-6 h-6 text-[#04968d]" />
          <h3 className="text-lg font-semibold">Database Status</h3>
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-6">
        <Database className="w-6 h-6 text-[#04968d]" />
        <h3 className="text-lg font-semibold">Database Status</h3>
      </div>

      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-3 rounded-lg border">
          <div className="flex items-center space-x-3">
            {getStatusIcon(connectionStatus)}
            <span className="font-medium">Connection</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(connectionStatus)}`}>
            {connectionStatus === 'connected' ? 'Connected' : 
             connectionStatus === 'error' ? 'Disconnected' : 'Checking...'}
          </span>
        </div>

        {/* Database Health */}
        {systemHealth && (
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center space-x-3">
              {getStatusIcon(systemHealth.database_status)}
              <span className="font-medium">Health</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(systemHealth.database_status)}`}>
              {systemHealth.database_status}
            </span>
          </div>
        )}

        {/* Response Time */}
        {systemHealth && (
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center space-x-3">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Response Time</span>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {systemHealth.response_time}ms
            </span>
          </div>
        )}

        {/* Storage Usage */}
        {systemHealth && (
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center space-x-3">
              <HardDrive className="w-5 h-5 text-purple-500" />
              <span className="font-medium">Storage Usage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${systemHealth.storage_usage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {systemHealth.storage_usage}%
              </span>
            </div>
          </div>
        )}

        {/* Cache Statistics */}
        {cacheStats && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-700 mb-3">Cache Performance</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#04968d]">{cacheStats.size}</div>
                <div className="text-sm text-gray-600">Cached Items</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[#04968d]">
                  {Math.round(cacheStats.hitRate * 100)}%
                </div>
                <div className="text-sm text-gray-600">Hit Rate</div>
              </div>
            </div>
          </div>
        )}

        {/* Last Backup */}
        {systemHealth?.last_backup && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
            <span className="font-medium text-gray-700">Last Backup</span>
            <span className="text-sm text-gray-600">
              {new Date(systemHealth.last_backup).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DatabaseStatus