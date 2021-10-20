import { t } from 'i18n-js';
import React from 'react';
import { View, ScrollView } from 'react-native';
import DotLine from '../../../commons/DotLine';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../commons/Header';

const UpdatingInfo = ({ route }) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.wrap}>
      <Header
        title={t('information')}
        hasBack
        goBack={goBack}
        wrapStyle={styles.header}
        buttonBackStyle={styles.buttonBack}
        wrapTitleStyle={styles.wrapTitle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DotLine
          text={t('information_will_be_updated_soon')}
          style={styles.line}
        />
      </ScrollView>
    </View>
  );
};

export default UpdatingInfo;
