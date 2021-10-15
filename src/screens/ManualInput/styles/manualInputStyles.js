import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';
import { getStatusBarHeight } from '../../../configs/Constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    paddingTop: getStatusBarHeight() + 10,
  },
  wrapTitleStyle: {
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  titleStyle: {
    fontSize: 24,
    lineHeight: 32,
  },
  wrapContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  wrapValue: {},
  textConfigName: {
    position: 'absolute',
    top: 60,
  },
  textValue: {
    fontSize: 48,
    lineHeight: 57,
  },
  textUnit: {
    position: 'absolute',
    right: -60,
  },
  picker: {
    marginTop: 40,
  },
  viewBottom: {
    paddingTop: 24,
    paddingBottom: 32,
  },
});
