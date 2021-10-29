import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Alert from '../index';
import { Modal } from 'react-native';

describe('Test Alert', () => {
  let tree;
  test('create Alert', () => {
    act(() => {
      tree = renderer.create(<Alert />);
    });
    const instance = tree.root;
    const Modals = instance.findAllByType(Modal);
    expect(Modals.length).toBe(1);
    Alert.setRef('_ref');
    expect(Alert.getRef()).toEqual('_ref');
    Alert.clearRef();
    expect(Alert.getRef()).toBeNull();
  });
});
