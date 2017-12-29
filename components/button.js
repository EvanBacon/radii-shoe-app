import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './theme';

export default ({ children, ...props }) => {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, styles.light, { flex: 1 }]}
    >
      <Text style={[styles.customFont, styles.buttonSize, styles.lightText]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
