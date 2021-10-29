import React from 'react';
import { View } from 'react-native';
import Text from '../../commons/Text';
import { Colors } from '../../configs';
import styles from './styles/rowInfoStyles';

const RowInfo = ({
  leftText,
  rightText,
  leftTextType,
  rightTextType,
  rightTextBold,
  marginBottom,
}) => {
  return (
    <View style={[styles.wrap, marginBottom && styles.marginBottom16]}>
      {!!leftText && (
        <Text type={leftTextType || 'H4'} color={Colors.Black} bold>
          {leftText}
        </Text>
      )}
      {!!rightText && (
        <Text
          type={rightTextType || 'H4'}
          color={Colors.Gray9}
          bold={rightTextBold}
        >
          {rightText}
        </Text>
      )}
    </View>
  );
};

export default RowInfo;
