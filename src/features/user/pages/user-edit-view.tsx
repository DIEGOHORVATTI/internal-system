'use client'

import type { IUserItem } from '@/types/user'

import { paths } from '@/routes/paths'
import { DashboardContent } from '@/layouts/dashboard'
import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs'

import { UserNewEditForm } from '../user-new-edit-form'

// ----------------------------------------------------------------------

type Props = {
  user?: IUserItem
}

export function UserEditView({ user: currentUser }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.users.list}
        links={[
          { name: 'Home', href: paths.home },
          { name: 'User', href: paths.users.root },
          { name: currentUser?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewEditForm currentUser={currentUser} />
    </DashboardContent>
  )
}
