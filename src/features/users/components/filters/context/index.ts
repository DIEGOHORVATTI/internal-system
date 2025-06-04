import type { FieldValues } from 'react-hook-form'

import { useContext } from 'react'

import { FiltersContext } from '..'

import type { FiltersContextType } from '..'

export function useFilters<T extends FieldValues>() {
  const context = useContext(FiltersContext) as FiltersContextType<T> | undefined

  if (!context) throw new Error('useFilters must be used within a FiltersProvider')

  return context
}
