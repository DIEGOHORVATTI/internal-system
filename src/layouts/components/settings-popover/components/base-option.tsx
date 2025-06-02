import Iconify from '@/components/Iconify'

import Stack from '@mui/material/Stack'
import { Tooltip } from '@mui/material'
import { alpha } from '@mui/material/styles'
import ButtonBase from '@mui/material/ButtonBase'

type Props<T> = {
  options: Array<{
    label: string
    value: T
    icon: string
  }>
  value: T
  onChange: (newValue: T) => void
}

export default function BaseOptions<T>({ options, value, onChange }: Props<T>) {
  return (
    <Stack direction="row" spacing={2}>
      {options.map(({ label, value: valueCurrent, icon }, index) => {
        const selected = value === valueCurrent

        return (
          <Tooltip key={index} title={label} placement="top" arrow>
            <ButtonBase
              onClick={() => onChange(valueCurrent)}
              sx={{
                width: 1,
                height: 80,
                borderRadius: 1,
                border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.08)}`,
                ...(selected && {
                  bgcolor: 'background.paper',
                  boxShadow: (theme) =>
                    `-24px 8px 24px -4px ${alpha(
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[500]
                        : theme.palette.common.black,
                      0.08
                    )}`,
                }),
                '& .svg-color': {
                  background: (theme) =>
                    `linear-gradient(135deg, ${theme.palette.grey[500]} 0%, ${theme.palette.grey[600]} 100%)`,
                  ...(selected && {
                    background: (theme) =>
                      `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                  }),
                },
              }}
            >
              <Iconify icon={icon} />
            </ButtonBase>
          </Tooltip>
        )
      })}
    </Stack>
  )
}
