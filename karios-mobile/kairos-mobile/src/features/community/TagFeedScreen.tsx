import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { postApi } from '../../api/services';
import { JapanPostRow } from '../../components/community/JapanPostRow';
import { ScreenHeader } from '../../components/ScreenHeader';
import type { Post } from '../../api/types';
import type { CommunityStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<CommunityStackParamList, 'TagFeed'>;

export function TagFeedScreen({ navigation, route }: Props) {
  const { tag } = route.params;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postApi.list({ channel: 'discover', tag }).then(res => setPosts(res.items));
  }, [tag]);

  return (
    <View style={styles.container}>
      <ScreenHeader title={`#${tag}`} onBack={() => navigation.goBack()} />
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <JapanPostRow
            post={item}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { paddingBottom: spacing.md, backgroundColor: colors.card },
});
