import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useCategories } from './provider'
import colors from '@/constants/colors'
export default function Category({ category }: { category: string }) {
  const {
    setCurrent,
    current
  } = useCategories()
  return (
    <TouchableOpacity onPress={() => setCurrent(category)}>
      <View style={[
        styles.container,
        current === category && styles.active
      ]} className='border border-1  '>

        <Text style={[
          styles.text,
          current === category && styles.textActive
        ]} className='text-sm text-neutral-100'>{category}</Text>

      </View>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.neutral[700],
    borderColor: colors.neutral[800]
  },
  active: {
    backgroundColor: colors.primary[500],
  },
  text: {
    color: colors.neutral[100],
  },
  textActive: {
    color: colors.primary[950]
  }
})
