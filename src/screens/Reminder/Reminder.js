import React, { memo, useState, useRef, useCallback } from 'react';
import { TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import Text from '../../commons/Text';
import { useBlockBackAndroid } from '../../hooks/Common';
import RowTitleButton from '../../commons/RowTitleButton';
import styles from './styles/reminderStyle';
import { Colors } from '../../configs/Colors';
import MoreMenu from './MoreMenu';
import { usePopover } from '../../hooks/Common';
import Header from '../../commons/Header';
import { ReminderItem } from './ReminderItem';
import { ReminderAddNew } from './ReminderAddNew';

const Reminder = memo(({ route }) => {
  const { goBack } = useNavigation();
  useBlockBackAndroid();

  const [tabIndex] = useState(2);

  const { childRef, showingPopover, showPopoverWithRef, hidePopover } =
    usePopover();

  const onPressPlus = useCallback(() => {
    Alert.alert(t('feature_under_development'));
  }, []);

  const onPressUpdateData = useCallback(() => {
    Alert.alert(t('feature_under_development'));
  }, []);

  const buttonMoreRef = useRef(null);

  const onPressMore = useCallback(() => {
    showPopoverWithRef(buttonMoreRef);
  }, [showPopoverWithRef]);

  return (
    <View style={styles.container}>
      <Header
        hasBack
        goBack={goBack}
        rightComponent={
          <TouchableOpacity onPress={onPressPlus}>
            <IconOutline name="plus" size={24} />
          </TouchableOpacity>
        }
        wrapStyle={styles.header}
      />
      <ScrollView contentContainerStyle={styles.scrollview}>
        <RowTitleButton
          style={styles.rowTitle}
          title={t('reminder')}
          titleType="H3"
          titleBold
        />
        <ScrollView contentContainerStyle={styles.tabHeaderContainer}>
          <TouchableOpacity
            style={[styles.tabItem, tabIndex === 0 && styles.tabItemActive]}
            onPress={onPressUpdateData}
          >
            <Text
              type={'Body'}
              color={tabIndex === 0 ? Colors.Green7 : Colors.Gray6}
              semibold
            >
              {t('appointments')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, tabIndex === 1 && styles.tabItemActive]}
            onPress={onPressUpdateData}
          >
            <Text
              type={'Body'}
              color={tabIndex === 1 ? Colors.Green7 : Colors.Gray6}
              semibold
            >
              {t('medicines')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, tabIndex === 2 && styles.tabItemActive]}
            onPress={onPressUpdateData}
          >
            <Text
              type={'Body'}
              color={tabIndex === 2 ? Colors.Green7 : Colors.Gray6}
              semibold
            >
              {t('update_data')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <ReminderItem
          title="Reminder 1"
          description={'Blood Glucose, Heart Rates, \nBlood Pressure'}
          onPressMore={onPressMore}
          buttonMoreRef={buttonMoreRef}
        />
        <ReminderItem
          title="Reminder 2"
          description="All Health Data"
          onPressMore={onPressMore}
          buttonMoreRef={buttonMoreRef}
        />
        <ReminderAddNew />
      </ScrollView>
      <MoreMenu
        hidePopover={hidePopover}
        childRef={childRef}
        showingPopover={showingPopover}
      />
    </View>
  );
});

export default Reminder;
