import React, { useMemo, useState } from 'react';
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
import { InstitutionCard } from '../../components/ranking/InstitutionCard';
import {
  getInstitutionsByType,
  type InstitutionType,
} from '../../data/institutions';
import type { RankingStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<RankingStackParamList, 'RankingHome'>;

const INSTITUTION_TYPES: { id: InstitutionType; label: string; icon: string }[] = [
  { id: 'tutoring', label: '私塾', icon: '📚' },
  { id: 'language', label: '语言学校', icon: '🏫' },
  { id: 'agency', label: '留学中介', icon: '✈️' },
];

export function RankingHomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [selectedType, setSelectedType] = useState<InstitutionType>('tutoring');
  const [searchQuery, setSearchQuery] = useState('');

  const institutions = useMemo(() => {
    const list = getInstitutionsByType(selectedType);
    if (!searchQuery.trim()) return list;
    const q = searchQuery.trim().toLowerCase();
    return list.filter(
      i =>
        i.name.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q) ||
        i.district.toLowerCase().includes(q) ||
        i.highlights.some(h => h.toLowerCase().includes(q)),
    );
  }, [selectedType, searchQuery]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View style={styles.titleIcon}>
            <Text style={styles.titleIconText}>📈</Text>
          </View>
          <View>
            <Text style={styles.title}>机构榜单</Text>
            <Text style={styles.subtitle}>基于真实用户评价的排名</Text>
          </View>
        </View>
        <TextInput
          style={styles.search}
          placeholder="搜索机构、地区或升学方向"
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          <View style={styles.tabs}>
            {INSTITUTION_TYPES.map(type => (
              <Pressable
                key={type.id}
                style={[styles.tab, selectedType === type.id && styles.tabActive]}
                onPress={() => setSelectedType(type.id)}>
                <Text style={[styles.tabText, selectedType === type.id && styles.tabTextActive]}>
                  {type.icon} {type.label}
                </Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.tab}
              onPress={() => navigation.navigate('PastExamLibrary')}>
              <Text style={styles.tabText}>📖 过去问</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      <FlatList
        data={institutions}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.trustBanner}>
            <Text style={styles.trustIcon}>🛡</Text>
            <View style={styles.trustBody}>
              <Text style={styles.trustTitle}>可信评价机制</Text>
              <Text style={styles.trustLine}>✓ 认证评价需上传材料审核</Text>
              <Text style={styles.trustLine}>✓ 评论历史版本完整保留</Text>
              <Text style={styles.trustLine}>✓ 防刷评防洗评论机制</Text>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <InstitutionCard
            institution={item}
            rank={index + 1}
            type={selectedType}
            onPress={() =>
              navigation.navigate('InstitutionDetail', { institutionId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>暂无数据</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.rankingBg },
  header: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: colors.tealBorder,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, marginBottom: spacing.sm + 4 },
  titleIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.tealLight,
    borderWidth: 1,
    borderColor: colors.tealBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleIconText: { fontSize: 20 },
  title: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: 12, color: colors.textSecondary },
  search: {
    height: 40,
    backgroundColor: colors.white,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.tealBorder,
    paddingHorizontal: spacing.md,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  tabsScroll: { marginHorizontal: -spacing.md, paddingHorizontal: spacing.md },
  tabs: { flexDirection: 'row', gap: 8, paddingBottom: 4 },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radius.full,
    backgroundColor: 'rgba(240,253,250,0.8)',
  },
  tabActive: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.tealBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: { fontSize: 13, color: '#334155', fontWeight: '500' },
  tabTextActive: { color: colors.teal, fontWeight: '600' },
  list: { padding: spacing.md, paddingBottom: spacing.xl },
  trustBanner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(240,253,250,0.6)',
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.tealBorder,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  trustIcon: { fontSize: 20 },
  trustBody: { flex: 1 },
  trustTitle: { fontSize: 14, fontWeight: '600', color: '#134E4A', marginBottom: 4 },
  trustLine: { fontSize: 12, color: '#115E59', lineHeight: 18 },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 48 },
});
