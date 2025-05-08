import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useCategories } from './provider'
import Category from './category';
import { Animated } from 'react-native';
import Skeleton from '../ui/skeleton';

export default function MealCategories() {

  const {
    categories,
    current,
    setCurrent,
    isPending,
    isError
  } = useCategories();

  if (isPending) {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          columnGap: 8
        }}
      >
        <Skeleton width={50} height={24} />
        <Skeleton width={50} height={24} />
        <Skeleton width={50} height={24} />
        <Skeleton width={50} height={24} />
        <Skeleton width={50} height={24} />
        <Skeleton width={50} height={24} />
      </ScrollView>
    )
  }

  if (isError) {

  }

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        columnGap: 8
      }}
    >
      {
        categories?.map((category, index) => <Category key={index} category={category} />)
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  skeletonContainer: {
    rowGap: 16,
    columnGap: 16
  }
})
