import React, {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import { View, Animated } from 'react-native';
import { Constants, Colors } from '../../configs';
import { linearIntepolate } from './helper';
import Text from '../Text';
import styles from './styles';

let canChangeValue = false;

const HorizontalPicker = ({
  width = Constants.width,
  onChangeValue,
  minimum = 0,
  maximum = 100,
  segmentSpacing = 20,
  step = 10,
  stepColor = Colors.Gray7,
  stepHeight = 40,
  stepWidth = 2,
  normalColor = Colors.Gray7,
  normalHeight = 20,
  normalWidth = 2,
  indicatorWidth = 12,
  style,
  value = 0,
}) => {
  const scrollViewRef = useRef();
  const [scrollX] = useState(new Animated.Value(0));

  const spacerWidth = (width - stepWidth) / 2;
  let time = useMemo(() => minimum, [minimum]);

  const valueScrollXMaps = useMemo(() => {
    const maps = [];
    let scrollX = 0;
    for (let i = minimum; i <= maximum; i++) {
      if (i % step === 0) {
        maps.push({
          scrollX: scrollX + stepWidth / 2,
          value: i,
        });
        scrollX += stepWidth + segmentSpacing;
      } else {
        maps.push({
          scrollX: scrollX + normalWidth / 2,
          value: i,
        });
        scrollX += normalWidth + segmentSpacing;
      }
    }
    return maps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getValueFromScrollX = useCallback(
    (scrollXValue) => {
      const realScrollXValue = scrollXValue + indicatorWidth / 2;
      for (let i = 0; i < valueScrollXMaps.length; i++) {
        if (Math.abs(valueScrollXMaps[i].scrollX - realScrollXValue) <= 2) {
          return valueScrollXMaps[i].value;
        }
        if (valueScrollXMaps[i].scrollX > realScrollXValue) {
          const x = realScrollXValue;
          const { scrollX: x1, value: y1 } = valueScrollXMaps[i - 1];
          const { scrollX: x2, value: y2 } = valueScrollXMaps[i];
          return linearIntepolate(x1, x2, y1, y2, x);
        }
      }
    },
    [valueScrollXMaps, indicatorWidth]
  );

  const getScrollXFromValue = useCallback(
    (inputValue) => {
      for (let i = 0; i < valueScrollXMaps.length; i++) {
        if (Math.abs(valueScrollXMaps[i].value - inputValue) < 1) {
          return valueScrollXMaps[i].scrollX;
        }
        if (valueScrollXMaps[i].value > inputValue) {
          const x = inputValue;
          const { value: x1, scrollX: y1 } = valueScrollXMaps[i - 1];
          const { value: x2, scrollX: y2 } = valueScrollXMaps[i];
          return linearIntepolate(x1, x2, y1, y2, x);
        }
      }
    },
    [valueScrollXMaps]
  );

  const renderTime = useMemo(() => {
    const data = [...Array(maximum - minimum + 1).keys()].map(
      (i) => i + minimum
    );
    return (
      <View style={styles.wrap}>
        <View
          style={{
            width: spacerWidth,
          }}
        />
        {data.map((i, index) => {
          const isStep = i % step === 0;
          return (
            <View key={index}>
              <View
                key={i}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  backgroundColor: isStep ? stepColor : normalColor,
                  height: isStep ? stepHeight : normalHeight,
                  width: isStep ? stepWidth : normalWidth,
                  borderRadius: isStep ? stepWidth / 2 : normalWidth / 2,
                  marginRight: i === maximum ? 0 : segmentSpacing,
                }}
              />
              {isStep && (
                <Text
                  color={Colors.Gray7}
                  style={[styles.time, time < step && styles.time2]}
                >
                  {i}
                </Text>
              )}
            </View>
          );
        })}
        <View
          style={{
            width: (width - stepWidth) / 2,
          }}
        />
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximum, minimum, time]);

  useEffect(() => {
    const scrollListener = scrollX.addListener(({ value }) => {
      canChangeValue &&
        onChangeValue &&
        onChangeValue(getValueFromScrollX(value));
    });
    return () => scrollX.removeListener(scrollListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!canChangeValue && scrollViewRef && scrollViewRef.current) {
      const to1 = setTimeout(() => {
        const scrollX = getScrollXFromValue(value);

        let x;
        if (value % step === 0) {
          x = scrollX - stepWidth / 2 - (indicatorWidth - stepWidth) / 2;
        } else {
          x = scrollX - normalWidth / 2 - (indicatorWidth - normalWidth) / 2;
        }

        scrollViewRef.current.scrollTo({ x });
        clearTimeout(to1);
      }, 300);
      const to2 = setTimeout(() => {
        canChangeValue = true;
        clearTimeout(to2);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, canChangeValue, scrollViewRef]);

  useEffect(() => {
    return () => (canChangeValue = false);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {renderTime}
      </Animated.ScrollView>

      <View style={styles.indicator} pointerEvents="none">
        <View style={[styles.childIndicator, { width: indicatorWidth }]} />
      </View>
    </View>
  );
};

export default memo(HorizontalPicker);
