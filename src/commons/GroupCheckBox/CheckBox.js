import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Text from 'components/Text';
import { Colors } from 'configs';
import CustomCheckbox from '../CustomCheckbox';

import styles from './CheckBoxStyles';

const CheckBox = memo(
  ({ select, title, index, onSelect, source, description }) => {
    const onPress = useCallback(() => {
      onSelect && onSelect(index);
    }, [index, onSelect]);

    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <CustomCheckbox value={select} style={styles.svgCheck} />
        <Text size={16} color={Colors.Gray9} style={styles.txt}>
          {title}
          {!!description && (
            <Text size={14} color={Colors.Gray8}>
              {`{\n}${description}`}
            </Text>
          )}
        </Text>
        {source && <FastImage source={source} style={styles.img} />}
        <View style={styles.line} />
      </TouchableOpacity>
    );
  }
);

export default CheckBox;
