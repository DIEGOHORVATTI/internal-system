export default function updateOpenMenus(
  currentPath: string,
  pathToParents: Record<string, string[]>
) {
  const parents = pathToParents[currentPath] || []

  const newState: Record<string, boolean> = {}
  parents.filter(Boolean).forEach((path) => {
    newState[path] = true
  })

  return newState
}
