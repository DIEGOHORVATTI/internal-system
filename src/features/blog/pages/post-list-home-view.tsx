import type { IPostItem } from '@/types/blog'

import { useState } from 'react'
import { orderBy } from 'es-toolkit'
import { POST_SORT_OPTIONS } from '@/_mock'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { PostList } from '../post-list'
import { PostSort } from '../post-sort'

type Props = {
  posts: IPostItem[]
  loading?: boolean
}

export function PostListHomeView({ posts, loading }: Props) {
  const [sortBy, setSortBy] = useState('latest')

  const dataFiltered = applyFilter({ inputData: posts, sortBy })

  return (
    <Container>
      <Typography variant="h4" sx={[{ my: { xs: 3, md: 5 } }]}>
        Blog
      </Typography>

      <Box
        sx={[
          () => ({
            gap: 3,
            display: 'flex',
            mb: { xs: 3, md: 5 },
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-end', sm: 'center' },
          }),
        ]}
      >
        <PostSort
          sort={sortBy}
          onSort={(newValue: string) => setSortBy(newValue)}
          sortOptions={POST_SORT_OPTIONS}
        />
      </Box>

      <PostList posts={dataFiltered} loading={loading} />
    </Container>
  )
}

type ApplyFilterProps = {
  inputData: IPostItem[]
  sortBy: string
}

function applyFilter({ inputData, sortBy }: ApplyFilterProps) {
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc'])
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc'])
  }

  if (sortBy === 'popular') {
    return orderBy(inputData, ['totalViews'], ['desc'])
  }

  return inputData
}
