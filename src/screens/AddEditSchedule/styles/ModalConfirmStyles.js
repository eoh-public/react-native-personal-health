import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  popoverStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  textwithline: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
  textContent: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  wrapButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 24,
  },
});
