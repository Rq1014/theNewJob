import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { postApi, userApi } from '../../api/services';
import { PostCard } from '../../components/PostCard';
import { ScreenHeader } from '../../components/ScreenHeader';
import type { Post, UserProfile } from '../../api/types';
import type { CommunityStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<CommunityStackParamList, 'UserProfile'>;

export function UserProfileScreen({ navigation, route }: Props) {
  const { userId } = route.params;
  const [user, setUser] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const u = await userApi.getUser(userId);
      setUser(u);
      const res = await postApi.list({ channel: 'discover' });
      setPosts(res.items.filter(p => p.author.id === userId));
    })();
  }, [userId]);

  return (
    <View style={styles.container}>
      <ScreenHeader title="用户主页" onBack={() => navigation.goBack()} />
      {user ? (
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(user.nickname || '?')[0]}</Text>
          </View>
          <Text style={styles.name}>{user.nickname}</Text>
          {user.university ? (
            <Text style={styles.meta}>{user.university}</Text>
          ) : null}
          {user.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}
        </View>
      ) : null}
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: {
    backgroundColor: colors.card,
    margin: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 24, color: colors.white, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', marginTop: 12, color: colors.textPrimary },
  meta: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  bio: { fontSize: 14, color: colors.textSecondary, marginTop: 8, textAlign: 'center' },
  list: { padding: spacing.md },
});
