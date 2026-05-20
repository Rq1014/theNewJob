import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authApi } from '../../api/services';

let appleAuth: {
  isSupported: boolean;
  Operation: { LOGIN: number };
  Scope: { EMAIL: number; FULL_NAME: number };
  performRequest: (opts: unknown) => Promise<{
    identityToken: string | null;
    authorizationCode: string | null;
  }>;
} | null = null;
try {
  appleAuth = require('@invertase/react-native-apple-authentication').default;
} catch {
  appleAuth = null;
}
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { colors, spacing } from '../../theme';
import type { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'AuthWelcome'>;

export function AuthWelcomeScreen({ navigation }: Props) {
  const setSession = useAuthStore(s => s.setSession);

  const handleApple = async () => {
    try {
      if (Platform.OS === 'ios' && appleAuth?.isSupported) {
        const res = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        const tokens = await authApi.loginApple(
          res.identityToken!,
          res.authorizationCode ?? undefined,
        );
        await setSession(tokens.accessToken, tokens.refreshToken, tokens.user);
        if (tokens.user.profileStatus === 'incomplete') {
          navigation.replace('ProfileSetup');
        }
      } else {
        const tokens = await authApi.loginApple('mock-token');
        await setSession(tokens.accessToken, tokens.refreshToken, tokens.user);
        navigation.replace('ProfileSetup');
      }
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>Kairos</Text>
        <Text style={styles.subtitle}>在日留学生社区</Text>
        <Text style={styles.desc}>分享留学、求职与生活经验</Text>
        <Text style={styles.flowHint}>新用户请先注册，再使用邮箱或手机号登录</Text>
      </View>
      <View style={styles.actions}>
        <Text style={styles.sectionLabel}>注册</Text>
        <Button
          title="邮箱注册"
          onPress={() => navigation.navigate('OtpLogin', { channel: 'email', mode: 'register' })}
        />
        <Button
          title="手机号注册"
          variant="secondary"
          style={styles.gap}
          onPress={() => navigation.navigate('OtpLogin', { channel: 'phone', mode: 'register' })}
        />
        <Text style={[styles.sectionLabel, styles.sectionSpacer]}>登录</Text>
        <Button
          title="邮箱登录"
          variant="secondary"
          onPress={() => navigation.navigate('OtpLogin', { channel: 'email', mode: 'login' })}
        />
        <Button
          title="手机号登录"
          variant="secondary"
          style={styles.gap}
          onPress={() => navigation.navigate('OtpLogin', { channel: 'phone', mode: 'login' })}
        />
        {Platform.OS === 'ios' ? (
          <>
            <Text style={[styles.sectionLabel, styles.sectionSpacer]}>其他方式</Text>
            <Button
              title="通过 Apple 登录"
              variant="secondary"
              onPress={handleApple}
            />
            <Text style={styles.appleHint}>首次使用将创建账号</Text>
          </>
        ) : null}
        <View style={styles.wechatRow}>
          <Text style={styles.wechatText}>微信登录（即将上线）</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: 48,
  },
  hero: { marginTop: 80, alignItems: 'center' },
  logo: { fontSize: 40, fontWeight: '700', color: colors.primary },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 8,
  },
  desc: { fontSize: 14, color: colors.textSecondary, marginTop: 8 },
  flowHint: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 14,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    lineHeight: 20,
  },
  actions: { width: '100%' },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  sectionSpacer: { marginTop: 20 },
  gap: { marginTop: 12 },
  appleHint: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
  wechatRow: { marginTop: 24, alignItems: 'center' },
  wechatText: { fontSize: 13, color: colors.textMuted },
});
