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

import Account from '../../../assets/images/Drawer/account.svg';
import Hub from '../../../assets/images/Drawer/hub.svg';
import Report from '../../../assets/images/Drawer/report.svg';
import Reminder from '../../../assets/images/Drawer/reminder.svg';
import Setting from '../../../assets/images/Drawer/setting.svg';
import TermAndConditions from '../../../assets/images/Drawer/term-conditions.svg';

const PersonalHealthDrawer = memo(() => {
  const data = useMemo(
    () => [
      {
        id: '0',
        route: Routes.AccountSetting,
        leftImage: <Account />,
        name: t('account_setting'),
      },
      {
        id: '1',
        route: Routes.HealthDevices,
        leftImage: <Hub />,
        name: t('health_devices'),
      },
      {
        id: '2',
        route: null,
        leftImage: <Report />,
        name: t('report_logs'),
      },
      {
        id: '3',
        route: null,
        leftImage: <Reminder />,
        name: t('reminder'),
      },
      {
        id: '4',
        route: null,
        leftImage: <Setting />,
        name: t('system_setting'),
      },
    ],
    []
  );

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
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
          leftImage={<TermAndConditions />}
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
    paddingTop: getStatusBarHeight(true),
  },
  wrapMenu: {
    paddingHorizontal: 28,
  },
  groupBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 28,
  },
});
