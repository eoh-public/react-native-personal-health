import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { IconFill } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';
import LinearGradient from 'react-native-linear-gradient';

import Text from '../../commons/Text';
import styles from './styles/ReminderCardStyles';
import { Colors } from '../../configs';
import Button from '../../commons/Button';
import { ToastBottomHelper } from '../../utils/Utils';

const ReminderCard = memo(({ reminder }) => {
  const onPressManualInput = useCallback(() => {
    ToastBottomHelper.error(t('feature_under_development'));
  }, []);

  const goToHealthDevice = useCallback(() => {
    ToastBottomHelper.error(t('feature_under_development'));
  }, []);

  return (
    <View style={styles.margin16} activeOpacity={0.4}>
      <LinearGradient
        colors={[Colors.Green2, Colors.Primary]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.wrapTitle}>
            <Icon name={'export'} size={24} color={Colors.Primary} />
            <View style={styles.paddingLeft16}>
              <Text type="H4" color={Colors.Black} bold>
                {reminder.name}
              </Text>
              <Text type="H4" color={Colors.Black}>
                {t('its_time_please_update_your_data', {
                  time: reminder.remind_at,
                })}
              </Text>
            </View>
          </View>
          <View style={styles.separator} />

          {reminder.data.map((item, index) => (
            <View key={index} style={styles.rowInputData}>
              <Text type="H4" color={Colors.Black}>
                {item.name}
              </Text>
              {!item.is_inputted ? (
                <TouchableOpacity
                  onPress={onPressManualInput}
                  style={styles.buttonManualInput}
                >
                  <Text type="Label" color={Colors.Primary}>
                    {t('manual_input')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <IconFill
                  name="check-circle"
                  size={24}
                  color={Colors.Primary}
                />
              )}
            </View>
          ))}
          <View style={styles.separator} />
          <Button
            textSemiBold={false}
            title={t('go_to_health_devices')}
            type={'cancel'}
            onPress={goToHealthDevice}
          />
        </View>
      </LinearGradient>
    </View>
  );
});

export default ReminderCard;
