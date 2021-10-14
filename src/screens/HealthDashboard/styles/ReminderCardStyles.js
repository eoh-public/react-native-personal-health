import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  margin16: {
    margin: 16,
  },
  gradient: {
    borderRadius: 10,
    padding: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 16,
  },
  wrapTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  paddingLeft16: {
    paddingLeft: 16,
  },
  separator: {
    marginBottom: 16,
    borderColor: Colors.Gray4,
    borderWidth: 0.6,
  },
  rowInputData: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  buttonManualInput: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 4,
    paddingTop: 4,
    borderColor: Colors.Primary,
    borderWidth: 1,
    borderRadius: 28,
  },
});
