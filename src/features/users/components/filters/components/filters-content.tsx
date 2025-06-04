import type { FieldValues } from 'react-hook-form'

import Iconify from '@/components/iconify'
import CustomPopover from '@/components/custom-popover'
import FormProvider from '@/components/hook-form/form-provider'

import { List, Stack, Button, Divider, ListItemText, ListItemButton } from '@mui/material'

import useFilters from '../hooks/use-filters'

import type { FiltersProps } from '../types'

type Props<T extends FieldValues> = Pick<FiltersProps<T>, 'filterItems'>

export default function FiltersContent<T extends FieldValues>({ filterItems }: Props<T>) {
  const { popover, activeMenuKey, setActiveMenuKey, methods, filters, resetFilters, onSubmit } =
    useFilters<T>()

  const { handleSubmit } = methods

  const render = filterItems.find(({ key }) => key === activeMenuKey)?.render()

  const menuItemList = (
    <List sx={{ flex: 1, maxHeight: 400, overflowY: 'auto' }}>
      {filterItems.map(({ label, key }) => (
        <Stack
          key={String(key)}
          component={ListItemButton}
          selected={activeMenuKey === key}
          direction="row"
          justifyContent="space-between"
          m={1}
          p={1}
          borderRadius={1}
          sx={{
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: (theme) => theme.palette.action.selected,
              borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
            },
          }}
          onClick={() => setActiveMenuKey(key)}
        >
          <ListItemText
            primary={
              <>
                {label}
                {!!filters[key] && <Iconify icon="mdi:check" />}
              </>
            }
          />
          <Iconify icon="eva:arrow-ios-forward-fill" />
        </Stack>
      ))}
    </List>
  )

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
            {menuItemList}

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
