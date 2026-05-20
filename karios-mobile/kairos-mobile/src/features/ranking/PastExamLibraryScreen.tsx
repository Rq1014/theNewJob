import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenHeader } from '../../components/ScreenHeader';
import { mockPastExams } from '../../data/pastExams';
import type { RankingStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<RankingStackParamList, 'PastExamLibrary'>;

const SORT_OPTIONS = [
  { id: 'latest', label: '最新上传' },
  { id: 'downloads', label: '最多下载' },
  { id: 'favorites', label: '最多收藏' },
  { id: 'discussions', label: '最多讨论' },
] as const;

export function PastExamLibraryScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]['id']>('latest');

  const filtered = mockPastExams
    .filter(e => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.trim().toLowerCase();
      return (
        e.school.toLowerCase().includes(q) ||
        e.major.toLowerCase().includes(q) ||
        e.tags.some(t => t.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'favorites') return b.favorites - a.favorites;
      if (sortBy === 'discussions') return (b.discussions ?? 0) - (a.discussions ?? 0);
      return b.updateDate.localeCompare(a.updateDate);
    });

  return (
    <View style={styles.container}>
      <ScreenHeader title="过去问资料库" onBack={() => navigation.goBack()} />
      <View style={styles.toolbar}>
        <TextInput
          style={styles.search}
          placeholder="搜索学校、专业或标签"
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.sortRow}>
          {SORT_OPTIONS.map(opt => (
            <Pressable
              key={opt.id}
              style={[styles.sortChip, sortBy === opt.id && styles.sortChipActive]}
              onPress={() => setSortBy(opt.id)}>
              <Text style={[styles.sortText, sortBy === opt.id && styles.sortTextActive]}>
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('PastExamDetail', { examId: item.id })}>
            <View style={styles.cardHeader}>
              <Text style={styles.school}>{item.school}</Text>
              {item.verified ? (
                <View style={styles.verified}>
                  <Text style={styles.verifiedText}>✓ 已审核</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.major}>{item.major}</Text>
            <Text style={styles.meta}>
              {item.year}年 · {item.examType}
            </Text>
            <View style={styles.tagRow}>
              {item.hasAnswers ? (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>含答案</Text>
                </View>
              ) : null}
              {item.hasSolutions ? (
                <View style={[styles.tag, styles.tagCyan]}>
                  <Text style={[styles.tagText, styles.tagCyanText]}>含解析</Text>
                </View>
              ) : null}
              {item.tags.slice(0, 2).map(tag => (
                <View key={tag} style={styles.tagGray}>
                  <Text style={styles.tagGrayText}>{tag}</Text>
                </View>
              ))}
            </View>
            <View style={styles.stats}>
              <Text style={styles.stat}>⬇ {item.downloads}</Text>
              <Text style={styles.stat}>♥ {item.favorites}</Text>
              <Text style={styles.stat}>💬 {item.discussions ?? 0}</Text>
              <Text style={styles.cta}>查看详情 →</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.empty}>暂无相关资料</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.rankingBg },
  toolbar: { padding: spacing.md, paddingTop: 0 },
  search: {
    height: 40,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.tealBorder,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  sortRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sortChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortChipActive: { backgroundColor: colors.tealLight, borderColor: colors.teal },
  sortText: { fontSize: 12, color: colors.textSecondary },
  sortTextActive: { color: colors.teal, fontWeight: '600' },
  list: { padding: spacing.md, paddingTop: 0 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  school: { fontSize: 17, fontWeight: '700', color: colors.textPrimary, flex: 1 },
  verified: {
    backgroundColor: colors.tealLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.tealBorder,
  },
  verifiedText: { fontSize: 10, color: '#0F766E' },
  major: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  meta: { fontSize: 12, color: colors.textMuted, marginTop: 4, marginBottom: 8 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  tag: {
    backgroundColor: colors.tealLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.tealBorder,
  },
  tagText: { fontSize: 11, color: '#0F766E' },
  tagCyan: { backgroundColor: '#ECFEFF', borderColor: '#A5F3FC' },
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
  stats: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stat: { fontSize: 12, color: colors.textMuted },
  cta: { marginLeft: 'auto', fontSize: 13, color: colors.teal, fontWeight: '500' },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 48 },
});
