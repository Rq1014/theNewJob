export type ContentDomain = "career" | "life";
export type PostCategory =
  | "interview" // 面经
  | "offer" // 内定
  | "es" // ES修改
  | "career-qa" // 求职问答
  | "company-review" // 企业评价
  | "housing" // 租房
  | "medical" // 医疗
  | "food" // 美食
  | "finance" // 办卡/金融
  | "admin" // 行政手续
  | "moving" // 搬家
  | "part-time" // 兼职
  | "second-hand" // 二手
  | "guide"; // 攻略

export type City =
  | "tokyo"
  | "yokohama"
  | "osaka"
  | "kyoto"
  | "nagoya"
  | "fukuoka"
  | "sendai"
  | "kobe"
  | "sapporo";

export const cityNames: Record<City, string> = {
  tokyo: "东京",
  yokohama: "横滨",
  osaka: "大阪",
  kyoto: "京都",
  nagoya: "名古屋",
  fukuoka: "福冈",
  sendai: "仙台",
  kobe: "神户",
  sapporo: "札幌",
};

export interface JapanCommunityAuthor {
  id: string;
  name: string;
  avatar: string;
  university?: string;
  verified: boolean;
  badges?: string[]; // 已获内定、学校认证、本地达人
}

export interface JapanCommunityPost {
  id: string;
  domain: ContentDomain; // 就活 or 生活
  category: PostCategory;
  city?: City;
  author: JapanCommunityAuthor;
  title: string;
  summary: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  bookmarks: number;
  views: number;
  tags: string[];
  company?: {
    name: string;
    logo: string;
    location?: string;
  };
  position?: string;
  rating?: number; // 用于推荐类内容，1-5分
  helpful?: number; // 实用度指数
  featured?: boolean;
  images?: string[];
}

