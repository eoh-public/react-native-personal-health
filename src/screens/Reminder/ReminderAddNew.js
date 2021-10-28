import React, { useCallback } from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import Text from '../../commons/Text';
import styles from './styles/reminderStyle';
import { Colors } from '../../configs/Colors';

export const ReminderAddNew = () => {
  const onPressAddNew = useCallback(() => {
    Alert.alert(t('feature_under_development'));
  }, []);
  return (
    <TouchableOpacity onPress={onPressAddNew}>
      <View style={styles.addNew}>
        <View style={styles.addNewIconBackground}>
          <IconOutline name="plus" size={22} />
        </View>
        <View style={styles.reminderContent}>
          <Text type={'H4'} color={Colors.Gray8} style={styles.addNewText}>
            {t('add_new_reminder')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
