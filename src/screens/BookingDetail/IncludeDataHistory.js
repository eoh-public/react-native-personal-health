import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../../commons/Text';
import CheckBox from '../../commons/CustomCheckbox';
import { t } from 'i18n-js';
import styles from './styles/includeDataHistoryStyles';
import { Colors } from '../../configs';

const IncludeDataHistory = ({ isTick, onTick }) => {
  const onPressText = useCallback(() => {
    onTick((tick) => !tick);
  }, [onTick]);
  return (
    <View style={styles.row}>
      <CheckBox value={isTick} onValueChange={onTick} />
      <TouchableOpacity style={styles.wrapText} onPress={onPressText}>
        <Text type="H4" color={Colors.Gray9}>
          {t('include_data_history')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default IncludeDataHistory;
