import React, { useMemo } from 'react';
import BloodGlucoseInfo from './BloodGlucose';
import BloodPressureInfo from './BloodPressure';
import Spo2Info from './Sp02';
import HeartRatesInfo from './HeartRates';
import UpdatingInfo from './Updating';
import { HEALTH_CONFIG_NAME } from '../../configs/Constants';

const getComponent = (type) => {
  switch (type) {
    case HEALTH_CONFIG_NAME.blood_glucose:
      return BloodGlucoseInfo;
    case HEALTH_CONFIG_NAME.blood_pressure:
      return BloodPressureInfo;
    case HEALTH_CONFIG_NAME.spO2:
      return Spo2Info;
    case HEALTH_CONFIG_NAME.heart_rate:
      return HeartRatesInfo;
    default:
      return UpdatingInfo;
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
