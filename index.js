import React from 'react';
import { PHProvider } from './src/context';
import App from './src/navigations';

const PersonalHealth = (props) => {
  return (
    <PHProvider>
      <App {...props} />
    </PHProvider>
  );
};

export default PersonalHealth;

export { initPHConfig } from './src/configs';
