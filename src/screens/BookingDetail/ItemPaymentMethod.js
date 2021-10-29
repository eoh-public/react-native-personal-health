import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';
import Text from '../../commons/Text';
import styles from './styles/itemPaymentMethodStyles';
import { SvgMasterCard } from '../../../assets/images/PaymentMethod';
import { Colors } from '../../configs';

const ItemPaymentMethod = () => {
  return (
    <TouchableOpacity style={styles.wrap}>
      <View style={styles.row}>
        <SvgMasterCard />
        <Text type="Body" color={Colors.Gray9} style={styles.cardNumber}>
          {'5678'}
        </Text>
      </View>
      <Text type="Label" color={Colors.Orange} bold>
        {t('change')}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemPaymentMethod;
