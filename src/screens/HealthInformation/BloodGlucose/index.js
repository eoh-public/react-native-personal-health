import React from 'react';
import { View, ScrollView } from 'react-native';
import Text from '../../../commons/Text';
import styles from './styles';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../commons/Header';

const BloodGlucoseInfo = ({ route }) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.wrap}>
      <Header
        title={t('blood_glucose_info')}
        hasBack
        goBack={goBack}
        wrapStyle={styles.header}
        buttonBackStyle={styles.buttonBack}
        wrapTitleStyle={styles.wrapTitle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text type="H4">{t('text_blood_glucose_info')}</Text>
      </ScrollView>
    </View>
  );
};

export default BloodGlucoseInfo;