export const japanCommunityPosts: JapanCommunityPost[] = [
  {
    id: "1",
    domain: "career",
    category: "offer",
    city: "tokyo",
    author: {
      id: "u1",
      name: "小李",
      avatar: "L",
      university: "东京大学",
      verified: true,
      badges: ["已获内定", "学校认证"],
    },
    title: "乐天软件工程师内定！从网测到最终面全流程分享",
    summary: "历时2个月，5轮选考终于拿到offer。技术面重点考察算法和系统设计，分享完整准备经验...",
    content: "终于拿到了乐天的内定！分享一下我的面试经验：一共三轮面试，技术面主要考察算法和系统设计，HR面重点在沟通能力和职业规划。准备了大概2个月，刷了200道leetcode...",
    company: {
      name: "乐天",
      logo: "🏢",
      location: "东京・品川",
    },
    position: "软件工程师",
    timestamp: "2小时前",
    likes: 456,
    comments: 89,
    bookmarks: 234,
    views: 3421,
    tags: ["内定经验", "IT", "技术面", "乐天"],
    featured: true,
  },
  {
    id: "2",
    domain: "life",
    category: "housing",
    city: "tokyo",
    author: {
      id: "u2",
      name: "租房小能手",
      avatar: "Z",
      university: "早稻田大学",
      verified: true,
      badges: ["本地达人"],
    },
    title: "东京租房避坑指南：保证金、礼金、初期费用全解析",
    summary: "在东京租了3次房，踩过很多坑。总结了保证金、礼金、初期费用的注意事项，帮大家省钱...",
    content: "在东京租房的经验分享...",
    timestamp: "3小时前",
    likes: 678,
    comments: 123,
    bookmarks: 445,
    views: 5632,
    tags: ["租房避坑", "初期费用", "东京", "省钱攻略"],
    rating: 4.8,
    helpful: 95,
    featured: true,
  },
  {
    id: "3",
    domain: "life",
    category: "medical",
    city: "osaka",
    author: {
      id: "u3",
      name: "阿美",
      avatar: "A",
      university: "大阪大学",
      verified: true,
      badges: ["本地达人"],
    },
    title: "大阪中文友好医院推荐：内科、牙科、妇科全覆盖",
    summary: "整理了大阪地区能用中文沟通的医院清单，包括内科、牙科、妇科，附带预约方式和就诊体验...",
    content: "大阪中文友好医院推荐...",
    timestamp: "5小时前",
    likes: 892,
    comments: 156,
    bookmarks: 678,
    views: 8934,
    tags: ["中文医院", "大阪", "就医指南", "牙科"],
    rating: 4.9,
    helpful: 98,
    featured: true,
  },
  {
    id: "4",
    domain: "career",
    category: "interview",
    city: "tokyo",
    author: {
      id: "u4",
      name: "王明",
      avatar: "W",
      university: "庆应义塾大学",
      verified: true,
      badges: ["已获内定"],
    },
    title: "三菱商事商务分析师面经：GD + 压力面详细复盘",
    summary: "刚结束三菱商事的选考，记录GD和压力面的完整流程，分享一些应对技巧...",
    content: "三菱商事面经分享...",
    company: {
      name: "三菱商事",
      logo: "💼",
      location: "东京・千代田",
    },
    position: "商务分析师",
    timestamp: "1天前",
    likes: 534,
    comments: 87,
    bookmarks: 312,
    views: 4521,
    tags: ["面试经验", "商社", "GD", "压力面"],
  },
  {
    id: "5",
    domain: "life",
    category: "food",
    city: "osaka",
    author: {
      id: "u5",
      name: "吃货小红",
      avatar: "H",
      verified: true,
      badges: ["本地达人"],
    },
    title: "大阪心斋桥中华料理推荐：人均2000日元以下",
    summary: "整理了心斋桥附近性价比高的中华料理店，都是亲测好吃且实惠的...",
    content: "大阪美食推荐...",
    timestamp: "1天前",
    likes: 423,
    comments: 67,
    bookmarks: 289,
    views: 3214,
    tags: ["美食推荐", "大阪", "中华料理", "省钱"],
    rating: 4.6,
  },
  {
    id: "6",
    domain: "life",
    category: "finance",
    city: "tokyo",
    author: {
      id: "u6",
      name: "办卡达人",
      avatar: "B",
      university: "东京大学",
      verified: true,
      badges: ["本地达人"],
    },
    title: "留学生办银行卡、手机卡完全指南（东京版）",
    summary: "总结了在东京办理银行卡（三菱UFJ、瑞穗）和手机卡（au、docomo）的完整流程和注意事项...",
    content: "办卡指南...",
    timestamp: "2天前",
    likes: 756,
    comments: 134,
    bookmarks: 523,
    views: 6789,
    tags: ["办卡指南", "银行卡", "手机卡", "东京"],
    helpful: 96,
  },
  {
    id: "7",
    domain: "career",
    category: "es",
    city: "tokyo",
    author: {
      id: "u7",
      name: "ES导师",
      avatar: "E",
      university: "一桥大学",
      verified: true,
      badges: ["已获内定", "活跃用户"],
    },
    title: "如何写出高通过率的ES：志望动机、自己PR、学生时代最頑張ったこと",
    summary: "分享ES写作技巧，包括志望动机、自己PR、学生时代最頑張ったこと的万能框架...",
    content: "ES写作技巧...",
    timestamp: "2天前",
    likes: 1234,
    comments: 245,
    bookmarks: 890,
    views: 12345,
    tags: ["ES写法", "志望动机", "自己PR", "求职技巧"],
    featured: true,
  },
  {
    id: "8",
    domain: "life",
    category: "admin",
    city: "osaka",
    author: {
      id: "u8",
      name: "行政小助手",
      avatar: "X",
      verified: true,
      badges: ["本地达人"],
    },
    title: "大阪市役所办理住民登录、国保、年金完整流程",
    summary: "刚来日本必办的三件事：住民登录、国民健康保险、国民年金，详细流程和材料清单...",
    content: "行政手续办理指南...",
    timestamp: "3天前",
    likes: 567,
    comments: 98,
    bookmarks: 423,
    views: 5678,
    tags: ["行政手续", "住民登录", "国保", "年金"],
    helpful: 97,
  },
  {
    id: "9",
    domain: "career",
    category: "career-qa",
    city: "tokyo",
    author: {
      id: "u9",
      name: "求助的小白",
      avatar: "Q",
      university: "筑波大学",
      verified: false,
    },
    title: "求问：留学生就活什么时候开始准备比较好？",
    summary: "现在大三，想了解留学生就活的时间线，什么时候开始准备ES、面试比较合适？",
    content: "求助问题...",
    timestamp: "3天前",
    likes: 234,
    comments: 56,
    bookmarks: 123,
    views: 2345,
    tags: ["求职问答", "就活时间", "留学生"],
  },
  {
    id: "10",
    domain: "life",
    category: "housing",
    city: "kyoto",
    author: {
      id: "u10",
      name: "京都小姐姐",
      avatar: "K",
      university: "京都大学",
      verified: true,
      badges: ["本地达人"],
    },
    title: "京都大学周边租房推荐：从吉田寮到民间公寓",
    summary: "整理了京大附近的租房选择，包括学校宿舍、吉田寮、民间公寓的优劣对比...",
    content: "京都租房指南...",
    timestamp: "4天前",
    likes: 445,
    comments: 78,
    bookmarks: 267,
    views: 4123,
    tags: ["租房推荐", "京都", "京都大学", "学生宿舍"],
    rating: 4.7,
  },
  {
    id: "11",
    domain: "career",
    category: "company-review",
    city: "tokyo",
    author: {
      id: "u11",
      name: "内部人士",
      avatar: "N",
      verified: true,
      badges: ["已获内定"],
    },
    title: "某IT大厂实习体验：避雷警告⚠️",
    summary: "在某知名IT公司实习3个月的真实体验，有些坑希望大家注意...",
    content: "企业避雷...",
    timestamp: "4天前",
    likes: 789,
    comments: 167,
    bookmarks: 445,
    views: 7890,
    tags: ["企业避雷", "实习体验", "IT"],
  },
  {
    id: "12",
    domain: "life",
    category: "part-time",
    city: "tokyo",
    author: {
      id: "u12",
      name: "兼职王",
      avatar: "J",
      university: "早稻田大学",
      verified: true,
    },
    title: "东京留学生友好兼职推荐：时薪1200円起",
    summary: "整理了留学生可以做的兼职工作，包括便利店、餐厅、家教、翻译等...",
    content: "兼职推荐...",
    timestamp: "5天前",
    likes: 567,
    comments: 123,
    bookmarks: 389,
    views: 5234,
    tags: ["兼职推荐", "东京", "时薪", "留学生"],
    rating: 4.5,
  },
];

