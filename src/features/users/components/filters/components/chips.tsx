import type { Path, FieldValues } from 'react-hook-form'

import { Chip } from '@mui/material'

import useFilters from '../hooks/use-filters'

export function Chips<T extends FieldValues>() {
  const { data, filters, handleChipDelete } = useFilters<T>()

  const chipLabel = (name: keyof T) => {
    const item = data.find((item) => item.name === name)

    return item ? item.label : String(name)
  }

  return (
    <>
      {Object.entries(filters)
        .filter(([, value]) => !!value)
        .map(([name]) => (
          <Chip
            key={name}
            label={chipLabel(name as keyof T)}
            onDelete={() => handleChipDelete(name as Path<T>)}
            sx={{ mr: 1, mb: 1 }}
            color="secondary"
            variant="outlined"
          />
        ))}
    </>
  )
}
