import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: 16,
    bottom: 48,
  },
  button: {
    padding: 16,
    borderRadius: 100,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});
