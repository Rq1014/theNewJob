// 树洞相关数据类型

export type TreeholeType = "school" | "region";
export type SmallTreeholeMode = "confession" | "social"; // 倾诉模式 | 搭子/交友模式

// 大树洞（学校树洞、地区树洞）
export interface BigTreehole {
  id: string;
  name: string;
  type: TreeholeType;
  activeUsers: number;
  hotTags: string[];
  location?: string; // 地区树洞的位置
  schoolName?: string; // 学校树洞的学校名
  description: string; // 简介
  icon: string; // 图标 emoji
  iconBgColor: string; // 图标背景色
  todayHotTopic?: string; // 今日热聊
}

// 小树洞（用户创建的兴趣树洞）
export interface SmallTreehole {
  id: string;
  name: string;
  belongTo: string; // 所属大树洞ID
  belongToName: string; // 所属大树洞名称
  members: number;
  validUntil: string; // 有效期
  isAnonymous: boolean;
  mode: SmallTreeholeMode;
  tags: string[];
  description: string;
  creator?: string;
}

// 匹配类型
export type MatchType = "text" | "voice" | "video";

export interface MatchOption {
  id: string;
  type: MatchType;
  title: string;
  description: string;
  onlineCount: number;
  isVip: boolean;
  icon: string;
}

// 发帖类型
export type PostType = "confession" | "question" | "partner" | "interest" | "activity" | "experience";

export interface PostTypeOption {
  type: PostType;
  label: string;
  icon: string;
  description: string;
}

// 树洞帖子
export interface TreeholePost {
  id: string;
  treeholeId: string; // 所属树洞ID（大树洞或小树洞）
  treeholeName: string;
  postType: PostType;
  title?: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    isAnonymous: boolean;
  };
  createdAt: string;
  likes: number;
  comments: number;
  tags: string[];
}

// 推荐理由
export type RecommendReason = "school-hot" | "region-hot" | "might-interest" | "recently-active" | "newly-created";

export interface SmallTreeholeWithReason extends SmallTreehole {
  recommendReason?: RecommendReason;
}

