import React, { memo, useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';
import { IconFill } from '@ant-design/icons-react-native';

import Text from '../../../commons/Text';
import styles from './styles';
import { Colors } from '../../../configs';

const Device = memo(({ data, onPress, isConnected }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const wrapOnPress = useCallback(async () => {
    setIsConnecting(true);
    onPress();
    setIsConnecting(false);
  }, [onPress]);

  return (
    <View style={styles.Device}>
      <View>
        <Text type="H4" style={styles.textName}>
          {data?.name}{' '}
        </Text>
      </View>

      {!isConnecting && isConnected ? (
        <IconFill name="check-circle" size={24} color={Colors.Primary} />
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            isConnecting ? styles.isConnecting : styles.connect,
          ]}
          onPress={wrapOnPress}
          disabled={isConnecting}
        >
          <Text
            type="Label"
            style={isConnecting ? styles.textConnecting : styles.textConnect}
          >
            {isConnecting ? t('connecting') : t('connect')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

export default Device;
