import type { Path, FieldValues } from 'react-hook-form'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePopover } from 'minimal-shared/hooks'

import { FiltersContext } from '../context/filters-context'

import type { FiltersProps, FiltersContextType } from '../types'

type Props<T extends FieldValues> = FiltersProps<T> & {
  children: (props: FiltersContextType<T>) => React.ReactNode
}

export default function FiltersProvider<T extends FieldValues>({
  children,
  data,
  defaultValues,
  onApply,
}: Props<T>) {
  const popover = usePopover()

  const [activeMenuKey, setActiveMenuKey] = useState<keyof T>(data[0]?.name)

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

  const controls = {
    popover,
    activeMenuKey,
    setActiveMenuKey,
    methods,
    data,
    filters,
    resetFilters,
    handleChipDelete,
    onSubmit,
  }

  const Context = FiltersContext as React.Context<FiltersContextType<T>>
  return <Context.Provider value={controls}>{children(controls)}</Context.Provider>
}
