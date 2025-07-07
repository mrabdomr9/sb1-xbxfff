import { useState, useEffect, useCallback, useRef } from 'react'

interface AutoSaveOptions<T> {
  data: T
  onSave: (data: T) => Promise<{ success: boolean; error?: string }>
  onValidate?: (data: T) => { isValid: boolean; errors?: string[] }
  debounceMs?: number
  enableAutoSave?: boolean
  onSaveStart?: () => void
  onSaveSuccess?: () => void
  onSaveError?: (error: string) => void
}

interface AutoSaveState {
  isSaving: boolean
  lastSaved: Date | null
  hasUnsavedChanges: boolean
  saveError: string | null
  validationErrors: string[]
}

// Native debounce implementation to replace lodash
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null
  
  const debounced = ((...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }) as T & { cancel: () => void }
  
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }
  
  return debounced
}

export function useAutoSave<T>({
  data,
  onSave,
  onValidate,
  debounceMs = 2000,
  enableAutoSave = true,
  onSaveStart,
  onSaveSuccess,
  onSaveError
}: AutoSaveOptions<T>) {
  const [state, setState] = useState<AutoSaveState>({
    isSaving: false,
    lastSaved: null,
    hasUnsavedChanges: false,
    saveError: null,
    validationErrors: []
  })

  const previousDataRef = useRef<T>(data)
  const backupDataRef = useRef<T>(data)
  const saveTimeoutRef = useRef<NodeJS.Timeout>()

  // Detect changes in data
  const hasDataChanged = useCallback(() => {
    return JSON.stringify(data) !== JSON.stringify(previousDataRef.current)
  }, [data])

  // Validate data before saving
  const validateData = useCallback(() => {
    if (!onValidate) return { isValid: true, errors: [] }
    
    const validation = onValidate(data)
    setState(prev => ({
      ...prev,
      validationErrors: validation.errors || []
    }))
    
    return validation
  }, [data, onValidate])

  // Save data to database
  const saveData = useCallback(async () => {
    if (state.isSaving) return

    // Validate before saving
    const validation = validateData()
    if (!validation.isValid) {
      setState(prev => ({
        ...prev,
        saveError: 'Validation failed: ' + (validation.errors?.join(', ') || 'Invalid data')
      }))
      onSaveError?.('Validation failed')
      return
    }

    setState(prev => ({ ...prev, isSaving: true, saveError: null }))
    onSaveStart?.()

    try {
      // Create backup before saving
      backupDataRef.current = JSON.parse(JSON.stringify(previousDataRef.current))
      
      const result = await onSave(data)
      
      if (result.success) {
        previousDataRef.current = JSON.parse(JSON.stringify(data))
        setState(prev => ({
          ...prev,
          isSaving: false,
          lastSaved: new Date(),
          hasUnsavedChanges: false,
          saveError: null
        }))
        onSaveSuccess?.()
      } else {
        setState(prev => ({
          ...prev,
          isSaving: false,
          saveError: result.error || 'Save failed'
        }))
        onSaveError?.(result.error || 'Save failed')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setState(prev => ({
        ...prev,
        isSaving: false,
        saveError: errorMessage
      }))
      onSaveError?.(errorMessage)
    }
  }, [data, state.isSaving, validateData, onSave, onSaveStart, onSaveSuccess, onSaveError])

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(saveData, debounceMs),
    [saveData, debounceMs]
  )

  // Manual save function
  const forceSave = useCallback(async () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    await saveData()
  }, [saveData])

  // Rollback to previous saved state
  const rollback = useCallback(() => {
    if (backupDataRef.current) {
      // This would need to be handled by the parent component
      // as we can't directly modify the data prop
      setState(prev => ({
        ...prev,
        hasUnsavedChanges: false,
        saveError: null
      }))
      return backupDataRef.current
    }
    return null
  }, [])

  // Effect to detect changes and trigger auto-save
  useEffect(() => {
    if (hasDataChanged()) {
      setState(prev => ({ ...prev, hasUnsavedChanges: true }))
      
      if (enableAutoSave) {
        debouncedSave()
      }
    }
  }, [data, hasDataChanged, enableAutoSave, debouncedSave])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      debouncedSave.cancel()
    }
  }, [debouncedSave])

  return {
    ...state,
    forceSave,
    rollback,
    validateData
  }
}