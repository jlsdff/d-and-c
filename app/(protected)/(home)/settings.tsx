import { Text, View, Pressable, ScrollView, StyleSheet } from "react-native";
import useAuth from "@/hooks/useAuth";


function Settings({ }) {

  const authCtx = useAuth()

  return (
    <ScrollView className=" bg-black text-slate-50 " >
      <View className="pt-16">
        <Pressable
          onPress={() => authCtx.logout()}
          className="bg-primary-200 px-5 py-2.5 rounded-lg mt-4"
        >
          <Text>Logout</Text>
        </Pressable>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})

export default Settings;
