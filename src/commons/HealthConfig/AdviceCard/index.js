import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import Text from '../../Text';
import styles from './styles';
import { t } from 'i18n-js';
import { Colors } from '../../../configs';
import { HEALTH_CONFIG_COLOR_SCHEME } from '../../../configs/Constants';
import AdviceBackground from '../../../../assets/images/advice-background.svg';

const AdviceCard = memo(({ data }) => {
  const { advices, text } = data;
  const { borderColor } =
    HEALTH_CONFIG_COLOR_SCHEME[text] || HEALTH_CONFIG_COLOR_SCHEME.null;
  return (
    <View style={[styles.container, { borderColor }]}>
      <View>
        <Text type="Body" color={Colors.Primary} bold>
          {t('protection_advices_for_today')}
        </Text>
        <View>
          {advices.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text type="Body" style={styles.dot} bold>
                .
              </Text>
              <Text type="Body">{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.wrapImage}>
        <AdviceBackground width={175} height={127} />
      </View>
      <TouchableOpacity style={styles.iconButton}>
        <IconOutline name="info-circle" size={24} />
      </TouchableOpacity>
    </View>
  );
});

export default AdviceCard;
