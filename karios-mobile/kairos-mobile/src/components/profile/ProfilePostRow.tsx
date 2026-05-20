import React, { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Post } from '../../api/types';
import { categoryLabels } from '../../data/communityUtils';
import { colors, radius, spacing } from '../../theme';

interface Props {
  post: Post;
  onPress: () => void;
}

const MENU_ITEMS = [
  { id: 'edit', label: '编辑' },
  { id: 'pin', label: '置顶' },
  { id: 'private', label: '仅自己可见' },
  { id: 'stats', label: '查看数据' },
  { id: 'delete', label: '删除', danger: true },
];

export function ProfilePostRow({ post, onPress }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const categoryLabel = categoryLabels[post.category] ?? post.category;

  const onMenuAction = (id: string) => {
    setMenuOpen(false);
    Alert.alert('提示', `${MENU_ITEMS.find(m => m.id === id)?.label} 功能即将上线`);
  };

  return (
    <View style={styles.wrap}>
      <Pressable onPress={onPress}>
        <View style={styles.topRow}>
          <View style={styles.badges}>
            <View
              style={[
                styles.domainBadge,
                post.domain === 'career' ? styles.domainCareer : styles.domainLife,
              ]}>
              <Text
                style={[
                  styles.domainText,
                  post.domain === 'career' ? styles.domainCareerText : styles.domainLifeText,
                ]}>
                {categoryLabel}
              </Text>
            </View>
            {post.featured ? (
              <View style={styles.featuredBadge}>
                <Text style={styles.featuredText}>精选</Text>
              </View>
            ) : null}
          </View>
          <Pressable
            hitSlop={12}
            onPress={e => {
              e?.stopPropagation?.();
              setMenuOpen(true);
            }}>
            <Text style={styles.moreBtn}>⋮</Text>
          </Pressable>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {post.title}
        </Text>
        <Text style={styles.summary} numberOfLines={2}>
          {post.summary}
        </Text>
        {post.company ? (
          <View style={styles.companyRow}>
            <Text style={styles.companyLogo}>{post.company.logo}</Text>
            <Text style={styles.companyName} numberOfLines={1}>
              {post.company.name}
              {post.position ? ` · ${post.position}` : ''}
            </Text>
          </View>
        ) : null}
        {(post.rating || post.helpful) ? (
          <View style={styles.metrics}>
            {post.rating ? <Text style={styles.metric}>★ {post.rating}</Text> : null}
            {post.helpful ? <Text style={styles.metric}>👍 {post.helpful}%实用</Text> : null}
          </View>
        ) : null}
        <Text style={styles.time}>{post.timestamp}</Text>
        <View style={styles.stats}>
          <Text style={styles.stat}>♥ {post.likes}</Text>
          <Text style={styles.stat}>💬 {post.comments}</Text>
          <Text style={styles.stat}>🔖 {post.bookmarks}</Text>
          <Text style={[styles.stat, styles.statRight]}>👁 {post.views}</Text>
        </View>
      </Pressable>

      <Modal visible={menuOpen} transparent animationType="fade">
        <View style={styles.menuOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setMenuOpen(false)} />
          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, i) => (
              <React.Fragment key={item.id}>
                {item.id === 'delete' ? <View style={styles.menuDivider} /> : null}
                <Pressable style={styles.menuItem} onPress={() => onMenuAction(item.id)}>
                  <Text style={[styles.menuText, item.danger && styles.menuDanger]}>
                    {item.label}
                  </Text>
                </Pressable>
              </React.Fragment>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  badges: { flexDirection: 'row', gap: 6 },
  domainBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  domainCareer: { backgroundColor: '#DBEAFE' },
  domainLife: { backgroundColor: '#DCFCE7' },
  domainText: { fontSize: 10, fontWeight: '500' },
  domainCareerText: { color: '#1D4ED8' },
  domainLifeText: { color: '#15803D' },
  featuredBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  featuredText: { fontSize: 10, color: '#B45309' },
  moreBtn: { fontSize: 18, color: colors.textMuted, paddingHorizontal: 4 },
  title: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, lineHeight: 22, marginBottom: 6 },
  summary: { fontSize: 13, color: colors.textSecondary, lineHeight: 20, marginBottom: 8 },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
  },
  companyLogo: { fontSize: 16 },
  companyName: { flex: 1, fontSize: 13, fontWeight: '500', color: colors.textPrimary },
  metrics: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  metric: { fontSize: 12, fontWeight: '500', color: '#334155' },
  time: { fontSize: 12, color: colors.textMuted, marginBottom: 8 },
  stats: { flexDirection: 'row', gap: 16 },
  stat: { fontSize: 12, color: colors.textMuted },
  statRight: { marginLeft: 'auto' },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  menuCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    minWidth: 200,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: { paddingVertical: 14, paddingHorizontal: spacing.md },
  menuText: { fontSize: 15, color: colors.textPrimary },
  menuDanger: { color: colors.danger },
  menuDivider: { height: 1, backgroundColor: colors.border },
});
