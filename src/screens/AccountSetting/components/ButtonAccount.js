import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../../../commons/Text';
import { IconOutline } from '@ant-design/icons-react-native';
import styles from './ButtonAccountStyles';

import { Colors } from '../../../configs';

const ButtonAccount = ({ text }) => {
  return (
    <View style={styles.rowAccount}>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text semibold type={'H3'} style={styles.textButton}>
          {text ? text : ''}
        </Text>
        <IconOutline name="right" size={16} color={Colors.Gray9} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAccount;
