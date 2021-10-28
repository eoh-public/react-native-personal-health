import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { Icon } from '@ant-design/react-native';

import Text from '../../commons/Text';
import styles from './styles/reminderStyle';
import { Colors } from '../../configs/Colors';

export const ReminderItem = ({
  title,
  description,
  onPressMore,
  buttonMoreRef,
}) => {
  return (
    <View style={styles.reminder}>
      <IconOutline
        name="export"
        style={styles.reminderIcon}
        size={24}
        color={Colors.Green7}
      />
      <View style={styles.reminderContent}>
        <Text type={'H4'} bold>
          {title}
        </Text>
        <Text
          type={'Label'}
          color={Colors.Gray7}
          style={styles.reminderItemDescription}
        >
          {description}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPressMore}
        ref={buttonMoreRef}
        style={styles.reminderOption}
      >
        <Icon name={'more'} color={Colors.Gray9} />
      </TouchableOpacity>
    </View>
  );
};
