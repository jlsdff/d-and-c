import { Redirect, SplashScreen, Stack } from 'expo-router'
import useAuth from '@/hooks/useAuth'
import { Toaster } from "sonner-native"

SplashScreen.preventAutoHideAsync()

//  FIX:  install toaster dependencies

export default function ProtectedLayout() {

  const authCtx = useAuth();

  if (authCtx.user === null) {
    console.log("auth context user: ", authCtx.user)
    SplashScreen.hideAsync()
    return <Redirect href="/login" />
  }

  SplashScreen.hideAsync()

  return (
    <>
      <Toaster />
      <Stack screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen
          name="modal"
          options={{
            headerShown: true,
            presentation: 'modal'
          }}
        />
      </Stack>
    </>
  )
}
