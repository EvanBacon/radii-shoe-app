import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './button';

export default (Footer = props => {
  const { onPress, buy } = props;
  return (
    <View style={styles.footer}>
      {!buy && <Button onPress={() => onPress(0)}>ANALYZE</Button>}
      <Button onPress={() => onPress(1)}>ACQUIRE</Button>
    </View>
  );
});

const styles = StyleSheet.create({
  footer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
