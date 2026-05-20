import { Platform } from 'react-native';

// iOS 模拟器访问本机后端用 127.0.0.1；真机需改为电脑局域网 IP
export const API_BASE_URL =
  Platform.OS === 'ios'
    ? 'http://127.0.0.1:8080/api/v1'
    : 'http://10.0.2.2:8080/api/v1';

export const USE_MOCK_API = true;
