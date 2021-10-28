import React, { memo, useCallback, useMemo } from 'react';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { MenuActionMore } from '../../commons';

const MoreMenu = memo(({ hidePopover, childRef, showingPopover }) => {
  const navigation = useNavigation();

  const onItemClick = useCallback(
    ({ route: routeName, data }) => {
      hidePopover();
      routeName && navigation.navigate(routeName, data);
    },
    [hidePopover, navigation]
  );

  const listMenuItem = useMemo(() => {
    const RouteEdit = {
      route: null,
      text: t('edit'),
    };
    const Delete = {
      route: null,
      text: t('delete'),
    };
    return [RouteEdit, Delete];
  }, []);

  return (
    <MenuActionMore
      isVisible={showingPopover}
      hideMore={hidePopover}
      listMenuItem={listMenuItem}
      childRef={childRef}
      onItemClick={onItemClick}
      minWidth={128}
    />
  );
});

export default MoreMenu;
