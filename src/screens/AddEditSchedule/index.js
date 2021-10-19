import React, { memo, useState, useCallback, useMemo } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { t } from 'i18n-js';
import { Icon } from '@ant-design/react-native';

import Text from '../../commons/Text';
import Header from '../../commons/Header';
import WheelDateTimePicker from '../../commons/WheelDateTimePicker';
import BottomButtonView from '../../commons/BottomButtonView';
import Calendar from '../../commons/Calendar';
import RepeatOptionsPopup from './components/RepeatOptionsPopup';
import RowItem from './components/RowItem';
import SelectWeekday from './components/SelectWeekday';
import ModalConfirm from './components/ModalConfirm';
import { useBoolean } from '../../hooks/Common';

import styles from './styles/indexStyles';
import { Colors } from '../../configs';
import { REPEAT_OPTIONS } from './components/RepeatOptionsPopup';

const getDateString = (date) => {
  const today = moment();
  if (date.isSame(today, 'day')) {
    return date.format(`[${t('today')}], D MMMM YYYY `);
  }
  return date.format('ddd, D MMMM YYYY');
};

const AddEditSchedule = ({ route }) => {
  const { type = 'add' } = route.params;
  const { goBack } = useNavigation();
  const [repeat, setRepeat] = useState(REPEAT_OPTIONS.ONCE);
  const [time, setTime] = useState(moment().hour(0).minute(0));
  const [date, setDate] = useState(moment());
  const [weekday, setWeekday] = useState([]);

  const [showRepeatOptions, setShowRepeatOptions, setHideRepeatOptions] =
    useBoolean();
  const [showTimePicker, setShowTimePicker, setHideTimePicker] = useBoolean();
  const [showCalendar, setShowCalendar, setHideCalendar] = useBoolean();
  const [showModal, setShowModal, setHideModal] = useBoolean();

  const handleOnSave = useCallback(() => {
    alert(t('feature_under_development'));
  }, []);

  const onSetRepeatOption = useCallback(
    (value) => {
      setRepeat(value);
      setHideRepeatOptions();
    },
    [setRepeat, setHideRepeatOptions]
  );

  const onTimePicked = useCallback(
    (timeData) => {
      setTime(moment(timeData));
    },
    [setTime]
  );

  const onDatePicked = useCallback(
    (datePicked) => {
      setDate(datePicked);
    },
    [setDate]
  );
  const headerRight = useMemo(
    () => (
      <View style={styles.headerRight}>
        <TouchableOpacity>
          <Icon name={'close'} size={24} color={Colors.Black} />
        </TouchableOpacity>
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onRemoveSchedule = useCallback(() => {
    alert(t('feature_under_development'));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Header
          hasBack
          goBack={goBack}
          rightComponent={headerRight}
          wrapStyle={styles.header}
        />
        <ScrollView contentContainerStyle={styles.scollView}>
          <Text type="H2" bold style={styles.title}>
            {type === 'add' ? t('add_schedule') : t('edit_schedule')}
          </Text>
          <RowItem
            title={t('set_time')}
            value={time.format('HH:mm')}
            icon="clock-circle"
            onPress={setShowTimePicker}
          />
          <RowItem
            title={t('repeat')}
            value={t(`${repeat}`)}
            arrow
            onPress={setShowRepeatOptions}
          />
          {repeat === REPEAT_OPTIONS.ONCE && (
            <RowItem
              title={t('select_date')}
              value={getDateString(date)}
              icon="calendar"
              onPress={setShowCalendar}
            />
          )}
          {repeat === REPEAT_OPTIONS.EVERYWEEK && (
            <SelectWeekday weekday={weekday} setWeekday={setWeekday} />
          )}
        </ScrollView>
        <BottomButtonView
          style={styles.viewBottom}
          mainTitle={t('save')}
          onPressMain={handleOnSave}
          secondaryTitle={type === 'edit' && t('text_remove_schedule')}
          onPressSecondary={setShowModal}
        />
      </View>
      <RepeatOptionsPopup
        isVisible={showRepeatOptions}
        onHide={setHideRepeatOptions}
        onSetRepeat={onSetRepeatOption}
      />
      <WheelDateTimePicker
        mode="time"
        isVisible={showTimePicker}
        defaultValue={time.valueOf()}
        onHide={setHideTimePicker}
        onCancel={setHideTimePicker}
        onPicked={onTimePicked}
      />
      <Calendar
        isVisible={showCalendar}
        defaultDate={date}
        minDate={moment()}
        onHide={setHideCalendar}
        onConfirm={onDatePicked}
      />
      <ModalConfirm
        visible={showModal}
        onClose={setHideModal}
        onRemoveSchedule={onRemoveSchedule}
      />
    </>
  );
};

export default memo(AddEditSchedule);
