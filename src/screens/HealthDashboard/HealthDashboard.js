import React, { memo, useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';
import { axiosGet } from '../../utils/Apis/axios';

import { useBlockBackAndroid } from '../../hooks/Common';
import RowTitleButton from '../../commons/RowTitleButton';
import ReportItem from './ReportItem';
import styles from './styles/healthDashboardStyles';
import { API } from '../../configs';

const HealthDashboard = memo(({ route }) => {
  const navigation = useNavigation();
  useBlockBackAndroid();
  const initData = [
    {
      name: t('heart_rate'),
      unit: 'BPM',
    },
    {
      name: t('blood_pressure'),
      unit: 'mg/DL',
    },
    {
      name: t('blood_glucose'),
      unit: 'mm/Hg',
    },
    {
      name: t('spO2'),
      unit: '%',
    },
    {
      name: t('temperature'),
      unit: '°C',
    },
  ];
  const [configs, setConfigs] = useState(initData);

  const fetchConfigs = useCallback(async () => {
    const { success, data } = await axiosGet(API.PERSONAL_HEALTH.CONFIGS());
    if (success) {
      const nullData = initData.filter((i) => {
        return !data.find((j) => j.name === i.name);
      });
      setConfigs(data.concat(nullData));
    }
  }, [setConfigs]);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);
  

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
      <ScrollView contentContainerStyle={styles.scrollview}>
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
            <ReportItem key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
});

export default HealthDashboard;
