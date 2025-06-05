import type { FieldValues } from 'react-hook-form'

import { createContext } from 'react'

import type { FiltersContextType } from '../types'

export const FiltersContext = createContext<FiltersContextType<FieldValues> | undefined>(
  undefined
) as unknown as React.Context<FiltersContextType<FieldValues>>
