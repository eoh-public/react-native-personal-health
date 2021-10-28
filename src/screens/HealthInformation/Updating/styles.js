import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.White,
  },
  line: {
    flexDirection: 'row',
    paddingBottom: 16,
  },
  buttonBack: {
    paddingLeft: 0,
  },
  wrapTitle: {
    paddingLeft: 16,
    alignItems: 'flex-start',
  },
});
