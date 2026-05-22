import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfilePostRow } from '../../components/profile/ProfilePostRow';
import { userApi } from '../../api/services';
import { CITIES, USER_TYPES } from '../../api/types';
import type { UserProfile } from '../../api/types';
import type { ProfileHomeNavigationProp } from '../../navigation/navigationProps';
import type { ProfileStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';
import {
  getProfileContentByTab,
  type ProfileContentTab,
} from './profileFeedLogic';

type Props = Omit<
  NativeStackScreenProps<ProfileStackParamList, 'ProfileHome'>,
  'navigation'
> & {
  navigation: ProfileHomeNavigationProp;
};

const CONTENT_TABS: { id: ProfileContentTab; label: string }[] = [
  { id: 'posts', label: '发布' },
  { id: 'favorites', label: '收藏' },
  { id: 'reviews', label: '评价' },
  { id: 'treeholes', label: '树洞' },
  { id: 'resources', label: '资料' },
];

const QUICK_ACTIONS = [
  { id: 'drafts', label: '我的草稿', icon: '📥', count: 3, bg: '#FFF7ED', color: '#EA580C' },
  { id: 'past-exams', label: '我的过去问', icon: '📖', count: 8, bg: '#EEF2FF', color: '#4F46E5' },
  { id: 'treeholes', label: '我的树洞', icon: '💬', count: 7, bg: '#F0FDFA', color: '#0D9488' },
  { id: 'reviews', label: '机构评价', icon: '🏢', count: 12, bg: '#FFFBEB', color: '#D97706' },
];

function cityLabel(cityId?: string | null) {
  return CITIES.find(c => c.id === cityId)?.label ?? '东京都';
}

function userTypeLabel(typeId?: string | null) {
  return USER_TYPES.find(t => t.id === typeId)?.label ?? '在读研究生';
}

/** 用服务端日期部分，避免时区把月份偏移 */
function formatJoinDate(createdAt?: string | null): string | null {
  if (!createdAt) {
    return null;
  }
  const match = createdAt.match(/^(\d{4})-(\d{2})/);
  if (!match) {
    return null;
  }
  const month = parseInt(match[2], 10);
  if (month < 1 || month > 12) {
    return null;
  }
  return `${match[1]}年${month}月`;
}

export function ProfileHomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileContentTab>('posts');

  const posts = useMemo(() => getProfileContentByTab(activeTab), [activeTab]);

  const load = useCallback(async () => {
    const u = await userApi.getMe();
    setUser(u);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const displayUser = {
    name: user?.nickname ?? '张同学',
    university: user?.university ?? '东京大学',
    location: cityLabel(user?.city),
    userType: userTypeLabel(user?.userType),
    joinDate: formatJoinDate(user?.createdAt),
    bio: user?.bio ?? '在东京的留学生活 | 喜欢探店和摄影 📷',
    interests: user?.interests ?? '',
    isVerified: user?.isVerified ?? true,
    postsCount: user?.postsCount ?? 24,
    likesReceived: user?.likesReceived ?? 389,
    favoritesCount: user?.favoritesCount ?? 36,
    reviewsCount: user?.reviewsCount ?? 12,
  };

  const handleQuickAction = (id: string) => {
    if (id === 'drafts') {
      navigation.navigate('PublishTab', { screen: 'Drafts' });
      return;
    }
    Alert.alert('提示', '该功能即将上线');
  };

  const ListHeader = (
    <>
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{displayUser.name[0]}</Text>
          </View>
          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{displayUser.name}</Text>
              {displayUser.isVerified ? (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓ 已认证</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.metaLine}>
              🛡 {displayUser.university}  ·  📍 {displayUser.location}
            </Text>
            <Text style={styles.metaSub}>
              {displayUser.userType}
              {displayUser.joinDate ? ` · 📅 ${displayUser.joinDate}加入` : ''}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              style={styles.iconBtn}
              onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.iconBtnText}>✎</Text>
            </Pressable>
            <Pressable
              style={styles.iconBtn}
              onPress={() => navigation.navigate('Settings')}>
              <Text style={styles.iconBtnText}>⚙</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.bio}>{displayUser.bio}</Text>
        {displayUser.interests ? (
          <Text style={styles.interests}>兴趣：{displayUser.interests}</Text>
        ) : null}
        <View style={styles.statsGrid}>
          {[
            { value: displayUser.postsCount, label: '发布' },
            { value: displayUser.likesReceived, label: '获赞' },
            { value: displayUser.favoritesCount, label: '收藏' },
            { value: displayUser.reviewsCount, label: '评价' },
          ].map(s => (
            <View key={s.label} style={styles.statCell}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.quickSection}>
        <View style={styles.quickGrid}>
          {QUICK_ACTIONS.map(action => (
            <Pressable
              key={action.id}
              style={styles.quickItem}
              onPress={() => handleQuickAction(action.id)}>
              <View style={[styles.quickIcon, { backgroundColor: action.bg }]}>
                <Text style={styles.quickEmoji}>{action.icon}</Text>
                {action.count > 0 ? (
                  <View style={styles.quickBadge}>
                    <Text style={styles.quickBadgeText}>
                      {action.count > 99 ? '99+' : action.count}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.quickLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.tabsBar}>
        {CONTENT_TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={styles.contentTab}
              onPress={() => setActiveTab(tab.id)}>
              <Text style={[styles.contentTabText, active && styles.contentTabTextActive]}>
                {tab.label}
              </Text>
              {active ? <View style={styles.contentTabLine} /> : null}
            </Pressable>
          );
        })}
      </View>
    </>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProfilePostRow
            post={item}
            onPress={() =>
              navigation.navigate('CommunityTab', {
                screen: 'PostDetail',
                params: { postId: item.id },
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>暂无内容</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { paddingBottom: spacing.xl + 16 },
  headerCard: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTop: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.sm },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarText: { fontSize: 28, fontWeight: '700', color: colors.white },
  headerInfo: { flex: 1, minWidth: 0 },
  nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 4 },
  name: { fontSize: 20, fontWeight: '700', color: colors.textPrimary },
  verifiedBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  verifiedText: { fontSize: 10, color: colors.primary, fontWeight: '500' },
  metaLine: { fontSize: 13, color: colors.textSecondary, marginBottom: 4 },
  metaSub: { fontSize: 12, color: colors.textMuted },
  headerActions: { gap: 8 },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnText: { fontSize: 16, color: colors.textSecondary },
  bio: { fontSize: 14, color: '#334155', lineHeight: 22, marginBottom: spacing.sm },
  interests: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  statsGrid: { flexDirection: 'row' },
  statCell: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '700', color: colors.textPrimary },
  statLabel: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  quickSection: {
    backgroundColor: colors.card,
    marginTop: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  quickGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  quickItem: { flex: 1, alignItems: 'center', gap: 8 },
  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  quickEmoji: { fontSize: 22 },
  quickBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  quickBadgeText: { fontSize: 10, color: colors.white, fontWeight: '600' },
  quickLabel: {
    fontSize: 11,
    color: '#334155',
    fontWeight: '500',
    textAlign: 'center',
  },
  tabsBar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contentTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  contentTabText: { fontSize: 14, fontWeight: '500', color: colors.textSecondary },
  contentTabTextActive: { color: colors.primary, fontWeight: '600' },
  contentTabLine: {
    position: 'absolute',
    bottom: 0,
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
  },
  empty: {
    textAlign: 'center',
    paddingVertical: 48,
    color: colors.textMuted,
    backgroundColor: colors.card,
  },
});
