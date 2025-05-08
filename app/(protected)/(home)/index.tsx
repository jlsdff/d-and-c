import { Text, View, ScrollView, TextInput, Button, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '@/constants/colors';
import { Link, useRouter } from 'expo-router';
import MealCategories from '@/components/categories';

export default function HomeScreen() {

  const router = useRouter()

  return (
    <View className='relative flex-1 bg-neutral-900'>

      <ScrollView className='py-12 px-4'>
        <View className='mb-2'>
          <Text className='text-2xl font-bold text-neutral-100'>Categories</Text>
        </View>
        <MealCategories />
      </ScrollView>

      <View className='absolute bottom-4 right-4'>
        <TouchableOpacity onPress={() => router.push('/meal/newMeal')} className='bg-primary-500 p-4 aspect-square rounded-full'>
          <AntDesign name="plus" size={24} color={colors.primary[900]} />
        </TouchableOpacity>
      </View>

    </View>

  );
}

