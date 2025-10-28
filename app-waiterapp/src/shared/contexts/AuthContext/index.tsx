import Cookies from 'js-cookie'
import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react'

import { useLogout } from '@/features/SignIn/mutations/useLogout'
import { useSignIn } from '@/features/SignIn/mutations/useSignIn'

interface AuthContextType {
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInError: Error | null
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const KEY_ACCESS_TOKEN = 'token'
const KEY_REFRESH_TOKEN = 'refreshToken'

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const cookieToken = Cookies.get(KEY_ACCESS_TOKEN)

    return cookieToken ? Boolean(cookieToken) : false
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [isAuthenticated])

  const { mutateAsync: signInMutation, error: signInError  } = useSignIn()
  const { mutateAsync: logoutMutation } = useLogout()

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const data = await signInMutation({ email, password })
        Cookies.set(KEY_ACCESS_TOKEN, data?.data?.accessToken)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Erro ao fazer login:', error)
        throw error
      }
    },
    [signInMutation],
  )

  const signOut = async () => {
    try {
      await logoutMutation()
      Cookies.remove('auth')
      Cookies.remove(KEY_REFRESH_TOKEN)
      Cookies.remove(KEY_ACCESS_TOKEN)
      setIsAuthenticated(false)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      throw error
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        signInError
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
