import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_PUBLISH_DRAFTS } from '../../data/publishConstants';
import type { PublishStackNavigationProp } from '../../navigation/navigationProps';
import type { PublishStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = Omit<
  NativeStackScreenProps<PublishStackParamList, 'PublishHome'>,
  'navigation'
> & {
  navigation: PublishStackNavigationProp;
};

export function PublishHomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const close = () => {
    navigation.getParent()?.navigate('CommunityTab', { screen: 'CommunityHome' });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={close} hitSlop={12} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
        <Text style={styles.headerTitle}>创建内容</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Pressable
          style={styles.primaryCard}
          onPress={() => navigation.navigate('SelectPostType')}>
          <View style={styles.cardRow}>
            <View style={[styles.cardIcon, styles.cardIconBlue]}>
              <Text style={styles.cardIconEmoji}>🌐</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>发布帖子</Text>
                <Text style={styles.cardDivider}>—</Text>
                <Text style={styles.cardBadgeBlue}>🛡 以认证身份发布</Text>
              </View>
              <Text style={styles.cardDesc}>分享留学经验、租房、选课、求职、生活日常</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </Pressable>

        <Pressable
          style={[styles.primaryCard, styles.primaryCardPurple]}
          onPress={() => navigation.navigate('SelectTreehole')}>
          <View style={styles.cardRow}>
            <View style={[styles.cardIcon, styles.cardIconPurple]}>
              <Text style={styles.cardIconEmoji}>💬</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>树洞发帖</Text>
                <Text style={styles.cardDivider}>—</Text>
                <Text style={styles.cardBadgePurple}>可匿名 / 认证身份发布</Text>
              </View>
              <Text style={styles.cardDesc}>在已加入的树洞中倾诉、求助或交流</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.auxRow}
          onPress={() => navigation.navigate('Drafts')}>
          <View style={styles.auxIcon}>
            <Text style={styles.auxEmoji}>📥</Text>
          </View>
          <View style={styles.auxBody}>
            <Text style={styles.auxTitle}>草稿箱</Text>
            <Text style={styles.auxDesc}>查看未完成的内容</Text>
          </View>
          <View style={styles.auxRight}>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{MOCK_PUBLISH_DRAFTS.length}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.auxRow}
          onPress={() => navigation.navigate('PublishRules')}>
          <View style={styles.auxIcon}>
            <Text style={styles.auxEmoji}>📖</Text>
          </View>
          <View style={styles.auxBody}>
            <Text style={styles.auxTitle}>发布规则</Text>
            <Text style={styles.auxDesc}>了解社区规范</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        <View style={styles.notice}>
          <Text style={styles.noticeIcon}>ℹ️</Text>
          <View style={styles.noticeBody}>
            <Text style={styles.noticeTitle}>发布须知</Text>
            <Text style={styles.noticeText}>
              普通帖子需以认证身份发布，前台显示昵称+学校认证标签；树洞支持匿名，但必须发布到已加入的树洞并遵守社区规范。
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  closeText: { fontSize: 20, color: '#334155' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  headerSpacer: { width: 36 },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  primaryCard: {
    marginBottom: spacing.md,
    padding: spacing.md + 4,
    borderRadius: radius.lg,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  primaryCardPurple: { backgroundColor: '#FAF5FF', borderColor: '#E9D5FF' },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconBlue: { backgroundColor: colors.primary },
  cardIconPurple: { backgroundColor: '#9333EA' },
  cardIconEmoji: { fontSize: 24 },
  cardBody: { flex: 1 },
  cardTitleRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  cardDivider: { color: colors.textMuted, fontSize: 12 },
  cardBadgeBlue: { fontSize: 11, color: colors.primary, fontWeight: '500' },
  cardBadgePurple: { fontSize: 11, color: '#9333EA', fontWeight: '500' },
  cardDesc: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  chevron: { fontSize: 20, color: colors.textMuted, marginTop: 4 },
  auxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
    gap: spacing.sm + 4,
  },
  auxIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  auxEmoji: { fontSize: 20 },
  auxBody: { flex: 1 },
  auxTitle: { fontSize: 14, fontWeight: '500', color: colors.textPrimary },
  auxDesc: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  auxRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  countBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countText: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },
  notice: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: '#EFF6FF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  noticeIcon: { fontSize: 16 },
  noticeBody: { flex: 1 },
  noticeTitle: { fontSize: 13, fontWeight: '600', color: '#1D4ED8', marginBottom: 4 },
  noticeText: { fontSize: 12, color: '#2563EB', lineHeight: 18 },
});
