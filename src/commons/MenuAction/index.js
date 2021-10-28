import React, { memo, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Popover from 'react-native-popover-view';
import styles from './styles';

const MenuAction = memo(
  ({
    mode = 'rn-modal',
    isVisible,
    childRef,
    hideMenuAction,
    listMenuItem,
    onItemClick,
    renderItem,
    wrapStyle,
    backgroundStyle,
  }) => {
    const handleOnItemClick = useCallback(
      (item) => {
        onItemClick && onItemClick(item);
        hideMenuAction && hideMenuAction();
      },
      [onItemClick, hideMenuAction]
    );

    return (
      <Popover
        mode={mode}
        popoverStyle={[styles.wrapMenu, wrapStyle]}
        placement="top"
        from={childRef}
        onRequestClose={hideMenuAction}
        onBackButtonPress={hideMenuAction}
        onBackdropPress={hideMenuAction}
        isVisible={isVisible}
        arrowStyle={styles.arrow}
        backgroundStyle={backgroundStyle}
      >
        <View style={styles.menu}>
          {listMenuItem.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOnItemClick(item)}
            >
              {renderItem(item)}
            </TouchableOpacity>
          ))}
        </View>
      </Popover>
    );
  }
);

export default MenuAction;
