import { t } from 'i18n-js';
import React from 'react';
import { View, ScrollView } from 'react-native';
import DotLine from '../../../commons/DotLine';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../commons/Header';

const HeartRatesInfo = ({ route }) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.wrap}>
      <Header
        title={t('heart_rates_info')}
        hasBack
        goBack={goBack}
        buttonBackStyle={styles.buttonBack}
        wrapTitleStyle={styles.wrapTitle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DotLine text={t('text_heart_rates_1')} style={styles.line} />
        <DotLine text={t('text_heart_rates_2')} style={styles.line} />
        <DotLine text={t('text_heart_rates_3')} style={styles.line} />
      </ScrollView>
    </View>
  );
};

export default HeartRatesInfo;
