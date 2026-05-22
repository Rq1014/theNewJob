import { Platform } from 'react-native';

/** 登录请求附带的设备信息（与后端 TRD 字段对齐） */
export function authDeviceContext() {
  return {
    platform: Platform.OS === 'ios' ? 'ios' : 'android',
    deviceId: `${Platform.OS}-kairos-mobile`,
    deviceName: Platform.OS === 'ios' ? 'iOS' : 'Android',
  };
}
