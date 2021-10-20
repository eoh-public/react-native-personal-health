import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  Device: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  textName: {
    alignItems: 'center',
    paddingTop: 5,
  },
  wrapText: {
    alignItems: 'center',
  },
  paddingLeft16: {
    paddingLeft: 16,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  isConnecting: {
    backgroundColor: Colors.Gray3,
    borderColor: Colors.Gray6,
  },
  connect: {
    backgroundColor: Colors.White,
    borderColor: Colors.Primary,
  },
  textConnecting: {
    color: Colors.Gray6,
  },
  textConnect: {
    color: Colors.Primary,
  },
});
