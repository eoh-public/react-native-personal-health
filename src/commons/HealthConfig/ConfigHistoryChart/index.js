import React, { memo, useEffect, useCallback, useState, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { groupBy } from 'lodash';
import moment from 'moment';

import Text from '../../Text';
import LinearChart from '../../Chart/LinearChart';
import { axiosGet } from '../../../utils/Apis/axios';
import { Colors, Constants } from '../../../configs';
import { API } from '../../../configs';
import { HEALTH_CONFIG_COLOR_SCHEME } from '../../../configs/Constants';
import styles from './styles';

const getCategories = (startDate, length) => {
  const date = moment(startDate);
  const categories = [date.format('MMM D')];
  while (categories.length < length) {
    categories.push(date.format('D'));
    date.add(1, 'days');
  }
  return categories;
};

const ConfigHistoryChart = memo(({ config }) => {
  const { textColor } =
    HEALTH_CONFIG_COLOR_SCHEME[config.text] || HEALTH_CONFIG_COLOR_SCHEME.null;
  const [startDate, setStartDate] = useState(moment().add(-4, 'days'));
  const [chartData, setChartData] = useState({
    data: [],
    categories: getCategories(startDate, 7),
  });

  const endDate = useMemo(() => {
    return moment(startDate).add(6, 'days');
  }, [startDate]);

  const fetchData = useCallback(async () => {
    if (!config.id) {
      return;
    }
    let params = new URLSearchParams();
    params.append('date_from', startDate.valueOf() / 1000);
    params.append('date_to', endDate.valueOf() / 1000);
    const { success, data } = await axiosGet(
      API.HEALTH_CONFIG.HISTORY(config.id),
      {
        params,
      }
    );
    if (success) {
      const configData = data.data;
      configData.forEach((configValue) => {
        configValue.x = moment(configValue.x).format('YYYY-MM-DD');
      });
      const groupedConfigData = groupBy(configData, 'x');

      const dataSeries = [];
      const date = moment(startDate);
      while (date <= endDate) {
        dataSeries.push(groupedConfigData[date.format('YYYY-MM-DD')]);
        date.add(1, 'days');
      }
      setChartData((state) => ({ ...state, data: dataSeries }));
    }
  }, [startDate, endDate, config.id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onPrevious = useCallback(() => {
    setStartDate(moment(startDate).add(-6, 'days'));
  }, [setStartDate, startDate]);

  const onNext = useCallback(() => {
    setStartDate(moment(startDate).add(6, 'days'));
  }, [setStartDate, startDate]);

  const dateRangeTitle = useMemo(() => {
    if (startDate.isSame(endDate, 'month')) {
      return `${startDate.format('MMMM, D')} - ${endDate.format('D')}`;
    }
    return `${startDate.format('MMMM, D')} - ${endDate.format('MMMM, D')}`;
  }, [startDate, endDate]);

  return (
    <>
      <View style={styles.row}>
        <TouchableOpacity onPress={onPrevious}>
          <IconOutline name="left" size={24} />
        </TouchableOpacity>
        <Text type="H4" color={Colors.Gray9} bold>
          {dateRangeTitle}
        </Text>
        <TouchableOpacity onPress={onNext}>
          <IconOutline name="right" size={24} />
        </TouchableOpacity>
      </View>
      <View style={[styles.chart, { width: Constants.width }]}>
        <LinearChart chartData={chartData} color={textColor} />
      </View>
    </>
  );
});

export default ConfigHistoryChart;
