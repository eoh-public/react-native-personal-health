import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../../../../commons/Text';
import { Colors } from '../../../../configs';
import { PHContext } from '../../../../context';
import Route from '../../../../utils/Route';

const RowDrawer = memo(
  ({ name, leftImage, borderTop = false, textColor = Colors.Gray8, route }) => {
    const { navigate } = useNavigation();
    const { setAction } = useContext(PHContext);
    const onPress = useCallback(() => {
      if (route) {
        if (route === Route.Main) {
          setAction('EXIT_APP', true);
        } else {
          navigate(route);
        }
      }
    }, [route, navigate, setAction]);
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.row, borderTop ? styles.borderTop : styles.borderBottom]}
      >
        <View style={styles.wrapImage}>{leftImage}</View>
        <View style={styles.wrapText}>
          <Text type="H4" color={textColor}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

export default RowDrawer;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: Colors.Gray4,
  },
  wrapImage: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    flex: 1,
  },
});
