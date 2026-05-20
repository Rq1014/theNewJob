export type TagCategory = 'campus' | 'career' | 'life';

export interface CommunityTag {
  id: string;
  label: string;
  category: TagCategory;
}

export const communityTags: CommunityTag[] = [
  { id: 'campus', label: '校园', category: 'campus' },
  { id: 'course', label: '选课', category: 'campus' },
  { id: 'exam', label: '考试', category: 'campus' },
  { id: 'lab', label: '研究室', category: 'campus' },
  { id: 'club', label: '社团', category: 'campus' },
  { id: 'lecture', label: '讲座', category: 'campus' },
  { id: 'scholarship', label: '奖学金', category: 'campus' },
  { id: 'graduate', label: '升学', category: 'campus' },
  { id: 'study-procedure', label: '留学手续', category: 'campus' },
  { id: 'job', label: '求职', category: 'career' },
  { id: 'internship', label: '实习', category: 'career' },
  { id: 'referral', label: '内推', category: 'career' },
  { id: 'interview', label: '面经', category: 'career' },
  { id: 'part-time', label: '打工', category: 'career' },
  { id: 'rent', label: '租房', category: 'life' },
  { id: 'sublet', label: '转租', category: 'life' },
  { id: 'roommate', label: '合租', category: 'life' },
  { id: 'visa', label: '签证', category: 'life' },
  { id: 'food', label: '美食', category: 'life' },
  { id: 'secondhand', label: '二手', category: 'life' },
  { id: 'travel', label: '旅游', category: 'life' },
  { id: 'emotion', label: '情感', category: 'life' },
  { id: 'treehole', label: '树洞', category: 'life' },
  { id: 'language-learning', label: '语言学习', category: 'life' },
  { id: 'japanese', label: '日语', category: 'life' },
  { id: 'english', label: '英语', category: 'life' },
  { id: 'japan-culture', label: '日本文化', category: 'life' },
  { id: 'local-event', label: '同城活动', category: 'life' },
  { id: 'transport', label: '交通', category: 'life' },
  { id: 'bank-card', label: '银行卡', category: 'life' },
  { id: 'phone-card', label: '手机卡', category: 'life' },
  { id: 'medical', label: '医疗', category: 'life' },
  { id: 'insurance', label: '保险', category: 'life' },
  { id: 'living-cost', label: '生活费', category: 'life' },
  { id: 'save-money', label: '省钱', category: 'life' },
];

export const tagKeywords: Record<string, string[]> = {
  rent: ['租房', '房子', '初期费用', '租房避坑', '租房推荐'],
  sublet: ['转租', '合租', '找室友'],
  roommate: ['合租', '室友', '找室友'],
  course: ['选课', '课程'],
  exam: ['考试'],
  lab: ['研究室', '实验室'],
  interview: ['面经', '面试', '面试经验'],
  job: ['求职', '内定', '就活'],
  internship: ['实习'],
  'part-time': ['打工', '兼职', '时薪'],
  visa: ['签证', '在留'],
  food: ['美食', '料理', '餐厅'],
  secondhand: ['二手'],
  scholarship: ['奖学金'],
  graduate: ['升学', '考研'],
  'bank-card': ['银行卡', '办卡'],
  'phone-card': ['手机卡'],
  medical: ['医院', '就医', '医疗'],
  transport: ['交通'],
  'study-procedure': ['留学手续', '行政手续', '住民登录'],
  campus: ['校园'],
  club: ['社团'],
  lecture: ['讲座'],
  referral: ['内推'],
  travel: ['旅游'],
  emotion: ['情感'],
  treehole: ['树洞'],
  'language-learning': ['语言学习'],
  japanese: ['日语'],
  english: ['英语'],
  'japan-culture': ['日本文化'],
  'local-event': ['同城活动'],
  insurance: ['保险'],
  'living-cost': ['生活费'],
  'save-money': ['省钱'],
};

export const hotTreeholePosts = [
  {
    id: 't1',
    title: '最近面试好累，想找个人说说话...',
    replies: 234,
    likes: 567,
    timestamp: '刚刚',
  },
  {
    id: 't2',
    title: '今天早稻田樱花开了！！',
    replies: 89,
    likes: 423,
    timestamp: '15分钟前',
  },
  {
    id: 't3',
    title: '有没有同样在准备N1的小伙伴',
    replies: 156,
    likes: 289,
    timestamp: '1小时前',
  },
];

export const initialSearchHistory = ['东京租房', '研究生申请', 'JLPT N1', '二手家具'];

export const hotSearchKeywords: { keyword: string; heat: '热' | '新' | '' }[] = [
  { keyword: '东京租房', heat: '热' },
  { keyword: '签证更新', heat: '新' },
  { keyword: '研究生申请', heat: '热' },
  { keyword: '打工面试', heat: '' },
  { keyword: '东大过去问', heat: '热' },
  { keyword: '二手家具', heat: '' },
  { keyword: '手机卡办理', heat: '新' },
  { keyword: '银行卡开户', heat: '' },
  { keyword: '同城聚餐', heat: '' },
  { keyword: 'JLPT', heat: '热' },
];
