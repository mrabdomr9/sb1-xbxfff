import React from 'react'
import { CheckCircle, Clock, AlertCircle, Save, Wifi, WifiOff } from 'lucide-react'

interface AutoSaveIndicatorProps {
  isSaving: boolean
  lastSaved: Date | null
  hasUnsavedChanges: boolean
  saveError: string | null
  onForceSave?: () => void
  onRetry?: () => void
}

const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  isSaving,
  lastSaved,
  hasUnsavedChanges,
  saveError,
  onForceSave,
  onRetry
}) => {
  const getStatusIcon = () => {
    if (isSaving) {
      return <Clock className="w-4 h-4 animate-spin text-blue-500" />
    }
    if (saveError) {
      return <AlertCircle className="w-4 h-4 text-red-500" />
    }
    if (hasUnsavedChanges) {
      return <WifiOff className="w-4 h-4 text-yellow-500" />
    }
    if (lastSaved) {
      return <CheckCircle className="w-4 h-4 text-green-500" />
    }
    return <Wifi className="w-4 h-4 text-gray-400" />
  }

  const getStatusText = () => {
    if (isSaving) return 'Saving...'
    if (saveError) return 'Save failed'
    if (hasUnsavedChanges) return 'Unsaved changes'
    if (lastSaved) return `Saved ${formatLastSaved(lastSaved)}`
    return 'Ready'
  }

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)

    if (diffSeconds < 60) return 'just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  const getStatusColor = () => {
    if (isSaving) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (saveError) return 'text-red-600 bg-red-50 border-red-200'
    if (hasUnsavedChanges) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    if (lastSaved) return 'text-green-600 bg-green-50 border-green-200'
    return 'text-gray-600 bg-gray-50 border-gray-200'
  }

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-md border text-sm ${getStatusColor()}`}>
      {getStatusIcon()}
      <span className="font-medium">{getStatusText()}</span>
      
      {saveError && onRetry && (
        <button
          onClick={onRetry}
          className="ml-2 text-xs underline hover:no-underline"
        >
          Retry
        </button>
      )}
      
      {hasUnsavedChanges && onForceSave && (
        <button
          onClick={onForceSave}
          className="ml-2 p-1 hover:bg-white hover:bg-opacity-50 rounded"
          title="Save now"
        >
          <Save className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}

export default AutoSaveIndicator