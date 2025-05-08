import { StyleSheet, Text, View } from 'react-native'
import { createContext, useState, FC, useEffect } from 'react'
import { auth } from "@/constants/firebaseConfig"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'expo-router'
import { User } from 'firebase/auth'

interface ProviderProps {
  children: React.ReactNode
}

export interface LoginResponse {
  code: number | null;
  message: string | null;
}

export interface AuthContext {
  readonly user: User | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  login: async (email, password) => { return { code: null, message: null } },
  logout: () => { }
})

export default function AuthProvider({ children }: ProviderProps) {

  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/")
        setUser(user)
      }
    })

    return () => unsubscribe()

  }, [])

  const login = async (email: string, password: string) => {

    const response = {
      code: 200,
      message: ""
    }

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        setUser(user)
        router.replace("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-credential":
            response.code = 401;
            response.message = "Invalid Email or Password."
            break;
          case "auth/too-many-requests":
            response.code = 429;
            response.message = "Too many request. Try again later."
            break;
          default:
            response.code = 500;
            response.message = "Something went wrong. Try again later."
            break;
        }
        const errorMessage = error.message;
      })

    return response;
  }

  const logout = () => {
    auth.signOut()
      .then(() => {
        setUser(null)
        router.replace("/login")
      })
  }

  const value = {
    user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({})
