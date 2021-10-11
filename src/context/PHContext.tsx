import React, { useContext, useReducer } from 'react';
import { useCallback } from 'react';

import { setLocale as setI18nLocale } from '../utils/I18n';
import { ActionDataMap, ActionType, AuthData, Language } from './actionType';
import { initialState, Action, ContextData, reducer } from './reducer';

type PHContextType = {
  stateData: ContextData;
  setAuth: (authData: AuthData) => void;
  setLocale: (language: Language) => void;
  setAction: <T extends ActionType>(
    action: T,
    payload?: ActionDataMap[T]
  ) => void;
};

export const PHContext = React.createContext<PHContextType>(
  {} as PHContextType
);
type Reducer<StateData, Action> = (
  state: StateData,
  action: Action
) => StateData;

export const PHProvider = ({ children, initState = initialState }) => {
  const [stateData, dispatch] = useReducer<Reducer<ContextData, Action>>(
    reducer,
    initState
  );

  const setAuth = (authData: AuthData) => {
    setAction('UPDATE_AUTH', authData);
  };

  const setLocale = (language: Language) => {
    setI18nLocale(language);
    setAction('CHANGE_LANGUAGE', language);
  };

  const setAction = useCallback(
    <T extends ActionType>(action: T, payload?: ActionDataMap[T]) => {
      dispatch({ type: action, payload: payload });
    },
    []
  );

  const listAction = { setAction, setAuth, setLocale };

  const providerValue = { stateData, ...listAction };

  return (
    <PHContext.Provider value={providerValue}>{children}</PHContext.Provider>
  );
};

export const usePHSelector = (
  selector: (contextData: ContextData) => unknown
) => {
  const { stateData } = useContext(PHContext);
  return selector(stateData);
};
