import type { Path, FieldValues, DefaultValues } from 'react-hook-form'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePopover } from 'minimal-shared/hooks'

import { FiltersContext } from '../context/filters-context'

import type { FiltersContextType } from '../types'

export default function FiltersProvider<T extends FieldValues>({
  children,
  filterItems,
  defaultValues,
  onApply,
}: {
  children: React.ReactNode
  filterItems: Array<{ key: keyof T }>
  defaultValues: DefaultValues<T>
  onApply: (filters: T) => void
}) {
  const popover = usePopover()

  const [activeMenuKey, setActiveMenuKey] = useState<keyof T | undefined>(filterItems[0]?.key)

  const methods = useForm<T>({ defaultValues })
  const { watch, setValue, reset } = methods

  const filters = watch()

  const resetFilters = () => reset(defaultValues)

  const handleChipDelete = (key: Path<T>) => {
    setValue(key, defaultValues[key])
    onApply({ ...filters, [key]: defaultValues[key] })
  }

  const onSubmit = (data: T) => {
    onApply(data)
    popover.onClose()
  }

  const Context = FiltersContext as React.Context<FiltersContextType<T>>
  return (
    <Context.Provider
      value={{
        popover,
        activeMenuKey,
        setActiveMenuKey,
        methods,
        filters,
        resetFilters,
        handleChipDelete,
        onSubmit,
      }}
    >
      {children}
    </Context.Provider>
  )
}
