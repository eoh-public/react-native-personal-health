import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import TextInput from '../../commons/Form/TextInput';
import { Colors } from '../../configs';
import styles from './styles/searchBarStyles';

const SearchBar = ({ search, setSearch }) => {
  return (
    <View style={styles.wrap}>
      <TextInput
        value={search}
        onChange={setSearch}
        placeholder={t('search_bar_placeholder')}
        wrapStyle={styles.wrapTextInput}
        textInputStyle={styles.textInput}
      />
      <TouchableOpacity style={styles.wrapIcon}>
        <IconOutline name="search" size={27} color={Colors.Gray7} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
