export type PostType = "experience" | "offer" | "question" | "life";
export type PostPriority = "normal" | "featured" | "help";

export interface Author {
  id: string;
  name: string;
  avatar: string;
  university: string;
  verified: boolean;
  tags?: string[]; // 例如：已获内定、学校认证、活跃用户
}

export interface Company {
  name: string;
  logo: string;
  location?: string;
}

export interface CommunityPost {
  id: string;
  type: PostType;
  priority: PostPriority;
  author: Author;
  title: string;
  summary: string;
  content: string;
  company?: Company;
  position?: string;
  timestamp: string;
  likes: number;
  comments: number;
  bookmarks: number;
  tags: string[];
  images?: string[];
}

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: "1",
    type: "offer",
    priority: "featured",
    author: {
      id: "u1",
      name: "小李",
      avatar: "L",
      university: "东京大学",
      verified: true,
      tags: ["已获内定", "学校认证"],
    },
    title: "终于拿到乐天内定！分享完整选考经验",
    summary: "历时2个月，从网测到最终面，一共经历了5轮选考。技术面重点考察算法和系统设计，分享一些准备心得...",
    content: "终于拿到了乐天的内定！分享一下我的面试经验：一共三轮面试，技术面主要考察算法和系统设计，HR面重点在沟通能力和职业规划。准备了大概2个月，刷了200道leetcode...",
    company: {
      name: "乐天",
      logo: "🏢",
      location: "东京・品川",
    },
    position: "软件工程师",
    timestamp: "2小时前",
    likes: 256,
    comments: 43,
    bookmarks: 89,
    tags: ["内定", "IT", "乐天", "技术面"],
  },
  {
    id: "2",
    type: "experience",
    priority: "normal",
    author: {
      id: "u2",
      name: "阿华",
      avatar: "H",
      university: "早稻田大学",
      verified: true,
      tags: ["活跃用户"],
    },
    title: "索尼PM二面经验分享",
    summary: "刚参加完索尼的二次面试，整体感觉还不错。面试官问了很多关于产品思维的问题，还让现场设计产品方案...",
    content: "刚参加完索尼的二次面试，整体感觉还不错。面试官问了很多关于产品思维的问题，还让现场设计一个产品方案。建议大家提前准备一些案例分析...",
    company: {
      name: "索尼",
      logo: "📱",
      location: "东京・港区",
    },
    position: "产品经理",
    timestamp: "5小时前",
    likes: 128,
    comments: 27,
    bookmarks: 45,
    tags: ["面经", "PM", "索尼", "产品设计"],
  },
  {
    id: "3",
    type: "question",
    priority: "help",
    author: {
      id: "u3",
      name: "小红",
      avatar: "H",
      university: "京都大学",
      verified: false,
      tags: [],
    },
    title: "求助：丰田机械工程师面试都会问什么？",
    summary: "下周要去丰田面试机械工程师岗位，想了解一下技术面都会问哪些问题，有经验的朋友求指点...",
    content: "请问有人面试过丰田的机械工程师岗位吗？想了解一下技术面会问哪些方面的问题，需要准备什么？",
    company: {
      name: "丰田",
      logo: "🚗",
      location: "爱知・丰田市",
    },
    position: "机械工程师",
    timestamp: "1天前",
    likes: 34,
    comments: 12,
    bookmarks: 8,
    tags: ["求助", "机械", "丰田"],
  },
  {
    id: "4",
    type: "offer",
    priority: "featured",
    author: {
      id: "u4",
      name: "王明",
      avatar: "W",
      university: "大阪大学",
      verified: true,
      tags: ["已获内定"],
    },
    title: "4个月选考路，三菱商事内定经验全记录",
    summary: "历经4个月，终于收到三菱商事的内定！完整记录网测→GD→技术面→高管面的全过程，每一轮都是硬仗...",
    content: "历经4个月，终于收到三菱商事的内定！分享下选考流程：网测→一面（GD）→二面（技术+行为）→三面（高管面）→内定。每一轮都很有挑战性...",
    company: {
      name: "三菱商事",
      logo: "💼",
      location: "东京・千代田",
    },
    position: "商务分析师",
    timestamp: "1天前",
    likes: 387,
    comments: 56,
    bookmarks: 142,
    tags: ["内定", "商社", "三菱", "选考经验"],
  },
  {
    id: "5",
    type: "life",
    priority: "normal",
    author: {
      id: "u5",
      name: "小美",
      avatar: "M",
      university: "庆应义塾大学",
      verified: true,
      tags: ["学校认证"],
    },
    title: "分享一下我的就活穿搭心得",
    summary: "参加了十几场面试后总结的穿搭经验，女生篇。从リクルートスーツ到小物搭配，细节很重要...",
    content: "分享一下我的就活穿搭心得。参加了十几场面试，慢慢摸索出了一些经验。女生的リクルートスーツ选择、配色、小物搭配都有讲究...",
    timestamp: "2天前",
    likes: 167,
    comments: 34,
    bookmarks: 78,
    tags: ["就活", "穿搭", "经验分享"],
  },
  {
    id: "6",
    type: "experience",
    priority: "normal",
    author: {
      id: "u6",
      name: "张伟",
      avatar: "Z",
      university: "东北大学",
      verified: true,
      tags: ["已获内定"],
    },
    title: "NTT Data 技术面详细复盘",
    summary: "刚结束NTT Data的技术面，趁热记录一下。考了数据结构、网络知识、还有系统设计题...",
    content: "刚结束NTT Data的技术面，趁热记录一下面试内容。考察了数据结构（链表、树）、网络知识（TCP/IP）、还有一道系统设计题...",
    company: {
      name: "NTT Data",
      logo: "💻",
      location: "东京・江东",
    },
    position: "软件开发",
    timestamp: "3天前",
    likes: 93,
    comments: 18,
    bookmarks: 34,
    tags: ["面经", "IT", "技术面"],
  },
  {
    id: "7",
    type: "question",
    priority: "help",
    author: {
      id: "u7",
      name: "李娜",
      avatar: "N",
      university: "名古屋大学",
      verified: false,
      tags: [],
    },
    title: "求问：如何准备日语自我介绍？",
    summary: "马上要开始就活了，日语自我介绍应该怎么准备？有什么模板或者注意事项吗？",
    content: "马上要开始就活了，日语自我介绍应该怎么准备比较好？有什么固定的模板吗？需要注意什么？求前辈指点！",
    timestamp: "3天前",
    likes: 56,
    comments: 23,
    bookmarks: 12,
    tags: ["求助", "就活", "日语"],
  },
  {
    id: "8",
    type: "offer",
    priority: "normal",
    author: {
      id: "u8",
      name: "陈思",
      avatar: "C",
      university: "九州大学",
      verified: true,
      tags: ["已获内定"],
    },
    title: "拿到资生堂Marketing内定啦！",
    summary: "分享一下我的资生堂Marketing岗位选考经验，从ES到最终面一共6轮，压力面印象深刻...",
    content: "拿到资生堂Marketing内定啦！分享一下选考经验。从ES到最终面一共经历了6轮，特别是压力面，真的很考验心理素质...",
    company: {
      name: "资生堂",
      logo: "💄",
      location: "东京・银座",
    },
    position: "Marketing",
    timestamp: "4天前",
    likes: 234,
    comments: 41,
    bookmarks: 67,
    tags: ["内定", "Marketing", "资生堂"],
  },
];

export const trendingTopics = [
  { tag: "春季招聘", count: 1234, trend: "hot" },
  { tag: "技术面准备", count: 856, trend: "rising" },
  { tag: "ES写法", count: 623, trend: "normal" },
  { tag: "内定榜单", count: 512, trend: "hot" },
  { tag: "压力面", count: 387, trend: "rising" },
];

export const hotDiscussions = [
  { id: "1", title: "今年IT行业内定率怎么样？", replies: 127 },
  { id: "2", title: "商社和咨询该选哪个？", replies: 89 },
  { id: "3", title: "留学生就活的隐形天花板", replies: 156 },
];

export const beginnerGuides = [
  { id: "1", title: "就活完全指南：从零开始的求职之路", icon: "📚" },
  { id: "2", title: "如何写出高质量的ES", icon: "✍️" },
  { id: "3", title: "面试常见问题100问", icon: "💡" },
];
