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
import { arrayRange } from '../../utils/Array';
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
  childStep = 1,
  stepColor = Colors.Gray7,
  stepHeight = 40,
  stepWidth = 2,
  normalColor = Colors.Gray7,
  normalHeight = 20,
  normalWidth = 2,
  indicatorWidth = 12,
  forceUpdate,
  onUpdated,
  style,
  value = 0,
}) => {
  const scrollViewRef = useRef();
  const [scrollX] = useState(new Animated.Value(0));
  const time = useMemo(() => minimum, [minimum]);
  const [dragStarted, setDragStarted] = useState(false);

  const valueScrollXMaps = useMemo(() => {
    const maps = [];
    let scrollX = 0;
    for (let i = minimum; i <= maximum; i += childStep) {
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

  const getNearestPoint = useCallback(
    (scrollXValue) => {
      const realScrollX = scrollXValue + indicatorWidth / 2;
      for (let i = 0; i < valueScrollXMaps.length; i++) {
        if (Math.abs(valueScrollXMaps[i].scrollX - realScrollX) <= 2) {
          return valueScrollXMaps[i];
        }
        if (valueScrollXMaps[i].scrollX > realScrollX) {
          const firstPoint = valueScrollXMaps[i - 1];
          const secondPoint = valueScrollXMaps[i];
          return Math.abs(firstPoint.scrollX, realScrollX) <
            Math.abs(secondPoint.scrollX, realScrollX)
            ? firstPoint
            : secondPoint;
        }
      }
    },
    [valueScrollXMaps, indicatorWidth]
  );

  const getScrollXFromValue = useCallback(
    (inputValue) => {
      for (let i = 0; i < valueScrollXMaps.length; i++) {
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

  const getScrollXForScroll = useCallback(
    (value, scrollX) => {
      if (value % step === 0) {
        return scrollX - stepWidth / 2 - (indicatorWidth - stepWidth) / 2;
      } else {
        return scrollX - normalWidth / 2 - (indicatorWidth - normalWidth) / 2;
      }
    },
    [step, stepWidth, normalWidth, indicatorWidth]
  );

  const onMomentumScrollEnd = useCallback(
    (e) => {
      if (!dragStarted && e.nativeEvent?.contentOffset) {
        const scrollX = e.nativeEvent.contentOffset.x;
        const nearestPoint = getNearestPoint(scrollX);
        const x = getScrollXForScroll(nearestPoint.value, nearestPoint.scrollX);
        scrollViewRef.current.scrollTo({ x });
      }
    },
    [dragStarted, getNearestPoint, getScrollXForScroll, scrollViewRef]
  );

  const onScrollBeginDrag = useCallback(() => {
    setDragStarted(true);
  }, []);

  const onScrollEndDrag = useCallback(() => {
    setDragStarted(false);
  }, []);

  const renderTime = useMemo(() => {
    const data = arrayRange(minimum, maximum, childStep);
    const spacerWidth = (width - stepWidth) / 2;
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
            width: spacerWidth,
          }}
        />
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximum, minimum, time]);

  const renderIndicator = useMemo(
    () => (
      <View style={styles.indicator} pointerEvents="none">
        <View style={[styles.childIndicator, { width: indicatorWidth }]} />
      </View>
    ),
    [indicatorWidth]
  );

  useEffect(() => {
    const scrollListener = scrollX.addListener(({ value }) => {
      if (canChangeValue && onChangeValue) {
        const nearestPoint = getNearestPoint(value);
        onChangeValue(nearestPoint.value);
      }
    });
    return () => scrollX.removeListener(scrollListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (forceUpdate) {
      canChangeValue = false;
    }
  }, [forceUpdate]);

  useEffect(() => {
    if (!canChangeValue && scrollViewRef?.current) {
      const to1 = setTimeout(() => {
        const scrollX = getScrollXFromValue(value);
        const x = getScrollXForScroll(value, scrollX);
        scrollViewRef.current.scrollTo({ x });
        clearTimeout(to1);
      }, 300);

      const to2 = setTimeout(() => {
        canChangeValue = true;
        onUpdated && onUpdated();
        clearTimeout(to2);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, canChangeValue, onUpdated, scrollViewRef]);

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
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
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

      {renderIndicator}
    </View>
  );
};

export default memo(HorizontalPicker);
