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

  const [key, setActiveMenuKey] = useState(data[0]?.key)

  const methods = useForm<T>({ defaultValues })
  const { watch, setValue, reset } = methods

  const filters = watch()

  const activeMenu = data.find(({ key: name }) => name === key)

  /**
   * @title Verifica se algum filtro está ativo
   * @description Verifica se algum campo de um mesmo grupo do menu ativo possui filtro aplicado
   * */
  const isHasActiveFilter = Object.entries(activeMenu?.fields || {}).some(([key]) => {
    const fieldValue = filters[key]

    return fieldValue && fieldValue !== defaultValues[key]
  })

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
        key,
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