export const careerTags = [
  { id: "es", label: "ES写法", count: 2345 },
  { id: "interview", label: "面试经验", count: 3456 },
  { id: "internship", label: "实习", count: 1234 },
  { id: "company-warning", label: "企业避雷", count: 890 },
  { id: "offer-exp", label: "内定经验", count: 2789 },
  { id: "career-jp", label: "日本求职", count: 4567 },
  { id: "gd", label: "GD面试", count: 678 },
  { id: "stress-interview", label: "压力面", count: 456 },
];

export const lifeTags = [
  { id: "housing-warning", label: "租房避坑", count: 3456 },
  { id: "cn-hospital", label: "中文医院", count: 2345 },
  { id: "food", label: "美食推荐", count: 4567 },
  { id: "save-money", label: "省钱攻略", count: 2890 },
  { id: "card-guide", label: "办卡指南", count: 1234 },
  { id: "moving", label: "搬家", count: 567 },
  { id: "part-time", label: "兼职", count: 1890 },
  { id: "admin", label: "行政手续", count: 1456 },
];

export const hotDiscussionsJapan = [
  {
    id: "1",
    title: "今年春季招聘IT行业内定率怎么样？",
    replies: 234,
    domain: "career" as ContentDomain,
  },
  {
    id: "2",
    title: "东京哪个区租房性价比最高？",
    replies: 189,
    domain: "life" as ContentDomain,
  },
  {
    id: "3",
    title: "留学生就活的隐形天花板真的存在吗？",
    replies: 345,
    domain: "career" as ContentDomain,
  },
  {
    id: "4",
    title: "大阪有哪些中文友好的牙科诊所？",
    replies: 123,
    domain: "life" as ContentDomain,
  },
  {
    id: "5",
    title: "商社和咨询该选哪个？过来人分享",
    replies: 267,
    domain: "career" as ContentDomain,
  },
];
