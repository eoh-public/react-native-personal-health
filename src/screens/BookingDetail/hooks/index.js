import { useState, useCallback, useMemo } from 'react';
import { axiosGet } from '../../../utils/Apis/axios';
import { API, PHConfig } from '../../../configs';
import moment from 'moment';

const useBookingDetail = (hospitalId) => {
  const [hospital, setHospital] = useState();
  const [isLoadingHospital, setIsLoadingHospital] = useState(false);
  const time = useMemo(() => moment(), []);

  const getHospital = useCallback(async () => {
    setIsLoadingHospital(true);
    const { success, data } = await axiosGet(API.HOSPITAL.DETAIL(hospitalId), {
      headers: {
        Authorization: `Token ${PHConfig.iparamedApiToken}`,
      },
    });
    success && setHospital(data);
    setIsLoadingHospital(false);
  }, [hospitalId]);

  return {
    time,
    hospital,
    getHospital,
    isLoadingHospital,
  };
};

export default useBookingDetail;
