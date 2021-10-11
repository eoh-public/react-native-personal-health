import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

import { usePHSelector } from '../../context';

const useTitleHeader = (keyTitle) => {
  const { setOptions } = useNavigation();
  const language = usePHSelector((state) => state.app.language);
  useLayoutEffect(() => {
    setOptions({
      title: keyTitle,
    });
  }, [keyTitle, language, setOptions]);
};
export default useTitleHeader;
