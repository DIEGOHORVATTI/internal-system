import { useEffect } from 'react'
import { ROUTES } from '@/routes'
import useAuth from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

export default function AuthGuard({ children }: React.PropsWithChildren) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.auth.login)

      return
    }

    navigate(ROUTES.home)
  }, [isAuthenticated, navigate])

  return children
}
