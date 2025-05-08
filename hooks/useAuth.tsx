import { AuthContext } from '@/components/auth/authProvider'
import { useContext } from 'react'

export default function useAuth() {
  const authCtx = useContext(AuthContext)
  return authCtx;
}
