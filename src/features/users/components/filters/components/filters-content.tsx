import type { FieldValues } from 'react-hook-form'

import CustomPopover from '@/components/custom-popover'
import FormProvider from '@/components/hook-form/form-provider'

import { Stack, Button, Divider } from '@mui/material'

import MenuItemList from './menu-item-list'
import useFilters from '../hooks/use-filters'

export default function FiltersContent<T extends FieldValues>() {
  const { data, popover, activeMenuKey, methods, resetFilters, onSubmit } = useFilters<T>()

  const { handleSubmit } = methods

  const render = data.find(({ key }) => key === activeMenuKey)?.render()

  const controlsPainel = (
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

        <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)}>
          Aplicar
        </Button>
      </Stack>
    </Stack>
  )

  return (
    <>
      <Button variant="contained" color="secondary" onClick={popover.onOpen} sx={{ width: 100 }}>
        Filtrar
      </Button>

      <CustomPopover
        hiddenArrow
        arrow="top-left"
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ paper: { sx: { p: 0, width: 600 } } }}
      >
        <Stack width={1} divider={<Divider orientation="horizontal" />}>
          <Stack direction="row" divider={<Divider flexItem orientation="vertical" />}>
            <MenuItemList data={data} />

            <FormProvider<T> onSubmit={handleSubmit(onSubmit)} methods={methods} flex={1} p={1}>
              {render}
            </FormProvider>
          </Stack>

          {controlsPainel}
        </Stack>
      </CustomPopover>
    </>
  )
}
