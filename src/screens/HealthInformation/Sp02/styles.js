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
    marginVertical: 16,
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
  cardPrimary: {
    flexDirection: 'row',
    borderColor: Colors.Primary,
    borderWidth: 1,
  },
  cardDanger: {
    padding: 10,
    borderColor: Colors.Red6,
    borderWidth: 1,
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
  icon: {
    alignItems: 'center',
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
