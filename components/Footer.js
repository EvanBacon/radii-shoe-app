import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import Button from './button';
import theme from './theme';

const { width } = Dimensions.get('window');
export default class Footer extends React.Component {
  render() {
    const { onPress } = this.props;
    return (
      <View style={[theme.groupButton, styles.footer]}>
        <Button onPress={() => onPress(0)} theme="light">
          ANALYZE
        </Button>
        <Button onPress={() => onPress(1)} theme="light">
          ACQUIRE
        </Button>
      </View>
    );
  }

  onProductListPress(product, index) {}
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productItem: {
    width: width,
    padding: 40,
  },
  footer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
});
