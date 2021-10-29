import React, { memo, useMemo } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import { getStatusBarHeight } from '../../configs/Constants';
import RowDrawer from './components/Drawer/RowDrawer';
import HeaderDrawer from '../../commons/HeaderDrawer';
import { VersionText } from '../../commons/VersionText';
import Routes from '../../utils/Route';

import {
  SvgAccount,
  SvgHub,
  SvgReminder,
  SvgReport,
  SvgSetting,
  SvgPaymentMethod,
  SvgTermConditions,
} from '../../../assets/images/Drawer';

const PersonalHealthDrawer = memo(() => {
  const data = useMemo(
    () => [
      {
        id: '0',
        route: Routes.AccountSetting,
        leftImage: <SvgAccount />,
        name: t('account_setting'),
      },
      {
        id: '1',
        route: Routes.HealthDevices,
        leftImage: <SvgHub />,
        name: t('health_devices'),
      },
      {
        id: '2',
        route: null,
        leftImage: <SvgReport />,
        name: t('booking_details'),
      },
      {
        id: '3',
        route: Routes.FindHospital,
        leftImage: <SvgReport />,
        name: t('hospitals'),
      },
      {
        id: '4',
        route: Routes.Reminder,
        leftImage: <SvgReminder />,
        name: t('reminder'),
      },
      {
        id: '5',
        route: Routes.PaymentMethod,
        leftImage: <SvgPaymentMethod />,
        name: t('payment_method'),
      },
      {
        id: '6',
        route: null,
        leftImage: <SvgSetting />,
        name: t('system_setting'),
      },
    ],
    []
  );

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollView}>
        <HeaderDrawer />
        <View style={styles.wrapMenu}>
          {data.map((item) => (
            <RowDrawer key={item.id} {...item} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.groupBottom}>
        <RowDrawer
          route={null}
          leftImage={<SvgTermConditions />}
          name={t('terms_and_conditions')}
          borderTop
        />
        <RowDrawer
          route={Routes.Main}
          leftImage={<Icon name={'export'} size={24} color={Colors.Red6} />}
          name={t('exit_health_tech')}
          textColor={Colors.Red6}
          borderTop
        />
        <VersionText />
      </View>
    </View>
  );
});
export default PersonalHealthDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: getStatusBarHeight() + 10,
  },
  scrollView: {
    paddingBottom: 60,
  },
  wrapMenu: {
    paddingHorizontal: 28,
  },
  groupBottom: {
    marginTop: 16,
    marginHorizontal: 28,
  },
});
