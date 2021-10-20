import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';
import Text from '../../../commons/Text';
import styles from './styles';
import Connected from '../../../../assets/images/PersonalHealth/connect.svg';

const Device = memo(({ data, onPress, isConnecting, idDevice }) => {
  const checkConnecting = isConnecting && idDevice === data?.id;

  return (
    <View style={styles.Device}>
      <View>
        <Text type="H4" style={styles.textName}>
          {data?.name}{' '}
        </Text>
      </View>

      {
        <>
          {!data?.isConnected && (
            <TouchableOpacity
              style={[
                styles.button,
                checkConnecting ? styles.isConnecting : styles.connect,
              ]}
              onPress={() => onPress(data?.id)}
              disabled={checkConnecting}
            >
              <Text
                type="Label"
                style={
                  checkConnecting ? styles.textConnecting : styles.textConnect
                }
              >
                {checkConnecting ? t('connecting') : t('connect')}
              </Text>
            </TouchableOpacity>
          )}
          {data?.isConnected && <Connected />}
        </>
      }
    </View>
  );
});

export default Device;
