import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';
import { axiosGet } from '../../utils/Apis/axios';

import Header from '../../commons/Header';
import Text from '../../commons/Text';
import RowTitleButton from '../../commons/RowTitleButton';
import MenuActionMore from '../../commons/MenuActionMore';
import DonutView from '../../commons/HealthConfig/DonutView';
import AdviceCard from '../../commons/HealthConfig/AdviceCard';
import MinMaxAvr from '../../commons/HealthConfig/MinMaxAvr';
import ConfigHistoryChart from '../../commons/HealthConfig/ConfigHistoryChart';
import { usePopover } from '../../hooks/Common';
import { Colors } from '../../configs';
import styles from './styles';
import { API } from '../../configs';

const HealthConfigDetail = memo(({ route }) => {
  const { goBack } = useNavigation();
  const { config } = route.params;
  const [refresing, setRefresing] = useState(false);
  const [configDetail, setConfigDetail] = useState(config);

  const fetchDetail = useCallback(async () => {
    if (!config.id) {
      return;
    }
    const { success, data } = await axiosGet(
      API.HEALTH_CONFIG.DETAIL(config.id)
    );
    if (success) {
      setConfigDetail(data);
    }
  }, [config.id, setConfigDetail]);

  const onRefresh = useCallback(async () => {
    setRefresing(true);
    await fetchDetail();
    setRefresing(false);
  }, [fetchDetail]);

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const listMenuItem = useMemo(() => {
    return [{ text: t('report_logs') }, { text: t('connect_devices') }];
  }, []);

  const onItemMenuClick = useCallback((item) => {
    Alert.alert(t('feature_under_development'));
  }, []);

  const { childRef, showingPopover, showPopoverWithRef, hidePopover } =
    usePopover();
  const refMenuAction = useRef();
  const onShowMenu = () => showPopoverWithRef(refMenuAction);

  const headerRight = useMemo(
    () => (
      <View style={styles.headerRight}>
        <TouchableOpacity>
          <Icon name={'plus'} size={27} color={Colors.Black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonMore}
          ref={refMenuAction}
          onPress={onShowMenu}
        >
          <Icon name={'more'} size={27} color={Colors.Black} />
        </TouchableOpacity>
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <View style={styles.container}>
      <Header
        hasBack
        goBack={goBack}
        rightComponent={headerRight}
        wrapStyle={styles.header}
      />
      <ScrollView
        contentContainerStyle={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refresing} onRefresh={onRefresh} />
        }
      >
        <RowTitleButton
          title={config.name}
          titleType="H2"
          titleBold
          buttonText={t('stop_sharing')}
          buttonType="info"
          style={styles.title}
        />
        <DonutView data={configDetail} />
        <View style={styles.wrapText}>
          <Text type="Label" color={Colors.Gray7}>
            {configDetail.value
              ? `${t('last_updated')} 5 ${t('minutes_ago')}`
              : `${t('tap_to_input_data')}`}
          </Text>
        </View>
        {!!configDetail.advices && <AdviceCard data={configDetail} />}
        <RowTitleButton
          title={t('history')}
          titleType="H3"
          titleBold
          style={styles.title}
        />
        <ConfigHistoryChart config={configDetail} />
        <MinMaxAvr data={configDetail} />
      </ScrollView>
      <MenuActionMore
        isVisible={showingPopover}
        hideMore={hidePopover}
        listMenuItem={listMenuItem}
        childRef={childRef}
        onItemClick={onItemMenuClick}
        wrapStyle={styles.menuAction}
        isTextCenter={false}
      />
    </View>
  );
});

export default HealthConfigDetail;
