import useAuth from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

export default function AuthGuard({ children }: React.PropsWithChildren) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  /* 
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth')

      return
    }

    navigate('/')
  }, [isAuthenticated, navigate]) 
  */

  return children
}
