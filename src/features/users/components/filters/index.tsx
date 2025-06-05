import type { FieldValues } from 'react-hook-form'

import Button from '@mui/material/Button'

import FiltersProvider from './provider/filters-provider'
import FiltersContentPopover from './components/filters-content-popover'

import type { FiltersProps } from './types'

export default function Filters<T extends FieldValues>({
  data,
  defaultValues,
  onApply,
}: FiltersProps<T>) {
  return (
    <FiltersProvider<T> data={data} defaultValues={defaultValues} onApply={onApply}>
      {({ popover }) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={popover.onOpen}
            sx={{ width: 100 }}
          >
            Filtrar
          </Button>

          <FiltersContentPopover />
        </>
      )}
    </FiltersProvider>
  )
}
