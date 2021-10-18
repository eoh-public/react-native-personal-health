import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';
import { getStatusBarHeight } from '../../../configs/Constants';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.White,
  },
  card: {
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: 4,
    borderColor: Colors.Gray5,
    padding: 8,
    backgroundColor: Colors.White,
    borderRadius: 4,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
  containerCard: {
    paddingTop: 12,
    paddingBottom: 14,
  },
  cardLeft: {
    borderColor: Colors.Gray5,
    borderRightWidth: 1,
    flex: 1,
  },
  cardText: {
    paddingTop: 2,
  },
  cardRight: {
    flex: 2,
    paddingLeft: 16,
  },
  notes: {
    paddingLeft: 8,
    paddingTop: 12,
    paddingBottom: 12,
  },
  header: {
    paddingTop: getStatusBarHeight() + 10,
  },
  buttonBack: {
    paddingLeft: 0,
  },
  wrapTitle: {
    paddingLeft: 16,
    alignItems: 'flex-start',
  },
});
