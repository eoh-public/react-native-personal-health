import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';
import { getStatusBarHeight } from '../../../configs/Constants';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    paddingTop: getStatusBarHeight() + 10,
    marginHorizontal: 16,
  },
  buttonBack: {
    paddingLeft: 0,
  },
  wrapTitle: {
    paddingLeft: 16,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
  },
  scrollView: {
    paddingBottom: getBottomSpace() + 150,
  },
  content: {
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.Gray4,
    marginVertical: 24,
  },
  text: {
    marginVertical: 16,
  },
  viewBottom: {
    paddingTop: 24,
    paddingBottom: 32,
  },
});
