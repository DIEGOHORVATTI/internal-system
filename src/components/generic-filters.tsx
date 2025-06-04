import type { Path, DefaultValues } from 'react-hook-form'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Iconify from '@/components/iconify'
import { usePopover } from 'minimal-shared/hooks'
import CustomPopover from '@/components/custom-popover'

import { Chip, List, Stack, Button, Divider, ListItemText, ListItemButton } from '@mui/material'

import FormProvider from './hook-form/form-provider'

export type GenericFilterItem<T> = {
  label: string
  key: keyof T
  render: () => React.ReactNode
}

export type GenericFiltersProps<T extends Record<string, any>> = {
  filterItems: Array<GenericFilterItem<T>>
  defaultValues: DefaultValues<T>
  onApply: (filters: T) => void
}

type FilterHandler<T extends Record<string, any>> = {
  filters: T
  onDelete: (key: Path<T>) => void
}

export function GenericFilters<T extends Record<string, any>>({
  filterItems,
  defaultValues,
  onApply,
}: GenericFiltersProps<T>) {
  const popover = usePopover()
  const methods = useForm<T>({ defaultValues })

  const [activeMenuKey, setActiveMenuKey] = useState<keyof T>(filterItems[0].key)

  const { handleSubmit, watch, setValue, reset } = methods

  const filters = watch()

  const handleChipDelete = (key: Path<T>) => {
    setValue(key, defaultValues[key])

    onApply({ ...filters, [key]: defaultValues[key] })
  }

  const onSubmit = (data: T) => {
    onApply(data)

    popover.onClose()
  }

  const render = filterItems.find(({ key }) => key === activeMenuKey)?.render

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

        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit((data) => onSubmit(data))}
        >
          Aplicar
        </Button>
      </Stack>
    </Stack>
  )

  function FilterChips<T extends Record<string, any>>({ filters, onDelete }: FilterHandler<T>) {
    const chipLabel = (key: keyof T) => {
      const item = filterItems.find((item) => item.key === key)

      return item ? item.label : String(key)
    }

    return (
      <>
        {Object.entries(filters)
          .filter(([, value]) => !!value)
          .map(([key, value]) => (
            <Chip
              key={key}
              label={chipLabel(value)}
              onDelete={() => onDelete(key as Path<T>)}
              sx={{ mr: 1, mb: 1 }}
              color="secondary"
              variant="outlined"
            />
          ))}
      </>
    )
  }

  return (
    <>
      <Stack direction="row" flexWrap="wrap" mb={2}>
        <FilterChips filters={filters} onDelete={handleChipDelete} />
      </Stack>

      <Button variant="contained" color="secondary" onClick={popover.onOpen} sx={{ width: 100 }}>
        Filtrar
      </Button>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        arrow="top-left"
        slotProps={{ paper: { sx: { p: 0, width: 600 } } }}
      >
        <Stack width={1} divider={<Divider orientation="horizontal" />}>
          <Stack direction="row" divider={<Divider flexItem orientation="vertical" />}>
            {menuItemList}

            <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods} p={2} flex={2}>
              {render?.()}
            </FormProvider>
          </Stack>

          {controlsPainel}
        </Stack>
      </CustomPopover>
    </>
  )
}
