import type { FieldValues } from 'react-hook-form'

import { useMemo } from 'react'
import Iconify from '@/components/iconify'
import CustomPopover from '@/components/custom-popover'
import FormProvider from '@/components/hook-form/form-provider'

import { Stack, Divider, Typography } from '@mui/material'

import { Chips } from './chips'
import MenuItemList from './menu-item-list'
import useFilters from '../hooks/use-filters'
import ControlsPanel from './controls-painel'

export default function FiltersContentPopover<T extends FieldValues>() {
  const { activeMenu, isHasActiveFilter, popover, activeMenuKey, methods } = useFilters<T>()

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
      slotProps={{ paper: { sx: { p: 0, width: 700 } } }}
    >
      <Stack width={1} divider={<Divider orientation="horizontal" />}>
        <Stack direction="row" divider={<Divider flexItem orientation="vertical" />}>
          <MenuItemList />

          <FormProvider<T> methods={methods} flex={1} p={1}>
            <Render key={String(activeMenuKey)} />
          </FormProvider>
        </Stack>

        {isHasActiveFilter && (
          <Stack>
            <Stack direction="row" p={1}>
              <Iconify icon="mdi:filter" />

              <Typography variant="subtitle2">Aplicados:</Typography>
            </Stack>

            <Stack direction="row" p={1}>
              <Chips<T> onlyActive />
            </Stack>
          </Stack>
        )}
        <ControlsPanel<T> />
      </Stack>
    </CustomPopover>
  )
}
