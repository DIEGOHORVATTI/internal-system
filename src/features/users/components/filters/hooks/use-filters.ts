import type { FieldValues } from 'react-hook-form'

import { useContext } from 'react'

import FiltersContext from '../context/filters-context'

import type { FiltersContextType } from '../types'

export default function useFilters<T extends FieldValues>() {
  const context = useContext(FiltersContext) as FiltersContextType<T> | undefined

  if (!context) throw new Error('useFiltersLogic must be used within a FiltersLogicProvider')

  return context
}