// 大树洞数据
export const bigTreeholes: BigTreehole[] = [
  // 学校树洞
  {
    id: "bt1",
    name: "东京大学树洞",
    type: "school",
    schoolName: "东京大学",
    activeUsers: 1234,
    hotTags: ["考试周", "研究室", "就活", "日语学习"],
    description: "东大同学的专属树洞，分享学习生活、吐槽研究室、交流就活经验",
    icon: "🎓",
    iconBgColor: "bg-blue-500",
    todayHotTopic: "东大修士申请面试经验分享",
  },
  {
    id: "bt2",
    name: "早稻田大学树洞",
    type: "school",
    schoolName: "早稻田大学",
    activeUsers: 892,
    hotTags: ["社团活动", "宿舍", "选课", "课程推荐"],
    description: "早大学子的温暖小窝，聊聊社团、宿舍、选课那些事儿",
    icon: "🎓",
    iconBgColor: "bg-purple-500",
    todayHotTopic: "早大宿舍申请技巧和注意事项",
  },
  {
    id: "bt3",
    name: "京都大学树洞",
    type: "school",
    schoolName: "京都大学",
    activeUsers: 756,
    hotTags: ["图书馆", "奖学金", "实验室", "毕业论文"],
    description: "京大人的学术天地，讨论研究、分享奖学金信息、互助论文写作",
    icon: "🎓",
    iconBgColor: "bg-indigo-500",
    todayHotTopic: "京大JASSO奖学金申请经验",
  },
  {
    id: "bt7",
    name: "庆应义塾大学树洞",
    type: "school",
    schoolName: "庆应义塾大学",
    activeUsers: 678,
    hotTags: ["商学部", "三田校区", "就活", "校友网络"],
    description: "慶應生的交流空间，分享商科学习、就职资源、校友经验",
    icon: "🎓",
    iconBgColor: "bg-red-500",
    todayHotTopic: "慶應商科就活如何利用校友资源",
  },
  {
    id: "bt8",
    name: "东京工业大学树洞",
    type: "school",
    schoolName: "东京工业大学",
    activeUsers: 534,
    hotTags: ["理工科", "实验", "研究生申请", "编程"],
    description: "东工大理工宅的聚集地，聊技术、做实验、分享科研日常",
    icon: "🎓",
    iconBgColor: "bg-cyan-500",
    todayHotTopic: "东工大实验室选择和导师沟通经验",
  },
  {
    id: "bt9",
    name: "大阪大学树洞",
    type: "school",
    schoolName: "大阪大学",
    activeUsers: 612,
    hotTags: ["关西生活", "研究室", "医学部", "留学生活"],
    description: "阪大同学的温馨据点，交流学术、分享关西生活体验",
    icon: "🎓",
    iconBgColor: "bg-amber-500",
    todayHotTopic: "阪大医学部研究生申请全攻略",
  },
  {
    id: "bt10",
    name: "东北大学树洞",
    type: "school",
    schoolName: "东北大学",
    activeUsers: 445,
    hotTags: ["仙台生活", "工学研究", "奖学金", "雪季生活"],
    description: "东北大学生的交流圈，分享东北地区学习生活点滴",
    icon: "🎓",
    iconBgColor: "bg-teal-500",
    todayHotTopic: "仙台冬季生活必备物品清单",
  },
  {
    id: "bt11",
    name: "名古屋大学树洞",
    type: "school",
    schoolName: "名古屋大学",
    activeUsers: 398,
    hotTags: ["中部地区", "汽车产业", "研究生", "校园活动"],
    description: "名大学子的专属空间，聊学习、聊生活、聊中部发展",
    icon: "🎓",
    iconBgColor: "bg-lime-500",
    todayHotTopic: "名大汽车工程专业就业前景分析",
  },
  {
    id: "bt12",
    name: "九州大学树洞",
    type: "school",
    schoolName: "九州大学",
    activeUsers: 367,
    hotTags: ["福冈生活", "校区搬迁", "温泉", "九州文化"],
    description: "九大同学的聚集地，分享福冈生活、探索九州魅力",
    icon: "🎓",
    iconBgColor: "bg-emerald-500",
    todayHotTopic: "九大新校区周边生活配套全解析",
  },
  {
    id: "bt13",
    name: "一桥大学树洞",
    type: "school",
    schoolName: "一桥大学",
    activeUsers: 289,
    hotTags: ["商科", "经济学", "就职", "国立川市"],
    description: "一桥生的学术社区，商科精英的经验分享和职业探讨",
    icon: "🎓",
    iconBgColor: "bg-rose-500",
    todayHotTopic: "一桥经济学研究科入试经验分享",
  },
  {
    id: "bt14",
    name: "上智大学树洞",
    type: "school",
    schoolName: "上智大学",
    activeUsers: 423,
    hotTags: ["国际化", "外语", "四谷校区", "天主教大学"],
    description: "上智学生的温馨树洞，多元文化交流、外语学习分享",
    icon: "🎓",
    iconBgColor: "bg-violet-500",
    todayHotTopic: "上智国际教养学部课程推荐",
  },
  {
    id: "bt15",
    name: "明治大学树洞",
    type: "school",
    schoolName: "明治大学",
    activeUsers: 556,
    hotTags: ["私立名校", "就活", "社团", "和泉校区"],
    description: "明大学子的交流平台，分享校园生活、就职经验、社团趣事",
    icon: "🎓",
    iconBgColor: "bg-fuchsia-500",
    todayHotTopic: "明大就活经验：如何拿到大手企业内定",
  },

  // 地区树洞
  {
    id: "bt4",
    name: "东京地区树洞",
    type: "region",
    location: "东京",
    activeUsers: 3456,
    hotTags: ["租房", "美食", "周末活动", "兼职"],
    description: "东京留学生的生活圈，找房子、探美食、约周末、聊兼职",
    icon: "📍",
    iconBgColor: "bg-green-500",
    todayHotTopic: "东京租房中介避坑指南",
  },
  {
    id: "bt5",
    name: "大阪地区树洞",
    type: "region",
    location: "大阪",
    activeUsers: 2134,
    hotTags: ["关西生活", "交通", "购物", "旅游"],
    description: "大阪留学生的据点，分享关西生活的点点滴滴",
    icon: "📍",
    iconBgColor: "bg-orange-500",
    todayHotTopic: "大阪周末游玩好去处推荐",
  },
  {
    id: "bt6",
    name: "京都地区树洞",
    type: "region",
    location: "京都",
    activeUsers: 1567,
    hotTags: ["古城风光", "学习氛围", "传统文化", "寺庙"],
    description: "京都留学生的文艺角落，在古城中感受传统与现代的交融",
    icon: "📍",
    iconBgColor: "bg-pink-500",
    todayHotTopic: "京都赏樱季最佳观赏地点分享",
  },
  {
    id: "bt16",
    name: "横滨地区树洞",
    type: "region",
    location: "横滨",
    activeUsers: 1234,
    hotTags: ["港口城市", "中华街", "通勤东京", "海边生活"],
    description: "横滨留学生的温馨港湾，分享海港城市的独特魅力",
    icon: "📍",
    iconBgColor: "bg-sky-500",
    todayHotTopic: "横滨中华街美食探店攻略",
  },
  {
    id: "bt17",
    name: "名古屋地区树洞",
    type: "region",
    location: "名古屋",
    activeUsers: 987,
    hotTags: ["中部地区", "汽车城", "味噌料理", "名古屋城"],
    description: "名古屋留学生的生活圈，探索中部城市的工业与文化",
    icon: "📍",
    iconBgColor: "bg-yellow-500",
    todayHotTopic: "名古屋特色美食打卡清单",
  },
  {
    id: "bt18",
    name: "福冈地区树洞",
    type: "region",
    location: "福冈",
    activeUsers: 856,
    hotTags: ["九州门户", "拉面", "博多", "温泉"],
    description: "福冈留学生的交流地，感受九州的热情与美食文化",
    icon: "📍",
    iconBgColor: "bg-red-400",
    todayHotTopic: "福冈博多拉面店排行榜",
  },
  {
    id: "bt19",
    name: "仙台地区树洞",
    type: "region",
    location: "仙台",
    activeUsers: 634,
    hotTags: ["东北地区", "牛舌", "温泉", "雪景"],
    description: "仙台留学生的暖心空间，分享东北生活的四季变换",
    icon: "📍",
    iconBgColor: "bg-blue-400",
    todayHotTopic: "仙台牛舌必吃餐厅推荐",
  },
  {
    id: "bt20",
    name: "神户地区树洞",
    type: "region",
    location: "神户",
    activeUsers: 723,
    hotTags: ["港口", "异国风情", "神户牛", "夜景"],
    description: "神户留学生的浪漫据点，享受国际化港口城市的多元文化",
    icon: "📍",
    iconBgColor: "bg-purple-400",
    todayHotTopic: "神户夜景最佳观赏点分享",
  },
  {
    id: "bt21",
    name: "札幌地区树洞",
    type: "region",
    location: "札幌",
    activeUsers: 567,
    hotTags: ["北海道", "雪祭", "海鲜", "滑雪"],
    description: "札幌留学生的冰雪天地，分享北国生活的独特体验",
    icon: "📍",
    iconBgColor: "bg-indigo-400",
    todayHotTopic: "札幌雪祭观赏攻略和必玩项目",
  },
];

