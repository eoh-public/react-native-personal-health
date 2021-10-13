import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.Gray3,
    borderRadius: 8,
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
  },
  wrapValue: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderLeftWidth: 1,
    borderLeftColor: Colors.Gray5,
  },
  noBorder: {
    borderLeftColor: Colors.Transparent,
  },
});
