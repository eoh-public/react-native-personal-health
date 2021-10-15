import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
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
        {listMenuItem.map((item, index) => (
          <TouchableOpacity onPress={() => handleOnItemClick(item)} key={index}>
            {renderItem(item)}
          </TouchableOpacity>
        ))}
      </Popover>
    );
  }
);

export default MenuAction;