// 小树洞数据
export const smallTreeholes: SmallTreehole[] = [
  {
    id: "st1",
    name: "健身树洞",
    belongTo: "bt4",
    belongToName: "东京地区树洞",
    members: 156,
    validUntil: "长期有效",
    isAnonymous: false,
    mode: "social",
    tags: ["健身", "运动", "搭子"],
    description: "寻找健身伙伴，一起撸铁打卡",
  },
  {
    id: "st2",
    name: "深夜吐槽树洞",
    belongTo: "bt1",
    belongToName: "东京大学树洞",
    members: 234,
    validUntil: "长期有效",
    isAnonymous: true,
    mode: "confession",
    tags: ["吐槽", "倾诉", "匿名"],
    description: "深夜emo时刻，匿名倾诉你的烦恼",
  },
  {
    id: "st3",
    name: "摄影树洞",
    belongTo: "bt4",
    belongToName: "东京地区树洞",
    members: 89,
    validUntil: "30天后",
    isAnonymous: false,
    mode: "social",
    tags: ["摄影", "外拍", "搭子"],
    description: "摄影爱好者集合，周末一起外拍",
  },
  {
    id: "st4",
    name: "饭搭子树洞",
    belongTo: "bt4",
    belongToName: "东京地区树洞",
    members: 312,
    validUntil: "长期有效",
    isAnonymous: false,
    mode: "social",
    tags: ["美食", "饭搭子", "社交"],
    description: "找饭搭子，探店打卡不孤单",
  },
  {
    id: "st5",
    name: "考研树洞",
    belongTo: "bt1",
    belongToName: "东京大学树洞",
    members: 178,
    validUntil: "60天后",
    isAnonymous: false,
    mode: "social",
    tags: ["考研", "学习", "互助"],
    description: "考研备考互相监督，资料共享",
  },
  {
    id: "st6",
    name: "租房避坑树洞",
    belongTo: "bt4",
    belongToName: "东京地区树洞",
    members: 445,
    validUntil: "长期有效",
    isAnonymous: false,
    mode: "confession",
    tags: ["租房", "避坑", "经验分享"],
    description: "分享租房经验，曝光黑中介",
  },
  {
    id: "st7",
    name: "失恋治愈树洞",
    belongTo: "bt1",
    belongToName: "东京大学树洞",
    members: 67,
    validUntil: "15天后",
    isAnonymous: true,
    mode: "confession",
    tags: ["失恋", "治愈", "匿名"],
    description: "失恋了来这里，匿名倾诉互相治愈",
  },
  {
    id: "st8",
    name: "游戏树洞",
    belongTo: "bt4",
    belongToName: "东京地区树洞",
    members: 223,
    validUntil: "长期有效",
    isAnonymous: false,
    mode: "social",
    tags: ["游戏", "开黑", "搭子"],
    description: "找游戏搭子，一起开黑上分",
  },
  {
    id: "st9",
    name: "日语学习树洞",
    belongTo: "bt2",
    belongToName: "早稻田大学树洞",
    members: 189,
    validUntil: "长期有效",
    isAnonymous: false,
    mode: "social",
    tags: ["日语", "学习", "互助"],
    description: "一起练习日语，备考N1/N2",
  },
  {
    id: "st10",
    name: "职场焦虑树洞",
    belongTo: "bt1",
    belongToName: "东京大学树洞",
    members: 134,
    validUntil: "长期有效",
    isAnonymous: true,
    mode: "confession",
    tags: ["就活", "焦虑", "倾诉"],
    description: "就活压力大？来这里倾诉你的焦虑",
  },
];

