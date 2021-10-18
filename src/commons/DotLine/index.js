import React from 'react';
import { View } from 'react-native';
import Text from '../../commons/Text';
import styles from './styles';

const DotLine = ({ text, style }) => {
  return (
    <View style={[styles.line, style && { ...style }]}>
      <Text type="H2" style={styles.dot}>
        .
      </Text>
      <Text type="H4">{text}</Text>
    </View>
  );
};

export default DotLine;
