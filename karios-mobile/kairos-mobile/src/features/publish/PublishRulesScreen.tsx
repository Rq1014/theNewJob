import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { PublishStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<PublishStackParamList, 'PublishRules'>;

const FORBIDDEN = [
  '人身攻击、辱骂、骚扰等言论',
  '泄露他人隐私、未经同意公开个人信息',
  '虚假信息、恶意造谣、诈骗信息',
  '恶意广告、引流推广、刷屏灌水',
  '违法违规内容、色情暴力、政治敏感话题',
];

export function PublishRulesScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>发布规则</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: colors.primary }]}>
              <Text style={styles.iconEmoji}>🌐</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>普通帖子</Text>
              <Text style={styles.cardSub}>需以认证身份发布</Text>
            </View>
          </View>
          <RuleItem title="身份展示" desc="前台展示昵称 + 学校认证标签，不会显示真实姓名" />
          <RuleItem
            title="适用内容"
            desc="经验分享、提问求助、租房信息、求职交流、选课推荐、签证办理、二手交易、生活日常等"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: '#9333EA' }]}>
              <Text style={styles.iconEmoji}>💬</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>树洞发帖</Text>
              <Text style={styles.cardSub}>可选匿名或认证身份</Text>
            </View>
          </View>
          <RuleItem title="匿名机制" desc="匿名仅对其他用户隐藏身份，平台仍会进行安全审核和违规追溯" />
          <RuleItem title="发布范围" desc="必须发布到已加入的树洞中，内容仅在该树洞内可见" />
          <RuleItem title="认证发布" desc="也可选择以认证身份发布，展示昵称 + 认证标签，提升可信度" />
        </View>

        <View style={[styles.card, styles.dangerCard]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: colors.danger }]}>
              <Text style={styles.iconEmoji}>⚠️</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>禁止发布内容</Text>
              <Text style={[styles.cardSub, { color: '#B91C1C' }]}>
                违规内容将被删除，严重者封号处理
              </Text>
            </View>
          </View>
          {FORBIDDEN.map(item => (
            <View key={item} style={styles.forbiddenRow}>
              <Text style={styles.forbiddenX}>✕</Text>
              <Text style={styles.forbiddenText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeIcon}>ℹ️</Text>
          <Text style={styles.noticeText}>
            我们致力于营造友善、真实、有价值的留学生交流社区。请遵守社区规范，共同维护良好的讨论氛围。
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function RuleItem({ title, desc }: { title: string; desc: string }) {
  return (
    <View style={styles.ruleItem}>
      <Text style={styles.ruleTitle}>{title}</Text>
      <Text style={styles.ruleDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  back: { fontSize: 22, color: colors.textPrimary },
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md + 4,
    marginBottom: spacing.md,
  },
  dangerCard: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  cardHeader: { flexDirection: 'row', gap: spacing.sm + 4, marginBottom: spacing.md },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: { fontSize: 20 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  cardSub: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  ruleItem: { marginBottom: spacing.sm + 4 },
  ruleTitle: { fontSize: 14, fontWeight: '500', color: colors.textPrimary, marginBottom: 2 },
  ruleDesc: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
  forbiddenRow: { flexDirection: 'row', gap: 8, marginBottom: 8, alignItems: 'flex-start' },
  forbiddenX: { fontSize: 14, color: colors.danger, fontWeight: '600' },
  forbiddenText: { flex: 1, fontSize: 14, color: colors.textPrimary },
  notice: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: '#EFF6FF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  noticeIcon: { fontSize: 16 },
  noticeText: { flex: 1, fontSize: 12, color: '#2563EB', lineHeight: 18 },
});
