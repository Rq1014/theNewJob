import React, { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { draftApi, postApi } from '../../api/services';
import type { PublishComposeNavigationProp } from '../../navigation/navigationProps';
import type { PublishStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = Omit<
  NativeStackScreenProps<PublishStackParamList, 'PublishCompose'>,
  'navigation'
> & {
  navigation: PublishComposeNavigationProp;
};

export function PublishComposeScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const { publishType, postTypeId, postTypeLabel, treeholeName, treeholeIcon } =
    route.params;
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(publishType === 'treehole');
  const [loading, setLoading] = useState(false);

  const headerTitle =
    publishType === 'post' ? postTypeLabel ?? '发布帖子' : treeholeName ?? '树洞发帖';

  useEffect(() => {
    if (route.params.draftId) {
      draftApi.list().then(list => {
        const d = list.find(x => x.id === route.params.draftId);
        if (d) {
          setTitle(d.title ?? '');
          setContent(d.content);
        }
      });
    }
  }, [route.params.draftId]);

  const publish = async () => {
    if (!content.trim()) {
      Alert.alert('提示', '请输入内容');
      return;
    }
    try {
      setLoading(true);
      await postApi.create({
        domain: publishType === 'post' ? 'life' : 'life',
        category: postTypeId ?? 'experience',
        city: 'tokyo',
        title: title.trim() || content.trim().slice(0, 40),
        content: content.trim(),
        tags: [],
      });
      Alert.alert('发布成功', '', [
        {
          text: '好的',
          onPress: () =>
            navigation.getParent()?.navigate('CommunityTab', { screen: 'CommunityHome' }),
        },
      ]);
    } catch (e) {
      Alert.alert('发布失败', (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const placeholder =
    publishType === 'post'
      ? `分享你的${postTypeLabel ?? '经验'}...`
      : '说出你的心声...';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {headerTitle}
        </Text>
        <Pressable
          style={[styles.publishBtn, (!content.trim() || loading) && styles.publishBtnDisabled]}
          onPress={publish}
          disabled={!content.trim() || loading}>
          <Text style={styles.publishBtnText}>{loading ? '...' : '发布'}</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.flex} contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        {publishType === 'treehole' && treeholeName ? (
          <View style={styles.treeholeBox}>
            <View style={styles.treeholeHeader}>
              <Text style={styles.treeholeIcon}>{treeholeIcon ?? '💬'}</Text>
              <View>
                <Text style={styles.treeholeName}>{treeholeName}</Text>
                <Text style={styles.treeholeSub}>选择发布身份</Text>
              </View>
            </View>
            <View style={styles.identityRow}>
              <Text style={styles.identityLabel}>
                {isAnonymous ? '🔒 匿名发布' : '🛡 认证身份发布'}
              </Text>
              <Switch
                value={isAnonymous}
                onValueChange={setIsAnonymous}
                trackColor={{ false: colors.primary, true: '#9333EA' }}
              />
            </View>
            {isAnonymous ? (
              <Text style={styles.anonHint}>
                ℹ️ 匿名仅对其他用户隐藏身份，平台仍会进行安全审核
              </Text>
            ) : null}
          </View>
        ) : null}

        {publishType === 'post' ? (
          <View style={styles.certBox}>
            <Text style={styles.certText}>🛡 以认证身份发布</Text>
            <Text style={styles.certSub}>前台展示昵称 + 学校认证</Text>
          </View>
        ) : null}

        {publishType === 'post' ? (
          <TextInput
            style={styles.titleInput}
            placeholder="标题（可选）"
            placeholderTextColor={colors.textMuted}
            value={title}
            onChangeText={setTitle}
          />
        ) : null}

        <TextInput
          style={styles.contentInput}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          autoFocus
        />
      </ScrollView>

      <View style={[styles.toolbar, { paddingBottom: insets.bottom + spacing.sm }]}>
        <Text style={styles.toolBtn}>🖼</Text>
        <Text style={styles.toolBtn}>🏷</Text>
        <Text style={styles.toolBtn}>📍</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  back: { fontSize: 22, color: colors.textPrimary, width: 32 },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.textPrimary, textAlign: 'center' },
  publishBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  publishBtnDisabled: { opacity: 0.4 },
  publishBtnText: { color: colors.white, fontSize: 14, fontWeight: '600' },
  body: { padding: spacing.md, paddingBottom: spacing.lg },
  treeholeBox: {
    backgroundColor: '#FAF5FF',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    marginBottom: spacing.md,
  },
  treeholeHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  treeholeIcon: { fontSize: 28 },
  treeholeName: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  treeholeSub: { fontSize: 12, color: colors.textSecondary },
  identityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.sm + 4,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  identityLabel: { fontSize: 14, fontWeight: '500', color: colors.textPrimary },
  anonHint: { fontSize: 11, color: '#7C3AED', marginTop: spacing.sm, lineHeight: 16 },
  certBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: spacing.sm + 4,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: spacing.md,
  },
  certText: { fontSize: 14, fontWeight: '500', color: '#1D4ED8' },
  certSub: { fontSize: 12, color: '#2563EB' },
  titleInput: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    paddingVertical: 8,
  },
  contentInput: {
    minHeight: 200,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  toolbar: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  toolBtn: { fontSize: 22, padding: 4 },
});
