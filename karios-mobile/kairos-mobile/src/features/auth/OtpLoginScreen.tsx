import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authApi } from '../../api/services';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../store/authStore';
import type { OtpAuthIntent, OtpChannel } from '../../api/types';
import type { AuthStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'OtpLogin'>;

export function OtpLoginScreen({ navigation, route }: Props) {
  const channel: OtpChannel = route.params?.channel ?? 'email';
  const mode: OtpAuthIntent = route.params.mode;
  const [target, setTarget] = useState('');
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const setSession = useAuthStore(s => s.setSession);

  useEffect(() => {
    setTarget('');
    setCode('');
    setCooldown(0);
  }, [mode, channel]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const sendOtp = async () => {
    if (!target.trim()) {
      Alert.alert('提示', channel === 'email' ? '请输入邮箱' : '请输入手机号');
      return;
    }
    try {
      setLoading(true);
      await authApi.sendOtp(channel, target.trim(), mode);
      setCooldown(60);
      Alert.alert('验证码已发送', '开发环境请使用 123456');
    } catch (e) {
      Alert.alert('发送失败', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (!target.trim() || !code.trim()) {
      Alert.alert('提示', '请填写完整信息');
      return;
    }
    try {
      setLoading(true);
      const tokens = await authApi.verifyOtp(channel, target.trim(), code.trim(), mode);
      await setSession(tokens.accessToken, tokens.refreshToken, tokens.user);
      if (tokens.user.profileStatus === 'incomplete') {
        navigation.replace('ProfileSetup');
      }
    } catch (e) {
      Alert.alert(mode === 'register' ? '注册失败' : '登录失败', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={
          mode === 'register'
            ? channel === 'email'
              ? '邮箱注册'
              : '手机注册'
            : channel === 'email'
              ? '邮箱登录'
              : '手机登录'
        }
        onBack={() => navigation.goBack()}
      />
      <View style={styles.body}>
        <Input
          label={channel === 'email' ? '邮箱地址' : '手机号码'}
          placeholder={channel === 'email' ? 'name@example.com' : '13800138000'}
          value={target}
          onChangeText={setTarget}
          keyboardType={channel === 'email' ? 'email-address' : 'phone-pad'}
          autoCapitalize="none"
        />
        <Input
          label="验证码"
          placeholder="请输入验证码"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
        />
        <Button
          title={cooldown > 0 ? `${cooldown}s 后重发` : '获取验证码'}
          variant="secondary"
          disabled={cooldown > 0}
          loading={loading}
          onPress={sendOtp}
        />
        <Button
          title={mode === 'register' ? '完成注册' : '登录'}
          style={styles.loginBtn}
          loading={loading}
          onPress={verify}
        />
        <Text style={styles.hint}>开发环境验证码：123456</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('OtpLogin', {
              channel,
              mode: mode === 'login' ? 'register' : 'login',
            })
          }
          style={styles.switchRow}>
          <Text style={styles.switchText}>
            {mode === 'login' ? '没有账号？去注册' : '已有账号？去登录'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.lg },
  loginBtn: { marginTop: 16 },
  hint: { marginTop: 16, fontSize: 12, color: colors.textMuted, textAlign: 'center' },
  switchRow: { marginTop: 20, alignItems: 'center' },
  switchText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
});
