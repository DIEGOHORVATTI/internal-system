import type { Path, FieldValues } from 'react-hook-form'

import { FiltersBlock } from '@/components/filters-result'

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
        .map(([name, value]) => (
          <FiltersBlock key={name} label={chipLabel(name as keyof T)} isShow>
            <Chip
              label={value}
              onDelete={() => handleChipDelete(name as Path<T>)}
              color="secondary"
              variant="outlined"
            />
          </FiltersBlock>
        ))}
    </>
  )
}
