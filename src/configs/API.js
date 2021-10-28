import { PHConfig } from './index';

const API = {
  ACCOUNTS: {
    ADD_CARD: () => PHConfig.apiRoot + '/billing/payments/stripe/add_card/',
    REMOVE_CARD: (id) =>
      PHConfig.apiRoot + `/billing/payments/stripe/remove_cards/${id}/`,
    CHANGE_DEFAULT_CARD: () =>
      PHConfig.apiRoot + '/billing/payments/stripe/set_default/',
    LIST_PAYMENT_METHODS: () =>
      PHConfig.apiRoot + '/billing/list_payment_methods/',
    CREATE_CARD_TOKEN: 'https://api.stripe.com/v1/tokens',
  },
  EXTERNAL: {
    GOOGLE_MAP: {
      AUTO_COMPLETE:
        'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      GET_LAT_LNG_BY_PLACE_ID:
        'https://maps.googleapis.com/maps/api/place/details/json',
    },
  },
  HEALTH_CONFIG: {
    LIST: () => PHConfig.apiRoot + '/personal_health/health_configs/',
    CREATE_HEALTH_CHIP: () =>
      PHConfig.apiRoot + '/personal_health/health_configs/create_health_chip/',
    DETAIL: (id) => PHConfig.apiRoot + `/personal_health/health_configs/${id}/`,
    HISTORY: (id) =>
      PHConfig.apiRoot + `/personal_health/health_configs/${id}/history/`,
    INPUT_VALUE: (id) =>
      PHConfig.apiRoot + `/personal_health/health_configs/${id}/input_value/`,
  },
  REMINDER: {
    ACTIVE_REMINDERS: () =>
      PHConfig.apiRoot + '/personal_health/reminders/active_reminders/',
    LIST: () => PHConfig.apiRoot + '/personal_health/reminders/',
  },
  HOSPITAL: {
    LIST: () => 'https://api-stag.iparamed.com/hospitals/',
  },
  BILLING: {
    LIST_PAYMENT_METHODS_BY_COUNTRY: (code) =>
      PHConfig.apiRoot + `/billing/list-methods/${code}/`,
    PAYMENT: {
      STRIPE: {
        PROCESS: (id) =>
          PHConfig.apiRoot + `/billing/payments/stripe/process/${id}/`,
        ADD_CARD: () => PHConfig.apiRoot + '/billing/payments/stripe/add_card/',
        CREATE_PAYMENT_INTENT: (id) =>
          PHConfig.apiRoot +
          `/billing/payments/stripe/sca/create-payment/${id}/`,
        PAYMENT_INTENT_SUCCESS: (intent_id) =>
          PHConfig.apiRoot +
          `/billing/payments/stripe/sca/payment_success/${intent_id}/`,
      },
    },
    DEFAULT_PAYMENT_METHODS: () =>
      PHConfig.apiRoot + '/billing/default_payment_method/',
  },
  NOTIFICATION: {
    REGISTER_SIGNAL_ID: () =>
      PHConfig.apiRoot + '/accounts/register-signal-id/',
    LIST_ALL_NOTIFICATIONS: (page, type) =>
      PHConfig.apiRoot +
      `/notifications/notifications/?page=${page}&type=${type}`,
    SET_READ: (id) =>
      PHConfig.apiRoot + `/notifications/notifications/${id}/set_read/`,
    SET_LAST_SEEN: () =>
      PHConfig.apiRoot + '/notifications/notifications/set_last_seen/',
    NUMBER: () => PHConfig.apiRoot + '/notifications/notifications/number/',
  },
  PUSHER: {
    AUTH: () => PHConfig.apiRoot + '/smart_parking/pusher/auth/',
  },
};

export default API;
