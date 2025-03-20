import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.example.nebulajamstream',
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
