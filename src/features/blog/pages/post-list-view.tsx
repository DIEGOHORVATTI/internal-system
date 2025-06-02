import type { IPostItem, IPostFilters } from '@/types/blog'

import { orderBy } from 'es-toolkit'
import { paths } from '@/routes/paths'
import Label from '@/components/label'
import Iconify from '@/components/iconify'
import { POST_SORT_OPTIONS } from '@/_mock'
import { useGetPosts } from '@/actions/blog'
import { useState, useCallback } from 'react'
import MainContent from '@/layouts/main-content'
import { useSetState } from 'minimal-shared/hooks'
import RouterLink from '@/routes/components/router-link'

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { Stack } from '@mui/material'
import Button from '@mui/material/Button'

import { PostSort } from '../post-sort'
import { PostListHorizontal } from '../post-list-horizontal'

export default function PostListView() {
  const { posts, postsLoading } = useGetPosts()

  const [sortBy, setSortBy] = useState('latest')

  const { state, setState } = useSetState<IPostFilters>({ publish: 'all' })

  const dataFiltered = applyFilter({ inputData: posts, filters: state, sortBy })

  const handleFilterPublish = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      setState({ publish: newValue })
    },
    [setState]
  )

  return (
    <MainContent
      slotProps={{
        breadcrumbs: {
          links: [
            { name: 'Dashboard', href: paths.home },
            { name: 'Blog', href: paths.post.root },
            { name: 'List' },
          ],
          action: (
            <Button
              component={RouterLink}
              href={paths.post.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New post
            </Button>
          ),
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Tabs value={state.publish} onChange={handleFilterPublish} sx={{ mb: { xs: 3, md: 5 } }}>
          {['all', 'published', 'draft'].map((tab) => (
            <Tab
              key={tab}
              iconPosition="end"
              value={tab}
              label={tab}
              icon={
                <Label
                  variant={((tab === 'all' || tab === state.publish) && 'filled') || 'soft'}
                  color={(tab === 'published' && 'info') || 'default'}
                >
                  {tab === 'all' && posts.length}
                  {tab === 'published' &&
                    posts.filter((post) => post.publish === 'published').length}
                  {tab === 'draft' && posts.filter((post) => post.publish === 'draft').length}
                </Label>
              }
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Tabs>

        <PostSort
          sort={sortBy}
          onSort={(newValue: string) => setSortBy(newValue)}
          sortOptions={POST_SORT_OPTIONS}
        />
      </Stack>

      <PostListHorizontal posts={dataFiltered} loading={postsLoading} />
    </MainContent>
  )
}

type ApplyFilterProps = {
  inputData: IPostItem[]
  filters: IPostFilters
  sortBy: string
}

function applyFilter({ inputData, filters, sortBy }: ApplyFilterProps) {
  const { publish } = filters

  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc'])
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc'])
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc'])
  }

  if (publish !== 'all') {
    inputData = inputData.filter((post) => post.publish === publish)
  }

  return inputData
}
