import { StyleSheet } from 'react-native';
import { Colors, Constants } from '../../../configs';

const marin = 16;
const widthItem = (Constants.width - marin * 2 - marin) / 2;
const heightItem = (widthItem / 164) * 140;

export default StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    width: widthItem,
    height: heightItem,
    backgroundColor: Colors.White,
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
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textValue: {
    fontSize: 32,
    lineHeight: 32,
    marginRight: 8,
  },
});
