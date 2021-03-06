import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

const colors = {
  dark: '#222',
  // light: '#f0f0f0',
  light: '#ffffff',
  bg: '#f9f9f9',
  price: '#999999',
  green: '#A5A5A5',
  darkGreen: '#999999',
};
export const sizes = {
  bubble: 18,
  bigBubble: 32,
  bubbleSelectedBorder: 1,
  bigBubbleSelectedBorder: 2,
  defaultSpacing: 16,
  screenWidth: width,
  screenHeight: height,
  newLabelWidth: 62,
  newLabelHeight: 30,
  placeholderSize: 40,
};

export default StyleSheet.create({
  bg: {
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dark: {
    backgroundColor: colors.dark,
  },
  light: {
    backgroundColor: colors.light,
  },
  darkText: {
    color: colors.light,
  },
  lightText: {
    color: colors.dark,
  },
  buttonSize: {
    fontSize: 14,
  },
  button: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 62,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: 16,
  },
  price: {
    fontSize: 18,
    color: colors.price,
    marginBottom: 12,
  },
  priceSmall: {
    fontSize: 14,
  },
  normal: {
    fontSize: 14,
  },
  // Shoe list styles
  shoeColorBubble: {
    height: sizes.bubble,
    width: sizes.bubble,
    borderRadius: sizes.bubble / 2,
    marginRight: sizes.bubble / 3,
  },
  selectedBubble: {
    borderWidth: sizes.bubbleSelectedBorder,
    borderColor: '#fff',
    position: 'absolute',
    top: sizes.bubbleSelectedBorder,
    left: sizes.bubbleSelectedBorder,
    width: sizes.bubble - sizes.bubbleSelectedBorder * 2,
    height: sizes.bubble - sizes.bubbleSelectedBorder * 2,
    borderRadius: (sizes.bubble - sizes.bubbleSelectedBorder * 2) / 2,
  },
  // Shoe list styles
  shoeColorBigBubble: {
    height: sizes.bigBubble,
    width: sizes.bigBubble,
    borderRadius: sizes.bigBubble / 2,
  },
  selectedBigBubble: {
    borderWidth: sizes.bigBubbleSelectedBorder,
    // HACK
    // borderWidth: 3,
    borderColor: '#fff',
    position: 'absolute',
    top: sizes.bigBubbleSelectedBorder,
    left: sizes.bigBubbleSelectedBorder,
    width: sizes.bigBubble - sizes.bigBubbleSelectedBorder * 2,
    height: sizes.bigBubble - sizes.bigBubbleSelectedBorder * 2,
    borderRadius: (sizes.bigBubble - sizes.bigBubbleSelectedBorder * 2) / 2,
  },
  newLabel: {
    zIndex: 1,
    minWidth: sizes.newLabelWidth,
    height: sizes.newLabelHeight,
    borderRadius: sizes.newLabelHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 4,
  },
  newLabelText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
  },
  greenTheme: {
    borderColor: colors.darkGreen,
    backgroundColor: colors.green,
  },
  darkTheme: {
    borderColor: '#000',
    backgroundColor: colors.dark,
  },
  absoluteTopLeft: {
    position: 'absolute',
    right: sizes.defaultSpacing,
    top: sizes.defaultSpacing,
  },
  image: {
    width: 300,
    height: 340,
    resizeMode: 'contain',
  },
});
