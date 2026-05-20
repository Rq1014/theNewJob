import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Institution, InstitutionType } from '../../data/institutions';
import { radarDimensions } from '../../data/institutions';
import { colors, radius, spacing } from '../../theme';

function getMedalColors(rank: number): [string, string] {
  if (rank === 1) return ['#FCD34D', '#F59E0B'];
  if (rank === 2) return ['#99F6E4', '#5EEAD4'];
  if (rank === 3) return ['#A5F3FC', '#5EEAD4'];
  return ['#E2E8F0', '#CBD5E1'];
}

interface Props {
  institution: Institution;
  rank: number;
  type: InstitutionType;
  onPress: () => void;
}

export function InstitutionCard({ institution, rank, type, onPress }: Props) {
  const dimensions = radarDimensions[type];
  const topScores = Object.entries(institution.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);
  const [c1, c2] = getMedalColors(rank);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={[styles.rankBadge, { backgroundColor: c1, borderColor: c2 }]}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>{institution.name}</Text>
          <Text style={styles.location}>
            📍 {institution.location}·{institution.district}
          </Text>
          <View style={styles.scoreRow}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.avgScore}>{institution.avgScore}</Text>
            <Text style={styles.reviewCount}>{institution.totalReviews} 条评价</Text>
          </View>
          <View style={styles.badgeRow}>
            <View style={styles.badgeGray}>
              <Text style={styles.badgeGrayText}>{institution.nonTransactedReviews} 普通评价</Text>
            </View>
            <View style={styles.badgeTeal}>
              <Text style={styles.badgeTealText}>🛡 {institution.transactedReviews} 认证评价</Text>
            </View>
          </View>
          <View style={styles.highlightRow}>
            {institution.highlights.map(h => (
              <View key={h} style={styles.highlight}>
                <Text style={styles.highlightText}>{h}</Text>
              </View>
            ))}
          </View>
          <View style={styles.advantageBox}>
            <Text style={styles.advantageLabel}>优势维度</Text>
            <View style={styles.advantageItems}>
              {topScores.map(([key, value]) => (
                <Text key={key} style={styles.advantageItem}>
                  ↗ {dimensions[key as keyof typeof dimensions]} {value}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.footer}>
            {institution.established ? (
              <Text style={styles.established}>成立于 {institution.established}</Text>
            ) : (
              <View />
            )}
            <Text style={styles.cta}>查看详情 →</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm + 4,
  },
  row: { flexDirection: 'row', gap: spacing.sm + 4 },
  rankBadge: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  rankText: { fontSize: 18, fontWeight: '700', color: colors.white },
  body: { flex: 1 },
  name: { fontSize: 17, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  location: { fontSize: 13, color: colors.textSecondary, marginBottom: 6 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  star: { fontSize: 16, color: colors.teal },
  avgScore: { fontSize: 17, fontWeight: '700', color: colors.textPrimary },
  reviewCount: { fontSize: 13, color: colors.textSecondary },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  badgeGray: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeGrayText: { fontSize: 11, color: colors.textSecondary },
  badgeTeal: {
    backgroundColor: colors.tealLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.tealBorder,
  },
  badgeTealText: { fontSize: 11, color: '#0F766E', fontWeight: '500' },
  highlightRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  highlight: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
  highlightText: { fontSize: 11, color: colors.textSecondary },
  advantageBox: {
    backgroundColor: 'rgba(240,253,250,0.6)',
    borderRadius: radius.sm,
    padding: 8,
    borderWidth: 1,
    borderColor: colors.tealBorder,
    marginBottom: 8,
  },
  advantageLabel: { fontSize: 11, color: colors.textSecondary, marginBottom: 4 },
  advantageItems: { flexDirection: 'row', gap: 12 },
  advantageItem: { fontSize: 11, color: '#334155' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  established: { fontSize: 11, color: colors.textMuted },
  cta: { fontSize: 13, color: colors.teal, fontWeight: '500' },
});
