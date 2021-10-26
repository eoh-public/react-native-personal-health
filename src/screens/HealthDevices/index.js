/* eslint-disable promise/prefer-await-to-callbacks */
import React, { memo, useState, useCallback, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import AppleHealthKit from 'react-native-health';

import Header from '../../commons/Header';
import RowTitleButton from '../../commons/RowTitleButton';
import Device from './Device/index';
import Text from '../../commons/Text';
import styles from './styles';
import { Colors, API } from '../../configs';
import { ToastBottomHelper } from '../../utils/Utils';
import { HEALTH_TYPES } from '../../configs/Constants';
import { axiosGet, axiosPost } from '../../utils/Apis/axios';

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
      AppleHealthKit.Constants.Permissions.BloodGlucose,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.BodyTemperature,
      AppleHealthKit.Constants.Permissions.OxygenSaturation,
    ],
  },
};

const options = {
  startDate: new Date(2020, 1, 1).toISOString(),
};

const arrPromise = [
  new Promise((resolve) => {
    AppleHealthKit.getBloodPressureSamples(options, (err, data) => {
      resolve({
        type: HEALTH_TYPES.BLOOD_PRESSURE,
        err,
        data,
      });
    });
  }),
  new Promise((resolve) => {
    AppleHealthKit.getBloodGlucoseSamples(options, (err, data) => {
      resolve({
        type: HEALTH_TYPES.BLOOD_GLUCOSE,
        err,
        data,
      });
    });
  }),
  new Promise((resolve) => {
    AppleHealthKit.getHeartRateSamples(options, (err, data) => {
      resolve({
        type: HEALTH_TYPES.HEART_RATE,
        err,
        data,
      });
    });
  }),
  new Promise((resolve) => {
    AppleHealthKit.getBodyTemperatureSamples(options, (err, data) => {
      resolve({
        type: HEALTH_TYPES.TEMPERATURE,
        err,
        data,
      });
    });
  }),
  new Promise((resolve) => {
    AppleHealthKit.getOxygenSaturationSamples(options, (err, data) => {
      resolve({
        type: HEALTH_TYPES.SPO2,
        err,
        data,
      });
    });
  }),
];

const HealthDevices = memo(({ route }) => {
  const { goBack } = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isAppleHealthConnected, setIsAppleHealthConnected] = useState(false);

  const dataSmartDevices = useMemo(() => {
    if (Platform.OS === 'android') {
      return [];
    }
    return [
      {
        id: 1,
        name: 'Apple Watch',
      },
    ];
  }, []);

  const [smartDevices] = useState(dataSmartDevices);
  // const dataBloodGlucoseDevices = [
  //   {
  //     id: 2,
  //     name: 'Omron HEM-6232T',
  //     isConnected: false,
  //   },
  //   {
  //     id: 4,
  //     name: 'Jumper HA-121',
  //     isConnected: false,
  //   },
  // ];
  // const dataHeartRateDevices = [
  //   {
  //     id: 5,
  //     name: 'Omron HEM-6232T',
  //     isConnected: true,
  //   },
  //   {
  //     id: 6,
  //     name: 'Jumper HA-121',
  //     isConnected: true,
  //   },
  // ];
  // const dataBloodPressureDevices = [
  //   {
  //     id: 7,
  //     name: 'Jumper HA-121',
  //     isConnected: true,
  //   },
  // ];
  // const dataSpO2Devices = [
  //   {
  //     id: 8,
  //     name: 'Omron HEM-6232T',
  //     isConnected: true,
  //   },
  // ];
  // const [bloodGlucoseDevices] = useState(dataBloodGlucoseDevices);
  // const [heartRateDevices] = useState(dataHeartRateDevices);
  // const [bloodPressureDevices] = useState(dataBloodPressureDevices);
  // const [spO2Devices] = useState(dataSpO2Devices);

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
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  const onPressConnectAll = useCallback(async () => {
    Alert.alert(t('feature_under_development'));
  }, []);

  const onPressPlus = useCallback(async () => {
    Alert.alert(t('feature_under_development'));
  }, []);

  const storeValueToConfig = useCallback(async (config, data) => {
    let value = data.value;
    if (config.name === HEALTH_TYPES.SPO2 && data.value <= 1) {
      value = data.value * 100;
    } else if (config.name === HEALTH_TYPES.BLOOD_PRESSURE) {
      value = data.bloodPressureSystolicValue;
    }
    await axiosPost(API.HEALTH_CONFIG.INPUT_VALUE(config.id), {
      value: parseFloat(value).toFixed(2),
    });
  }, []);

  const getData = useCallback(async () => {
    const { data } = await axiosGet(API.HEALTH_CONFIG.LIST()); // TODO use redux
    await Promise.all(arrPromise).then((values) => {
      values.map((value) => {
        if (value.data.length > 0) {
          const config = data.find((x) => x.name === value.type);
          storeValueToConfig(config, value.data[0]);
        }
      });
    });
  }, [storeValueToConfig]);

  const initHealthKit = useCallback(async () => {
    AppleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        ToastBottomHelper.error('Cannot grant permissions.');
        return;
      }
      getData();
    });
  }, [getData]);

  const onPressDevice = useCallback(
    async (id) => {
      initHealthKit();
      setIsAppleHealthConnected(true);
    },
    [initHealthKit, setIsAppleHealthConnected]
  );

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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
                    onPress={onPressDevice}
                    isConnected={isAppleHealthConnected}
                    isConnecting={false}
                  />
                );
              })}
          </GroupDevices>
          {/* <GroupDevices title={t('blood_glucose_devices')}>
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
          <GroupDevices title={t('blood_pressure_devices')}>
            {!!bloodPressureDevices &&
              bloodPressureDevices?.map((item, index) => {
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
          </GroupDevices> */}
        </View>
      </ScrollView>
    </View>
  );
});

export default HealthDevices;
