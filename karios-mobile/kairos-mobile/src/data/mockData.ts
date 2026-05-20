import type { Comment, Draft, Post, UserProfile } from '../api/types';
import { japanCommunityPosts } from './japan-community';
import { mapJapanPostToPost } from './postMapper';

export const MOCK_USER: UserProfile = {
  id: '1',
  nickname: '张同学',
  avatarUrl: null,
  profileStatus: 'complete',
  isVerified: true,
  bio: '在东京的留学生活 | 喜欢探店和摄影',
  university: '东京大学',
  city: 'tokyo',
  userType: 'graduate_student',
  postsCount: 24,
  likesReceived: 389,
  favoritesCount: 36,
  reviewsCount: 12,
};

export const MOCK_POSTS: Post[] = japanCommunityPosts.map(mapJapanPostToPost);

export const MOCK_COMMENTS: Record<string, Comment[]> = {
  '1': [
    {
      id: 'c1',
      author: {
        id: '10',
        name: '即将入学',
        avatar: '',
        university: '东京大学',
        verified: true,
      },
      content: '太及时了！请问笔试难度大概什么水平？',
      timestamp: '2小时前',
      likes: 8,
    },
    {
      id: 'c2',
      author: {
        id: '2',
        name: '匿名用户',
        avatar: '',
        university: '东京大学',
        verified: true,
      },
      content: '笔试大概是 LeetCode Medium 难度，建议多刷题。',
      timestamp: '1小时前',
      likes: 12,
    },
  ],
};

export const MOCK_DRAFTS: Draft[] = [
  {
    id: 'd1',
    category: 'experience',
    title: '东京租房经验',
    content: '分享我在东京租房的经历...',
    updatedAt: '2026-05-10T12:00:00Z',
  },
];
