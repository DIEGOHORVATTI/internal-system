import type { IPostItem } from '@/types/blog'

import { paths } from '@/routes/paths'
import { DashboardContent } from '@/layouts/dashboard'
import CustomBreadcrumbs from '@/components/custom-breadcrumbs'

import { PostNewEditForm } from '../post-new-edit-form'

type Props = {
  post?: IPostItem
}

export function PostEditView({ post }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        backHref={paths.dashboard.post.root}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Blog', href: paths.dashboard.post.root },
          { name: post?.title },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <PostNewEditForm currentPost={post} />
    </DashboardContent>
  )
}
