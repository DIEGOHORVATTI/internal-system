import type { FieldValues } from 'react-hook-form'

import { Stack, Button } from '@mui/material'

import useFilters from '../hooks/use-filters'

export default function ControlsPanel<T extends FieldValues>() {
  const {
    popover,
    resetFilters,
    onSubmit,
    methods: { handleSubmit },
  } = useFilters<T>()

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" p={1}>
      <Button
        color="error"
        variant="soft"
        onClick={() => {
          resetFilters()
          popover.onClose()
        }}
      >
        Limpar
      </Button>

      <Stack direction="row" spacing={2}>
        <Button color="error" variant="outlined" onClick={popover.onClose}>
          Fechar
        </Button>

        <Button variant="contained" color="secondary" onClick={onSubmit}>
          Aplicar
        </Button>
      </Stack>
    </Stack>
  )
}
