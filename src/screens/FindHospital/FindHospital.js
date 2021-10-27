import React, { memo, useState, useEffect, useCallback } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';

import Text from '../../commons/Text';
import SearchBar from './SearchBar';
import HospitalItem from './HospitalItem';

import styles from './styles/findHospitalStyles';
import { Colors } from '../../configs';
import keyExtractor from '../../utils/keyExtrator';
import Marker from '../../../assets/images/Common/marker.svg';
import useHospitals from './hooks';

const FindHospital = memo(() => {
  const [search, setSearch] = useState('');
  const { hospitals, refreshing, onRefresh } = useHospitals();

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const renderItem = useCallback(
    ({ item }) => <HospitalItem item={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Marker />
        <Text
          type="Label"
          color={Colors.Gray9}
          style={styles.currentLocation}
          bold
        >
          {'Quận Bình Thạnh, TP.HCM'}
        </Text>
      </View>
      <View style={styles.row}>
        <SearchBar search={search} setSearch={setSearch} />
        <TouchableOpacity style={styles.buttonFilter}>
          <IconOutline name="filter" color={Colors.Primary} size={27} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={hospitals}
        extraData={hospitals}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
});

export default FindHospital;
