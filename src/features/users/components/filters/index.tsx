import type { FieldValues } from 'react-hook-form'

import FiltersProvider from './provider/filters-provider'
import FiltersContent from './components/filters-content'

import type { FiltersProps } from './types'

export default function Filters<T extends FieldValues>({
  data,
  defaultValues,
  onApply,
}: FiltersProps<T>) {
  return (
    <FiltersProvider<T> data={data} defaultValues={defaultValues} onApply={onApply}>
      <FiltersContent />
    </FiltersProvider>
  )
}
