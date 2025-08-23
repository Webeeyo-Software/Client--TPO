import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

function getLocalIpFromExpoUrl(): string | null {
  const debuggerHost =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoGo?.debuggerHost ||
    Constants.manifest?.debuggerHost;

  if (!debuggerHost) return null;

  const ip = debuggerHost.split(':')[0];
  return ip;
}

const localIp = getLocalIpFromExpoUrl();
export const API_BASE_URL = localIp ? `http://${localIp}:3000` : 'http://localhost:3000';
