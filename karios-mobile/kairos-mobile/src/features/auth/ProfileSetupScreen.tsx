import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { userApi } from '../../api/services';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useAuthStore } from '../../store/authStore';
import { CITIES, USER_TYPES } from '../../api/types';
import type { AuthStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'ProfileSetup'>;

export function ProfileSetupScreen(_props: Props) {
  const setUser = useAuthStore(s => s.setUser);
  const [nickname, setNickname] = useState('');
  const [university, setUniversity] = useState('');
  const [city, setCity] = useState('tokyo');
  const [userType, setUserType] = useState('graduate_student');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!nickname.trim() || !university.trim()) {
      Alert.alert('提示', '请填写昵称和学校');
      return;
    }
    try {
      setLoading(true);
      const user = await userApi.updateMe({
        nickname: nickname.trim(),
        university: university.trim(),
        city,
        userType,
        profileStatus: 'complete',
      });
      setUser(user);
    } catch (e) {
      Alert.alert('保存失败', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="完善资料" />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>欢迎加入 Kairos</Text>
          <Text style={styles.bannerDesc}>
            完善资料可获得更精准的同城与同校推荐
          </Text>
        </View>
        <Input label="昵称 *" value={nickname} onChangeText={setNickname} placeholder="你的昵称" />
        <Input label="学校 *" value={university} onChangeText={setUniversity} placeholder="例如：东京大学" />
        <Text style={styles.sectionLabel}>常驻城市</Text>
        <View style={styles.chips}>
          {CITIES.map(c => (
            <Pressable
              key={c.id}
              style={[styles.chip, city === c.id && styles.chipActive]}
              onPress={() => setCity(c.id)}>
              <Text style={[styles.chipText, city === c.id && styles.chipTextActive]}>
                {c.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.sectionLabel}>身份</Text>
        <View style={styles.chips}>
          {USER_TYPES.map(t => (
            <Pressable
              key={t.id}
              style={[styles.chip, userType === t.id && styles.chipActive]}
              onPress={() => setUserType(t.id)}>
              <Text style={[styles.chipText, userType === t.id && styles.chipTextActive]}>
                {t.label}
              </Text>
            </Pressable>
          ))}
        </View>
        <Button title="完成" loading={loading} onPress={submit} style={styles.submit} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.lg, paddingBottom: 40 },
  banner: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  bannerTitle: { fontSize: 20, fontWeight: '700', color: colors.white },
  bannerDesc: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 8 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 14, color: colors.textSecondary },
  chipTextActive: { color: colors.white },
  submit: { marginTop: 8 },
});
