import { initData } from '../utils/InitData';
import { Actions, ActionType, AuthData, Language } from './actionType';

export type ContextData = {
  auth: AuthData;

  app: {
    language: Language;
    loading: boolean;
    exitApp: boolean;
  };
};

export type Action = {
  type: ActionType;
  payload: any;
};

export const initialState: ContextData = {
  auth: {
    account: {
      token: '',
      user: {},
    },
  },

  app: {
    language: 'en' as Language,
    loading: false,
    exitApp: false,
  },
};

export const reducer = (
  currentState: ContextData,
  action: Action
): ContextData => {
  const { type, payload } = action;
  switch (type) {
    case Actions.UPDATE_AUTH:
      initData((payload as AuthData).account);
      return { ...currentState, auth: payload };

    case Actions.CHANGE_LANGUAGE:
      return {
        ...currentState,
        app: { ...currentState.app, language: payload },
      };
    case Actions.SET_LOADING:
      return {
        ...currentState,
        app: { ...currentState.app, loading: payload },
      };
    case Actions.EXIT_APP:
      return {
        ...currentState,
        app: { ...currentState.app, exitApp: payload },
      };
    default:
      return currentState;
  }
};
