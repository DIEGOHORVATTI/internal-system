import type { IPostItem } from '@/types/blog'

import { paths } from '@/routes/paths'

import Box from '@mui/material/Box'
import Pagination, { paginationClasses } from '@mui/material/Pagination'

import { PostItemSkeleton } from './post-skeleton'
import { PostItemHorizontal } from './post-item-horizontal'

type Props = {
  posts: IPostItem[]
  loading?: boolean
}

export function PostListHorizontal({ posts, loading }: Props) {
  const renderLoading = () => <PostItemSkeleton variant="horizontal" />

  const renderList = () =>
    posts.map((post) => (
      <PostItemHorizontal
        key={post.id}
        post={post}
        detailsHref={paths.post.details(post.title)}
        editHref={paths.post.edit(post.title)}
      />
    ))

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
        }}
      >
        {loading ? renderLoading() : renderList()}
      </Box>

      {posts.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  )
}
