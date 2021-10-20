import React, { memo, useState, useCallback, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import Header from '../../commons/Header';
import RowTitleButton from '../../commons/RowTitleButton';
import Device from './Device/index';
import Text from '../../commons/Text';
import styles from './styles';
import { Colors } from '../../configs';

const HealthDevices = memo(({ route }) => {
  const { goBack } = useNavigation();
  const [refresing, setRefresing] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const dataSmartDevices = [
    {
      id: 1,
      name: 'Apple Watch Series 3',
      isConnected: true,
    },
  ];
  const dataBloodGlucoseDevices = [
    {
      id: 2,
      name: 'Omron HEM-6232T',
      isConnected: false,
    },
    {
      id: 4,
      name: 'Jumper HA-121',
      isConnected: false,
    },
  ];
  const dataHeartRateDevices = [
    {
      id: 5,
      name: 'Omron HEM-6232T',
      isConnected: true,
    },
    {
      id: 6,
      name: 'Jumper HA-121',
      isConnected: true,
    },
  ];
  const dataBloodPresureDevices = [
    {
      id: 7,
      name: 'Jumper HA-121',
      isConnected: true,
    },
  ];
  const dataSpO2Devices = [
    {
      id: 8,
      name: 'Omron HEM-6232T',
      isConnected: true,
    },
  ];
  const [smartDevices] = useState(dataSmartDevices);
  const [bloodGlucoseDevices] = useState(dataBloodGlucoseDevices);
  const [heartRateDevices] = useState(dataHeartRateDevices);
  const [bloodPresureDevices] = useState(dataBloodPresureDevices);
  const [spO2Devices] = useState(dataSpO2Devices);
  const [idDevice, setIdDevice] = useState(null);

  const GroupDevices = memo(({ title, children, style }) => {
    return (
      <View style={[styles.groupDevices, style && { ...style }]}>
        <Text type="Label" style={styles.paddingVertical16}>
          {title}
        </Text>
        {children}
      </View>
    );
  });

  const onRefresh = useCallback(async () => {
    setRefresing(true);
    setRefresing(false);
  }, []);

  const onPressConnectAll = useCallback(async () => {
    Alert.alert(t('feature_under_development'));
  }, []);

  const onPressPlus = useCallback(async () => {
    Alert.alert(t('feature_under_development'));
  }, []);

  const onPressDevice = useCallback(async (id) => {
    setIdDevice(id);
    setIsConnecting(true);
  }, []);

  const headerRight = useMemo(
    () => (
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={onRefresh}>
          <Icon name={'reload'} size={27} color={Colors.Black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressPlus}>
          <Icon
            name={'plus'}
            size={27}
            style={styles.paddingLeft16}
            color={Colors.Black}
          />
        </TouchableOpacity>
      </View>
    ),
    [onRefresh, onPressPlus]
  );

  return (
    <View style={styles.container}>
      <Header
        hasBack
        goBack={goBack}
        rightComponent={headerRight}
        wrapStyle={styles.header}
      />
      <ScrollView
        contentContainerStyle={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refresing} onRefresh={onRefresh} />
        }
      >
        <RowTitleButton
          title={t('health_devices')}
          titleType="H2"
          titleBold
          onPress={onPressConnectAll}
          buttonType="primary"
          style={styles.title}
          buttonText={t('connect_all')}
        />
        <View style={styles.paddingHorizontal16}>
          <GroupDevices title={t('smart_devices')}>
            {!!smartDevices &&
              smartDevices?.map((item, index) => {
                return (
                  <Device
                    key={index}
                    data={item}
                    idDevice={idDevice}
                    onPress={onPressDevice}
                  />
                );
              })}
          </GroupDevices>
          <GroupDevices title={t('blood_glucose_devices')}>
            {!!bloodGlucoseDevices &&
              bloodGlucoseDevices?.map((item, index) => {
                return (
                  <Device
                    key={index}
                    data={item}
                    idDevice={idDevice}
                    isConnecting={isConnecting}
                    onPress={onPressDevice}
                  />
                );
              })}
          </GroupDevices>
          <GroupDevices title={t('heart_rate_devices')}>
            {!!heartRateDevices &&
              heartRateDevices?.map((item, index) => {
                return (
                  <Device
                    key={index}
                    data={item}
                    idDevice={idDevice}
                    isConnecting={isConnecting}
                    onPress={onPressDevice}
                  />
                );
              })}
          </GroupDevices>
          <GroupDevices title={t('blood_presure_devices')}>
            {!!bloodPresureDevices &&
              bloodPresureDevices?.map((item, index) => {
                return (
                  <Device
                    key={index}
                    data={item}
                    idDevice={idDevice}
                    isConnecting={isConnecting}
                    onPress={onPressDevice}
                  />
                );
              })}
          </GroupDevices>
          <GroupDevices
            title={t('spo2_devices')}
            style={styles.groupDevicesNoneBorder}
          >
            {!!spO2Devices &&
              spO2Devices?.map((item, index) => {
                return (
                  <Device
                    key={index}
                    data={item}
                    isConnecting={isConnecting}
                    idDevice={idDevice}
                    onPress={onPressDevice}
                  />
                );
              })}
          </GroupDevices>
        </View>
      </ScrollView>
    </View>
  );
});

export default HealthDevices;
