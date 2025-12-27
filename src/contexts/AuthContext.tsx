import { createContext, useContext, type ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'

interface AuthContextType {
  user: User | null | undefined
  loading: boolean
  error: Error | undefined
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: undefined,
})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading, error] = useAuthState(auth)

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

