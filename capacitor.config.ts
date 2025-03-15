
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9ca681eb95ac4c62bc4309273a89bc5e',
  appName: 'Nebula Jam Stream',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    allowNavigation: ['*'],
    cleartext: true
  },
  android: {
    backgroundColor: "#1A1F2C",
    allowMixedContent: true
  },
  ios: {
    backgroundColor: "#1A1F2C",
    contentInset: "always",
    statusBarStyle: "dark"
  }
};

export default config;
