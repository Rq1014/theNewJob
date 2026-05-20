import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getBadgeColors, mockConversations } from '../../data/messages';
import type { MessagesStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<MessagesStackParamList, 'MessagesHome'>;

export function MessagesHomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = useMemo(() => {
    if (!searchQuery.trim()) return mockConversations;
    const q = searchQuery.trim().toLowerCase();
    return mockConversations.filter(
      c =>
        c.userName.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>消息</Text>
          <Pressable hitSlop={12}>
            <Text style={styles.moreBtn}>⋯</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.search}
          placeholder="搜索聊天记录、用户或资料"
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const badgeColors = item.userBadge
            ? getBadgeColors(item.userBadge)
            : null;
          return (
            <Pressable
              style={styles.row}
              onPress={() => navigation.navigate('Chat', { conversationId: item.id })}>
              <View style={styles.avatarWrap}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                {item.online ? <View style={styles.onlineDot} /> : null}
              </View>
              <View style={styles.content}>
                <View style={styles.topLine}>
                  <View style={styles.nameRow}>
                    <Text style={styles.userName} numberOfLines={1}>
                      {item.userName}
                    </Text>
                    {item.userBadge && badgeColors ? (
                      <View style={[styles.badge, { backgroundColor: badgeColors.bg }]}>
                        <Text style={[styles.badgeText, { color: badgeColors.text }]}>
                          {item.userBadge}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.bottomLine}>
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.lastMessage}
                  </Text>
                  {item.unread > 0 ? (
                    <View style={styles.unread}>
                      <Text style={styles.unreadText}>
                        {item.unread > 99 ? '99+' : item.unread}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: { fontSize: 24, fontWeight: '700', color: colors.textPrimary },
  moreBtn: { fontSize: 22, color: colors.textSecondary, padding: 4 },
  search: {
    backgroundColor: '#F1F5F9',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    alignItems: 'flex-start',
    gap: spacing.sm + 4,
  },
  avatarWrap: { position: 'relative' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F1F5F9' },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
  content: { flex: 1 },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 6, marginRight: 8 },
  userName: { fontSize: 15, fontWeight: '500', color: colors.textPrimary, flexShrink: 1 },
  badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  badgeText: { fontSize: 10, fontWeight: '500' },
  time: { fontSize: 12, color: colors.textMuted },
  bottomLine: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  lastMessage: { flex: 1, fontSize: 14, color: colors.textSecondary },
  unread: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  unreadText: { fontSize: 11, color: colors.white, fontWeight: '600' },
  separator: { height: 1, backgroundColor: '#F8FAFC', marginLeft: 76 },
});
