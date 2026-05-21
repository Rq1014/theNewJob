import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../theme';

type Props = {
  visible: boolean;
  onClose: () => void;
  onEmailLogin: () => void;
};

export function OtherLoginSheet({ visible, onClose, onEmailLogin }: Props) {
  const insets = useSafeAreaInsets();

  const handleEmail = () => {
    onClose();
    onEmailLogin();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
          <View style={styles.handle} />
          <Text style={styles.title}>其他登录方式</Text>
          <Pressable style={styles.option} onPress={handleEmail}>
            <Text style={styles.optionIcon}>✉️</Text>
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>邮箱登录</Text>
              <Text style={styles.optionDesc}>使用邮箱验证码登录</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
          <Pressable style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>取消</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    marginBottom: spacing.md,
  },
  optionIcon: { fontSize: 28, marginRight: spacing.md },
  optionText: { flex: 1 },
  optionTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  optionDesc: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  chevron: { fontSize: 22, color: colors.textMuted, fontWeight: '300' },
  cancelBtn: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },
  cancelText: { fontSize: 16, color: colors.textSecondary, fontWeight: '500' },
});
