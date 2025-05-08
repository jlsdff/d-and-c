import React, { useState } from 'react'
import { View, ActivityIndicator, Pressable, Text, StyleSheet } from 'react-native';

interface LoadingButtonProps<T = void> {
  content: string;
  onPress: () => Promise<T>;
  isDisable?: boolean;
  className: string;
  textClassName?: string;
  isLoading?: boolean;
  spinnerProps?: React.ComponentProps<typeof ActivityIndicator>;
}

export default function LoadingButton<T = void>({
  content,
  onPress,
  className,
  textClassName,
  isLoading,
  isDisable,
  spinnerProps,
  ...props
}: LoadingButtonProps<T>) {

  const [pressed, setPressed] = useState<boolean>(false)

  const onpress = async () => {
    try {

      if (isDisable) {
        return
      }

      setPressed(true)
      await onPress()

    } catch (error) {
      console.error(error)
    } finally {
      setPressed(false)
    }
  }

  return (
    <Pressable
      onPress={onpress}
      style={[styles.centerCon, (pressed || isDisable) && styles.disable]}
      className={` w-full text-center ${pressed ? "opacity-50" : ""} ${className} `}
    >
      {
        isLoading && (
          <ActivityIndicator
            animating={isLoading ?? false}
            {...spinnerProps}
          />)
      }
      <View className='flex flex-row '>
        <Text className={`${textClassName}`}>{content}</Text>
      </View>
    </Pressable>
  );

}

const styles = StyleSheet.create({
  centerCon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 18
  },
  disable: {
    opacity: .5,
  }
})

