import React, { memo, useCallback, useMemo, useState } from 'react';
import CheckBox from './CheckBox';
import { t } from 'i18n-js';

const GroupCheckBox = memo(({ data, onSelect, multiple }) => {
  const [selectIndexes, setSelectIndexes] = useState([]);

  const _onSelect = useCallback(
    (index) => {
      const foundIndex = selectIndexes.indexOf(index);
      let newValue;
      if (foundIndex === -1) {
        if (multiple) {
          newValue = [...selectIndexes, index];
          setSelectIndexes(newValue);
        } else {
          newValue = [index];
          setSelectIndexes([index]);
        }
      } else {
        selectIndexes.splice(foundIndex, 1);
        newValue = [...selectIndexes];
      }
      if (multiple) {
        onSelect && onSelect(newValue.map((i) => data[i]));
      } else {
        onSelect && onSelect(data[index]);
      }

      setSelectIndexes(newValue);
    },
    [onSelect, data, multiple, selectIndexes]
  );

  const isAllSelected = useMemo(() => {
    return selectIndexes.length === data.length;
  }, [data.length, selectIndexes.length]);

  const onSelectAll = useCallback(() => {
    if (isAllSelected) {
      setSelectIndexes([]);
      return;
    }
    setSelectIndexes(data.map((_, index) => index));
  }, [data, isAllSelected]);

  return (
    <React.Fragment>
      <CheckBox
        title={t('select_all')}
        select={isAllSelected}
        onSelect={onSelectAll}
      />
      {data.map((item, index) => {
        const select = selectIndexes.indexOf(index) !== -1;
        return (
          <CheckBox
            key={index.toString()}
            title={item.title}
            index={index}
            onSelect={_onSelect}
            select={select}
            source={item.source}
            description={item.description}
          />
        );
      })}
    </React.Fragment>
  );
});

export default GroupCheckBox;
