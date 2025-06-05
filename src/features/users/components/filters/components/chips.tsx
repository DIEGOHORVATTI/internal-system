import type { Path, FieldValues } from 'react-hook-form'

import { FiltersBlock } from '@/components/filters-result'

import { Chip } from '@mui/material'

import useFilters from '../hooks/use-filters'

export function Chips<T extends FieldValues>() {
  const { data, activeMenu, activeMenuKey, filters, handleChipDelete } = useFilters<T>()

  const chipLabel = (name: keyof T) => {
    const item = data.find((item) => item.name === name)

    return item ? item.label : String(name)
  }

  const isFieldActive = (name: keyof T) =>
    activeMenu?.fields?.includes(name) || activeMenuKey === name

  return (
    <>
      {Object.entries(filters)
        .filter(([name, value]) => isFieldActive(name as keyof T) && !!value)
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
