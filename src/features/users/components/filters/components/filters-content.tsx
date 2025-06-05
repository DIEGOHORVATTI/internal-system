import type { FieldValues } from 'react-hook-form'

import CustomPopover from '@/components/custom-popover'
import FormProvider from '@/components/hook-form/form-provider'

import { Stack, Button, Divider } from '@mui/material'

import MenuItemList from './menu-item-list'
import useFilters from '../hooks/use-filters'
import ControlsPanel from './controls-painel'

export default function FiltersContent<T extends FieldValues>() {
  const { data, popover, activeMenuKey, methods, onSubmit } = useFilters<T>()

  const { handleSubmit } = methods

  const activeMenu = data.find(({ name }) => name === activeMenuKey)
  const render = activeMenu?.render({
    label: activeMenu?.label ?? '',
    name: activeMenuKey,
  })

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
            <MenuItemList />

            <FormProvider<T> onSubmit={handleSubmit(onSubmit)} methods={methods} flex={1} p={1}>
              {render}
            </FormProvider>
          </Stack>

          <ControlsPanel<T> />
        </Stack>
      </CustomPopover>
    </>
  )
}
