import React, { memo, useState, useCallback } from 'react';
import { View } from 'react-native';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { axiosPost } from '../../utils/Apis/axios';

import Text from '../../commons/Text';
import Header from '../../commons/Header';
import HorizontalPicker from '../../commons/HorizontalPicker';
import BottomButtonView from '../../commons/BottomButtonView';

import { Colors } from '../../configs';
import { API } from '../../configs';
import styles from './styles/manualInputStyles';
import { getHealthConfigMinMax } from '../../configs/Constants';

const ManualInput = memo(({ route }) => {
  const { goBack } = useNavigation();
  const { config } = route.params;
  const [value, setValue] = useState(config.value || 0);

  const onSaveValue = useCallback(async () => {
    if (!config.id) {
      return;
    }
    const { success } = await axiosPost(
      API.HEALTH_CONFIG.INPUT_VALUE(config.id),
      { value }
    );
    success && goBack();
  }, [config.id, value, goBack]);

  const onChangeValue = useCallback(
    (value) => {
      setValue(value.toFixed(2));
    },
    [setValue]
  );

  const { min, max } = getHealthConfigMinMax(config.name);

  return (
    <View style={styles.container}>
      <Header
        hasBack
        goBack={goBack}
        title={t('new_data')}
        wrapStyle={styles.header}
        wrapTitleStyle={styles.wrapTitleStyle}
        titleStyle={styles.titleStyle}
      />
      <View style={styles.wrapContent}>
        <Text
          style={styles.textConfigName}
          type="Body"
          color={Colors.Gray7}
          center
        >
          {t(config.name)}
        </Text>
        <View style={styles.wrapValue}>
          <Text style={styles.textValue} color={Colors.Gray9} underline bold>
            {value}
          </Text>
          <View style={styles.wrapUnit}>
            <Text
              style={styles.textUnit}
              type="H2"
              color={Colors.Gray9}
              semibold
            >
              {config.unit}
            </Text>
          </View>
        </View>
        <HorizontalPicker
          minimum={min}
          maximum={max}
          value={value}
          segmentSpacing={8}
          step={10}
          normalHeight={4}
          normalWidth={4}
          stepHeight={12}
          stepWidth={12}
          stepColor={Colors.Gray6}
          normalColor={Colors.Gray6}
          indicatorWidth={12}
          onChangeValue={onChangeValue}
          style={styles.picker}
        />
      </View>
      <BottomButtonView
        mainTitle={t('save')}
        onPressMain={onSaveValue}
        style={styles.viewBottom}
      />
    </View>
  );
});

export default ManualInput;
