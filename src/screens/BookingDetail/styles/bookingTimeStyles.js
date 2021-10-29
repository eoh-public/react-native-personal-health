import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  wrapBookingTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  verticalLine: {
    marginHorizontal: 10,
    width: 1,
    height: '100%',
    backgroundColor: Colors.Gray6,
  },
  dot: {
    backgroundColor: Colors.Gray9,
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 10,
    marginTop: -4,
  },
});
