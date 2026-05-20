import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ContentDomain } from '../../api/types';
import { colors, radius, spacing } from '../../theme';

export interface HotTopic {
  id: string;
  title: string;
  replies: number;
  domain: ContentDomain;
}

interface Props {
  topics: HotTopic[];
  onTopicPress?: (id: string) => void;
}

export function HotDiscussionsCard({ topics, onTopicPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 今日热议</Text>
        <Pressable>
          <Text style={styles.more}>更多 ↗</Text>
        </Pressable>
      </View>
      {topics.length === 0 ? (
        <Text style={styles.empty}>暂无相关热议话题</Text>
      ) : (
        topics.map(topic => (
          <Pressable
            key={topic.id}
            style={styles.topicRow}
            onPress={() => onTopicPress?.(topic.id)}>
            <View
              style={[
                styles.domainBadge,
                topic.domain === 'career' ? styles.domainCareer : styles.domainLife,
              ]}>
              <Text
                style={[
                  styles.domainText,
                  topic.domain === 'career' ? styles.domainCareerText : styles.domainLifeText,
                ]}>
                {topic.domain === 'career' ? '就活' : '生活'}
              </Text>
            </View>
            <Text style={styles.topicTitle} numberOfLines={1}>
              {topic.title}
            </Text>
            <Text style={styles.replies}>{topic.replies}回复</Text>
          </Pressable>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.sm + 4,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerTitle: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  more: { fontSize: 12, color: colors.primary },
  empty: { textAlign: 'center', paddingVertical: spacing.md, color: colors.textMuted, fontSize: 14 },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  domainBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  domainCareer: { backgroundColor: '#DBEAFE' },
  domainLife: { backgroundColor: '#DCFCE7' },
  domainText: { fontSize: 11, fontWeight: '500' },
  domainCareerText: { color: '#1D4ED8' },
  domainLifeText: { color: '#15803D' },
  topicTitle: { flex: 1, fontSize: 14, color: '#334155' },
  replies: { fontSize: 12, color: colors.textMuted },
});
