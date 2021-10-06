const AuthAction = {
  UPDATE_AUTH: 'UPDATE_AUTH',
};

const AppAction = {
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  SET_LOADING: 'SET_LOADING',
  EXIT_APP: 'EXIT_APP',
};

export const Actions = {
  ...AuthAction,
  ...AppAction,
};

export type AuthData = {
  account: {
    token: string;
    user: any;
  };
};
export type Language = 'en' | 'vi';

export type ActionType = keyof typeof Actions;

export type ActionDataMap = {
  UPDATE_AUTH: AuthData;

  CHANGE_LANGUAGE: Language;
  SET_LOADING: boolean;
  EXIT_APP: boolean;
};
