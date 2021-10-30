import { useCallback, useState } from 'react';
import { t } from 'i18n-js';

export const useStateAlertRemove = (reminderId, reminderName) => {
  const [stateAlertRemove, setStateAlertRemove] = useState({
    visible: false,
    title: t('delete_reminder'),
    message: `${t('are_you_sure_want_to_delete')} ${reminderName}?`,
    leftButton: t('cancel'),
    rightButton: t('remove'),
  });
  const hideAlertAction = useCallback(() => {
    setStateAlertRemove({ ...stateAlertRemove, visible: false });
  }, [stateAlertRemove]);

  const onShowRemoveAlert = useCallback(() => {
    setStateAlertRemove({ ...stateAlertRemove, visible: true });
  }, [stateAlertRemove]);

  return {
    stateAlertRemove,
    hideAlertAction,
    onShowRemoveAlert,
  };
};
