import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { Colors } from '../../configs';
import styles from './styles';

const TextColor = {
  primary: Colors.Primary,
  info: Colors.Gray8,
  disable: Colors.Gray6,
};

const BorderColor = {
  primary: Colors.Primary,
  info: Colors.Gray6,
  disable: Colors.Gray6,
};

const BackgroundColor = {
  primary: Colors.White,
  info: Colors.White,
  disable: Colors.Gray3,
};

const RowTitleButton = memo(
  ({
    style,
    title = '',
    titleType,
    titleBold,
    buttonText = '',
    buttonType,
    onPress,
  }) => {
    const textColor = TextColor[buttonType];
    const borderColor = BorderColor[buttonType];
    const backgroundColor = BackgroundColor[buttonType];
    return (
      <View style={[styles.row, style]}>
        <Text type={titleType} color={Colors.Gray9} bold={titleBold}>
          {title}
        </Text>
        {!!buttonText && !!buttonType ? (
          <TouchableOpacity
            style={[styles.button, { borderColor, backgroundColor }]}
            onPress={onPress}
          >
            <Text type="Label" color={textColor}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  }
);

export default RowTitleButton;
