import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Colors } from '../../configs';
import styles from './styles';

const FloatingActionButton = React.forwardRef(
  (
    {
      icon,
      color = Colors.White,
      backgroundColor = Colors.Primary,
      size = 20,
      onPress,
    },
    ref
  ) => {
    return (
      <View style={styles.wrap}>
        <TouchableOpacity
          ref={ref}
          style={[styles.button, { backgroundColor }]}
          onPress={onPress}
        >
          <Icon name={icon} color={color} size={size} />
        </TouchableOpacity>
      </View>
    );
  }
);

export default memo(FloatingActionButton);
