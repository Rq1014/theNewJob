import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  communityTags,
  type CommunityTag,
  type TagCategory,
} from '../../data/communityConstants';
import { colors, radius, spacing } from '../../theme';

interface Props {
  expanded: boolean;
  selectedTags: string[];
  onToggleTag: (tagId: string) => void;
  onReset: () => void;
  onConfirm: () => void;
  onClose: () => void;
  onOpen: () => void;
}

const GROUPS: { category: TagCategory; title: string; emoji: string }[] = [
  { category: 'campus', title: '校园相关', emoji: '🎓' },
  { category: 'career', title: '求职相关', emoji: '💼' },
  { category: 'life', title: '生活相关', emoji: '☕' },
];

function tagChipStyle(category: TagCategory, selected: boolean) {
  if (!selected) return styles.chipIdle;
  if (category === 'campus') return styles.chipCampusActive;
  if (category === 'career') return styles.chipCareerActive;
  return styles.chipLifeActive;
}

function tagChipTextStyle(category: TagCategory, selected: boolean) {
  if (!selected) return styles.chipTextIdle;
  return styles.chipTextActive;
}

export function TagFilterBar({
  expanded,
  selectedTags,
  onToggleTag,
  onReset,
  onConfirm,
  onClose,
  onOpen,
}: Props) {
  if (!expanded) {
    return (
      <View style={styles.collapsedBar}>
        {selectedTags.length === 0 ? (
          <Pressable style={styles.filterBtn} onPress={onOpen}>
            <Text style={styles.filterBtnText}>⚙ 选择兴趣标签</Text>
          </Pressable>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectedScroll}>
            <Pressable style={styles.selectedCountBtn} onPress={onOpen}>
              <Text style={styles.selectedCountText}>已选 {selectedTags.length} 个</Text>
            </Pressable>
            <Text style={styles.separator}>｜</Text>
            {selectedTags.map(tagId => {
              const tag = communityTags.find(t => t.id === tagId);
              if (!tag) return null;
              return (
                <Pressable
                  key={tagId}
                  style={[styles.selectedChip, chipColorForCategory(tag.category)]}
                  onPress={() => onToggleTag(tagId)}>
                  <Text style={[styles.selectedChipText, chipTextForCategory(tag.category)]}>
                    {tag.label} ×
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }

  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <Text style={styles.panelTitle}>⚙ 标签筛选</Text>
        {selectedTags.length > 0 ? (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>已选 {selectedTags.length}</Text>
          </View>
        ) : null}
        <Pressable onPress={onClose} hitSlop={12} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.panelBody} nestedScrollEnabled>
        {GROUPS.map(group => (
          <View key={group.category} style={styles.group}>
            <Text style={styles.groupTitle}>
              {group.emoji} {group.title}
            </Text>
            <View style={styles.chipWrap}>
              {communityTags
                .filter(t => t.category === group.category)
                .map(tag => {
                  const selected = selectedTags.includes(tag.id);
                  return (
                    <Pressable
                      key={tag.id}
                      style={[styles.chip, tagChipStyle(tag.category, selected)]}
                      onPress={() => onToggleTag(tag.id)}>
                      <Text style={[styles.chipText, tagChipTextStyle(tag.category, selected)]}>
                        {selected ? '✓ ' : ''}
                        {tag.label}
                      </Text>
                    </Pressable>
                  );
                })}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.panelFooter}>
        <Pressable style={styles.resetBtn} onPress={onReset}>
          <Text style={styles.resetBtnText}>↺ 重置</Text>
        </Pressable>
        <Pressable style={styles.confirmBtn} onPress={onConfirm}>
          <Text style={styles.confirmBtnText}>
            确认{selectedTags.length > 0 ? ` (${selectedTags.length})` : ''}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function chipColorForCategory(category: TagCategory) {
  if (category === 'career') return { backgroundColor: '#DBEAFE', borderColor: '#BFDBFE' };
  if (category === 'campus') return { backgroundColor: '#F3E8FF', borderColor: '#E9D5FF' };
  return { backgroundColor: '#DCFCE7', borderColor: '#BBF7D0' };
}

function chipTextForCategory(category: TagCategory) {
  if (category === 'career') return { color: '#1D4ED8' };
  if (category === 'campus') return { color: '#7C3AED' };
  return { color: '#15803D' };
}

const styles = StyleSheet.create({
  collapsedBar: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: colors.card,
    minHeight: 44,
    justifyContent: 'center',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterBtnText: { fontSize: 14, color: colors.textSecondary, fontWeight: '500' },
  selectedScroll: { flexDirection: 'row', alignItems: 'center' },
  selectedCountBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#EFF6FF',
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  selectedCountText: { fontSize: 14, color: colors.primary, fontWeight: '500' },
  separator: { color: colors.textMuted, fontSize: 14 },
  selectedChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
    marginRight: 6,
  },
  selectedChipText: { fontSize: 12, fontWeight: '500' },
  panel: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: '#F8FAFC',
    maxHeight: 420,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 8,
  },
  panelTitle: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  countBadge: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  countBadgeText: { fontSize: 11, color: '#1D4ED8' },
  closeBtn: { padding: 4 },
  closeText: { fontSize: 16, color: colors.textMuted },
  panelBody: { maxHeight: 280, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  group: { marginBottom: spacing.md },
  groupTitle: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, marginBottom: 8 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    borderWidth: 1,
  },
  chipIdle: { backgroundColor: colors.card, borderColor: colors.border },
  chipCampusActive: { backgroundColor: '#7C3AED', borderColor: '#7C3AED' },
  chipCareerActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipLifeActive: { backgroundColor: '#16A34A', borderColor: '#16A34A' },
  chipText: { fontSize: 13 },
  chipTextIdle: { color: '#334155' },
  chipTextActive: { color: colors.white },
  panelFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  resetBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: radius.md,
    alignItems: 'center',
  },
  resetBtnText: { fontSize: 14, color: '#334155', fontWeight: '500' },
  confirmBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  confirmBtnText: { fontSize: 14, color: colors.white, fontWeight: '500' },
});
