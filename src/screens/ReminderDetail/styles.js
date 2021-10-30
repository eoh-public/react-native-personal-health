import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors } from '../../configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  scrollview: {
    padding: 16,
    paddingBottom: 150,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.Gray4,
    marginVertical: 16,
  },
  reminderOption: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tapToAddSchedule: {
    paddingVertical: 30,
  },
  viewBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: getBottomSpace(),
  },
  removeButton: {
    color: Colors.Gray6,
  },
});
