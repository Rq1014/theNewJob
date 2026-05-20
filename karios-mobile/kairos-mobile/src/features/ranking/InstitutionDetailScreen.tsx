import React, { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeader } from '../../components/ScreenHeader';
import {
  getInstitutionById,
  radarDimensions,
} from '../../data/institutions';
import {
  filterReviews,
  getReviewAvgScore,
  getReviewsByInstitution,
  type ReviewFilter,
} from '../../data/reviews';
import type { RankingStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<RankingStackParamList, 'InstitutionDetail'>;

const REVIEW_FILTERS: { id: ReviewFilter; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'regular', label: '普通' },
  { id: 'certified', label: '认证' },
  { id: 'latest', label: '最新' },
  { id: 'helpful', label: '最有帮助' },
];

export function InstitutionDetailScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const institution = getInstitutionById(route.params.institutionId);
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all');

  const reviews = useMemo(() => {
    if (!institution) return [];
    return filterReviews(getReviewsByInstitution(institution.id), reviewFilter);
  }, [institution, reviewFilter]);

  if (!institution) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="机构详情" onBack={() => navigation.goBack()} />
        <Text style={styles.empty}>机构不存在</Text>
      </View>
    );
  }

  const dimensions = radarDimensions[institution.type];

  return (
    <View style={styles.container}>
      <ScreenHeader title={institution.name} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.scoreCard}>
          <Text style={styles.scoreStar}>★</Text>
          <Text style={styles.scoreValue}>{institution.avgScore}</Text>
          <Text style={styles.scoreMeta}>{institution.totalReviews} 条评价</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoRow}>📍 {institution.address}</Text>
          {institution.phone ? <Text style={styles.infoRow}>📞 {institution.phone}</Text> : null}
          {institution.website ? <Text style={styles.infoRow}>🌐 {institution.website}</Text> : null}
          <View style={styles.highlightRow}>
            {institution.highlights.map(h => (
              <View key={h} style={styles.highlight}>
                <Text style={styles.highlightText}>{h}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.desc}>{institution.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>维度评分</Text>
          <View style={styles.dimensionGrid}>
            {Object.entries(dimensions).map(([key, label]) => (
              <View key={key} style={styles.dimensionItem}>
                <Text style={styles.dimensionLabel}>{label}</Text>
                <Text style={styles.dimensionScore}>
                  {institution.scores[key]?.toFixed(1) ?? '-'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>用户评价</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {REVIEW_FILTERS.map(f => (
              <Pressable
                key={f.id}
                style={[styles.filterChip, reviewFilter === f.id && styles.filterChipActive]}
                onPress={() => setReviewFilter(f.id)}>
                <Text
                  style={[
                    styles.filterChipText,
                    reviewFilter === f.id && styles.filterChipTextActive,
                  ]}>
                  {f.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          {reviews.length === 0 ? (
            <Text style={styles.noReviews}>暂无评价</Text>
          ) : (
            reviews.map(review => {
              const version = review.versions.find(v => v.version === review.currentVersion);
              const avg = getReviewAvgScore(review);
              return (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{review.userAvatar}</Text>
                    </View>
                    <View style={styles.reviewMeta}>
                      <Text style={styles.reviewUser}>{review.userName}</Text>
                      <Text style={styles.reviewUni}>{review.university}</Text>
                    </View>
                    <View style={styles.reviewBadges}>
                      {review.isTransacted ? (
                        <Text style={styles.certBadge}>认证</Text>
                      ) : (
                        <Text style={styles.regBadge}>普通</Text>
                      )}
                      <Text style={styles.reviewScore}>★ {avg.toFixed(1)}</Text>
                    </View>
                  </View>
                  <Text style={styles.reviewContent} numberOfLines={4}>
                    {version?.content ?? ''}
                  </Text>
                  <View style={styles.reviewFooter}>
                    <Text style={styles.helpful}>👍 {review.helpfulCount} 有帮助</Text>
                    <Text style={styles.reviewDate}>{review.updatedAt}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
        <View style={{ height: 80 + insets.bottom }} />
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <Pressable
          style={styles.publishBtn}
          onPress={() => Alert.alert('发布评价', '评价提交功能即将上线')}>
          <Text style={styles.publishBtnText}>发布评价</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.md },
  empty: { textAlign: 'center', marginTop: 48, color: colors.textMuted },
  scoreCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scoreStar: { fontSize: 28, color: colors.teal },
  scoreValue: { fontSize: 36, fontWeight: '700', color: colors.textPrimary },
  scoreMeta: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoRow: { fontSize: 14, color: colors.textSecondary, marginBottom: 6 },
  highlightRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 8 },
  highlight: {
    backgroundColor: colors.tealLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  highlightText: { fontSize: 12, color: '#0F766E' },
  desc: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  section: { marginBottom: spacing.md },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm },
  dimensionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  dimensionItem: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dimensionLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
  dimensionScore: { fontSize: 18, fontWeight: '700', color: colors.teal },
  filterScroll: { marginBottom: spacing.sm },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: colors.tealLight, borderColor: colors.teal },
  filterChipText: { fontSize: 13, color: colors.textSecondary },
  filterChipTextActive: { color: colors.teal, fontWeight: '600' },
  noReviews: { textAlign: 'center', color: colors.textMuted, paddingVertical: spacing.lg },
  reviewCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: { color: colors.white, fontWeight: '600' },
  reviewMeta: { flex: 1 },
  reviewUser: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  reviewUni: { fontSize: 12, color: colors.textMuted },
  reviewBadges: { alignItems: 'flex-end' },
  certBadge: {
    fontSize: 10,
    color: '#0F766E',
    backgroundColor: colors.tealLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  regBadge: {
    fontSize: 10,
    color: colors.textSecondary,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  reviewScore: { fontSize: 13, fontWeight: '600', color: colors.teal },
  reviewContent: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  helpful: { fontSize: 12, color: colors.textMuted },
  reviewDate: { fontSize: 12, color: colors.textMuted },
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
  publishBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  publishBtnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
});
