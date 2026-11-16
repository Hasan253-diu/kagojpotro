import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kagojpotro.app',
  appName: 'কাগজপত্র',
  webDir: 'out',
  server: {
    // For local network / Android testing, point to laptop local IP or hostname:
    // androidScheme: 'http',
    // url: 'http://192.168.0.100:3000',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
