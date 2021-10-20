import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';
import { getStatusBarHeight } from '../../../configs/Constants';

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
  header: {
    paddingTop: getStatusBarHeight() + 10,
  },
  buttonBack: {
    paddingLeft: 0,
  },
  wrapTitle: {
    paddingLeft: 16,
    alignItems: 'flex-start',
  },
});
