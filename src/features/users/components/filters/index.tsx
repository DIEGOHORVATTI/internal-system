import type { FieldValues } from 'react-hook-form'

import FiltersProvider from './provider/filters-provider'
import FiltersContent from './components/filters-content'

import type { FiltersProps } from './types'

export default function Filters<T extends FieldValues>({
  filterItems,
  defaultValues,
  onApply,
}: FiltersProps<T>) {
  return (
    <FiltersProvider<T> filterItems={filterItems} defaultValues={defaultValues} onApply={onApply}>
      <FiltersContent filterItems={filterItems} />
    </FiltersProvider>
  )
}
