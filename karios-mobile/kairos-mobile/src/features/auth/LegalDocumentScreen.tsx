import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenHeader } from '../../components/ScreenHeader';
import type { AuthStackParamList } from '../../navigation/types';
import { colors, spacing } from '../../theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'LegalDocument'>;

const CONTENT: Record<'terms' | 'privacy', { title: string; body: string }> = {
  terms: {
    title: '用户协议',
    body:
      '欢迎使用 Kairos。使用本应用即表示您同意遵守本协议及相关社区规范。\n\n' +
      '1. 您应提供真实、准确的注册信息。\n' +
      '2. 请勿发布违法、侵权或骚扰性内容。\n' +
      '3. 我们保留在必要时暂停或终止服务的权利。\n\n' +
      '完整协议文本将在正式上线前更新。',
  },
  privacy: {
    title: '隐私政策',
    body:
      '我们重视您的隐私。本政策说明我们如何收集与使用您的信息。\n\n' +
      '1. 为提供登录与社区服务，我们可能处理您的手机号、邮箱及设备信息。\n' +
      '2. 未经同意，我们不会向第三方出售您的个人信息。\n' +
      '3. 您可通过应用内设置或联系客服行使查阅、更正与删除权利。\n\n' +
      '完整隐私政策将在正式上线前更新。',
  },
};

export function LegalDocumentScreen({ navigation, route }: Props) {
  const doc = CONTENT[route.params.doc];

  return (
    <View style={styles.container}>
      <ScreenHeader title={doc.title} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.bodyText}>{doc.body}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  body: { padding: spacing.lg, paddingBottom: 40 },
  bodyText: { fontSize: 15, color: colors.textPrimary, lineHeight: 24 },
});
