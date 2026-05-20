import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Search } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HotDiscussionsCard } from '../../components/community/HotDiscussionsCard';
import { JapanPostRow } from '../../components/community/JapanPostRow';
import { TagFilterBar } from '../../components/community/TagFilterPanel';
import { TreeholeCard } from '../../components/community/TreeholeCard';
import type { FeedChannel } from '../../api/types';
import { mapJapanPostToPost } from '../../data/postMapper';
import type { CommunityStackParamList } from '../../navigation/types';
import {
  filterCommunityPosts,
  filterHotDiscussions,
  getFeedSectionTitle,
} from './communityFeedLogic';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<CommunityStackParamList, 'CommunityHome'>;

const CHANNELS: { id: FeedChannel; label: string }[] = [
  { id: 'follow', label: '关注' },
  { id: 'discover', label: '发现' },
  { id: 'local', label: '同城' },
];

export function CommunityHomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [channel, setChannel] = useState<FeedChannel>('discover');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagFilterExpanded, setTagFilterExpanded] = useState(false);

  const filteredJapanPosts = useMemo(
    () => filterCommunityPosts(channel, selectedTags),
    [channel, selectedTags],
  );

  const posts = useMemo(
    () => filteredJapanPosts.map(mapJapanPostToPost),
    [filteredJapanPosts],
  );

  const hotTopics = useMemo(
    () => filterHotDiscussions(selectedTags),
    [selectedTags],
  );

  const sectionTitle = getFeedSectionTitle(channel);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId],
    );
  };

  const ListHeader = (
    <>
      <TreeholeCard
        onPress={() => Alert.alert('树洞', '匿名树洞功能即将上线')}
      />
      <HotDiscussionsCard
        topics={hotTopics}
        onTopicPress={id => {
          const topic = hotTopics.find(t => t.id === id);
          const post =
            posts.find(p => p.id === id) ??
            (topic ? posts.find(p => p.domain === topic.domain) : undefined);
          if (post) {
            navigation.navigate('PostDetail', { postId: post.id });
          }
        }}
      />
      <View style={styles.feedHeader}>
        <Text style={styles.feedTitle}>{sectionTitle}</Text>
        <Text style={styles.feedCount}>{posts.length}条</Text>
      </View>
    </>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.channelRow}>
          {CHANNELS.map((c, index) => {
            const active = channel === c.id;
            return (
              <Pressable
                key={c.id}
                style={styles.channelTab}
                onPress={() => setChannel(c.id)}>
                <Text style={[styles.channelText, active && styles.channelTextActive]}>
                  {c.label}
                </Text>
                {active ? <View style={styles.channelUnderline} /> : null}
                {c.id === 'follow' && index === 0 ? (
                  <View style={styles.unreadDot} />
                ) : null}
              </Pressable>
            );
          })}
        </View>
        <Pressable
          style={styles.searchBtn}
          onPress={() => navigation.navigate('Search')}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="搜索">
          <Search size={20} color={colors.iconSecondary} strokeWidth={2} />
        </Pressable>
      </View>

      {channel === 'discover' ? (
        <TagFilterBar
          expanded={tagFilterExpanded}
          selectedTags={selectedTags}
          onToggleTag={handleTagToggle}
          onReset={() => setSelectedTags([])}
          onConfirm={() => setTagFilterExpanded(false)}
          onClose={() => setTagFilterExpanded(false)}
          onOpen={() => setTagFilterExpanded(true)}
        />
      ) : null}

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <JapanPostRow
            post={item}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            onUserPress={() =>
              navigation.navigate('UserProfile', { userId: item.author.id })
            }
            onCompanyPress={() =>
              Alert.alert('企业', item.company?.name ?? '')
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📄</Text>
            <Text style={styles.emptyTitle}>暂无相关内容</Text>
            <Text style={styles.emptyDesc}>
              {selectedTags.length > 0 ? '试试调整标签筛选' : '还没有相关内容'}
            </Text>
            <Pressable
              style={styles.emptyBtn}
              onPress={() =>
                navigation.getParent()?.navigate('PublishTab', { screen: 'PublishCompose' })
              }>
              <Text style={styles.emptyBtnText}>发布第一篇帖子</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingRight: spacing.sm,
    height: 56,
  },
  channelRow: { flex: 1, flexDirection: 'row' },
  channelTab: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  channelText: { fontSize: 16, fontWeight: '600', color: colors.textSecondary },
  channelTextActive: { color: colors.primary },
  channelUnderline: {
    position: 'absolute',
    bottom: 0,
    width: 32,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
  },
  unreadDot: {
    position: 'absolute',
    top: 14,
    right: '28%',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.danger,
  },
  searchBtn: { padding: 8 },
  listContent: {
    paddingBottom: spacing.xl,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: colors.card,
  },
  feedTitle: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  feedCount: { fontSize: 12, color: colors.textMuted },
  empty: { alignItems: 'center', paddingVertical: 48, paddingHorizontal: spacing.lg },
  emptyIcon: { fontSize: 40, marginBottom: spacing.md },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginBottom: 8 },
  emptyDesc: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.md },
  emptyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyBtnText: { color: colors.white, fontSize: 14, fontWeight: '500' },
});
