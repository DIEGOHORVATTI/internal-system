import Box, { type BoxProps } from '@mui/material/Box'

type Props = React.ComponentProps<'img'> & {
  sx?: React.CSSProperties
  slotProps?: {
    Box?: BoxProps
  }
}

export default function Image({ slotProps, ...props }: Props) {
  return (
    <Box
      component="span"
      {...slotProps?.Box}
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        ...slotProps?.Box?.sx,
      }}
    >
      <img
        {...props}
        src={props?.src ?? 'https://via.placeholder.com/150'}
        alt={props?.alt ?? 'Image'}
        style={props.sx}
        loading="lazy"
      />
    </Box>
  )
}
