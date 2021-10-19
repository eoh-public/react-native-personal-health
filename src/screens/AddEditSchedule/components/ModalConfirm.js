import Modal from 'react-native-modal';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { t } from 'i18n-js';

import Text from '../../../commons/Text';
import styles from '../styles/ModalConfirmStyles';
import { Colors } from '../../../configs';

const ModalConfirm = memo(({ visible, onClose, onRemoveSchedule }) => {
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <View style={styles.popoverStyle}>
        <Text type="H4" bold style={styles.textwithline}>
          {t('remove_schedule')}
        </Text>

        <Text type="H4" style={styles.textContent}>
          {t('are_you_sure_remove_schedule')}
        </Text>

        <View style={styles.wrapButton}>
          <TouchableOpacity onPress={onClose}>
            <Text
              type="H4"
              bold
              color={Colors.Primary}
              style={styles.textButton}
            >
              {t('cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onRemoveSchedule}>
            <Text type="H4" bold color={Colors.Gray7} style={styles.textButton}>
              {t('remove')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

export default ModalConfirm;
