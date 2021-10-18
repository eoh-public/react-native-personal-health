import React from 'react';
import { View, ScrollView } from 'react-native';
import Text from '../../../commons/Text';
import styles from './styles';
import { Colors } from '../../../configs';
import { t } from 'i18n-js';
import Warning from '../../../../assets/images/PersonalHealth/warning.svg';
import DotLine from '../../../commons/DotLine';
import Header from '../../../commons/Header';
import { useNavigation } from '@react-navigation/native';

const Spo2Info = ({ route }) => {
  const { goBack } = useNavigation();
  const CardBorderColor = ({ children, customStyle }) => {
    return (
      <View style={[styles.card, customStyle && { ...customStyle }]}>
        {children ? children : ''}
      </View>
    );
  };
  return (
    <View style={styles.wrap}>
      <Header
        title={t('spo2_info')}
        hasBack
        goBack={goBack}
        wrapStyle={styles.header}
        buttonBackStyle={styles.buttonBack}
        wrapTitleStyle={styles.wrapTitle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text type="H4">{t('text_spo2_1')}</Text>
        <CardBorderColor customStyle={styles.cardPrimary}>
          <View style={styles.cardLeft}>
            <Text type="H4" semibold style={styles.cardText}>
              {t('Normal')}
            </Text>
          </View>
          <View style={styles.cardRight}>
            <Text type="H4" color={Colors.Gray9} style={styles.cardText}>
              {'95% - 100%'}
            </Text>
          </View>
        </CardBorderColor>
        <Text type="H4">{t('text_spo2_2')}</Text>
        <CardBorderColor customStyle={styles.cardDanger}>
          <View style={styles.icon}>
            <Warning />
          </View>
          <View style={styles.attention}>
            <DotLine text={t('text_spo2_3')} />
            <DotLine text={t('text_spo2_4')} />
          </View>
        </CardBorderColor>
      </ScrollView>
    </View>
  );
};

export default Spo2Info;
