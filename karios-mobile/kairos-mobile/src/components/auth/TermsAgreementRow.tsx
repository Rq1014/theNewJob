import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../theme';

type Props = {
  checked: boolean;
  onToggle: () => void;
  onPressTerms?: () => void;
  onPressPrivacy?: () => void;
};

export function TermsAgreementRow({
  checked,
  onToggle,
  onPressTerms,
  onPressPrivacy,
}: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onToggle}
        style={styles.checkboxHit}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
      </Pressable>
      <Text style={styles.text}>
        我已阅读并同意
        <Text style={styles.link} onPress={onPressTerms}>
          《用户协议》
        </Text>
        和
        <Text style={styles.link} onPress={onPressPrivacy}>
          《隐私政策》
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  checkboxHit: { paddingTop: 2 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkmark: { fontSize: 12, color: colors.white, fontWeight: '700', lineHeight: 14 },
  text: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  link: { color: colors.primary, fontWeight: '500' },
});
