import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  wrapTextInput: {
    marginTop: 0,
    flex: 1,
  },
  textInput: {
    marginTop: 0,
    paddingTop: 9,
    paddingBottom: 9,
    paddingHorizontal: 16,
    paddingRight: 56,
    borderRadius: 16,
  },
  wrapIcon: {
    position: 'absolute',
    right: 16,
  },
});
