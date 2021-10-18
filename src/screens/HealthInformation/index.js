import React, { useMemo } from 'react';
import BloodGlucoseInfo from './BloodGlucose';
import BloodPressureInfo from './BloodPressure';
import Spo2Info from './Sp02';
import HeartRatesInfo from './HeartRates';
import { TypeHealthInfo } from '../../configs/Constants';

const getComponent = (type) => {
  switch (type) {
    case TypeHealthInfo.BLOOD_GLUCOSE:
      return BloodGlucoseInfo;
    case TypeHealthInfo.BLOOD_PRESSURE:
      return BloodPressureInfo;
    case TypeHealthInfo.SPO2:
      return Spo2Info;
    case TypeHealthInfo.HEART_RATES:
      return HeartRatesInfo;
    default:
      return () => <></>;
  }
};

const HealthInformation = ({ route }) => {
  const { type } = route.params;
  const Component = useMemo(() => {
    return getComponent(type);
  }, [type]);
  return <Component />;
};
export default HealthInformation;
