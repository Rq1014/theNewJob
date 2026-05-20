import React, { useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getConversationById, mockChatMessages } from '../../data/messages';
import type { MessagesStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<MessagesStackParamList, 'Chat'>;

export function ChatScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const conversation = getConversationById(route.params.conversationId);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(mockChatMessages);

  if (!conversation) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>会话不存在</Text>
      </View>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        fromMe: true,
        content: input.trim(),
        time: new Date().toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Image source={{ uri: conversation.avatar }} style={styles.headerAvatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName} numberOfLines={1}>
            {conversation.userName}
          </Text>
          <Text style={styles.headerStatus}>
            {conversation.online ? '在线' : '离线'}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Text style={styles.actionIcon}>📞</Text>
          <Text style={styles.actionIcon}>📹</Text>
          <Text style={styles.actionIcon}>⋯</Text>
        </View>
      </View>

      <FlatList
        style={styles.messageList}
        contentContainerStyle={styles.messageContent}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.fromMe && styles.bubbleRowMe]}>
            <View style={[styles.bubble, item.fromMe ? styles.bubbleMe : styles.bubbleOther]}>
              <Text style={[styles.bubbleText, item.fromMe && styles.bubbleTextMe]}>
                {item.content}
              </Text>
            </View>
            <Text style={styles.msgTime}>{item.time}</Text>
          </View>
        )}
      />

      <View style={[styles.inputBar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <TextInput
          style={styles.input}
          placeholder="发送消息..."
          placeholderTextColor={colors.textMuted}
          value={input}
          onChangeText={setInput}
          multiline
        />
        <Pressable style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendText}>发送</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  empty: { textAlign: 'center', marginTop: 48, color: colors.textMuted },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  backBtn: { width: 32, height: 32, justifyContent: 'center' },
  backText: { fontSize: 22, color: colors.textPrimary },
  headerAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F1F5F9' },
  headerInfo: { flex: 1 },
  headerName: { fontSize: 15, fontWeight: '500', color: colors.textPrimary },
  headerStatus: { fontSize: 12, color: colors.textMuted },
  headerActions: { flexDirection: 'row', gap: 12 },
  actionIcon: { fontSize: 18 },
  messageList: { flex: 1 },
  messageContent: { padding: spacing.md, gap: 12 },
  bubbleRow: { alignItems: 'flex-start', marginBottom: 4 },
  bubbleRowMe: { alignItems: 'flex-end' },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.lg,
  },
  bubbleOther: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomLeftRadius: 4,
  },
  bubbleMe: {
    backgroundColor: colors.emerald,
    borderBottomRightRadius: 4,
  },
  bubbleText: { fontSize: 15, lineHeight: 22, color: colors.textPrimary },
  bubbleTextMe: { color: colors.white },
  msgTime: { fontSize: 11, color: colors.textMuted, marginTop: 4, paddingHorizontal: 4 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
    color: colors.textPrimary,
  },
  sendBtn: {
    backgroundColor: colors.emerald,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  sendText: { color: colors.white, fontSize: 15, fontWeight: '600' },
});
