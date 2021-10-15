import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, {
  Text,
  G,
  Circle,
  Line,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { t } from 'i18n-js';
import { polarToCartesian } from './helper';
import { Colors } from '../../../configs';
import { HEALTH_CONFIG_COLOR_SCHEME } from '../../../configs/Constants';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DonutView = memo(
  ({ data, width = 360, size = 300, strokeWidth = 14 }) => {
    const { textColor, strokeColor, stickColor } =
      HEALTH_CONFIG_COLOR_SCHEME[data.text] || HEALTH_CONFIG_COLOR_SCHEME.null;
    const { value, max: maxValue, min: minValue } = data;

    const viewBox = `0 0 ${width} ${width}`;
    const center = width / 2;
    const gOrigin = `${center}, ${center}`;
    const radius = (size - strokeWidth - 50) / 2;
    const radiusForSticks = size / 2;
    const circumference = Math.PI * radius * 2;

    const circleRef = useRef();
    const animatedValue = useRef(new Animated.Value(0)).current;

    const percentage = useMemo(() => {
      if (value === null) {
        return 0;
      }
      return maxValue === minValue
        ? 100
        : ((value - minValue) / (maxValue - minValue)) * 100;
    }, [value, maxValue, minValue]);

    const setPercentage = useCallback(
      (toValue) => {
        return Animated.timing(animatedValue, {
          toValue,
          duration: 500,
          delay: 500,
          useNativeDriver: true,
        }).start();
      },
      [animatedValue]
    );

    useEffect(() => {
      if (percentage === 0) {
        return;
      }
      setPercentage(percentage);
      animatedValue.addListener((v) => {
        if (circleRef?.current) {
          const strokeDashoffset =
            circumference - (circumference * v.value) / 100;
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      });
    }, [animatedValue, circumference, percentage, setPercentage]);

    return (
      <View style={styles.standard}>
        <Svg width={width} height={width} viewBox={viewBox}>
          <G rotation="-90" origin={gOrigin}>
            <Circle
              cx="50%"
              cy="50%"
              stroke={Colors.Gray3}
              fill="transparent"
              r={radius}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
            />
            <Defs>
              <LinearGradient
                id="gradient"
                x1="0"
                y1={width}
                x2={width}
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <Stop stopColor={strokeColor.stop1Color} />
                <Stop offset="1" stopColor={strokeColor.stop2Color} />
              </LinearGradient>
            </Defs>
            <AnimatedCircle
              ref={circleRef}
              cx="50%"
              cy="50%"
              stroke="url(#gradient)"
              fill="transparent"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
            />
          </G>
          <Text
            fill={textColor}
            fontSize="16"
            x={width / 2}
            y={width / 2 - 26}
            textAnchor="middle"
            fontWeight="600"
          >
            {data.text ? t(`${data.text}`) : t('no_data')}
          </Text>
          <Text
            fill={Colors.Gray9}
            fontSize="40"
            x={width / 2}
            y={width / 2 + 12}
            textAnchor="middle"
            fontWeight="600"
          >
            {value !== null ? value : '-'}
          </Text>
          <Text
            fill={Colors.Gray9}
            fontSize="16"
            x={width / 2}
            y={width / 2 + 32}
            textAnchor="middle"
            fontWeight="400"
          >
            {data.unit}
          </Text>
          {new Array(12).fill(1).map((_, index) => {
            const start = polarToCartesian(
              center,
              center,
              radiusForSticks - 10,
              index * 30
            );
            const end = polarToCartesian(
              center,
              center,
              radiusForSticks,
              index * 30
            );
            return (
              <G key={index}>
                <Line
                  stroke={stickColor}
                  strokeWidth={3}
                  strokeLinecap="round"
                  x1={start.x}
                  x2={end.x}
                  y1={start.y}
                  y2={end.y}
                />
              </G>
            );
          })}
        </Svg>
      </View>
    );
  }
);

export default DonutView;

const styles = StyleSheet.create({
  standard: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
