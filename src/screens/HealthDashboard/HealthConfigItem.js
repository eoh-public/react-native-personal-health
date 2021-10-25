import React, { memo, useCallback } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import Text from '../../commons/Text';
import styles from './styles/healthConfigItemStyles';
import { Colors } from '../../configs';
import Routes from '../../utils/Route';
import { HEALTH_CONFIG_COLOR_SCHEME } from '../../configs/Constants';

const HealthConfigItem = memo(({ item }) => {
  const { navigate } = useNavigation();
  const { textColor, borderColor } =
    item.value !== null
      ? HEALTH_CONFIG_COLOR_SCHEME[item.text || 'null']
      : HEALTH_CONFIG_COLOR_SCHEME.null;

  const goToDetail = useCallback(() => {
    navigate(Routes.HealthConfigDetail, {
      config: item,
    });
  }, [navigate, item]);

  const goToInformation = useCallback(() => {
    navigate(Routes.HealthInformation, {
      type: item.name,
    });
  }, [item.name, navigate]);

  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={[styles.container, { borderColor }]}>
        <View>
          <View style={styles.rowTop}>
            <Text type="H4" bold>
              {t(item.name)}
            </Text>
            <TouchableOpacity onPress={goToInformation}>
              <IconOutline name="info-circle" size={24} />
            </TouchableOpacity>
          </View>
          <Text type="Body" color={textColor}>
            {item.value !== null ? t(`${item.text}`) : t('no_data')}
          </Text>
        </View>
        <View style={styles.rowBottom}>
          <Text style={styles.textValue} color={Colors.Gray9} bold>
            {item.value !== null ? item.value : '-'}
          </Text>
          <Text type="H4" color={Colors.Gray9}>
            {item.unit}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default HealthConfigItem;
