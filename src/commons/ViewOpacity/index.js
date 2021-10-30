import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const ViewOpacity = ({ children }) => {
  return <View style={styles.wrap}>{children}</View>;
};

export default ViewOpacity;
