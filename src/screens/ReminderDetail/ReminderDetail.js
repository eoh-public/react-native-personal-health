import React, { memo, useCallback, useState } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import RowTitleButton from '../../commons/RowTitleButton';
import styles from './styles';

import Header from '../../commons/Header';
import Text from '../../commons/Text';
import RowItem from '../AddEditSchedule/components/RowItem';
import ViewOpacity from '../../commons/ViewOpacity';
import { Colors } from '../../configs';
import ScheduleTimeItem from './ScheduleTimeItem';
import BottomButtonView from '../../commons/BottomButtonView';
import { Alert } from 'react-native';
import { AlertAction } from '../../commons';
import { useStateAlertRemove } from './hooks/useStateAlertRemove';
import Routes from '../../utils/Route';
import GroupCheckBox from '../../commons/GroupCheckBox';

const fakeSchedule = [
  {
    repeat: 'every_day',
    weekday_repeat: [],
    time_repeat: '03:00',
    date_repeat: null,
  },
  {
    repeat: 'once',
    weekday_repeat: [],
    time_repeat: '08:00',
    date_repeat: '20/09/2021',
  },
  {
    repeat: 'every_week',
    weekday_repeat: [0, 1, 3, 5],
    time_repeat: '23:00',
    date_repeat: null,
  },
];

const options = [
  {
    title: t('heart_rate'),
    health_data: 'heart_rate',
  },
  {
    title: t('blood_pressure'),
    health_data: 'blood_pressure',
  },
  {
    title: t('blood_glucose'),
    health_data: 'blood_glucose',
  },
  {
    title: t('spO2'),
    health_data: 'spO2',
  },
  {
    title: t('temperature'),
    health_data: 'temperature',
  },
];

const ReminderOption = ({ title, hasPlusIcon, onPressPlus, children }) => {
  return (
    <ViewOpacity>
      <View style={styles.reminderOption}>
        <Text type="Body" color={Colors.Gray7}>
          {title}
        </Text>
        {hasPlusIcon && (
          <TouchableOpacity onPress={onPressPlus}>
            <IconOutline name="plus" size={14} />
          </TouchableOpacity>
        )}
      </View>
      <View>{children}</View>
    </ViewOpacity>
  );
};

const ReminderDetail = memo(({ route }) => {
  const { goBack, navigate } = useNavigation();
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState('Reminder');
  // eslint-disable-next-line no-unused-vars
  const [healthsData, setHealthsData] = useState([]);
  const { reminderId } = route?.params;
  const title = reminderId ? 'edit_reminder' : 'add_reminder';

  const { stateAlertRemove, onShowRemoveAlert, hideAlertAction } =
    useStateAlertRemove(reminderId, name);

  const onSave = useCallback(() => {
    return Alert.alert(t('feature_under_development'));
  }, []);

  const onDelete = useCallback(() => {
    return Alert.alert(t('feature_under_development'));
  }, []);

  const onAddSchedule = useCallback(() => {
    navigate(Routes.AddEditSchedule, {});
  }, [navigate]);

  return (
    <View style={styles.container}>
      <Header hasBack goBack={goBack} />
      <ScrollView contentContainerStyle={styles.scrollview}>
        <RowTitleButton
          style={styles.rowTitle}
          title={t(title)}
          titleType="H2"
          titleBold
        />
        <Text type="H4" style={styles.reminderName}>
          {name}
        </Text>
        <View style={styles.separator} />
        <RowItem title={t('remind')} value={t('update_data')} arrow />
        <ReminderOption title={t('health_data')}>
          <GroupCheckBox
            data={options}
            multiple
            onSelect={(itemSelect) => {
              setHealthsData(itemSelect.map((item) => item.health_data));
            }}
          />
        </ReminderOption>
        <ReminderOption
          title={t('schedule')}
          hasPlusIcon
          onPressPlus={onAddSchedule}
        >
          <View style={styles.separator} />
          <View>
            {fakeSchedule.length > 0 ? (
              fakeSchedule.map((item, index) => (
                <ScheduleTimeItem key={index} item={item} />
              ))
            ) : (
              <TouchableOpacity
                style={styles.tapToAddSchedule}
                onPress={onAddSchedule}
              >
                <Text type="Body" color={Colors.Gray7} center>
                  {t('tap_to_add_new_schedule')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ReminderOption>
      </ScrollView>
      <BottomButtonView
        onPressMain={onSave}
        onPressSecondary={onShowRemoveAlert}
        style={styles.viewBottom}
        mainTitle={t('save')}
        typeMain={'primary'}
        secondaryTitle={reminderId ? t('delete_reminder') : null}
      />

      <AlertAction
        visible={stateAlertRemove.visible}
        hideModal={hideAlertAction}
        title={stateAlertRemove.title}
        message={stateAlertRemove.message}
        leftButtonTitle={stateAlertRemove.leftButton}
        leftButtonClick={hideAlertAction}
        rightButtonTitle={stateAlertRemove.rightButton}
        rightButtonClick={onDelete}
        rightButtonStyle={styles.removeButton}
      />
    </View>
  );
});

export default ReminderDetail;
