import type { FieldValues } from 'react-hook-form'

import Iconify from '@/components/iconify'

import { List, Stack, ListItemText, ListItemButton } from '@mui/material'

import useFilters from '../hooks/use-filters'

export default function MenuItemList<T extends FieldValues>() {
  const { data, filters, key: activeMenuKey, setActiveMenuKey } = useFilters<T>()

  return (
    <List sx={{ flex: 0.7, maxHeight: 400, overflowY: 'auto' }}>
      {data.map(({ label, key }) => (
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
}
