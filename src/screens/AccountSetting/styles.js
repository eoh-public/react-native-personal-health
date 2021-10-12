import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.White,
  },
  titleHeader: {
    color: Colors.Gray9,
  },
  viewBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: getBottomSpace(),
  },
  avatarInfo: {
    paddingTop: 32,
    flexDirection: 'row',
    paddingBottom: 16,
  },
  avatar: {
    paddingRight: 16,
  },
  info: {
    justifyContent: 'center',
  },
  rowAccount: {
    paddingBottom: 16,
  },
  overFlowHidden: {
    overflow: 'hidden',
  },
  avatarCustom: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
