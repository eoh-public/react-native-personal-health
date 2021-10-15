import { StyleSheet, Platform } from 'react-native';
import { Colors } from '../../configs';
import { getStatusBarHeight } from '../../configs/Constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    paddingTop: getStatusBarHeight() + 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 4,
  },
  buttonMore: {
    marginLeft: 8,
  },
  menuMore: {
    borderRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginTop: Platform.select({
      ios: 0,
      android: -25,
    }),
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
  menuAction: {
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    padding: 12,
    marginTop: 16,
    backgroundColor: Colors.White,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.Gray4,
  },
  menuItemText: {
    marginLeft: 8,
    marginTop: 4,
  },
});
