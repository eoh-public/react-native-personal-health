import { StyleSheet } from 'react-native';
import { Colors } from 'configs';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    overflow: 'hidden',
  },
  svgCheck: {
    marginTop: 2,
  },
  txt: {
    flex: 1,
    marginLeft: 8,
  },
  line: {
    height: 1,
    position: 'absolute',
    width: '100%',
    backgroundColor: Colors.Gray4,
    bottom: 0,
    marginLeft: 24,
  },
  img: {
    width: 24,
    height: 24,
  },
});
