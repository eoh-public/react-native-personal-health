const PHDefaultConfig = {
  apiRoot: 'https://backend.eoh.io/api',
  googleMapApiKey: 'AIzaSyCF1Q-WFXCnfAHhOeXRF9WK7eT-TtxO9ss',
  stripePublishKey:
    'pk_test_51H2eNHDKEhTHCCCWkF3ZIL8bAd6J1DFNEUU9fuZgolNrbLP5lYVTb5DfWoiGLOI21dI0TZNQ7L2BkBVSKpZqyje100DN1MTlAO',
  pusherAppKey: '6e493d00ec2aa6b5276d',
  pusherAppCluster: 'ap1',
  iparamedApiToken: '5d073f2d2090532304540a241ceca5967144b879',
  maxSeconds: 900,
};

export class PHConfig {
  static apiRoot = PHDefaultConfig.apiRoot;
  static googleMapApiKey = PHDefaultConfig.googleMapApiKey;
  static stripePublishKey = PHDefaultConfig.stripePublishKey;
  static pusherAppKey = PHDefaultConfig.pusherAppKey;
  static pusherAppCluster = PHDefaultConfig.pusherAppCluster;
  static iparamedApiToken = PHDefaultConfig.iparamedApiToken;
  static maxSeconds = PHDefaultConfig.maxSeconds;
}

export const initPHConfig = (config) => {
  PHConfig.apiRoot = config.apiRoot ?? PHDefaultConfig.apiRoot;
  PHConfig.googleMapApiKey =
    config.googleMapApiKey ?? PHDefaultConfig.googleMapApiKey;
  PHConfig.stripePublishKey =
    config.stripePublishKey ?? PHDefaultConfig.stripePublishKey;
  PHConfig.pusherAppKey = config.pusherAppKey ?? PHDefaultConfig.pusherAppKey;
  PHConfig.pusherAppCluster =
    config.pusherAppCluster ?? PHDefaultConfig.pusherAppCluster;
  PHConfig.iparamedApiToken =
    config.iparamedApiToken ?? PHDefaultConfig.iparamedApiToken;
  PHConfig.maxSeconds = config.maxSeconds ?? PHDefaultConfig.maxSeconds;
};
