import type { usePopover } from 'minimal-shared/hooks'
import type { Path, FieldValues, UseFormReturn, DefaultValues } from 'react-hook-form'

export type FiltersContextType<T extends FieldValues> = {
  popover: ReturnType<typeof usePopover>
  activeMenuKey: keyof T | undefined
  setActiveMenuKey: (key: keyof T) => void
  methods: UseFormReturn<T>
  filters: T
  resetFilters: () => void
  handleChipDelete: (key: Path<T>) => void
  onSubmit: (data: T) => void
}

type FilterOption<T> = {
  label: string
  key: keyof T
  render: () => React.ReactNode
}
export type FiltersProps<T extends FieldValues> = {
  filterItems: Array<FilterOption<T>>
  defaultValues: DefaultValues<T>
  onApply: (filters: T) => void
}
