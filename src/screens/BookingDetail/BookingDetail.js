import React, { memo, useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import Text from '../../commons/Text';
import Header from '../../commons/Header';
import HospitalInfo from './HospitalInfo';
import RowInfo from './RowInfo';
import BookingTime from './BookingTime';
import BottomButtonView from '../../commons/BottomButtonView';
import ItemPaymentMethod from './ItemPaymentMethod';
import IncludeDataHistory from './IncludeDataHistory';
import useBookingDetail from './hooks';

import styles from './styles/bookingDetailStyles';
import { Colors } from '../../configs';
import { HOSPITAL } from '../../configs/Constants';
import { formatMoney } from '../../utils/Utils';

const BookingDetail = memo(({ route }) => {
  const { hospitalId } = route.params;
  const { goBack } = useNavigation();
  const [isIncludeDataHistory, setIsIncludeDataHistory] = useState(false);

  const { time, hospital, getHospital, isLoadingHospital } =
    useBookingDetail(hospitalId);

  useEffect(() => {
    getHospital();
  }, [getHospital]);

  const totalPriceStr = formatMoney(HOSPITAL.price);

  return (
    <View style={styles.container}>
      <Header
        title={t('booking_detail')}
        hasBack
        goBack={goBack}
        wrapStyle={styles.header}
        buttonBackStyle={styles.buttonBack}
        wrapTitleStyle={styles.wrapTitle}
        titleStyle={styles.title}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {isLoadingHospital ? (
          <ActivityIndicator color={Colors.Gray4} />
        ) : (
          hospital && <HospitalInfo hospital={hospital} />
        )}
        <View style={styles.content}>
          <BookingTime time={time} />
          <View style={styles.separator} />
          <RowInfo
            leftText={t('total')}
            rightText={totalPriceStr}
            leftTextType="H3"
            rightTextType="H3"
            rightTextBold
          />
          <View style={styles.separator} />
          <RowInfo leftText={t('payment_method')} marginBottom />
          <ItemPaymentMethod />
          <View style={styles.separator} />
          <RowInfo leftText={t('report_data')} />
          <Text type="H4" color={Colors.Gray9} style={styles.text}>
            {t('report_data_description')}
          </Text>
          <IncludeDataHistory
            isTick={isIncludeDataHistory}
            onTick={setIsIncludeDataHistory}
          />
        </View>
      </ScrollView>
      <BottomButtonView
        onPressMain={() => {}}
        mainTitle={`${t('confirm_booking')} - ${totalPriceStr}`}
        typeMain={'primary'}
        style={styles.viewBottom}
      />
    </View>
  );
});

export default BookingDetail;
