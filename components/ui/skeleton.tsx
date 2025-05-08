import colors from '@/constants/colors';
import { useEffect } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated'

interface SkeletonProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
  highlightColor?: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>
}

export default function Skeleton({
  width = 100,
  height = 20,
  borderRadius = 4,
  backgroundColor = colors.neutral[800],
  highlightColor = colors.neutral[500],
  active = true,
  style,
}: SkeletonProps) {

  const opacity = useSharedValue(1);

  useEffect(() => {
    if (active) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        false
      )
    } else {
      opacity.value = 1;
    }
  }, [active, opacity])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      backgroundColor: backgroundColor
    }
  })

  return (
    <Animated.View style={[
      styles.skeleton,
      animatedStyles,
      { width, height, borderRadius },
      style
    ]} />
  )
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden'
  }
})
