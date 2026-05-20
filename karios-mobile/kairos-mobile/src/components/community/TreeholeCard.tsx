import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { hotTreeholePosts } from '../../data/communityConstants';
import { colors, radius, spacing } from '../../theme';

interface Props {
  onPress: () => void;
}

export function TreeholeCard({ onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconBox}>
          <Text style={styles.icon}>💬</Text>
        </View>
        <View style={styles.headerText}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>树洞</Text>
            <View style={styles.anonBadge}>
              <Text style={styles.anonText}>匿名</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>匿名倾诉、实时讨论、找到共鸣</Text>
        </View>
        <View style={styles.enterCol}>
          <Text style={styles.enterArrow}>↗</Text>
          <Text style={styles.online}>2.3k在线</Text>
        </View>
      </View>
      <View style={styles.preview}>
        <Text style={styles.previewTitle}>🔥 正在热议</Text>
        {hotTreeholePosts.map((post, index) => (
          <View key={post.id} style={[styles.previewItem, index > 0 && styles.previewItemBorder]}>
            <View style={styles.previewItemTop}>
              <Text style={styles.previewPostTitle} numberOfLines={1}>
                {post.title}
              </Text>
              <Text style={styles.previewTime}>{post.timestamp}</Text>
            </View>
            <Text style={styles.previewStats}>
              {post.replies} 回复 · {post.likes} 点赞
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    backgroundColor: '#F0FDFA',
    overflow: 'hidden',
  },
  header: { flexDirection: 'row', padding: spacing.md, gap: spacing.sm + 4 },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.teal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 20 },
  headerText: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  title: { fontSize: 18, fontWeight: '700', color: colors.textPrimary },
  anonBadge: { backgroundColor: '#CCFBF1', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  anonText: { fontSize: 10, color: '#0F766E' },
  subtitle: { fontSize: 12, color: colors.textSecondary },
  enterCol: { alignItems: 'flex-end' },
  enterArrow: {
    width: 28,
    height: 28,
    textAlign: 'center',
    lineHeight: 28,
    backgroundColor: '#CCFBF1',
    borderRadius: 14,
    color: colors.teal,
    overflow: 'hidden',
  },
  online: { fontSize: 10, color: colors.textMuted, marginTop: 4 },
  preview: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: radius.sm,
    padding: spacing.sm + 4,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  previewTitle: { fontSize: 10, fontWeight: '600', color: '#334155', marginBottom: 8 },
  previewItem: { paddingVertical: 6 },
  previewItemBorder: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.6)', marginTop: 4, paddingTop: 8 },
  previewItemTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, marginBottom: 4 },
  previewPostTitle: { flex: 1, fontSize: 12, fontWeight: '500', color: colors.textPrimary },
  previewTime: { fontSize: 10, color: colors.textMuted },
  previewStats: { fontSize: 10, color: colors.textMuted },
});
