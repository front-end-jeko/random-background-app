import { Pressable, PressableProps } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface TouchableScaleProps<T> extends PressableProps {
  activeScale?: number;
}

const config = { duration: 200, easing: Easing.elastic(1) };

export default function TouchableScale<T = string>({
  activeScale = 0.75,
  customStyle,
  onPressIn,
  onPressOut,
  ...props
}: TouchableScaleProps<T>) {
  const scale = useSharedValue(1);

  const scaleStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] };
  }, [scale]);

  const scaleTo = (to: number) => {
    scale.value = withTiming(to, config);
  };

  return (
    <AnimatedPressable
      style={[customStyle, scaleStyle]}
      onPressIn={(event) => {
        scaleTo(activeScale);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scaleTo(1);
        onPressOut?.(event);
      }}
      {...props}
    />
  );
}
