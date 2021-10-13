import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    marginBottom: 0,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.Gray4,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    marginRight: 8,
    marginBottom: 2,
  },
  iconButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  wrapImage: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});
