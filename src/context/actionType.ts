const AuthAction = {
  UPDATE_AUTH: 'UPDATE_AUTH',
};

const AppAction = {
  CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
  SET_LOADING: 'SET_LOADING',
  EXIT_APP: 'EXIT_APP',
};
const DashboardAction = {
  SET_HEALTH_CONFIGS: 'SET_HEALTH_CONFIGS',
};

export const Actions = {
  ...AuthAction,
  ...AppAction,
  ...DashboardAction,
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

export type HealthConfig = {
  id: number;
  name: string;
  unit: string;
  value: number;
  color: string;
  text: string;
  advices: Array<string>;
  min: number;
  max: number;
  average: any;
};
