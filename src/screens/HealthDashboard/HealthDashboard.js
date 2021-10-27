import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  useContext,
} from 'react';
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

import { axiosPost, axiosGet } from '../../utils/Apis/axios';
import { useBlockBackAndroid } from '../../hooks/Common';
import RowTitleButton from '../../commons/RowTitleButton';
import HealthConfigItem from './HealthConfigItem';
import ReminderCard from './ReminderCard';
import styles from './styles/healthDashboardStyles';
import { API } from '../../configs';
import { PHContext, usePHSelector } from '../../context';
import { Actions } from '../../context/actionType';

const HealthDashboard = memo(({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useBlockBackAndroid();

  const [refreshing, setRefreshing] = useState(false);
  const { healthConfigs } = usePHSelector((state) => state.dashboard);
  const [reminders, setReminders] = useState([]);
  const { setAction } = useContext(PHContext);

  const fetchConfigs = useCallback(async () => {
    setRefreshing(true);
    const { data, success } = await axiosGet(API.HEALTH_CONFIG.LIST());
    if (success && data.length > 0) {
      setAction(Actions.SET_HEALTH_CONFIGS, data);
    } else {
      const { data, success } = await axiosPost(
        API.HEALTH_CONFIG.CREATE_HEALTH_CHIP()
      );
      if (success) {
        setAction(Actions.SET_HEALTH_CONFIGS, data);
      }
    }
    setRefreshing(false);
  }, [setRefreshing, setAction]);

  const fetchActiveReminders = useCallback(async () => {
    setRefreshing(true);
    const { data, success } = await axiosGet(API.REMINDER.ACTIVE_REMINDERS());
    success && setReminders(data);
    setRefreshing(false);
  }, [setReminders, setRefreshing]);

  const onRefresh = useCallback(async () => {
    fetchConfigs();
    fetchActiveReminders();
  }, [fetchConfigs, fetchActiveReminders]);

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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {reminders.map((item, index) => (
          <ReminderCard key={index} reminder={item} />
        ))}
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
          {healthConfigs.map((item, index) => (
            <HealthConfigItem key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
});

export default HealthDashboard;
