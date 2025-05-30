export type INotification = Array<{
  id: string
  avatarUrl: string | null
  type: string
  category: string
  isUnRead: boolean
  createdAt: Date
  title: string
}>
