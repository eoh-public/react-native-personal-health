import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.Gray4,
    marginVertical: 16,
  },
  scheduleInfo: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
  },
  dash: {
    backgroundColor: Colors.Gray7,
    height: 24,
    width: 1,
    marginHorizontal: 8,
  },
});
