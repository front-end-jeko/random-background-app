import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { debounce } from 'lodash';

import ColorHistory from './components/reusable/ColorHistory';
import { formatColor, generateRandomColor } from './utils/utils';

const CIRCLE_LENGTH = 4;
const DEBOUNCE_DELAY = 200;

const App = () => {
  const [colorHistoryArray, setColorHistoryArray] = useState<string[]>([]);
  const animatedColor = useSharedValue('#fff');

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: animatedColor.value,
  }));

  const handlePress = () => {
    const newColor = formatColor(generateRandomColor());
    animatedColor.value = withTiming(newColor);
    setColorHistoryArray((prevHistory) => [newColor, ...prevHistory.slice(0, CIRCLE_LENGTH)]);
  };

  const debouncedHandleColorPress = useCallback(
    debounce(() => {
      handlePress();
    }, DEBOUNCE_DELAY),
    [handlePress]
  );

  const handleColorPress = (color: string) => {
    animatedColor.value = withTiming(color);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={debouncedHandleColorPress} style={styles.container}>
        <Animated.View style={[styles.animatedView, animatedStyle]}>
          <Text style={styles.text}>Hello there</Text>
        </Animated.View>
      </Pressable>

      <ColorHistory
        colorHistory={colorHistoryArray}
        circleLength={CIRCLE_LENGTH}
        handleColorPress={handleColorPress}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 34,
    userSelect: 'none',
  },
});
