import type { CustomBreadcrumbsProps } from '@/components/custom-breadcrumbs/types'

import CustomBreadcrumbs from '@/components/custom-breadcrumbs'

import Stack from '@mui/material/Stack'

type Props = React.PropsWithChildren<{
  slotProps?: Partial<{
    breadcrumbs: CustomBreadcrumbsProps
  }>
}>

export default function MainContent({ children, slotProps }: Props) {
  return (
    <Stack spacing={4} component="main">
      <CustomBreadcrumbs {...slotProps?.breadcrumbs} />

      {children}
    </Stack>
  )
}
