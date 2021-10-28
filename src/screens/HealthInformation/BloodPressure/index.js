import React from 'react';
import { View, ScrollView } from 'react-native';
import Text from '../../../commons/Text';
import DotLine from '../../../commons/DotLine';
import styles from './styles';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../commons/Header';

const BloodPressureInfo = ({ route }) => {
  const { goBack } = useNavigation();
  const cards = [
    {
      textLeft: t('Normal'),
      subTextLeft: '',
      textRight: `${t('systolic')} < 120 mm Hg`,
      subTextRight: `${t('diastolic')} < 80 mm Hg`,
    },
    {
      textLeft: t('at_risk'),
      subTextLeft: `(${t('prehypertension')})`,
      textRight: `${t('systolic')}: 120-139 mm Hg`,
      subTextRight: `${t('diastolic')}: 80-89 mm Hg`,
    },
    {
      textLeft: t('hight_blood_pressure'),
      subTextLeft: `(${t('hypertension')})`,
      textRight: `${t('systolic')} > 140 mm Hg`,
      subTextRight: `${t('diastolic')} > 90 mm Hg`,
    },
  ];
  const notes = [
    { line: t('blood_pressure_note_1') },
    { line: t('blood_pressure_note_2') },
    { line: t('blood_pressure_note_3') },
    { line: t('blood_pressure_note_4') },
    { line: t('blood_pressure_note_5') },
  ];

  const CardBorderColor = ({
    textLeft,
    subTextLeft,
    textRight,
    subTextRight,
    customStyle,
  }) => {
    return (
      <View style={[styles.card, customStyle && { ...customStyle }]}>
        <View style={styles.cardLeft}>
          <Text type="H4" semibold style={styles.cardText}>
            {textLeft}
          </Text>
          <Text type="Label">{subTextLeft}</Text>
        </View>
        <View style={styles.cardRight}>
          <Text type="H4">{textRight}</Text>
          <Text type="H4">{subTextRight}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.wrap}>
      <Header
        title={t('blood_pressure')}
        hasBack
        goBack={goBack}
        buttonBackStyle={styles.buttonBack}
        wrapTitleStyle={styles.wrapTitle}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text type="H4">{t('text_blood_pressure_1')}</Text>
        <View style={styles.containerCard}>
          {cards &&
            cards.map((item, index) => {
              return (
                <CardBorderColor
                  textLeft={item.textLeft}
                  subTextLeft={item.subTextLeft}
                  textRight={item.textRight}
                  subTextRight={item.subTextRight}
                  customStyle={styles.card}
                  key={index}
                />
              );
            })}
        </View>
        <Text type="H4">{t('text_blood_pressure_2')}</Text>
        <View style={styles.notes}>
          {notes &&
            notes.map((item, index) => {
              return <DotLine key={index} text={item.line} />;
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default BloodPressureInfo;
