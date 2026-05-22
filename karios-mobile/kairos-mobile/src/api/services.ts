import {
  API_BASE_URL,
  PRIVACY_VERSION,
  setLegalVersions,
  TERMS_VERSION,
  USE_MOCK_CONTENT_API,
  USE_REAL_AUTH_API,
} from '../config';
import { useAuthStore } from '../store/authStore';
import { authDeviceContext } from './device';
import { apiClient, unwrap } from './client';
import { normalizeAuthTokens, normalizeUserProfile } from './normalize';
import {
  MOCK_COMMENTS,
  MOCK_DRAFTS,
  MOCK_POSTS,
  MOCK_USER,
} from '../data/mockData';
import type {
  AuthBinding,
  AuthTokens,
  Comment,
  Draft,
  EditProfilePayload,
  FeedChannel,
  OtpChannel,
  PageResult,
  Post,
  UserProfile,
} from './types';

const delay = (ms = 400) => new Promise<void>(r => setTimeout(() => r(), ms));

let mockPosts = [...MOCK_POSTS];
let mockDrafts = [...MOCK_DRAFTS];

function authPayload(extra: Record<string, unknown> = {}) {
  return {
    termsVersion: TERMS_VERSION,
    privacyVersion: PRIVACY_VERSION,
    ...authDeviceContext(),
    ...extra,
  };
}

export const legalApi = {
  async fetchVersions(): Promise<{ termsVersion: string; privacyVersion: string }> {
    const res = await apiClient.get('/legal/terms');
    return unwrap(res);
  },
};

export const authApi = {
  async sendOtp(channel: OtpChannel, target: string) {
    if (!USE_REAL_AUTH_API) {
      await delay();
      return { expiresIn: 300, cooldown: 60 };
    }
    const res = await apiClient.post('/auth/otp/send', {
      channel,
      target,
      ...authPayload(),
    });
    return unwrap<{ expiresIn: number; cooldown: number }>(res);
  },

  async verifyOtp(
    channel: OtpChannel,
    target: string,
    code: string,
  ): Promise<AuthTokens> {
    if (!USE_REAL_AUTH_API) {
      await delay();
      if (code !== '123456') throw new Error('验证码错误，开发环境请使用 123456');
      return {
        accessToken: 'mock-access',
        refreshToken: 'mock-refresh',
        expiresIn: 900,
        user: { ...MOCK_USER, profileStatus: 'incomplete', nickname: null },
      };
    }
    const res = await apiClient.post('/auth/otp/verify', {
      channel,
      target,
      code,
      ...authPayload(),
    });
    return normalizeAuthTokens(unwrap(res) as Record<string, unknown>);
  },

  async loginApple(
    identityToken: string,
    authorizationCode?: string,
    user?: {
      email?: string | null;
      fullName?: { givenName?: string | null; familyName?: string | null };
    },
  ): Promise<AuthTokens> {
    if (!USE_REAL_AUTH_API) {
      await delay();
      return {
        accessToken: 'mock-access',
        refreshToken: 'mock-refresh',
        expiresIn: 900,
        user: { ...MOCK_USER, profileStatus: 'incomplete' },
      };
    }
    const res = await apiClient.post('/auth/oauth/apple', {
      identityToken,
      authorizationCode,
      user,
      ...authPayload(),
    });
    return normalizeAuthTokens(unwrap(res) as Record<string, unknown>);
  },

  async logout(refreshToken: string) {
    if (!USE_REAL_AUTH_API) {
      return;
    }
    await apiClient.post('/auth/logout', { refreshToken });
  },

  async getBindings(): Promise<AuthBinding[]> {
    if (!USE_REAL_AUTH_API) {
      return [
        {
          provider: 'email',
          maskedTarget: 'u***@example.com',
          createdAt: new Date().toISOString(),
        },
      ];
    }
    const res = await apiClient.get('/auth/bindings');
    const data = unwrap<{ bindings: AuthBinding[] }>(res);
    return data.bindings.map(b => ({
      ...b,
      createdAt:
        typeof b.createdAt === 'string'
          ? b.createdAt
          : new Date(b.createdAt as unknown as string).toISOString(),
    }));
  },
};

