import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  appId: 'io.ionic.starter',
  appName: 'RegistrApp',
  webDir: 'www',
  server: {

    androidScheme: 'https',
    cleartext: true,
  }
};

export default config;
