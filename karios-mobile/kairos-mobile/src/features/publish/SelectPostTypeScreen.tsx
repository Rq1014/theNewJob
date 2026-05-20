import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { POST_TYPE_OPTIONS } from '../../data/publishConstants';
import type { PublishStackParamList } from '../../navigation/types';
import { colors, radius, spacing } from '../../theme';

type Props = NativeStackScreenProps<PublishStackParamList, 'SelectPostType'>;

export function SelectPostTypeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>选择帖子类型</Text>
      </View>
      <ScrollView contentContainerStyle={styles.grid}>
        {POST_TYPE_OPTIONS.map(type => (
          <Pressable
            key={type.id}
            style={styles.typeCard}
            onPress={() =>
              navigation.navigate('PublishCompose', {
                publishType: 'post',
                postTypeId: type.id,
                postTypeLabel: type.label,
              })
            }>
            <View style={[styles.typeIcon, { backgroundColor: type.color }]}>
              <Text style={styles.typeEmoji}>{type.emoji}</Text>
            </View>
            <Text style={styles.typeLabel}>{type.label}</Text>
            <Text style={styles.typeDesc}>{type.description}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  back: { fontSize: 22, color: colors.textPrimary },
  headerTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.sm + 4,
    paddingBottom: spacing.xl,
  },
  typeCard: {
    width: '47%',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  typeEmoji: { fontSize: 20 },
  typeLabel: { fontSize: 15, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  typeDesc: { fontSize: 12, color: colors.textSecondary, lineHeight: 17 },
});
