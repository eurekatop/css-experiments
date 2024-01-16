import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.mutitu.app',
  appName: 'mutiitu',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
