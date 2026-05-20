import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  getBigTreeholeCategoryLabel,
  getJoinedBigTreeholes,
  getJoinedSmallTreeholes,
  getSmallTreeholeIcon,
  getSmallTreeholeTags,
} from '../../data/treeholePublish';
import type { PublishStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<PublishStackParamList, 'SelectTreehole'>;

export function SelectTreeholeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const bigList = getJoinedBigTreeholes();
  const smallList = getJoinedSmallTreeholes();
  const hasAny = bigList.length > 0 || smallList.length > 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>选择树洞</Text>
      </View>

      {!hasAny ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>💬</Text>
          <Text style={styles.emptyTitle}>还没有加入树洞</Text>
          <Text style={styles.emptyDesc}>先去发现感兴趣的树洞吧</Text>
          <Pressable
            style={styles.emptyBtn}
            onPress={() => Alert.alert('提示', '树洞发现功能即将上线')}>
            <Text style={styles.emptyBtnText}>去加入树洞</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {bigList.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                大树洞 <Text style={styles.sectionCount}>{bigList.length}个</Text>
              </Text>
              {bigList.map(treehole => (
                <Pressable
                  key={treehole.id}
                  style={styles.bigCard}
                  onPress={() =>
                    navigation.navigate('PublishCompose', {
                      publishType: 'treehole',
                      treeholeId: treehole.id,
                      treeholeName: treehole.name,
                      treeholeIcon: treehole.icon,
                    })
                  }>
                  <View style={styles.bigCardTop}>
                    <View style={styles.bigIconBox}>
                      <Text style={styles.bigIcon}>{treehole.icon}</Text>
                    </View>
                    <View style={styles.bigBody}>
                      <View style={styles.bigTitleRow}>
                        <Text style={styles.bigName}>{treehole.name}</Text>
                        <View style={styles.categoryBadge}>
                          <Text style={styles.categoryText}>
                            {getBigTreeholeCategoryLabel(treehole.type)}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.bigDesc}>{treehole.description}</Text>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                  </View>
                  <Text style={styles.online}>🟢 {treehole.activeUsers} 在线</Text>
                  <View style={styles.tagRow}>
                    {treehole.hotTags.slice(0, 4).map(tag => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}># {tag}</Text>
                      </View>
                    ))}
                  </View>
                </Pressable>
              ))}
            </View>
          ) : null}

          {smallList.length > 0 ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                小树洞 <Text style={styles.sectionCount}>{smallList.length}个</Text>
              </Text>
              {smallList.map(treehole => {
                const icon = getSmallTreeholeIcon(treehole);
                const tags = getSmallTreeholeTags(treehole);
                return (
                  <Pressable
                    key={treehole.id}
                    style={styles.smallCard}
                    onPress={() =>
                      navigation.navigate('PublishCompose', {
                        publishType: 'treehole',
                        treeholeId: treehole.id,
                        treeholeName: treehole.name,
                        treeholeIcon: icon,
                      })
                    }>
                    <Text style={styles.smallIcon}>{icon}</Text>
                    <View style={styles.smallBody}>
                      <Text style={styles.smallName}>{treehole.name}</Text>
                      <Text style={styles.smallFrom}>来自 {treehole.belongToName}</Text>
                      <Text style={styles.smallDesc}>{treehole.description}</Text>
                      <View style={styles.smallTagRow}>
                        {tags.map(tag => (
                          <View
                            key={tag}
                            style={[
                              styles.smallTag,
                              tag === '匿名' && styles.smallTagPurple,
                              tag === '倾诉' && styles.smallTagPink,
                              tag === '搭子' && styles.smallTagBlue,
                            ]}>
                            <Text
                              style={[
                                styles.smallTagText,
                                tag === '匿名' && { color: '#7C3AED' },
                                tag === '倾诉' && { color: '#DB2777' },
                                tag === '搭子' && { color: '#2563EB' },
                              ]}>
                              {tag}
                            </Text>
                          </View>
                        ))}
                        <Text style={styles.memberCount}>{treehole.members} 成员</Text>
                      </View>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </ScrollView>
      )}
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
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  section: { marginBottom: spacing.lg },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: spacing.sm },
  sectionCount: { fontWeight: '400', color: colors.textMuted },
  bigCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md + 4,
    marginBottom: spacing.sm + 4,
  },
  bigCardTop: { flexDirection: 'row', gap: spacing.sm + 4, marginBottom: spacing.sm },
  bigIconBox: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigIcon: { fontSize: 24 },
  bigBody: { flex: 1 },
  bigTitleRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: 4 },
  bigName: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  categoryBadge: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: { fontSize: 10, color: colors.textSecondary },
  bigDesc: { fontSize: 13, color: colors.textSecondary, lineHeight: 19 },
  online: { fontSize: 12, color: colors.textMuted, marginBottom: spacing.sm },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { backgroundColor: '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.full },
  tagText: { fontSize: 10, color: '#334155' },
  smallCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  smallIcon: { fontSize: 24 },
  smallBody: { flex: 1 },
  smallName: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  smallFrom: { fontSize: 11, color: colors.textMuted, marginBottom: 4 },
  smallDesc: { fontSize: 12, color: colors.textSecondary, lineHeight: 17, marginBottom: 6 },
  smallTagRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 6 },
  smallTag: { backgroundColor: '#F1F5F9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  smallTagPurple: { backgroundColor: '#F3E8FF' },
  smallTagPink: { backgroundColor: '#FCE7F3' },
  smallTagBlue: { backgroundColor: '#DBEAFE' },
  smallTagText: { fontSize: 10, color: '#475569' },
  memberCount: { fontSize: 10, color: colors.textMuted },
  chevron: { fontSize: 18, color: colors.textMuted },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { fontSize: 17, fontWeight: '600', color: colors.textPrimary, marginBottom: 8 },
  emptyDesc: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.lg },
  emptyBtn: {
    backgroundColor: '#9333EA',
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderRadius: radius.md,
  },
  emptyBtnText: { color: colors.white, fontSize: 14, fontWeight: '600' },
});
