import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { TESTID } from '../../configs/Constants';
import ArrowLeft from '../../../assets/images/arrow_back.svg';

const BackDefault = memo(
  ({ goBack, color, fixedHeight, arrowLeft = false, buttonStyle }) => {
    return (
      <TouchableOpacity
        testID={TESTID.BACK_DEFAULT_TOUCH}
        onPress={goBack}
        style={[
          styles.wrap,
          fixedHeight && styles.noPaddingVertical,
          buttonStyle,
        ]}
      >
        {arrowLeft ? (
          <ArrowLeft />
        ) : (
          <IconOutline name="left" size={27} color={color} />
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  wrap: {
    paddingLeft: 12,
    paddingVertical: 14,
  },
  noPaddingVertical: {
    paddingVertical: 0,
  },
});

export default BackDefault;
