import { Platform } from 'react-native';

/**
 * 本机后端地址。
 * - iOS 模拟器：127.0.0.1
 * - Android 模拟器：10.0.2.2（指向宿主机）
 * - 真机：改为电脑局域网 IP，例如 192.168.1.100
 */
const DEV_HOST = '127.0.0.1';

function resolveDevHost(): string {
  if (Platform.OS === 'android' && DEV_HOST === '127.0.0.1') {
    return '10.0.2.2';
  }
  return DEV_HOST;
}

export const API_BASE_URL = `http://${resolveDevHost()}:8080/api/v1`;

/** 登录、用户资料、协议版本等对接 karios-service-api */
export const USE_REAL_AUTH_API = true;

/** 帖子、草稿、搜索等后端尚未实现，继续走本地 Mock */
export const USE_MOCK_CONTENT_API = true;

/** 与后端 application.yml kairos.legal 保持一致，启动时可被 /legal/terms 覆盖 */
export let TERMS_VERSION = '2026-05-01';
export let PRIVACY_VERSION = '2026-05-01';

export function setLegalVersions(terms: string, privacy: string) {
  TERMS_VERSION = terms;
  PRIVACY_VERSION = privacy;
}
