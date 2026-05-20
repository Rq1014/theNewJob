export type MessageCategory =
  | 'all'
  | 'chat'
  | 'interaction'
  | 'system'
  | 'resources'
  | 'institution';

export type MessageType =
  | 'chat'
  | 'comment'
  | 'like'
  | 'system'
  | 'resource'
  | 'institution'
  | 'activity';

export interface Conversation {
  id: string;
  type: MessageType;
  userName: string;
  avatar: string;
  userBadge?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online?: boolean;
  category: MessageCategory;
}

export interface ChatMessage {
  id: string;
  fromMe: boolean;
  content: string;
  time: string;
}

export const mockConversations: Conversation[] = [
  {
    id: '1',
    type: 'chat',
    userName: '小林',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xiaolin',
    lastMessage: '明天一起去新大久保吃火锅吗？',
    time: '10:23',
    unread: 2,
    online: true,
    category: 'chat',
  },
  {
    id: '2',
    type: 'institution',
    userName: '名门升学私塾·田中老师',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juku',
    userBadge: '机构',
    lastMessage: '关于你的研究计划书，我这边已经看完了，整体框架不错…',
    time: '1小时前',
    unread: 1,
    online: false,
    category: 'institution',
  },
  {
    id: '3',
    type: 'resource',
    userName: '张学长',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
    userBadge: '资料',
    lastMessage: '你分享的东大情报理工2023过去问我看到了，太有用了！',
    time: '2小时前',
    unread: 0,
    online: true,
    category: 'resources',
  },
  {
    id: '4',
    type: 'comment',
    userName: '王同学',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
    lastMessage: '你关注的租房帖子有新回复：目黑区1K房间已出租',
    time: '5小时前',
    unread: 0,
    online: false,
    category: 'interaction',
  },
  {
    id: '5',
    type: 'activity',
    userName: '东京留学生会',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=activity',
    userBadge: '活动',
    lastMessage: '本周同城聚餐活动已更新：12月23日新宿烤肉，已有15人报名',
    time: '昨天',
    unread: 1,
    online: false,
    category: 'interaction',
  },
  {
    id: '6',
    type: 'chat',
    userName: '李华',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lihua',
    lastMessage: '周末去代代木公园散步吗？听说樱花快开了',
    time: '昨天',
    unread: 0,
    online: true,
    category: 'chat',
  },
  {
    id: '7',
    type: 'system',
    userName: '平台通知',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=system',
    userBadge: '系统',
    lastMessage: '你的机构评价「名门升学私塾」获得了5个「有帮助」',
    time: '2天前',
    unread: 0,
    online: false,
    category: 'system',
  },
  {
    id: '8',
    type: 'chat',
    userName: '赵同学',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhao',
    lastMessage: '便利店打工面试通过了！谢谢你的建议',
    time: '2天前',
    unread: 0,
    online: false,
    category: 'chat',
  },
];

export const mockChatMessages: ChatMessage[] = [
  { id: '1', fromMe: false, content: '你好，请问你也在准备面试吗？', time: '09:15' },
  { id: '2', fromMe: true, content: '是的，正在准备秋招', time: '09:16' },
  { id: '3', fromMe: false, content: '明天一起去图书馆吗？', time: '10:23' },
];

export function getConversationById(id: string): Conversation | undefined {
  return mockConversations.find(c => c.id === id);
}

export function getBadgeColors(badge: string): { bg: string; text: string } {
  switch (badge) {
    case '机构':
      return { bg: '#D1FAE5', text: '#047857' };
    case '活动':
      return { bg: '#FFEDD5', text: '#C2410C' };
    case '资料':
      return { bg: '#F3E8FF', text: '#7C3AED' };
    case '系统':
      return { bg: '#DBEAFE', text: '#1D4ED8' };
    default:
      return { bg: '#F1F5F9', text: '#475569' };
  }
}
