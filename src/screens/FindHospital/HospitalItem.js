import React, { memo, useCallback } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import Text from '../../commons/Text';

import styles from './styles/hospitalItemStyles';
import { Colors, Images } from '../../configs';
import { HOSPITAL } from '../../configs/Constants';
import { formatMoney } from '../../utils/Utils';
import Routes from '../../utils/Route';

const HospitalItem = memo(({ item }) => {
  const { navigate } = useNavigation();
  const priceStr = formatMoney(HOSPITAL.price);

  const onPress = useCallback(() => {
    navigate(Routes.BookingDetail, {
      hospitalId: item.id,
    });
  }, [navigate, item.id]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.wrap}>
        <View style={styles.wrapImage}>
          <Image source={Images.hospital} style={styles.image} />
        </View>
        <View style={styles.wrapInfo}>
          <View style={styles.row}>
            <Text type="Label" color={Colors.Primary}>
              {t('general_hospital')}
            </Text>
            <TouchableOpacity>
              <IconOutline name="heart" color={Colors.Gray5} size={27} />
            </TouchableOpacity>
          </View>
          <Text type="H4" color={Colors.Gray9} bold>
            {item.name}
          </Text>
          <Text type="Label" color={Colors.Gray8} numberOfLines={2}>
            {HOSPITAL.address}
          </Text>
          <Text type="H4" color={Colors.Gray9} bold>
            {priceStr}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default HospitalItem;
