import React from 'react';
import { act, create } from 'react-test-renderer';
import { TouchableOpacity } from 'react-native';
import PersonalHealthDrawer from '../index';
import RowDrawer from '../components/Drawer/RowDrawer';
import { PHContext } from '../../../context';
import { mockPHStore } from '../../../context/mockStore';
import Routes from '../../../utils/Route';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    memo: (x) => x,
  };
});

const mockNavigate = jest.fn();
const mockReplace = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: mockNavigate,
      replace: mockReplace,
    }),
  };
});

const wrapComponent = () => (
  <PHContext.Provider value={mockPHStore({})}>
    <PersonalHealthDrawer />
  </PHContext.Provider>
);

describe('Test Personal Health Drawer', () => {
  let tree;
  test('Test render', () => {
    act(() => {
      tree = create(wrapComponent());
    });
    const instance = tree.root;
    const rows = instance.findAllByType(RowDrawer);
    expect(rows).toHaveLength(7);

    const rowButtons = instance.findAllByType(TouchableOpacity);
    act(() => {
      rowButtons[6].props.onPress();
    });
    expect(mockReplace).toBeCalledWith(Routes.Main);

    mockReplace.mockClear();

    act(() => {
      rowButtons[0].props.onPress();
    });
    expect(mockNavigate).not.toBeCalled();
    expect(mockReplace).not.toBeCalled();
  });
});
