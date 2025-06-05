import type { CustomBreadcrumbsProps } from '@/components/custom-breadcrumbs/types'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'

import Stack from '@mui/material/Stack'

type Props = React.PropsWithChildren<{
  slotProps?: Partial<{
    breadcrumbs: CustomBreadcrumbsProps
    header?: React.ReactNode
  }>
}>

export default function MainContent({ children, slotProps }: Props) {
  const isHeader = slotProps?.header

  return (
    <Stack spacing={4} component="main">
      {isHeader && slotProps.header}

      {!isHeader && <CustomBreadcrumbs {...slotProps?.breadcrumbs} />}

      {children}
    </Stack>
  )
}
