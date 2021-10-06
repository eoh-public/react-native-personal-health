/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  memo,
} from 'react';
import {
  View,
} from 'react-native';
import Text from '../../commons/Text';
import { useBlockBackAndroid } from '../../hooks/Common';

import styles from './styles';

const MapDashboard = memo(({ route }) => {
  useBlockBackAndroid();

  return (
    <View style={styles.wrap}>
      <Text>empty</Text>
    </View>
  );
});

export default MapDashboard;
