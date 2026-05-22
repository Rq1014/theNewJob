import type { AuthTokens, ProfileStatus, UserProfile, UserSummary } from './types';

/** 兼容 Jackson 对 boolean 字段的命名（isVerified / verified、isNewUser / newUser） */
export function normalizeUserSummary(raw: Record<string, unknown>): UserSummary {
  return {
    id: String(raw.id ?? ''),
    nickname: (raw.nickname as string | null) ?? null,
    avatarUrl: (raw.avatarUrl as string | null) ?? null,
    profileStatus: (raw.profileStatus as ProfileStatus) ?? 'incomplete',
    isVerified: Boolean(raw.isVerified ?? raw.verified),
  };
}

export function normalizeUserProfile(raw: Record<string, unknown>): UserProfile {
  const base = normalizeUserSummary(raw);
  return {
    ...base,
    bio: (raw.bio as string | null) ?? null,
    university: (raw.university as string | null) ?? null,
    city: (raw.city as string | null) ?? null,
    userType: (raw.userType as string | null) ?? null,
    postsCount: raw.postsCount != null ? Number(raw.postsCount) : undefined,
    likesReceived:
      raw.likesReceived != null ? Number(raw.likesReceived) : undefined,
    favoritesCount:
      raw.favoritesCount != null ? Number(raw.favoritesCount) : undefined,
    reviewsCount:
      raw.reviewsCount != null ? Number(raw.reviewsCount) : undefined,
  };
}

export function normalizeAuthTokens(raw: Record<string, unknown>): AuthTokens {
  const userRaw = (raw.user ?? {}) as Record<string, unknown>;
  return {
    accessToken: String(raw.accessToken ?? ''),
    refreshToken: String(raw.refreshToken ?? ''),
    expiresIn: Number(raw.expiresIn ?? 0),
    user: normalizeUserSummary(userRaw),
    isNewUser: Boolean(raw.isNewUser ?? raw.newUser),
  };
}
