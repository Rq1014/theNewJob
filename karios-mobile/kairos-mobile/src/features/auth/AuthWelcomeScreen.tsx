import React, { useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authApi } from '../../api/services';
import { OtherLoginSheet } from '../../components/auth/OtherLoginSheet';
import { TermsAgreementRow } from '../../components/auth/TermsAgreementRow';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { colors, spacing } from '../../theme';
import type { AuthStackParamList } from '../../navigation/types';

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

type Props = NativeStackScreenProps<AuthStackParamList, 'AuthWelcome'>;

export function AuthWelcomeScreen({ navigation }: Props) {
  const setSession = useAuthStore(s => s.setSession);
  const [agreed, setAgreed] = useState(false);
  const [otherLoginOpen, setOtherLoginOpen] = useState(false);

  const requireAgreement = () => {
    if (agreed) return true;
    Alert.alert('提示', '请先阅读并同意用户协议与隐私政策');
    return false;
  };

  const goOtp = (channel: 'email' | 'phone') => {
    if (!requireAgreement()) return;
    navigation.navigate('OtpLogin', { channel });
  };

  const openOtherLogin = () => {
    if (!requireAgreement()) return;
    setOtherLoginOpen(true);
  };

  const handleApple = async () => {
    if (!requireAgreement()) return;
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

  const showApple = Platform.OS === 'ios';

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>Kairos</Text>
        <Text style={styles.subtitle}>在日留学生社区</Text>
        <Text style={styles.desc}>分享留学、求职与生活经验</Text>
      </View>
      <View style={styles.actions}>
        <Button title="手机号登录" onPress={() => goOtp('phone')} />
        {showApple ? (
          <Button
            title="通过 Apple 登录"
            variant="secondary"
            style={styles.gap}
            onPress={handleApple}
          />
        ) : null}
        <Pressable style={[styles.otherBtn, !showApple && styles.gap]} onPress={openOtherLogin}>
          <Text style={styles.otherBtnText}>其他登录方式</Text>
        </Pressable>
        <View style={styles.termsWrap}>
          <TermsAgreementRow
            checked={agreed}
            onToggle={() => setAgreed(v => !v)}
            onPressTerms={() => navigation.navigate('LegalDocument', { doc: 'terms' })}
            onPressPrivacy={() => navigation.navigate('LegalDocument', { doc: 'privacy' })}
          />
        </View>
        <View style={styles.wechatRow}>
          <Text style={styles.wechatText}>微信登录（即将上线）</Text>
        </View>
      </View>

      <OtherLoginSheet
        visible={otherLoginOpen}
        onClose={() => setOtherLoginOpen(false)}
        onEmailLogin={() => goOtp('email')}
      />
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
  actions: { width: '100%' },
  gap: { marginTop: 12 },
  otherBtn: {
    marginTop: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherBtnText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
  termsWrap: { marginTop: 20 },
  wechatRow: { marginTop: 20, alignItems: 'center' },
  wechatText: { fontSize: 13, color: colors.textMuted },
});
