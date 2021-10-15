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
import { useNavigation, useIsFocused } from '@react-navigation/native';
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
import FloatingActionButton from '../../commons/FloatingActionButton';
import MenuAction from '../../commons/MenuAction';
import { usePopover } from '../../hooks/Common';

import { Colors } from '../../configs';
import styles from './styles';
import { API } from '../../configs';
import Routes from '../../utils/Route';
import BlueTooth from '../../../assets/images/Common/bluetooth.svg';

const HealthConfigDetail = memo(({ route }) => {
  const { goBack, navigate } = useNavigation();
  const isFocused = useIsFocused();
  const { config } = route.params;
  const [refresing, setRefresing] = useState(false);
  const [configDetail, setConfigDetail] = useState(config);

  const fetchDetail = useCallback(async () => {
    setRefresing(true);
    if (!config.id) {
      return;
    }
    const { success, data } = await axiosGet(
      API.HEALTH_CONFIG.DETAIL(config.id)
    );
    if (success) {
      setConfigDetail(data);
    }
    setRefresing(false);
  }, [config.id, setConfigDetail]);

  const onRefresh = useCallback(() => {
    fetchDetail();
  }, [fetchDetail]);

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused, onRefresh]);

  const listMenuMoreItem = useMemo(
    () => [
      {
        text: t('report_logs'),
        route: null,
      },
      {
        text: t('connect_devices'),
        route: null,
      },
    ],
    []
  );

  const listMenuActionItem = useMemo(
    () => [
      {
        text: t('manual_input'),
        icon: <Icon name="export" color={Colors.Primary} size={32} />,
        route: Routes.ManualInput,
        data: { config: configDetail },
      },
      {
        text: t('connect_devices'),
        icon: <BlueTooth />,
        route: null,
      },
    ],
    [configDetail]
  );

  const onMenuItemClick = useCallback(
    (item) => {
      if (item.route) {
        navigate(item.route, item.data);
      } else {
        Alert.alert(t('feature_under_development'));
      }
    },
    [navigate]
  );

  const {
    childRef: refMenuMore,
    showingPopover: showingMenuMore,
    showPopoverWithRef: showMenuMoreWithRef,
    hidePopover: hideMenuMore,
  } = usePopover();
  const refButtonMenuMore = useRef();
  const showPopover = () => showMenuMoreWithRef(refButtonMenuMore);

  const {
    childRef: refMenuAction,
    showingPopover: showingMenuAction,
    showPopoverWithRef: showMenuActionWithRef,
    hidePopover: hideMenuAction,
  } = usePopover();
  const refButtonMenuAction = useRef();
  const showMenuAction = () => showMenuActionWithRef(refButtonMenuAction);

  const headerRight = useMemo(
    () => (
      <View style={styles.headerRight}>
        <TouchableOpacity>
          <Icon name={'plus'} size={27} color={Colors.Black} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonMore}
          ref={refButtonMenuMore}
          onPress={showPopover}
        >
          <Icon name={'more'} size={27} color={Colors.Black} />
        </TouchableOpacity>
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderMenuActionItem = useCallback(
    (item) => (
      <View style={styles.menuItem}>
        {item.icon}
        <Text type="H4" style={styles.menuItemText}>
          {item.text}
        </Text>
      </View>
    ),
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
        isVisible={showingMenuMore}
        hideMore={hideMenuMore}
        listMenuItem={listMenuMoreItem}
        childRef={refMenuMore}
        onItemClick={onMenuItemClick}
        wrapStyle={styles.menuMore}
        isTextCenter={false}
      />
      <FloatingActionButton
        ref={refButtonMenuAction}
        icon={showingMenuAction ? 'close' : 'plus'}
        onPress={showingMenuAction ? hideMenuAction : showMenuAction}
      />
      <MenuAction
        mode="tooltip"
        isVisible={showingMenuAction}
        childRef={refMenuAction}
        listMenuItem={listMenuActionItem}
        onItemClick={onMenuItemClick}
        renderItem={renderMenuActionItem}
        hideMenuAction={hideMenuAction}
        wrapStyle={styles.menuAction}
      />
    </View>
  );
});

export default HealthConfigDetail;
