interface Color {
  red: number;
  green: number;
  blue: number;
}

const generateRandomColor = (): Color => {
  return {
    red: Math.floor(Math.random() * 256),
    green: Math.floor(Math.random() * 256),
    blue: Math.floor(Math.random() * 256),
  };
};

const formatColor = (color: Color): string => {
  return `rgb(${color.red}, ${color.green}, ${color.blue})`;
};

export { generateRandomColor, formatColor };
