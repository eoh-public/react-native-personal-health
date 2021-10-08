import React, { memo } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import Text from '../../commons/Text';
import styles from './styles/healthConfigItemStyles';
import { Colors } from '../../configs';

const TextColor = {
  normal: Colors.Primary,
  high: Colors.Red6,
  low: Colors.Purple6,
};

const BorderColor = {
  normal: Colors.Gray4,
  high: Colors.Red6,
  low: Colors.Purple6,
};

const ReportItem = memo(({ item }) => {
  const textColor = TextColor[item.text] || Colors.Gray7;
  const borderColor = BorderColor[item.text] || Colors.Gray4;
  return (
    <TouchableWithoutFeedback>
      <View style={[styles.container, { borderColor }]}>
        <View>
          <View style={styles.rowTop}>
            <Text type="H4" bold>
              {item.name}
            </Text>
            <TouchableOpacity>
              <IconOutline name="info-circle" size={24} />
            </TouchableOpacity>
          </View>
          <Text type="Body" color={textColor}>
            {item.status ? t(`${item.status}`) : t('no_data')}
          </Text>
        </View>
        <View style={styles.rowBottom}>
          <Text style={styles.textValue} color={Colors.Gray9} bold>
            {item.value || '-'}
          </Text>
          <Text type="H4" color={Colors.Gray9}>
            {item.unit}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

export default ReportItem;
