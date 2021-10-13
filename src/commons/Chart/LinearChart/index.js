import React, { memo, useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import HighchartsReactNative from '@highcharts/highcharts-react-native';
import { Colors } from '../../../configs';
import styles from './styles';

const getValidData = (data) => {
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    if (Array.isArray(data[i])) {
      const sum = data[i].reduce((a, b) => a + b.y, 0);
      data[i] = sum / data[i].length;
    }
    newData.push(data[i]);
  }
  return newData;
};

const chartOptions = {
  chart: {},
  credits: {
    enabled: false,
  },
  rangeSelector: {
    selected: 1,
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  title: {
    text: '',
  },
  legend: {
    enabled: false,
  },
  series: [],
  tooltip: {
    formatter: function () {
      return this.y;
    },
    style: {
      color: Colors.White,
    },
  },
  xAxis: {
    title: {
      text: '',
    },
  },
  plotOptions: {
    series: {
      point: {
        events: {
          click: () => {
            let series = this.series.chart.series;
            const seriesIndex = this.series.index;
            for (let i = 0; i < series.length; i++) {
              if (series[i].index !== seriesIndex) {
                series[i].visible ? series[i].hide() : series[i].show();
              }
            }
            return false;
          },
        },
      },
      events: {
        legendItemClick: (event) => {
          if (!this.visible) {
            return true;
          }
          let seriesIndex = this.index;
          let series = this.chart.series;
          for (let i = 0; i < series.length; i++) {
            if (series[i].index !== seriesIndex) {
              series[i].visible ? series[i].hide() : series[i].show();
            }
          }
          return false;
        },
      },
      showInNavigator: true,
    },
  },
};

const LinearChart = ({ chartData, color }) => {
  const [options, setOptions] = useState(chartOptions);

  const updateOptions = useCallback(() => {
    const validData = getValidData(chartData.data);
    const lastNonNull = validData.filter((x) => x).pop();
    const endIndex = validData.indexOf(lastNonNull);

    setOptions({
      ...chartOptions,
      series: [
        {
          ...chartOptions.series,
          type: 'spline',
          data: getValidData(chartData.data),
          color: color,
          marker: {
            enabled: false,
          },
        },
      ],
      xAxis: {
        ...chartOptions.xAxis,
        categories: [...chartData.categories],
        plotLines: [
          {
            dashStyle: 'dash',
            value: endIndex,
            color: Colors.Gray6,
            width: 1,
          },
        ],
      },
      tooltip: {
        ...chartOptions.tooltip,
        backgroundColor: color,
      },
    });
  }, [setOptions, chartData, color]);

  useEffect(() => {
    updateOptions();
  }, [updateOptions]);

  return (
    <View style={styles.container}>
      <HighchartsReactNative styles={styles.chartStyle} options={options} />
    </View>
  );
};

export default memo(LinearChart);
