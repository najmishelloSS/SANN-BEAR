import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ktdi.app',
  appName: 'KTDI Community',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  "plugins": {
    "StripePlugin": {
      "packageName": "com.getcapacitor.community.stripe.StripePlugin"
    }
  }
};

export default config;
