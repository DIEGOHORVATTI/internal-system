import type { Path, FieldValues } from 'react-hook-form'

import { Chip } from '@mui/material'

import useFilters from '../hooks/use-filters'

export type FilterOption<T> = {
  label: string
  key: keyof T
}

type Props<T extends FieldValues> = {
  filterItems: Array<FilterOption<T>>
}

export function FilterChips<T extends FieldValues>({ filterItems }: Props<T>) {
  const { filters, handleChipDelete } = useFilters<T>()

  const chipLabel = (key: keyof T) => {
    const item = filterItems.find((item) => item.key === key)
    return item ? item.label : String(key)
  }

  return (
    <>
      {Object.entries(filters)
        .filter(([, value]) => !!value)
        .map(([key]) => (
          <Chip
            key={key}
            label={chipLabel(key as keyof T)}
            onDelete={() => handleChipDelete(key as Path<T>)}
            sx={{ mr: 1, mb: 1 }}
            color="secondary"
            variant="outlined"
          />
        ))}
    </>
  )
}