export const userApi = {
  async getMe(): Promise<UserProfile> {
    if (!USE_REAL_AUTH_API) {
      return { ...MOCK_USER };
    }
    const res = await apiClient.get('/users/me');
    return normalizeUserProfile(unwrap(res) as Record<string, unknown>);
  },

  async updateMe(data: Partial<UserProfile>): Promise<UserProfile> {
    if (!USE_REAL_AUTH_API) {
      await delay();
      Object.assign(MOCK_USER, data);
      if (data.nickname && data.university && data.city) {
        MOCK_USER.profileStatus = 'complete';
      }
      return { ...MOCK_USER };
    }
    const res = await apiClient.put('/users/me', data);
    return normalizeUserProfile(unwrap(res) as Record<string, unknown>);
  },

  /** 编辑资料：固定带上 interests，避免旧 bundle 只传 nickname/bio/city */
  async updateProfile(payload: EditProfilePayload): Promise<UserProfile> {
    const body = {
      nickname: payload.nickname,
      bio: payload.bio,
      interests: payload.interests,
      city: payload.city,
    };
    if (!USE_REAL_AUTH_API) {
      await delay();
      Object.assign(MOCK_USER, body);
      return { ...MOCK_USER };
    }
    if (__DEV__) {
      console.log('[Kairos] PUT /users/me', JSON.stringify(body));
    }
    const res = await apiClient.put('/users/me', body);
    return normalizeUserProfile(unwrap(res) as Record<string, unknown>);
  },

  async getUser(id: string): Promise<UserProfile> {
    if (!USE_REAL_AUTH_API) {
      return {
        id,
        nickname: '社区用户',
        avatarUrl: null,
        profileStatus: 'complete',
        isVerified: true,
        university: '京都大学',
        city: 'kyoto',
        bio: '在日留学生',
        postsCount: 12,
      };
    }
    const currentId = useAuthStore.getState().user?.id;
    if (currentId === id) {
      return userApi.getMe();
    }
    return {
      id,
      nickname: '社区用户',
      avatarUrl: null,
      profileStatus: 'complete',
      isVerified: false,
      university: null,
      city: null,
      bio: null,
    };
  },
};

