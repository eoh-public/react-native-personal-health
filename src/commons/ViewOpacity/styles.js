import { Colors } from '../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    paddingVertical: 16,
    marginVertical: 8,
    padding: 16,
  },
});
