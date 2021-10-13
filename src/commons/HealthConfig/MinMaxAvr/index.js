import React from 'react';
import { View } from 'react-native';
import { t } from 'i18n-js';
import Text from '../../Text';
import { Colors } from '../../../configs';
import styles from './styles';

const MinMaxAvr = ({ data }) => {
  const { min = null, max = null, average = null, unit } = data;
  return (
    <View style={styles.container}>
      <View style={[styles.wrapValue, styles.noBorder]}>
        <Text type="Label" color={Colors.Gray7}>
          {t('minimum')}
        </Text>
        <Text type="Label" color={Colors.Gray9} bold>
          {min !== null ? `${min} ${unit}` : '-'}
        </Text>
      </View>
      <View style={styles.wrapValue}>
        <Text type="Label" color={Colors.Gray7}>
          {t('average')}
        </Text>
        <Text type="Label" color={Colors.Gray9} bold>
          {average !== null ? `${average} ${unit}` : '-'}
        </Text>
      </View>
      <View style={styles.wrapValue}>
        <Text type="Label" color={Colors.Gray7}>
          {t('maximum')}
        </Text>
        <Text type="Label" color={Colors.Gray9} bold>
          {max !== null ? `${max} ${unit}` : '-'}
        </Text>
      </View>
    </View>
  );
};

export default MinMaxAvr;
