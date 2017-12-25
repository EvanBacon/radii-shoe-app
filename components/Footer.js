import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './button';
import theme from './theme';

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
}

const styles = StyleSheet.create({
  footer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
});
