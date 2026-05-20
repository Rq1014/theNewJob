import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_PUBLISH_DRAFTS, type PublishDraftItem } from '../../data/publishConstants';
import type { PublishStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<PublishStackParamList, 'Drafts'>;

export function DraftsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [drafts, setDrafts] = useState<PublishDraftItem[]>(MOCK_PUBLISH_DRAFTS);

  const remove = (id: string) => {
    Alert.alert('删除草稿', '确定删除？', [
      { text: '取消', style: 'cancel' },
      {
        text: '删除',
        style: 'destructive',
        onPress: () => setDrafts(prev => prev.filter(d => d.id !== id)),
      },
    ]);
  };

  const continueEdit = (draft: PublishDraftItem) => {
    if (draft.type === 'post') {
      navigation.navigate('PublishCompose', {
        publishType: 'post',
        postTypeId: 'experience',
        postTypeLabel: draft.category ?? '经验分享',
        draftId: draft.id,
      });
    } else {
      navigation.navigate('PublishCompose', {
        publishType: 'treehole',
        treeholeId: 'st2',
        treeholeName: draft.treehole ?? '树洞',
        treeholeIcon: '💭',
        draftId: draft.id,
      });
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>草稿箱</Text>
        <Text style={styles.headerCount}>{drafts.length} 篇草稿</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {drafts.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📥</Text>
            <Text style={styles.emptyTitle}>暂无草稿</Text>
            <Text style={styles.emptyDesc}>编辑中的内容会自动保存在这里</Text>
          </View>
        ) : (
          drafts.map(draft => (
            <View key={draft.id} style={styles.card}>
              <View style={styles.badgeRow}>
                <View
                  style={[
                    styles.typeBadge,
                    draft.type === 'post' ? styles.typePost : styles.typeTreehole,
                  ]}>
                  <Text
                    style={[
                      styles.typeBadgeText,
                      draft.type === 'post' ? styles.typePostText : styles.typeTreeholeText,
                    ]}>
                    {draft.type === 'post' ? '普通帖子' : '树洞'}
                  </Text>
                </View>
                {draft.category ? (
                  <View style={styles.outlineBadge}>
                    <Text style={styles.outlineText}>{draft.category}</Text>
                  </View>
                ) : null}
                {draft.treehole ? (
                  <View style={styles.outlineBadge}>
                    <Text style={styles.outlineText}>{draft.treehole}</Text>
                  </View>
                ) : null}
              </View>
              {draft.title ? (
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {draft.title}
                </Text>
              ) : null}
              <Text style={styles.preview} numberOfLines={2}>
                {draft.content}
              </Text>
              <View style={styles.cardFooter}>
                <Text style={styles.savedAt}>{draft.savedAt}</Text>
                <View style={styles.actions}>
                  <Pressable onPress={() => remove(draft.id)}>
                    <Text style={styles.deleteBtn}>删除</Text>
                  </Pressable>
                  <Pressable style={styles.editBtn} onPress={() => continueEdit(draft)}>
                    <Text style={styles.editBtnText}>继续编辑</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  headerCount: { fontSize: 12, color: colors.textMuted },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm + 4,
  },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  typePost: { backgroundColor: '#DBEAFE' },
  typeTreehole: { backgroundColor: '#F3E8FF' },
  typeBadgeText: { fontSize: 10, fontWeight: '500' },
  typePostText: { color: '#1D4ED8' },
  typeTreeholeText: { color: '#7C3AED' },
  outlineBadge: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  outlineText: { fontSize: 10, color: colors.textSecondary },
  cardTitle: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, marginBottom: 6 },
  preview: { fontSize: 14, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.sm },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  savedAt: { fontSize: 12, color: colors.textMuted },
  actions: { flexDirection: 'row', gap: spacing.sm },
  deleteBtn: { fontSize: 12, color: colors.danger, fontWeight: '500', padding: 6 },
  editBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  editBtnText: { fontSize: 12, color: colors.white, fontWeight: '500' },
  empty: { alignItems: 'center', paddingVertical: 64 },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { fontSize: 17, fontWeight: '600', color: colors.textPrimary, marginBottom: 8 },
  emptyDesc: { fontSize: 14, color: colors.textSecondary },
});
