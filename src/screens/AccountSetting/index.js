import React, { memo } from 'react';
import { View, Alert } from 'react-native';
import Text from '../../commons/Text';
import styles from './styles';
import { t } from 'i18n-js';
import { CircleView } from '../../commons/CircleView';
import BottomButtonView from '../../commons/BottomButtonView';
import { Colors } from '../../configs';
import ButtonAccount from './components/ButtonAccount';
import { IconOutline } from '@ant-design/icons-react-native';
import { usePHSelector } from '../../context';
import FastImage from 'react-native-fast-image';
import { TESTID } from '../../configs/Constants';

const AccountSetting = memo(({ route }) => {
  const user = usePHSelector((state) => state.auth.account.user);
  const username =
    user && user.name !== null
      ? user.name
      : user && user.email !== null
      ? user.email
      : '';

  const phoneNumber = user ? user.phone_number : '';

  const onSave = () => {
    return Alert.alert(t('feature_under_development'));
  };
  return (
    <>
      <View style={styles.wrap}>
        <Text semibold type="H2" style={styles.titleHeader}>
          {t('account_setting')}
        </Text>
        <View style={styles.avatarInfo}>
          <View style={styles.avatar}>
            <CircleView
              size={80}
              backgroundColor={Colors.Yellow6}
              center
              style={styles.overFlowHidden}
            >
              {user.avatar ? (
                <FastImage
                  source={{ uri: user.avatar }}
                  style={styles.avatarCustom}
                  testID={TESTID.FAST_IMAGE_USER_AVATAR}
                />
              ) : (
                <IconOutline
                  name="user"
                  size={40}
                  color={Colors.Black}
                  backgroundColor={Colors.Yellow6}
                />
              )}
            </CircleView>
          </View>
          <View style={styles.info}>
            <Text semibold type="H3">
              {username}
            </Text>
            <Text type="Label">{phoneNumber}</Text>
          </View>
        </View>
        <View style={styles.rowAccount}>
          <Text type="Label" color={Colors.Gray7}>
            {t('general')}
          </Text>
        </View>
        <ButtonAccount text={t('general_information')} />
        <View style={styles.rowAccount}>
          <Text type="Label" color={Colors.Gray7}>
            {t('health')}
          </Text>
        </View>
        <ButtonAccount text={t('allergies')} />
        <ButtonAccount text={t('chronic_health')} />
        <ButtonAccount text={t('immunization_history')} />
        <ButtonAccount text={t('family_history')} />
        <BottomButtonView
          onPressMain={onSave}
          style={styles.viewBottom}
          mainTitle={t('save')}
          typeMain={'primary'}
        />
      </View>
    </>
  );
});

export default AccountSetting;
