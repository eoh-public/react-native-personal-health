import React, { memo, useState, useCallback } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { axiosPost } from '../../utils/Apis/axios';

import Text from '../../commons/Text';
import Header from '../../commons/Header';
import HorizontalPicker from '../../commons/HorizontalPicker';
import BottomButtonView from '../../commons/BottomButtonView';
import TextInput from '../../commons/Form/TextInput';
import AlertAction from '../../commons/AlertAction';
import { useKeyboardAnimated } from '../../hooks/Common';

import { Colors } from '../../configs';
import { API } from '../../configs';
import styles from './styles/manualInputStyles';
import { getHealthConfigMinMax } from '../../configs/Constants';

const ManualInput = memo(({ route }) => {
  const { goBack } = useNavigation();
  const { config } = route.params;
  const [value, setValue] = useState(config.value || 0);

  const [showInputKeyboard, setShowInputKeyboard] = useState(false);
  const [valueFromKeyboard, setValueFromKeyboard] = useState(value.toString());
  const [errorValueFromKeyboard, setErrorValueFromKeyboard] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

  const { min, max } = getHealthConfigMinMax(config.name);

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

  const onShowInputKeyboard = useCallback(() => {
    setValueFromKeyboard(value.toString());
    setErrorValueFromKeyboard('');
    setShowInputKeyboard(true);
  }, [value]);

  const onHideInputKeyboard = useCallback(() => {
    setShowInputKeyboard(false);
  }, []);

  const onDoneValueFromKeyboard = useCallback(() => {
    const parsedValue = parseFloat(valueFromKeyboard);
    if (parsedValue < min || parsedValue > max) {
      setErrorValueFromKeyboard(
        t('error_limit_value', {
          min,
          max,
        })
      );
    } else {
      setForceUpdate(true);
      setValue(parsedValue.toFixed(2));
      setShowInputKeyboard(false);
    }
  }, [valueFromKeyboard, min, max]);

  const onForceUpdated = useCallback(() => {
    setForceUpdate(false);
  }, [setForceUpdate]);

  const [transY] = useKeyboardAnimated(-16);
  const animatedStyle = Platform.select({
    ios: {
      marginBottom: transY,
    },
  });

  return (
    <View style={styles.container}>
      <Header
        hasBack
        goBack={goBack}
        title={t('new_data')}
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
          <TouchableOpacity onPress={onShowInputKeyboard}>
            <Text style={styles.textValue} color={Colors.Gray9} underline bold>
              {value}
            </Text>
          </TouchableOpacity>
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
          step={5}
          childStep={0.5}
          normalHeight={4}
          normalWidth={4}
          stepHeight={12}
          stepWidth={12}
          stepColor={Colors.Gray6}
          normalColor={Colors.Gray6}
          indicatorWidth={12}
          onChangeValue={onChangeValue}
          forceUpdate={forceUpdate}
          onUpdated={onForceUpdated}
          style={styles.picker}
        />
      </View>
      <BottomButtonView
        mainTitle={t('save')}
        onPressMain={onSaveValue}
        style={styles.viewBottom}
      />
      <AlertAction
        visible={showInputKeyboard}
        hideModal={onHideInputKeyboard}
        title={'Input value'}
        leftButtonTitle={t('cancel')}
        leftButtonClick={onHideInputKeyboard}
        rightButtonTitle={t('done')}
        rightButtonClick={onDoneValueFromKeyboard}
        animatedStyle={animatedStyle}
      >
        <TextInput
          value={valueFromKeyboard}
          onChange={setValueFromKeyboard}
          errorText={errorValueFromKeyboard}
          keyboardType="numeric"
          wrapStyle={styles.wrapTextInput}
          textInputStyle={styles.textInput}
        />
      </AlertAction>
    </View>
  );
});

export default ManualInput;
