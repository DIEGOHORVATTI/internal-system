import type { usePopover } from 'minimal-shared/hooks'
import type { Path, FieldValues, UseFormReturn, DefaultValues } from 'react-hook-form'

export type FiltersContextType<T extends FieldValues> = {
  popover: ReturnType<typeof usePopover>
  activeMenuKey: keyof T | undefined
  setActiveMenuKey: (key: keyof T) => void
  methods: UseFormReturn<T>
  filters: T
  data: Array<{
    label: string
    key: keyof T
    render: () => React.ReactNode
  }>
  resetFilters: () => void
  handleChipDelete: (key: Path<T>) => void
  onSubmit: (data: T) => void
}

export type FiltersProps<T extends FieldValues> = Pick<FiltersContextType<T>, 'data'> & {
  defaultValues: DefaultValues<T>
  onApply: (filters: T) => void
}
