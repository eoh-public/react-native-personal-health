import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import { useBlockBackAndroid } from '../../hooks/Common';
import RowTitleButton from '../../commons/RowTitleButton';
import ReportItem from './ReportItem';
import styles from './styles/healthDashboardStyles';

const healthData = [
  {
    title: t('heart_rate'),
    status: 'high',
    value: 140,
    unit: 'BPM',
  },
  {
    title: t('blood_pressure'),
    status: 'low',
    value: 140,
    unit: 'mg/DL',
  },
  {
    title: t('blood_glucose'),
    status: 'normal',
    value: 140,
    unit: 'mm/Hg',
  },
  {
    title: t('spO2'),
    status: 'normal',
    value: 140,
    unit: '%',
  },
  {
    title: t('temperature'),
    status: 'high',
    value: 140,
    unit: '°C',
  },
];

const nullData = [
  {
    title: t('heart_rate'),
    unit: 'BPM',
  },
  {
    title: t('blood_pressure'),
    unit: 'mg/DL',
  },
  {
    title: t('blood_glucose'),
    unit: 'mm/Hg',
  },
  {
    title: t('spO2'),
    unit: '%',
  },
  {
    title: t('temperature'),
    unit: '°C',
  },
];

const HealthDashboard = memo(({ route }) => {
  const navigation = useNavigation();

  useBlockBackAndroid();

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
          {healthData.map((item, index) => (
            <ReportItem key={index} item={item} />
          ))}
          {nullData.map((item, index) => (
            <ReportItem key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
});

export default HealthDashboard;
