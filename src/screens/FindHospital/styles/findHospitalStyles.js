import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors } from '../../../configs';
import { getStatusBarHeight } from '../../../configs/Constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingTop: getStatusBarHeight() + 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  buttonFilter: {
    marginLeft: 16,
  },
  currentLocation: {
    marginLeft: 8,
  },
  flatList: {
    paddingBottom: getBottomSpace(),
  },
});
