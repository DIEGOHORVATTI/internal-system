import type { Path, FieldValues, DefaultValues } from 'react-hook-form'

import { useForm } from 'react-hook-form'
import Iconify from '@/components/iconify'
import { useState, createContext } from 'react'
import { usePopover } from 'minimal-shared/hooks'
import CustomPopover from '@/components/custom-popover'
import FormProvider from '@/components/hook-form/form-provider'

import { List, Stack, Button, Divider, ListItemText, ListItemButton } from '@mui/material'

type FilterOption<T> = {
  label: string
  key: keyof T
  render: () => React.ReactNode
}

type Props<T extends FieldValues> = {
  filterItems: Array<FilterOption<T>>
  defaultValues: DefaultValues<T>
  onApply: (filters: T) => void
}

export type FiltersContextType<T extends FieldValues> = {
  filters: T
  resetFilters: () => void
  handleChipDelete: (key: Path<T>) => void
}

export const FiltersContext = createContext<FiltersContextType<any> | undefined>(undefined)

export default function Filters<T extends FieldValues>({
  filterItems,
  defaultValues,
  onApply,
}: Props<T>) {
  const popover = usePopover()

  const [activeMenuKey, setActiveMenuKey] = useState<keyof T | undefined>(filterItems[0]?.key)

  const methods = useForm<T>({ defaultValues })
  const { handleSubmit, watch, setValue, reset } = methods

  const filters = watch()

  const resetFilters = () => reset(defaultValues)

  const handleChipDelete = (key: Path<T>) => {
    setValue(key, defaultValues[key])

    onApply({ ...filters, [key]: defaultValues[key] })
  }

  const onSubmit = (data: T) => {
    onApply(data)

    popover.onClose()
  }

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
          reset(defaultValues)
          onApply(defaultValues as T)

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

  const Context = FiltersContext as React.Context<FiltersContextType<T> | undefined>
  return (
    <Context.Provider value={{ filters, resetFilters, handleChipDelete }}>
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
    </Context.Provider>
  )
}
