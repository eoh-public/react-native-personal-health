import { useState, useCallback } from 'react';
import { axiosGet } from '../../../utils/Apis/axios';
import { API, PHConfig } from '../../../configs';

const useHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setRefreshing(true);
    const { success, data } = await axiosGet(API.HOSPITAL.LIST(), {
      headers: {
        Authorization: `Token ${PHConfig.iparamedApiToken}`,
      },
    });
    success && setHospitals(data);
    setRefreshing(false);
  }, [setHospitals]);

  const onRefresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    hospitals,
    refreshing,
    onRefresh,
  };
};

export default useHospitals;
