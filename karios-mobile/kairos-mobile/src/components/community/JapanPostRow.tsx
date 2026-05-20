import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Post } from '../../api/types';
import { categoryLabels } from '../../data/communityUtils';
import { cityNames, type City } from '../../data/japan-community';
import { colors, spacing } from '../../theme';

interface Props {
  post: Post;
  onPress: () => void;
  onUserPress?: () => void;
  onCompanyPress?: () => void;
}

export function JapanPostRow({ post, onPress, onUserPress, onCompanyPress }: Props) {
  const categoryLabel = categoryLabels[post.category] ?? post.category;
  const cityLabel = post.city ? cityNames[post.city as City] : null;

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.badgeRow}>
        <View
          style={[
            styles.domainBadge,
            post.domain === 'career' ? styles.domainCareer : styles.domainLife,
          ]}>
          <Text
            style={[
              styles.domainBadgeText,
              post.domain === 'career' ? styles.domainCareerText : styles.domainLifeText,
            ]}>
            {categoryLabel}
          </Text>
        </View>
        {cityLabel ? (
          <View style={styles.cityBadge}>
            <Text style={styles.cityBadgeText}>{cityLabel}</Text>
          </View>
        ) : null}
        {post.featured ? (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>精选</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {post.title}
      </Text>
      <Text style={styles.summary} numberOfLines={2}>
        {post.summary}
      </Text>

      {post.company ? (
        <Pressable style={styles.companyRow} onPress={onCompanyPress}>
          <Text style={styles.companyLogo}>{post.company.logo}</Text>
          <Text style={styles.companyName} numberOfLines={1}>
            {post.company.name}
            {post.position ? (
              <Text style={styles.companyPosition}> · {post.position}</Text>
            ) : null}
          </Text>
          <Text style={styles.companyArrow}>↗</Text>
        </Pressable>
      ) : null}

      {post.rating || post.helpful ? (
        <View style={styles.metricsRow}>
          {post.rating ? (
            <Text style={styles.metric}>★ {post.rating}</Text>
          ) : null}
          {post.helpful ? (
            <Text style={styles.metric}>👍 {post.helpful}%实用</Text>
          ) : null}
        </View>
      ) : null}

      <View style={styles.authorRow}>
        <Pressable onPress={onUserPress} hitSlop={8}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{post.author.avatar || post.author.name[0]}</Text>
          </View>
        </Pressable>
        <View style={styles.authorMeta}>
          <Pressable onPress={onUserPress}>
            <Text style={styles.authorName} numberOfLines={1}>
              {post.author.name}
              {post.author.verified ? ' ✓' : ''}
              {post.author.university ? ` · ${post.author.university}` : ''}
            </Text>
          </Pressable>
          {post.author.badges?.[0] ? (
            <View style={styles.authorBadge}>
              <Text style={styles.authorBadgeText}>{post.author.badges[0]}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.timestamp}>{post.timestamp}</Text>
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.stat}>♥ {post.likes}</Text>
        <Text style={styles.stat}>💬 {post.comments}</Text>
        <Text style={styles.stat}>🔖 {post.bookmarks}</Text>
        <Text style={[styles.stat, styles.statViews]}>👁 {post.views}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 6 },
  domainBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  domainCareer: { backgroundColor: '#DBEAFE' },
  domainLife: { backgroundColor: '#DCFCE7' },
  domainBadgeText: { fontSize: 10, fontWeight: '500' },
  domainCareerText: { color: '#1D4ED8' },
  domainLifeText: { color: '#15803D' },
  cityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cityBadgeText: { fontSize: 10, color: colors.textSecondary },
  featuredBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  featuredBadgeText: { fontSize: 10, color: '#B45309', fontWeight: '500' },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: 6,
  },
  summary: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, marginBottom: 8 },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
  },
  companyLogo: { fontSize: 16 },
  companyName: { flex: 1, fontSize: 13, fontWeight: '500', color: colors.textPrimary },
  companyPosition: { color: colors.textSecondary, fontWeight: '400' },
  companyArrow: { fontSize: 12, color: colors.textMuted },
  metricsRow: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  metric: { fontSize: 12, fontWeight: '500', color: '#334155' },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 10, color: colors.white, fontWeight: '600' },
  authorMeta: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  authorName: { fontSize: 12, color: '#334155', fontWeight: '500', flexShrink: 1 },
  authorBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  authorBadgeText: { fontSize: 10, color: '#15803D' },
  timestamp: { fontSize: 12, color: colors.textMuted },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  stat: { fontSize: 12, color: colors.textMuted },
  statViews: { marginLeft: 'auto' },
});
