import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 14,
  },
  rowTitle: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  scrollview: {
    paddingBottom: 60,
  },
  boxReports: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginHorizontal: 16,
  },
});
