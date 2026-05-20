import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { JapanPostRow } from '../../components/community/JapanPostRow';
import {
  hotSearchKeywords,
  initialSearchHistory,
} from '../../data/communityConstants';
import { postApi } from '../../api/services';
import type { Post } from '../../api/types';
import type { CommunityStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<CommunityStackParamList, 'Search'>;

export function SearchScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(initialSearchHistory);
  const [results, setResults] = useState<Post[]>([]);
  const [searched, setSearched] = useState(false);

  const search = async (keyword?: string) => {
    const q = (keyword ?? query).trim();
    if (!q) return;
    setQuery(q);
    if (!searchHistory.includes(q)) {
      setSearchHistory(prev => [q, ...prev].slice(0, 10));
    }
    const res = await postApi.search(q);
    setResults(res.items);
    setSearched(true);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.searchBar}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder="搜索帖子、学校、城市或关键词"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => search()}
          returnKeyType="search"
          autoFocus
        />
        {query ? (
          <Pressable onPress={() => setQuery('')} hitSlop={8}>
            <Text style={styles.clear}>✕</Text>
          </Pressable>
        ) : null}
        <Pressable
          style={[styles.searchBtn, !query.trim() && styles.searchBtnDisabled]}
          onPress={() => search()}
          disabled={!query.trim()}>
          <Text style={[styles.searchBtnText, !query.trim() && styles.searchBtnTextDisabled]}>
            搜索
          </Text>
        </Pressable>
      </View>

      {searched ? (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.results}
          ListEmptyComponent={
            <Text style={styles.empty}>未找到相关帖子</Text>
          }
          renderItem={({ item }) => (
            <JapanPostRow
              post={item}
              onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            />
          )}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.body}>
          {searchHistory.length > 0 ? (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>🕐 搜索历史</Text>
                <Pressable onPress={() => setSearchHistory([])}>
                  <Text style={styles.clearHistory}>清空</Text>
                </Pressable>
              </View>
              <View style={styles.chipWrap}>
                {searchHistory.map(keyword => (
                  <Pressable
                    key={keyword}
                    style={styles.historyChip}
                    onPress={() => search(keyword)}>
                    <Text style={styles.historyChipText}>{keyword}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📈 大家都在搜</Text>
            {hotSearchKeywords.map((item, index) => (
              <Pressable
                key={item.keyword}
                style={styles.hotRow}
                onPress={() => search(item.keyword)}>
                <Text
                  style={[
                    styles.hotRank,
                    index < 3 && styles.hotRankTop,
                  ]}>
                  {index + 1}
                </Text>
                <Text style={styles.hotKeyword}>{item.keyword}</Text>
                {item.heat ? (
                  <View
                    style={[
                      styles.heatBadge,
                      item.heat === '热' ? styles.heatHot : styles.heatNew,
                    ]}>
                    <Text
                      style={[
                        styles.heatText,
                        item.heat === '热' ? styles.heatHotText : styles.heatNewText,
                      ]}>
                      {item.heat}
                    </Text>
                  </View>
                ) : null}
              </Pressable>
            ))}
          </View>

          <Text style={styles.hint}>
            搜索校园生活、租房信息、求职经验、学习资料等内容
          </Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  back: { fontSize: 22, color: colors.textPrimary },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm + 4,
    fontSize: 14,
    color: colors.textPrimary,
  },
  clear: { fontSize: 16, color: colors.textMuted, padding: 4 },
  searchBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.sm,
  },
  searchBtnDisabled: { backgroundColor: '#E2E8F0' },
  searchBtnText: { color: colors.white, fontSize: 14, fontWeight: '500' },
  searchBtnTextDisabled: { color: colors.textMuted },
  body: { padding: spacing.md, paddingBottom: spacing.xl },
  section: { marginBottom: spacing.lg },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm },
  clearHistory: { fontSize: 14, color: colors.textSecondary },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  historyChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  historyChipText: { fontSize: 14, color: '#334155' },
  hotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
  },
  hotRank: {
    width: 20,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  hotRankTop: { color: '#F97316' },
  hotKeyword: { flex: 1, fontSize: 14, color: colors.textPrimary },
  heatBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  heatHot: { backgroundColor: '#FFEDD5' },
  heatNew: { backgroundColor: '#DBEAFE' },
  heatText: { fontSize: 10, fontWeight: '500' },
  heatHotText: { color: '#C2410C' },
  heatNewText: { color: '#1D4ED8' },
  hint: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  results: { paddingBottom: spacing.xl, backgroundColor: colors.card },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 48 },
});
