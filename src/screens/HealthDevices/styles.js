import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 16,
  },
  scrollview: {
    paddingBottom: 150,
  },
  title: {
    margin: 16,
  },
  wrapText: {
    alignItems: 'center',
  },
  paddingLeft16: {
    paddingLeft: 16,
  },
  groupDevices: {
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
  groupDevicesNoneBorder: {
    borderBottomWidth: 0,
  },
  paddingVertical16: {
    paddingVertical: 16,
  },
  paddingHorizontal16: {
    paddingHorizontal: 16,
  },
});
