import type { Navigation } from '@/routes/nav-config'

export default function buildPathMap(items: Array<Navigation>, parents: string[] = []) {
  const pathMap = items.reduce((acc: Record<string, string[]>, item) => {
    if (item.path) {
      acc[item.path] = [...parents]
    }

    if (item.children) {
      Object.assign(acc, buildPathMap(item.children, [...parents, item.path!]))
    }

    return acc
  }, {})

  return pathMap
}
