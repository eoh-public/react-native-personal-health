import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    margin: 16,
  },
  wrapImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 108,
    width: 112,
    borderRadius: 8,
  },
  wrapInfo: {
    flex: 1,
    marginLeft: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
