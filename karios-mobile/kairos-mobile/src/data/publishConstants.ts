export interface PostTypeOption {
  id: string;
  label: string;
  description: string;
  emoji: string;
  color: string;
}

export const POST_TYPE_OPTIONS: PostTypeOption[] = [
  {
    id: 'experience',
    label: '经验分享',
    description: '分享留学、求职、生活经验',
    emoji: '📝',
    color: '#3B82F6',
  },
  {
    id: 'question',
    label: '提问求助',
    description: '寻求建议和帮助',
    emoji: '❓',
    color: '#8B5CF6',
  },
  {
    id: 'rental',
    label: '租房',
    description: '房源推荐、转租、合租信息',
    emoji: '🏠',
    color: '#22C55E',
  },
  {
    id: 'job',
    label: '求职',
    description: '内推、面经、求职交流',
    emoji: '💼',
    color: '#F97316',
  },
  {
    id: 'secondhand',
    label: '二手',
    description: '闲置物品交易',
    emoji: '📦',
    color: '#EC4899',
  },
  {
    id: 'course',
    label: '选课',
    description: '课程推荐、选课经验',
    emoji: '🎓',
    color: '#6366F1',
  },
  {
    id: 'visa',
    label: '签证',
    description: '签证办理经验分享',
    emoji: '💳',
    color: '#14B8A6',
  },
  {
    id: 'life',
    label: '生活',
    description: '日常生活、美食、旅游',
    emoji: '☕',
    color: '#F59E0B',
  },
];

export const JOINED_TREEHOLE_IDS = [
  'bt1',
  'bt4',
  'bt5',
  'st2',
  'st4',
  'st6',
  'st8',
];

export interface PublishDraftItem {
  id: string;
  type: 'post' | 'treehole';
  title?: string;
  content: string;
  category?: string;
  treehole?: string;
  savedAt: string;
}

export const MOCK_PUBLISH_DRAFTS: PublishDraftItem[] = [
  {
    id: 'd1',
    type: 'post',
    title: '东京租房避坑经验分享',
    content: '刚在东京租到房子，有一些经验想跟大家分享。首先是关于初期费用...',
    category: '租房',
    savedAt: '2小时前',
  },
  {
    id: 'd2',
    type: 'treehole',
    content: '最近面试压力好大，连续被拒了三家公司...',
    treehole: '求职emo',
    savedAt: '昨天 18:30',
  },
  {
    id: 'd3',
    type: 'post',
    title: '早稻田大学选课攻略',
    content: '作为一名早大的学生，我想分享一下选课的一些技巧...',
    category: '选课',
    savedAt: '3天前',
  },
];
