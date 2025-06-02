import { _mock } from './_mock'

import type { IPostItem } from '../types/blog'

export const POST_PUBLISH_OPTIONS = [
  {
    value: 'published',
    label: 'Published',
  },
  {
    value: 'draft',
    label: 'Draft',
  },
]

export const POST_SORT_OPTIONS = [
  { value: 'latest', label: 'Ultimo' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Mais antigo' },
]

export const _blogPosts: Array<IPostItem> = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  tags: Array.from({ length: 3 }, (_, tagIndex) => _mock.tags(index, 3)[tagIndex]),
  publish: [
    'published',
    'draft',
    'published',
    'draft',
    'published',
    'draft',
    'published',
    'draft',
    'published',
    'draft',
    'published',
    'draft',
  ][index],
  content: _mock.description(index),
  coverUrl: _mock.image.cover(index),
  metaTitle: _mock.postTitle(index),
  totalViews: _mock.number.nativeL(index),
  totalShares: _mock.number.nativeL(index),
  description: _mock.sentence(index),
  totalComments: _mock.number.nativeL(index),
  createdAt: _mock.time(index).toISOString(), // Ensure this matches IDateValue, e.g., string
  totalFavorites: _mock.number.nativeL(index),
  metaKeywords: Array.from({ length: 3 }, (_, keywordIndex) => _mock.tags(index, 3)[keywordIndex]),
  metaDescription: _mock.sentence(index),
  comments: [...Array(3)].map((_, commentIndex) => ({
    id: _mock.id(commentIndex),
    name: _mock.fullName(commentIndex),
    message: _mock.sentence(commentIndex),
    avatarUrl: _mock.image.avatar(commentIndex),
    postedAt: _mock.time(commentIndex).toISOString(),
    users: [...Array(2)].map((_, userIndex) => ({
      id: _mock.id(userIndex),
      name: _mock.fullName(userIndex),
      avatarUrl: _mock.image.avatar(userIndex),
    })),
    replyComment: [...Array(2)].map((_, replyIndex) => ({
      id: _mock.id(replyIndex),
      userId: _mock.id(replyIndex),
      message: _mock.sentence(replyIndex),
      tagUser: _mock.boolean(replyIndex) ? _mock.fullName(replyIndex) : undefined,
      postedAt: _mock.time(replyIndex).toISOString(),
    })),
  })),
  author: {
    name: _mock.fullName(index),
    avatarUrl: _mock.image.avatar(index),
  },
  favoritePerson: [...Array(3)].map((_, personIndex) => ({
    name: _mock.fullName(personIndex),
    avatarUrl: _mock.image.avatar(personIndex),
  })),
}))
