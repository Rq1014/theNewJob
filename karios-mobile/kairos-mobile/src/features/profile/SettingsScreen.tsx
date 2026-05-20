import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { authApi } from '../../api/services';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useAuthStore } from '../../store/authStore';
import type { ProfileStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

const SETTINGS_SECTIONS = [
  {
    title: '资料与认证',
    items: [
      {
        id: 'email',
        icon: '✉️',
        label: '大学邮箱认证',
        description: '已认证 zhang@g.ecc.u-tokyo.ac.jp',
        verified: true,
      },
      {
        id: 'school',
        icon: '🛡',
        label: '学校认证',
        description: '已完成学校身份认证',
        verified: true,
      },
      {
        id: 'profile',
        icon: '👤',
        label: '完善个人资料',
        description: '资料完整度 75%，补充更多信息',
        verified: false,
      },
    ],
  },
  {
    title: '账号设置',
    items: [
      { id: 'account', icon: '🔐', label: '账号管理', description: '修改邮箱、密码' },
      { id: 'notifications', icon: '🔔', label: '消息通知', description: '管理通知偏好' },
      { id: 'privacy', icon: '🔒', label: '隐私设置', description: '谁可以看到我的信息' },
    ],
  },
  {
    title: '帮助与支持',
    items: [
      { id: 'help', icon: '❓', label: '帮助中心', description: '常见问题解答' },
      { id: 'feedback', icon: '📝', label: '意见反馈', description: '向我们反馈问题' },
    ],
  },
];

export function SettingsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { refreshToken, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('退出登录', '确定要退出吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '退出',
        style: 'destructive',
        onPress: async () => {
          if (refreshToken) {
            try {
              await authApi.logout(refreshToken);
            } catch {
              /* ignore */
            }
          }
          await logout();
        },
      },
    ]);
  };

  const onItemPress = (id: string) => {
    if (id === 'profile') {
      navigation.navigate('EditProfile');
      return;
    }
    Alert.alert('提示', '该设置项即将上线');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScreenHeader title="设置" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {SETTINGS_SECTIONS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map(item => (
              <Pressable
                key={item.id}
                style={styles.row}
                onPress={() => onItemPress(item.id)}>
                <View
                  style={[
                    styles.rowIcon,
                    'verified' in item && item.verified ? styles.rowIconVerified : null,
                  ]}>
                  <Text style={styles.rowIconText}>{item.icon}</Text>
                </View>
                <View style={styles.rowBody}>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <Text style={styles.rowDesc} numberOfLines={1}>
                    {item.description}
                  </Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            ))}
          </View>
        ))}

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutIcon}>⎋</Text>
          <Text style={styles.logoutText}>退出登录</Text>
        </Pressable>
        <Text style={styles.version}>当前版本 v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  section: { marginBottom: spacing.md },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: spacing.sm,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.sm + 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowIconVerified: { backgroundColor: '#DCFCE7' },
  rowIconText: { fontSize: 18 },
  rowBody: { flex: 1 },
  rowLabel: { fontSize: 15, fontWeight: '500', color: colors.textPrimary, marginBottom: 2 },
  rowDesc: { fontSize: 12, color: colors.textMuted },
  chevron: { fontSize: 20, color: colors.textMuted },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  logoutIcon: { fontSize: 18, color: colors.danger },
  logoutText: { fontSize: 16, fontWeight: '500', color: colors.danger },
  version: {
    textAlign: 'center',
    marginTop: spacing.lg,
    fontSize: 12,
    color: colors.textMuted,
  },
});
