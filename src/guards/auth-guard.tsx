import { useEffect } from 'react'
import { PATHS } from '@/routes/paths'
import useAuth from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

export default function AuthGuard({ children }: React.PropsWithChildren) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATHS.auth.login)
      return
    }

    if (window.location.pathname === PATHS.auth.login) {
      navigate(PATHS.home)
    }
  }, [isAuthenticated, navigate])

  return children
}
