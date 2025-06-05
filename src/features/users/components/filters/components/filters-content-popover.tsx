import type { FieldValues } from 'react-hook-form'

import { useMemo } from 'react'
import CustomPopover from '@/components/custom-popover'
import FormProvider from '@/components/hook-form/form-provider'

import { Stack, Divider } from '@mui/material'

import MenuItemList from './menu-item-list'
import useFilters from '../hooks/use-filters'
import ControlsPanel from './controls-painel'

export default function FiltersContentPopover<T extends FieldValues>() {
  const { data, popover, activeMenuKey, methods } = useFilters<T>()

  const activeMenu = data.find(({ name }) => name === activeMenuKey)
  const Render = useMemo(
    () => () =>
      activeMenu?.render({
        label: activeMenu?.label ?? '',
        name: activeMenuKey,
      }),
    [activeMenuKey, activeMenu]
  )

  return (
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

          <FormProvider<T> methods={methods} flex={1} p={1}>
            <Render key={String(activeMenuKey)} />
          </FormProvider>
        </Stack>

        <ControlsPanel<T> />
      </Stack>
    </CustomPopover>
  )
}
