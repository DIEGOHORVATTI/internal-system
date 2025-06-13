import type { StackProps } from '@mui/material'
import type { Path, FieldValues } from 'react-hook-form'

import dayjs from 'dayjs'

import { Chip, Stack } from '@mui/material'

import useFilters from '../hooks/use-filters'

type Props = StackProps & {
  onlyActive?: boolean
}

function formatChipValue(value: unknown): string {
  if (value instanceof Date || dayjs.isDayjs(value)) {
    return dayjs(value).format('DD/MM/YYYY')
  }

  if (Array.isArray(value)) {
    return value.map(formatChipValue).join(', ')
  }

  return String(value)
}

export function Chips<T extends FieldValues>({ onlyActive, ...props }: Props) {
  const { data, activeMenu, activeMenuKey, filters, handleChipDelete } = useFilters<T>()

  const chipLabel = (name: keyof T) => {
    const item = data.find((item) => item.name === name)
    return item ? item.label : String(name)
  }

  const isFieldActive = (name: keyof T) =>
    activeMenu?.fields?.includes(name) || activeMenuKey === name

  return (
    <Stack direction="row" spacing={1} {...props}>
      {Object.entries(filters)
        .filter(([name, value]) => {
          const key = name as keyof T
          return !!value && (!onlyActive || isFieldActive(key))
        })
        .map(([name, value]) => (
          <Chip
            key={name}
            label={
              <>
                <b>{chipLabel(name as keyof T)}:</b> {formatChipValue(value)}
              </>
            }
            onDelete={() => handleChipDelete(name as Path<T>)}
            color="secondary"
            variant="filled"
          />
        ))}
    </Stack>
  )
}
