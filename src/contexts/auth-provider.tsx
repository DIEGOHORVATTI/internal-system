import type { IUser } from '@/types/IUser'

import { decodeJwt } from '@/shared/decode-jwt'
import { STORAGE_KEYS } from '@/constants/config'
import { useMemo, useCallback, createContext } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

export type IAuthContext = {
  user: IUser | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as IAuthContext)

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const {
    state: user,
    update,
    remove,
  } = useLocalStorage<IUser | null>(STORAGE_KEYS.USER_TOKEN, null)

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      // Header e payload simulados
      const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
      const payload = btoa(
        JSON.stringify({
          id: '1',
          email,
          name: 'John Doe',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      )
      const signature = 'mocked_signature'

      const mockToken = `${header}.${payload}.${signature}`

      const decodedUser = decodeJwt<IUser>(mockToken)

      if (!decodedUser) throw new Error('Invalid token')

      update(decodedUser)
    },
    [update]
  )

  const logout = useCallback(() => {
    remove()
  }, [remove])

  const value = useMemo<IAuthContext>(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: !!user,
    }),
    [user, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
