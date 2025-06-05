import type { Path, FieldValues } from 'react-hook-form'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePopover } from 'minimal-shared/hooks'

import FiltersContext from '../context/filters-context'
import FiltersContentPopover from '../components/filters-content-popover'

import type { FiltersProps, FiltersContextType } from '../types'

export function FiltersProvider<T extends FieldValues>({
  children,
  data,
  defaultValues,
  onApply,
}: React.PropsWithChildren<FiltersProps<T>>) {
  const popover = usePopover()

  const [activeMenuKey, setActiveMenuKey] = useState<keyof T>(data[0]?.name)

  const methods = useForm<T>({ defaultValues })
  const { watch, setValue, reset } = methods

  const filters = watch()

  const activeMenu = data.find(({ name }) => name === activeMenuKey)

  const isHasActiveFilter =
    activeMenu?.fields?.some((field) => {
      const value = !!filters[field]

      return value
    }) || !!filters[activeMenuKey]

  const resetFilters = () => reset(defaultValues)

  const handleChipDelete = (key: Path<T>) => {
    setValue(key, defaultValues[key])
    onApply({ ...filters, [key]: defaultValues[key] })
  }

  const onSubmit = () => {
    onApply(filters)
    popover.onClose()
  }

  const Context = FiltersContext as React.Context<FiltersContextType<T>>
  return (
    <Context.Provider
      value={{
        // Controle do popover
        popover,

        // Controle do menu ativo
        activeMenu,
        activeMenuKey,
        setActiveMenuKey,

        // Verificação de filtros ativos
        isHasActiveFilter,

        // React Hook Form
        methods,

        // Definições dos filtros
        data,
        filters,

        // Ações sobre os filtros
        resetFilters,
        handleChipDelete,
        onSubmit,
      }}
    >
      {children}

      <FiltersContentPopover />
    </Context.Provider>
  )
}
