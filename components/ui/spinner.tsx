import { ActivityIndicator } from 'react-native'
import { ColorValue } from 'react-native';

export interface SpinnerProps extends React.ComponentProps<typeof ActivityIndicator> {
  color?: ColorValue | undefined;
  size?: 'small' | 'large';
  className?: string;
  animating: boolean;
}

export default function Spinner({
  color, size, className, animating, ...props
}: SpinnerProps) {

  return (
    <ActivityIndicator size={size ?? 'small'}
      animating={animating ?? false}
      color={color}
      className={className}
      {...props}
    />
  )
}
