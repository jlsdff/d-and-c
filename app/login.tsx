import { View, Text, Image, ScrollView, TextInput, StyleSheet, Button, Pressable } from "react-native"
import { Stack } from "expo-router"
import { useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"
import { LoginResponse } from "@/components/auth/authProvider"
import LoadingButton from "@/components/ui/loadingButton"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const authCtx = useAuth()

  const [loginResponse, setLoginResponse] = useState<LoginResponse>({
    code: null,
    message: null
  })

  const [isLoading, setIsloading] = useState<boolean>(false)

  const login = async (): Promise<void> => {
    try {
      setIsloading(true)

      if (!email && !password) {
        setLoginResponse({
          code: 401,
          message: "Enter email and password."
        })
        return
      }

      await authCtx.login(email, password)
        .then(response => {
          setLoginResponse(response)
        })

    } catch (error) {
      console.error(error)
    } finally {
      setIsloading(false)
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <ScrollView className=" bg-black text-slate-50" contentContainerStyle={styles.scrollView} >

        <View className="flex-row ">
          <Image
            source={require("../assets/images/dineAndChill.jpg")}
            style={styles.image}
          />
        </View>

        <View className="px-4 mt-4 gap-2">
          <TextInput className="border border-1 border-primary-100 px-5 py-2.5 rounded-lg text-primary-50 placeholder:text-slate-50/50" value={email} onChangeText={email => setEmail(email.trim())} placeholder="Email" />
          <View>
            <TextInput className="border border-1 border-primary-100 px-5 py-2.5 rounded-lg text-primary-50 placeholder:text-slate-50/50" secureTextEntry={true} value={password} onChangeText={password => setPassword(password.trim())} placeholder="Password" />
            {
              (loginResponse?.code === 401 ||
                loginResponse?.code === 429 ||
                loginResponse?.code === 500
              )
              && (
                <Text className="text-red-700 text-sm text-center pt-2">{loginResponse.message}</Text>
              )
            }
          </View>
          <LoadingButton
            content="Login"
            onPress={login}
            isDisable={!email || !password}
            className="bg-primary-200 px-5 py-2.5 rounded-lg mt-4"
            textClassName="text-center font-semibold text-primary-900 "
            isLoading={isLoading}
          />
        </View>

      </ScrollView>
    </>

  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 16 / 9
  }
})
