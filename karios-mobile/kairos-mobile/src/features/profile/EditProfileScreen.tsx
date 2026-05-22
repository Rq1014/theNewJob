import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { userApi } from '../../api/services';
import { useAuthStore } from '../../store/authStore';
import type { ProfileStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'EditProfile'>;

const LOCATIONS = ['东京', '大阪', '京都', '横滨', '名古屋', '福冈'];

const CITY_MAP: Record<string, string> = {
  东京: 'tokyo',
  大阪: 'osaka',
  京都: 'kyoto',
  横滨: 'yokohama',
  名古屋: 'nagoya',
  福冈: 'fukuoka',
};

const CITY_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(CITY_MAP).map(([k, v]) => [v, k]),
);

export function EditProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const setUser = useAuthStore(s => s.setUser);
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [university, setUniversity] = useState('');
  const [location, setLocation] = useState('东京');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userApi.getMe().then(u => {
      setNickname(u.nickname || '');
      setBio(u.bio || '');
      setUniversity(u.university || '');
      setLocation(u.city ? (CITY_REVERSE[u.city] ?? '东京') : '东京');
      setInterests(u.interests || '');
    });
  }, []);

  const save = async () => {
    try {
      setLoading(true);
      const user = await userApi.updateProfile({
        nickname: nickname.trim(),
        bio: bio.trim(),
        interests: interests.trim(),
        city: CITY_MAP[location] ?? 'tokyo',
      });
      setUser(user);
      navigation.goBack();
    } catch (e) {
      Alert.alert('保存失败', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>编辑资料</Text>
        <Pressable onPress={save} disabled={loading} hitSlop={12}>
          <Text style={[styles.save, loading && styles.saveDisabled]}>保存</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{(nickname || '?')[0]}</Text>
            </View>
            <Pressable style={styles.cameraBtn}>
              <Text style={styles.cameraIcon}>📷</Text>
            </Pressable>
          </View>
          <Text style={styles.avatarHint}>点击更换头像</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>昵称</Text>
          <TextInput style={styles.input} value={nickname} onChangeText={setNickname} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>个性签名</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bio}
            onChangeText={setBio}
            multiline
            maxLength={100}
          />
          <Text style={styles.counter}>{bio.length}/100字</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>学校</Text>
          <TextInput
            style={[styles.input, styles.inputDisabled]}
            value={university}
            editable={false}
          />
          <Text style={styles.hint}>学校信息不可修改</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>常驻地区</Text>
          <View style={styles.locationRow}>
            {LOCATIONS.map(loc => (
              <Pressable
                key={loc}
                style={[styles.locChip, location === loc && styles.locChipActive]}
                onPress={() => setLocation(loc)}>
                <Text
                  style={[styles.locChipText, location === loc && styles.locChipTextActive]}>
                  {loc}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>兴趣爱好</Text>
          <TextInput
            style={styles.input}
            value={interests}
            onChangeText={setInterests}
            placeholder="用逗号分隔，例如：探店, 摄影, 日语学习"
            placeholderTextColor={colors.textMuted}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  back: { fontSize: 22, color: colors.textPrimary, width: 40 },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  save: { fontSize: 16, fontWeight: '600', color: colors.primary, width: 40, textAlign: 'right' },
  saveDisabled: { opacity: 0.5 },
  body: { padding: spacing.md, paddingBottom: spacing.xl },
  avatarSection: { alignItems: 'center', marginVertical: spacing.lg },
  avatarWrap: { position: 'relative' },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.white,
  },
  avatarText: { fontSize: 32, fontWeight: '700', color: colors.white },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  cameraIcon: { fontSize: 14 },
  avatarHint: { marginTop: 8, fontSize: 12, color: colors.textMuted },
  field: { marginBottom: spacing.md },
  label: { fontSize: 14, fontWeight: '500', color: colors.textPrimary, marginBottom: 8 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
  },
  inputDisabled: { backgroundColor: '#F1F5F9', color: colors.textMuted },
  textArea: { height: 88, textAlignVertical: 'top' },
  counter: { fontSize: 12, color: colors.textMuted, marginTop: 4, textAlign: 'right' },
  hint: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  locationRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  locChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  locChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  locChipText: { fontSize: 14, color: colors.textSecondary },
  locChipTextActive: { color: colors.white, fontWeight: '500' },
});
