export type OtpChannel = 'email' | 'phone';
export type ProfileStatus = 'incomplete' | 'complete';
export type FeedChannel = 'follow' | 'discover' | 'local';
export type ContentDomain = 'career' | 'life';

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface UserSummary {
  id: string;
  nickname: string | null;
  avatarUrl: string | null;
  profileStatus: ProfileStatus;
  isVerified: boolean;
}

export interface UserProfile extends UserSummary {
  bio?: string | null;
  university?: string | null;
  city?: string | null;
  userType?: string | null;
  postsCount?: number;
  likesReceived?: number;
  favoritesCount?: number;
  reviewsCount?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserSummary;
}

export interface PostAuthor {
  id: string;
  name: string;
  avatar: string;
  university?: string;
  verified: boolean;
  badges?: string[];
}

export interface PostCompany {
  name: string;
  logo: string;
  location?: string;
}

export interface Post {
  id: string;
  domain: ContentDomain;
  category: string;
  city?: string;
  title: string;
  summary: string;
  content?: string;
  author: PostAuthor;
  timestamp: string;
  likes: number;
  comments: number;
  bookmarks: number;
  views: number;
  tags: string[];
  featured?: boolean;
  images?: string[];
  company?: PostCompany;
  position?: string;
  rating?: number;
  helpful?: number;
  liked?: boolean;
  bookmarked?: boolean;
}

export interface Comment {
  id: string;
  author: PostAuthor;
  content: string;
  timestamp: string;
  likes: number;
}

export interface PageResult<T> {
  items: T[];
  page: number;
  size: number;
  total: number;
  hasMore: boolean;
}

export interface Draft {
  id: string;
  category: string;
  title?: string;
  content: string;
  tags?: string[];
  imageUrls?: string[];
  updatedAt: string;
}

export interface AuthBinding {
  provider: string;
  maskedTarget: string;
  createdAt: string;
}

export const POST_CATEGORIES = [
  { id: 'experience', label: '经验分享', color: '#3B82F6' },
  { id: 'question', label: '提问求助', color: '#8B5CF6' },
  { id: 'rental', label: '租房', color: '#22C55E' },
  { id: 'job', label: '求职', color: '#F97316' },
  { id: 'secondhand', label: '二手', color: '#EC4899' },
  { id: 'course', label: '选课', color: '#6366F1' },
  { id: 'visa', label: '签证', color: '#14B8A6' },
  { id: 'life', label: '生活', color: '#F59E0B' },
] as const;

export const CITIES = [
  { id: 'tokyo', label: '东京' },
  { id: 'osaka', label: '大阪' },
  { id: 'kyoto', label: '京都' },
  { id: 'yokohama', label: '横滨' },
  { id: 'nagoya', label: '名古屋' },
] as const;

export const USER_TYPES = [
  { id: 'undergraduate', label: '本科在读' },
  { id: 'graduate_student', label: '研究生在读' },
  { id: 'graduate', label: '已毕业' },
  { id: 'applicant', label: '申请中' },
] as const;
