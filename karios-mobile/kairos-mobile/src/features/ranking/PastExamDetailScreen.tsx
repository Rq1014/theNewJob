import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components/ScreenHeader';
import { getPastExamById } from '../../data/pastExams';
import type { RankingStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<RankingStackParamList, 'PastExamDetail'>;

const DETAIL_TABS = [
  { id: 'discussion', label: '题目讨论' },
  { id: 'answers', label: '答案解析' },
  { id: 'materials', label: '补充资料' },
] as const;

export function PastExamDetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const exam = getPastExamById(route.params.examId);
  const [activeTab, setActiveTab] =
    useState<(typeof DETAIL_TABS)[number]['id']>('discussion');
  const [saved, setSaved] = useState(false);

  if (!exam) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="资料详情" onBack={() => navigation.goBack()} />
        <Text style={styles.empty}>资料不存在</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={exam.school}
        onBack={() => navigation.goBack()}
        right={
          <Pressable onPress={() => setSaved(!saved)} hitSlop={12}>
            <Text style={styles.saveIcon}>{saved ? '★' : '☆'}</Text>
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.infoCard}>
          <View style={styles.titleRow}>
            <Text style={styles.school}>{exam.school}</Text>
            {exam.verified ? (
              <View style={styles.verified}>
                <Text style={styles.verifiedText}>✓ 已审核</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.major}>{exam.major}</Text>
          <Text style={styles.meta}>
            {exam.year}年 · {exam.examType}
          </Text>
          <View style={styles.tagRow}>
            {exam.hasAnswers ? (
              <View style={styles.tag}>
                <Text style={styles.tagText}>含答案</Text>
              </View>
            ) : null}
            {exam.hasSolutions ? (
              <View style={[styles.tag, styles.tagCyan]}>
                <Text style={[styles.tagText, styles.tagCyanText]}>含解析</Text>
              </View>
            ) : null}
            {exam.tags.map(tag => (
              <View key={tag} style={styles.tagGray}>
                <Text style={styles.tagGrayText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>资料信息</Text>
            <Text style={styles.infoLine}>📄 PDF文件 · 12页 · 3.2MB</Text>
            <Text style={styles.infoLine}>🕐 更新于 {exam.updateDate}</Text>
            <Text style={styles.infoLine}>包含：完整试题、标准答案、详细解析</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.stat}>⬇ {exam.downloads} 下载</Text>
            <Text style={styles.stat}>♥ {exam.favorites} 收藏</Text>
            <Text style={styles.stat}>💬 {exam.discussions ?? 0} 讨论</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          {DETAIL_TABS.map(tab => (
            <Pressable
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}>
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.tabContent}>
          {activeTab === 'discussion' && (
            <Text style={styles.placeholder}>
              暂无讨论。你可以发起第一个讨论话题。
            </Text>
          )}
          {activeTab === 'answers' && (
            <Text style={styles.placeholder}>
              {exam.hasSolutions
                ? '答案解析已包含在资料中，下载后可查看完整内容。'
                : '该资料暂未提供详细解析。'}
            </Text>
          )}
          {activeTab === 'materials' && (
            <Text style={styles.placeholder}>
              补充资料：考点分析、历年趋势对比（即将上线）
            </Text>
          )}
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <Pressable style={styles.downloadBtn}>
          <Text style={styles.downloadText}>下载资料</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.rankingBg },
  scroll: { padding: spacing.md, paddingBottom: 100 },
  empty: { textAlign: 'center', marginTop: 48, color: colors.textMuted },
  saveIcon: { fontSize: 22, color: colors.teal },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  school: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, flex: 1 },
  verified: {
    backgroundColor: colors.tealLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  verifiedText: { fontSize: 10, color: '#0F766E' },
  major: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  meta: { fontSize: 12, color: colors.textMuted, marginTop: 4, marginBottom: 8 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: spacing.sm },
  tag: {
    backgroundColor: colors.tealLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  tagText: { fontSize: 11, color: '#0F766E' },
  tagCyan: { backgroundColor: '#ECFEFF' },
  tagCyanText: { color: '#0E7490' },
  tagGray: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagGrayText: { fontSize: 11, color: colors.textSecondary },
  infoBox: {
    backgroundColor: 'rgba(240,253,250,0.5)',
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.tealBorder,
    marginBottom: spacing.sm,
  },
  infoTitle: { fontSize: 12, fontWeight: '600', color: '#134E4A', marginBottom: 6 },
  infoLine: { fontSize: 12, color: colors.textSecondary, lineHeight: 20 },
  stats: { flexDirection: 'row', gap: 16 },
  stat: { fontSize: 12, color: colors.textMuted },
  tabs: { flexDirection: 'row', marginBottom: spacing.sm },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: colors.teal },
  tabText: { fontSize: 13, color: colors.textMuted },
  tabTextActive: { color: colors.teal, fontWeight: '600' },
  tabContent: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeholder: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  downloadBtn: {
    backgroundColor: colors.teal,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  downloadText: { color: colors.white, fontSize: 16, fontWeight: '600' },
});
