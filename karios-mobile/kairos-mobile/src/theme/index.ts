export const colors = {
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  background: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  iconSecondary: '#475569', // slate-600，与 Figma 导航/搜索图标一致
  border: '#E2E8F0',
  success: '#22C55E',
  danger: '#EF4444',
  white: '#FFFFFF',
  // 榜单（Figma teal/mint）
  rankingBg: '#F4FFFD',
  teal: '#14B8A6',
  tealLight: '#F0FDFA',
  tealBorder: '#CCFBF1',
  // 消息（Figma emerald）
  emerald: '#10B981',
  emeraldDark: '#059669',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const typography = {
  title: { fontSize: 20, fontWeight: '600' as const },
  subtitle: { fontSize: 16, fontWeight: '600' as const },
  body: { fontSize: 14, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
  tab: { fontSize: 11, fontWeight: '500' as const },
};
