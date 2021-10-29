import React from 'react';
import { View } from 'react-native';
import Text from '../../commons/Text';
import { t } from 'i18n-js';
import { Colors } from '../../configs';
import styles from './styles/bookingTimeStyles';

const BookingTime = ({ time }) => {
  const timeFormatDate = time.format('MMMM D,YYYY');
  const timeFormatTime = time.format('h:mm A');
  return (
    <View style={styles.wrapBookingTime}>
      <Text type="H4" color={Colors.Black} bold>
        {t('time')}
      </Text>
      <View style={styles.verticalLine} />
      <Text type="H4" color={Colors.Gray9}>
        {timeFormatDate}
      </Text>
      <View style={styles.dot} />
      <Text type="H4" color={Colors.Gray9}>
        {timeFormatTime}
      </Text>
    </View>
  );
};

export default BookingTime;
