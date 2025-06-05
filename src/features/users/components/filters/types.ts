import type { usePopover } from 'minimal-shared/hooks'
import type { Path, FieldValues, UseFormReturn, DefaultValues } from 'react-hook-form'

export type FilterField<T extends FieldValues> = {
  label: string
  name: keyof T
  render: (props: Pick<FilterField<T>, 'label' | 'name'>) => React.ReactNode
}

export type FiltersContextType<T extends FieldValues> = {
  popover: ReturnType<typeof usePopover>
  activeMenuKey: keyof T
  setActiveMenuKey: (key: keyof T) => void
  methods: UseFormReturn<T>
  filters: T
  data: Array<FilterField<T>>
  resetFilters: () => void
  handleChipDelete: (key: Path<T>) => void
  onSubmit: () => void
}

export type FiltersProps<T extends FieldValues> = Pick<FiltersContextType<T>, 'data'> & {
  defaultValues: DefaultValues<T>
  onApply: (filters: T) => void
}
