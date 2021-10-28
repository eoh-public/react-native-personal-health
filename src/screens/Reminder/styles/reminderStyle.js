import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.White,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  rowTitle: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  scrollView: {
    paddingBottom: 60,
  },
  tabHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  tabItem: {
    paddingHorizontal: 16,
    height: 30,
    marginTop: 16,
    justifyContent: 'center',
  },
  tabItemActive: {
    backgroundColor: Colors.Gray3,
    borderRadius: 15,
  },
  reminder: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    paddingVertical: 16,
    marginVertical: 8,
  },
  reminderIcon: {
    marginHorizontal: 16,
  },
  reminderItemDescription: {
    marginTop: -2,
  },
  reminderContent: {
    flex: 1,
  },
  reminderOption: {
    marginRight: 16,
    height: 16,
  },
  addNew: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.Gray4,
    borderStyle: 'dashed',
    paddingVertical: 16,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewIconBackground: {
    marginHorizontal: 16,
    backgroundColor: Colors.Gray3,
    borderRadius: 14,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewText: {
    marginLeft: 10,
    marginRight: 16,
  },
});
