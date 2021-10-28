import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  wrapTitleStyle: {
    alignItems: 'flex-start',
    paddingLeft: 12,
  },
  titleStyle: {
    fontSize: 24,
    lineHeight: 32,
  },
  wrapContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  wrapValue: {
    flexDirection: 'row',
  },
  wrapTextInput: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  textInput: {
    marginTop: 0,
    borderWidth: 0,
    borderRadius: 0,
    paddingTop: 0,
    paddingBottom: 16,
    color: Colors.Gray9,
    fontFamily: Fonts.Bold,
    fontSize: 48,
    lineHeight: 64,
    textAlign: 'center',
  },
  textValue: {
    fontSize: 48,
    lineHeight: 57,
  },
  wrapUnit: {
    position: 'relative',
  },
  textConfigName: {
    position: 'absolute',
    top: 60,
  },
  textUnit: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  picker: {
    marginTop: 40,
  },
  viewBottom: {
    paddingTop: 24,
    paddingBottom: 32,
  },
});
