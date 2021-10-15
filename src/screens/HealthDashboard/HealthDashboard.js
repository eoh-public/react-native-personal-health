import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import {
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';
import moment from 'moment';

import { axiosGet } from '../../utils/Apis/axios';
import { useBlockBackAndroid } from '../../hooks/Common';
import RowTitleButton from '../../commons/RowTitleButton';
import HealthConfigItem from './HealthConfigItem';
import ReminderCard from './ReminderCard';
import styles from './styles/healthDashboardStyles';
import { initData } from './init';
import { API } from '../../configs';

const HealthDashboard = memo(({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useBlockBackAndroid();

  const [refresing, setRefresing] = useState(false);
  const [configs, setConfigs] = useState(initData());

  const fetchConfigs = useCallback(async () => {
    setRefresing(true);
    const { success, data } = await axiosGet(API.HEALTH_CONFIG.LIST());
    success && setConfigs(data);
    setRefresing(false);
  }, [setConfigs, setRefresing]);

  const onRefresh = useCallback(async () => {
    fetchConfigs();
  }, [fetchConfigs]);

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused, onRefresh]);

  const onPressMenu = useCallback(() => {
    navigation.toggleDrawer();
  }, [navigation]);

  const onPressBell = useCallback(() => {
    Alert.alert(t('feature_under_development'));
  }, []);

  const onPressShareAll = useCallback(() => {
    Alert.alert(t('feature_under_development'));
  }, []);

  const reminder = useMemo(() => {
    return {
      name: 'Reminder 1',
      remind_at: moment().format('HH:mm'),
      data: [
        {
          name: 'Blood Glucose',
          is_inputted: false,
        },
        {
          name: 'Heart Rates',
          is_inputted: true,
        },
        {
          name: 'Blood Pressure',
          is_inputted: false,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressMenu}>
          <IconOutline name="menu" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressBell}>
          <IconOutline name="bell" size={24} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refresing} onRefresh={onRefresh} />
        }
      >
        <ReminderCard reminder={reminder} />
        <RowTitleButton
          style={styles.rowTitle}
          title={t('health_reports')}
          titleType="H3"
          titleBold
          buttonText={t('share_all')}
          buttonType="info"
          onPress={onPressShareAll}
        />
        <View style={styles.boxReports}>
          {configs.map((item, index) => (
            <HealthConfigItem key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
});

export default HealthDashboard;
