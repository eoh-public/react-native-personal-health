import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './ScheduleTimeItemStyles';
import Text from '../../commons/Text';
import { t } from 'i18n-js';
import { Colors } from '../../configs';
import { Alert } from 'react-native';

const mapTime = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun',
};

const ScheduleTimeItem = ({ item }) => {
  const { repeat, weekday_repeat, time_repeat, date_repeat } = item;
  let timeInfo = 'Everyday';
  if (repeat === 'once') {
    timeInfo = date_repeat;
  }
  if (repeat === 'every_week') {
    timeInfo = weekday_repeat
      .map((dateNumber) => mapTime[dateNumber])
      .join(' - ');
  }

  const onEdit = () => {
    return Alert.alert(t('feature_under_development'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.scheduleInfo}>
        <Text type="H4">{time_repeat}</Text>
        <View style={styles.dash} />
        <Text type="Label">{timeInfo}</Text>
      </View>
      <TouchableOpacity onPress={onEdit}>
        <Text type="Label" color={Colors.Primary}>
          {t('edit')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScheduleTimeItem;
