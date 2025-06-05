import type { FieldValues } from 'react-hook-form'

import { createContext } from 'react'

import type { FiltersContextType } from '../types'

const FiltersContext = createContext<FiltersContextType<FieldValues> | undefined>(
  undefined
) as unknown as React.Context<FiltersContextType<FieldValues>>

export default FiltersContext
