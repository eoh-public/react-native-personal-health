import { StyleSheet } from 'react-native';

import { Colors } from '../../../configs';
import { getStatusBarHeight } from '../../../configs/Constants';

export default StyleSheet.create({
  header: {
    paddingTop: getStatusBarHeight(),
  },
  headerRight: {
    paddingRight: 21,
    paddingVertical: 14,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  title: {
    marginBottom: 32,
  },
  scollView: {
    paddingHorizontal: 16,
    paddingBottom: 150,
  },
  viewBottom: {
    borderColor: Colors.Gray4,
    paddingVertical: 24,
    borderTopWidth: 1,
    backgroundColor: Colors.White,
  },
});
