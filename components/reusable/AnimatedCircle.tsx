import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type AnimatedCircleType = {
  color: string;
  circleLength: number;
  colorHistory: string[];
  index: number;
  handleColorPress: () => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPACING = 65;
const DURATION = 500;

const AnimatedCircle: React.FC<AnimatedCircleType> = ({
  color,
  circleLength,
  colorHistory,
  index,
  handleColorPress,
}) => {
  const translateX = useSharedValue(index * SPACING);
  const opacity = useSharedValue(index === 0 ? 0 : 1);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: interpolate(opacity.value, [0, 1], [0, 1]),
    transform: [
      {
        translateX: interpolate(
          translateX.value,
          [index * SPACING, (index + 1) * SPACING],
          [index * SPACING, (index + 1) * SPACING],
          Extrapolation.CLAMP
        ),
      },
      { scale: interpolate(opacity.value, [0, 1], [0, 1]) },
    ],
  }));

  useEffect(() => {
    let translateXValue = (index + 1) * SPACING;

    if (index === 0) {
      translateX.value = withTiming(translateXValue, { duration: DURATION });
      opacity.value = withTiming(1, { duration: DURATION });
    } else if (index === circleLength) {
      let position: number = circleLength * SPACING + SPACING;

      translateX.value = withTiming(position, { duration: DURATION });
      opacity.value = withTiming(0, { duration: DURATION });
    } else {
      translateX.value = withTiming(translateXValue, { duration: DURATION });
    }
  }, [colorHistory.length]);

  return (
    <AnimatedPressable
      onPress={handleColorPress}
      style={[{ ...styles.colorBox, backgroundColor: color }, animatedButtonStyle]}
    />
  );
};

export default AnimatedCircle;

const styles = StyleSheet.create({
  colorBox: {
    width: 40,
    height: 40,
    zIndex: 100,
    borderWidth: 2,
    borderRadius: 20,
    cursor: 'pointer',
    position: 'absolute',
    borderColor: '#fff',
  },
});
