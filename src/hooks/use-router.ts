import { useNavigate, useLocation } from 'react-router-dom'

export default function useRouter() {
  const navigate = useNavigate()
  const location = useLocation()

  const navigateTo = (path: string) => {
    navigate(path)
  }

  const replaceRoute = (path: string) => {
    navigate(path, { replace: true })
  }

  const goBack = () => {
    navigate(-1)
  }

  const reloadPage = () => {
    window.location.reload()
  }

  const getCurrentPath = () => location.pathname
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search)
    return Object.fromEntries(params.entries())
  }

  const getAsPath = () => location.pathname + location.search

  return {
    navigateTo,
    replaceRoute,
    goBack,
    reloadPage,
    getCurrentPath,
    getQueryParams,
    getAsPath,
  }
}
