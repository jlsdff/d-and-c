import { useDisclosure } from '@/hooks/useDisclosure';
import { View, Text, StyleSheet } from 'react-native';
// import { Container } from './styles';

export default function Modal() {
  const { onToggle } = useDisclosure()
  return (
    <View className='flex-1'>
      <Text>This is a modal.</Text>
    </View>
  );
}

const styles = StyleSheet.create({

})

