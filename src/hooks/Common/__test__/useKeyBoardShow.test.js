import { Keyboard } from 'react-native';
import { act, renderHook } from '@testing-library/react-hooks';
import { useKeyboardShow } from '../';

let onKeyBoardDidShowCallback = null;
let onKeyBoardDidHideCallback = null;

const originalAddListener = Keyboard.addListener;

// eslint-disable-next-line promise/prefer-await-to-callbacks
const mockAddListener = jest.fn((event, callback) => {
  if (event === 'keyboardDidShow') {
    onKeyBoardDidShowCallback = callback;
  } else {
    onKeyBoardDidHideCallback = callback;
  }
});

const mockSetState = jest.fn();
jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn((init) => [init, mockSetState]),
    memo: (x) => x,
  };
});

describe('Test useKeyboardShow', () => {
  const config = {
    useWillShow: false,
    useWillHide: false,
  };

  beforeAll(() => {
    Keyboard.addListener = mockAddListener;
  });

  beforeEach(() => {
    mockAddListener.mockClear();
  });

  afterAll(() => {
    Keyboard.addListener = originalAddListener;
  });

  it('Test keyboard event listener', async () => {
    const { result } = renderHook(() => useKeyboardShow(config));
    act(() => {
      result.current.dismissKeyboard();
    });
    expect(result.current.keyboardVisible).toBeFalsy();
    expect(result.current.keyboardBottomPadding).toBe(0);
  });

  it('Test on keyboardShow', () => {
    renderHook(() => useKeyboardShow(config));
    onKeyBoardDidHideCallback();
    expect(mockSetState).toBeCalled();
  });

  it('Test on keyboardHide', () => {
    renderHook(() => useKeyboardShow(config));
    onKeyBoardDidShowCallback({
      endCoordinates: {
        height: 100,
      },
    });
    expect(mockSetState).toBeCalled();
  });
});
