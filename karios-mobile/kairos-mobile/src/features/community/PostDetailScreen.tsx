import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { postApi } from '../../api/services';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Button } from '../../components/ui/Button';
import type { Comment, Post } from '../../api/types';
import type { CommunityStackParamList } from '../../navigation/types';
import { categoryLabels } from '../../data/communityUtils';
import { cityNames, type City } from '../../data/japan-community';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<CommunityStackParamList, 'PostDetail'>;

export function PostDetailScreen({ navigation, route }: Props) {
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const [p, c] = await Promise.all([
      postApi.getById(postId),
      postApi.getComments(postId),
    ]);
    setPost(p);
    setComments(c);
  }, [postId]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleLike = async () => {
    if (!post) return;
    if (post.liked) {
      await postApi.unlike(post.id);
      setPost({ ...post, liked: false, likes: post.likes - 1 });
    } else {
      await postApi.like(post.id);
      setPost({ ...post, liked: true, likes: post.likes + 1 });
    }
  };

  const submitComment = async () => {
    if (!commentText.trim()) return;
    try {
      setLoading(true);
      const c = await postApi.addComment(postId, commentText.trim());
      setComments(prev => [...prev, c]);
      setCommentText('');
      if (post) setPost({ ...post, comments: post.comments + 1 });
    } catch (e) {
      Alert.alert('失败', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="帖子详情" onBack={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="帖子详情" onBack={() => navigation.goBack()} />
      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View style={styles.content}>
            <View style={styles.badgeRow}>
              <View
                style={[
                  styles.domainBadge,
                  post.domain === 'career' ? styles.domainCareer : styles.domainLife,
                ]}>
                <Text style={styles.domainBadgeText}>
                  {categoryLabels[post.category] ?? post.category}
                </Text>
              </View>
              {post.city ? (
                <Text style={styles.cityBadge}>{cityNames[post.city as City]}</Text>
              ) : null}
              {post.featured ? <Text style={styles.featuredBadge}>精选</Text> : null}
            </View>
            <Text style={styles.title}>{post.title}</Text>
            {post.company ? (
              <View style={styles.companyRow}>
                <Text>{post.company.logo} {post.company.name}</Text>
                {post.position ? <Text style={styles.position}> · {post.position}</Text> : null}
              </View>
            ) : null}
            {(post.rating || post.helpful) ? (
              <Text style={styles.metrics}>
                {post.rating ? `★ ${post.rating}  ` : ''}
                {post.helpful ? `${post.helpful}% 实用` : ''}
              </Text>
            ) : null}
            <PressableAuthor
              name={post.author.name}
              university={post.author.university}
              onPress={() =>
                navigation.navigate('UserProfile', { userId: post.author.id })
              }
            />
            <Text style={styles.body}>{post.content || post.summary}</Text>
            <View style={styles.tags}>
              {post.tags.map(t => (
                <Text
                  key={t}
                  style={styles.tag}
                  onPress={() => navigation.navigate('TagFeed', { tag: t })}>
                  #{t}
                </Text>
              ))}
            </View>
            <View style={styles.actions}>
              <Text style={styles.action} onPress={toggleLike}>
                {post.liked ? '❤️' : '🤍'} {post.likes}
              </Text>
              <Text style={styles.action}>💬 {post.comments}</Text>
              <Text style={styles.action}>👁 {post.views}</Text>
            </View>
            <Text style={styles.sectionTitle}>评论 ({comments.length})</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentAuthor}>{item.author.name}</Text>
            <Text style={styles.commentBody}>{item.content}</Text>
            <Text style={styles.commentTime}>{item.timestamp}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="写评论..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <Button title="发送" onPress={submitComment} loading={loading} style={styles.sendBtn} />
      </View>
    </View>
  );
}

function PressableAuthor({
  name,
  university,
  onPress,
}: {
  name: string;
  university?: string;
  onPress: () => void;
}) {
  return (
    <Text style={styles.author} onPress={onPress}>
      {name}
      {university ? ` · ${university}` : ''}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    backgroundColor: colors.card,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: radius.lg,
  },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  domainBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  domainCareer: { backgroundColor: '#DBEAFE' },
  domainLife: { backgroundColor: '#DCFCE7' },
  domainBadgeText: { fontSize: 11, fontWeight: '500', color: '#334155' },
  cityBadge: {
    fontSize: 11,
    color: colors.textSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  featuredBadge: {
    fontSize: 11,
    color: '#B45309',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  companyRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  position: { color: colors.textSecondary },
  metrics: { fontSize: 13, color: colors.textSecondary, marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 },
  author: { fontSize: 14, color: colors.primary, marginBottom: 12 },
  body: { fontSize: 15, lineHeight: 24, color: colors.textPrimary },
  tags: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 8 },
  tag: { fontSize: 13, color: colors.primary },
  actions: { flexDirection: 'row', gap: 20, marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  action: { fontSize: 14, color: colors.textSecondary },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 20, color: colors.textPrimary },
  list: { padding: spacing.md, paddingBottom: 80 },
  comment: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  commentAuthor: { fontWeight: '600', fontSize: 14, color: colors.textPrimary },
  commentBody: { fontSize: 14, color: colors.textPrimary, marginTop: 4 },
  commentTime: { fontSize: 12, color: colors.textMuted, marginTop: 4 },
  inputRow: {
    flexDirection: 'row',
    padding: spacing.sm,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  sendBtn: { height: 40, paddingHorizontal: 16 },
});
