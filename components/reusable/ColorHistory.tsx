import React from 'react';
import { StyleSheet, View } from 'react-native';

import AnimatedCircle from './AnimatedCircle';

type ColorHistoryType = {
  colorHistory: string[];
  circleLength: number;
  handleColorPress: (color: string) => void;
};

const ColorHistory: React.FC<ColorHistoryType> = ({
  colorHistory,
  circleLength,
  handleColorPress,
}) => {
  return (
    <View style={styles.container}>
      {colorHistory.map((color, i) => (
        <AnimatedCircle
          key={Math.random().toString()}
          colorHistory={colorHistory}
          color={color}
          circleLength={circleLength}
          index={i}
          handleColorPress={() => handleColorPress(color)}
        />
      ))}
    </View>
  );
};

export default ColorHistory;

const styles = StyleSheet.create({
  container: {
    height: 45,
    bottom: 100,
    width: '100%',
    position: 'absolute',
  },
});
