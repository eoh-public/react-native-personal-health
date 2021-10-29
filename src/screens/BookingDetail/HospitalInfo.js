import React from 'react';
import { View, Image } from 'react-native';
import { t } from 'i18n-js';
import Text from '../../commons/Text';
import styles from './styles/hospitalInfoStyles';
import { Colors, Images } from '../../configs';
import { HOSPITAL } from '../../configs/Constants';

const HospitalInfo = ({ hospital }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.wrapImage}>
        <Image source={Images.hospital} style={styles.image} />
      </View>
      <View style={styles.wrapInfo}>
        <Text type="Label" color={Colors.Primary}>
          {t('general_hospital')}
        </Text>
        <Text type="H4" color={Colors.Gray9} bold>
          {hospital.name}
        </Text>
        <Text type="Label" color={Colors.Gray8} numberOfLines={2}>
          {HOSPITAL.address}
        </Text>
      </View>
    </View>
  );
};

export default HospitalInfo;