export const postApi = {
  async list(params: {
    channel: FeedChannel;
    city?: string;
    tag?: string;
    page?: number;
  }): Promise<PageResult<Post>> {
    if (USE_MOCK_CONTENT_API) {
      await delay();
      let items = [...mockPosts];
      if (params.tag) {
        items = items.filter(
          p =>
            p.tags.includes(params.tag!) ||
            p.title.includes(params.tag!) ||
            p.summary.includes(params.tag!),
        );
      }
      if (params.channel === 'local') {
        items = items.filter(p => p.city !== undefined);
        if (params.city) {
          items = items.filter(p => p.city === params.city);
        }
      }
      return { items, page: 1, size: 20, total: items.length, hasMore: false };
    }
    const res = await apiClient.get('/posts', { params });
    return unwrap(res);
  },

  async search(q: string): Promise<PageResult<Post>> {
    if (USE_MOCK_CONTENT_API) {
      await delay();
      const items = mockPosts.filter(
        p => p.title.includes(q) || p.summary.includes(q) || p.tags.some(t => t.includes(q)),
      );
      return { items, page: 1, size: 20, total: items.length, hasMore: false };
    }
    const res = await apiClient.get('/posts/search', { params: { q } });
    return unwrap(res);
  },

  async getById(id: string): Promise<Post> {
    if (USE_MOCK_CONTENT_API) {
      await delay();
      const post = mockPosts.find(p => p.id === id);
      if (!post) throw new Error('帖子不存在');
      return post;
    }
    const res = await apiClient.get(`/posts/${id}`);
    return unwrap(res);
  },

  async create(data: {
    domain: string;
    category: string;
    city?: string;
    title: string;
    content: string;
    tags?: string[];
  }): Promise<Post> {
    if (USE_MOCK_CONTENT_API) {
      await delay();
      const post: Post = {
        id: String(Date.now()),
        domain: data.domain as Post['domain'],
        category: data.category,
        city: data.city,
        title: data.title,
        summary: data.content.slice(0, 80),
        content: data.content,
        author: {
          id: MOCK_USER.id,
          name: MOCK_USER.nickname || '我',
          avatar: '',
          university: MOCK_USER.university ?? undefined,
          verified: MOCK_USER.isVerified,
        },
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        bookmarks: 0,
        views: 0,
        tags: data.tags || [],
      };
      mockPosts = [post, ...mockPosts];
      return post;
    }
    const res = await apiClient.post('/posts', data);
    return unwrap(res);
  },

  async like(id: string) {
    if (USE_MOCK_CONTENT_API) {
      const p = mockPosts.find(x => x.id === id);
      if (p) {
        p.likes += 1;
        p.liked = true;
      }
      return;
    }
    await apiClient.post(`/posts/${id}/like`);
  },

  async unlike(id: string) {
    if (USE_MOCK_CONTENT_API) {
      const p = mockPosts.find(x => x.id === id);
      if (p) {
        p.likes = Math.max(0, p.likes - 1);
        p.liked = false;
      }
      return;
    }
    await apiClient.delete(`/posts/${id}/like`);
  },

  async getComments(postId: string): Promise<Comment[]> {
    if (USE_MOCK_CONTENT_API) {
      await delay();
      return MOCK_COMMENTS[postId] || [];
    }
    const res = await apiClient.get(`/posts/${postId}/comments`);
    return unwrap<PageResult<Comment>>(res).items;
  },

  async addComment(postId: string, content: string): Promise<Comment> {
    if (USE_MOCK_CONTENT_API) {
      const c: Comment = {
        id: String(Date.now()),
        author: {
          id: MOCK_USER.id,
          name: MOCK_USER.nickname || '我',
          avatar: '',
          university: MOCK_USER.university ?? undefined,
          verified: true,
        },
        content,
        timestamp: '刚刚',
        likes: 0,
      };
      MOCK_COMMENTS[postId] = [...(MOCK_COMMENTS[postId] || []), c];
      const p = mockPosts.find(x => x.id === postId);
      if (p) p.comments += 1;
      return c;
    }
    const res = await apiClient.post(`/posts/${postId}/comments`, { content });
    return unwrap(res);
  },

  async getMyPosts(): Promise<Post[]> {
    if (USE_MOCK_CONTENT_API) {
      return mockPosts.filter(p => p.author.id === MOCK_USER.id);
    }
    const res = await apiClient.get('/users/me/posts');
    return unwrap<PageResult<Post>>(res).items;
  },

  async getMyFavorites(): Promise<Post[]> {
    if (USE_MOCK_CONTENT_API) {
      return mockPosts.slice(0, 2);
    }
    const res = await apiClient.get('/users/me/favorites');
    return unwrap<PageResult<Post>>(res).items;
  },
};

export const draftApi = {
  async list(): Promise<Draft[]> {
    if (USE_MOCK_CONTENT_API) return [...mockDrafts];
    const res = await apiClient.get('/drafts');
    return unwrap<PageResult<Draft>>(res).items;
  },

  async save(data: Partial<Draft> & { content: string; category: string }): Promise<Draft> {
    if (USE_MOCK_CONTENT_API) {
      const draft: Draft = {
        id: data.id || String(Date.now()),
        category: data.category,
        title: data.title,
        content: data.content,
        tags: data.tags,
        updatedAt: new Date().toISOString(),
      };
      const idx = mockDrafts.findIndex(d => d.id === draft.id);
      if (idx >= 0) mockDrafts[idx] = draft;
      else mockDrafts.unshift(draft);
      return draft;
    }
    if (data.id) {
      const res = await apiClient.put(`/drafts/${data.id}`, data);
      return unwrap(res);
    }
    const res = await apiClient.post('/drafts', data);
    return unwrap(res);
  },

  async remove(id: string) {
    if (USE_MOCK_CONTENT_API) {
      mockDrafts = mockDrafts.filter(d => d.id !== id);
      return;
    }
    await apiClient.delete(`/drafts/${id}`);
  },
};

/** 启动时拉取协议版本（失败则沿用 config 默认值） */
export async function bootstrapApiConfig(): Promise<void> {
  if (!USE_REAL_AUTH_API) return;
  try {
    const versions = await legalApi.fetchVersions();
    setLegalVersions(versions.termsVersion, versions.privacyVersion);
  } catch (e) {
    console.warn('[bootstrapApiConfig] legal versions', API_BASE_URL, e);
  }
}
