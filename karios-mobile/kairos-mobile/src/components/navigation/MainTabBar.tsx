import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Users, TrendingUp, Plus, Bell, User } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';
import type { MainTabParamList } from '../../navigation/types';
import { colors, typography } from '../../theme';

type TabConfig = {
  routeName: keyof MainTabParamList;
  label: string;
  Icon: LucideIcon;
  isSpecial?: boolean;
};

const TAB_CONFIG: TabConfig[] = [
  { routeName: 'CommunityTab', label: '社区', Icon: Users },
  { routeName: 'RankingTab', label: '榜单', Icon: TrendingUp },
  { routeName: 'PublishTab', label: '', Icon: Plus, isSpecial: true },
  { routeName: 'MessagesTab', label: '消息', Icon: Bell },
  { routeName: 'ProfileTab', label: '我的', Icon: User },
];

function PublishFab() {
  return (
    <View style={styles.publishOuter}>
      <Svg width={56} height={56} style={StyleSheet.absoluteFill}>
        <Defs>
          <SvgLinearGradient id="publishGrad" x1="0" y1="1" x2="1" y2="0">
            <Stop offset="0" stopColor={colors.primary} />
            <Stop offset="1" stopColor={colors.primaryDark} />
          </SvgLinearGradient>
        </Defs>
        <Rect width={56} height={56} rx={16} fill="url(#publishGrad)" />
      </Svg>
      <Plus size={28} color={colors.white} strokeWidth={2.5} />
    </View>
  );
}

export function MainTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom }]}>
      <View style={styles.bar}>
        {TAB_CONFIG.map((tab) => {
          const routeIndex = state.routes.findIndex((r) => r.name === tab.routeName);
          if (routeIndex === -1) {
            return null;
          }

          const route = state.routes[routeIndex];
          const isFocused = state.index === routeIndex;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (tab.isSpecial) {
            return (
              <Pressable
                key={tab.routeName}
                onPress={onPress}
                style={styles.specialTab}
                accessibilityRole="button"
                accessibilityLabel="发布">
                <PublishFab />
              </Pressable>
            );
          }

          const { Icon } = tab;
          const iconColor = isFocused ? colors.textPrimary : colors.textMuted;
          const labelColor = isFocused ? colors.textPrimary : colors.textSecondary;

          return (
            <Pressable
              key={tab.routeName}
              onPress={onPress}
              style={styles.tab}
              accessibilityRole="button"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={tab.label}>
              {isFocused && <View style={styles.activeIndicator} />}
              <Icon size={22} color={iconColor} strokeWidth={isFocused ? 2.5 : 2} />
              <Text style={[styles.label, { color: labelColor }]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(226, 232, 240, 0.8)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.04,
        shadowRadius: 16,
      },
      android: { elevation: 8 },
    }),
  },
  bar: {
    flexDirection: 'row',
    height: 64,
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
  },
  specialTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 32,
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  label: {
    ...typography.tab,
  },
  publishOuter: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
