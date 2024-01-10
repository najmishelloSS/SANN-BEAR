import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ktdi_App',
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