// 匹配选项
export const matchOptions: MatchOption[] = [
  {
    id: "m1",
    type: "text",
    title: "文字匹配",
    description: "随机匹配聊天对象",
    onlineCount: 234,
    isVip: false,
    icon: "💬",
  },
  {
    id: "m2",
    type: "voice",
    title: "语音匹配",
    description: "语音连线陌生人",
    onlineCount: 89,
    isVip: false,
    icon: "🎙️",
  },
  {
    id: "m3",
    type: "video",
    title: "视频匹配",
    description: "面对面视频聊天",
    onlineCount: 45,
    isVip: true,
    icon: "📹",
  },
];

// 发帖类型选项
export const postTypeOptions: PostTypeOption[] = [
  {
    type: "confession",
    label: "吐槽倾诉",
    icon: "💭",
    description: "分享你的心情和烦恼",
  },
  {
    type: "question",
    label: "提问求助",
    icon: "❓",
    description: "寻求帮助和建议",
  },
  {
    type: "partner",
    label: "找搭子",
    icon: "🤝",
    description: "找伙伴一起做事",
  },
  {
    type: "interest",
    label: "兴趣交流",
    icon: "💡",
    description: "分享兴趣和爱好",
  },
  {
    type: "activity",
    label: "活动约人",
    icon: "🎉",
    description: "发起或参与活动",
  },
  {
    type: "experience",
    label: "经验分享",
    icon: "📚",
    description: "分享经验和心得",
  },
];

// 帖子数据从独立文件导入
export { treeholePosts } from "./treehole-posts";

// 推荐理由标签
export const recommendReasonLabels: Record<RecommendReason, string> = {
  "school-hot": "同校热门",
  "region-hot": "同城热门",
  "might-interest": "你可能感兴趣",
  "recently-active": "最近活跃",
  "newly-created": "新创建",
};
