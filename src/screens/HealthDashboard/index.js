/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../../commons/Text';
import { useBlockBackAndroid } from '../../hooks/Common';
import { useNavigation } from '@react-navigation/native';
import { IconOutline } from '@ant-design/icons-react-native';
import styles from './styles';

const HealthDashboard = memo(({ route }) => {
  const navigation = useNavigation();
  useBlockBackAndroid();

  const onPressMenu = useCallback(() => {
    navigation.toggleDrawer();
  }, [navigation]);

  return (
    <View style={styles.wrap}>
      <Text>empty</Text>

      <TouchableOpacity style={styles.buttonLeft} onPress={onPressMenu}>
        <IconOutline name="menu" size={24} />
      </TouchableOpacity>
    </View>
  );
});

export default HealthDashboard;
