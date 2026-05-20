// 大学过去问数据结构

export type UniversityId =
  | "tokyo"
  | "waseda"
  | "keio"
  | "titech"
  | "kyoto"
  | "osaka"
  | "tohoku"
  | "nagoya"
  | "hokkaido";

export interface University {
  id: UniversityId;
  name: string;
  nameEn: string;
  emoji: string; // 使用emoji作为校徽
  color: string;
  kakomonCount: number;
  hotCourses: string[];
  description: string;
  popularSubjects: string[];
}

export interface Kakomon {
  id: string;
  universityId: UniversityId;
  course: string;
  subject: string;
  year: number;
  semester: "spring" | "fall";
  professor: string;
  downloadCount: number;
  uploader: string;
  uploadDate: string;
  fileType: "PDF" | "Image" | "Document";
  verified: boolean;
}

export interface Discussion {
  id: string;
  universityId: UniversityId;
  course: string;
  title: string;
  content: string;
  author: string;
  replyCount: number;
  viewCount: number;
  timestamp: string;
  tags: string[];
}

export interface MaterialRequest {
  id: string;
  universityId: UniversityId;
  course: string;
  title: string;
  description: string;
  author: string;
  status: "pending" | "solved";
  timestamp: string;
  responseCount: number;
}

export const universities: University[] = [
  {
    id: "tokyo",
    name: "东京大学",
    nameEn: "The University of Tokyo",
    emoji: "🏛️",
    color: "from-blue-500 to-blue-600",
    kakomonCount: 1245,
    hotCourses: ["线性代数", "微积分", "数据结构", "量子力学"],
    description: "日本最高学府，理工科资料最全",
    popularSubjects: ["理学", "工学", "经济学"],
  },
  {
    id: "waseda",
    name: "早稻田大学",
    nameEn: "Waseda University",
    emoji: "📚",
    color: "from-red-500 to-red-600",
    kakomonCount: 982,
    hotCourses: ["经营战略", "市场营销", "日本近代史", "国际关系"],
    description: "私立名校，文商科资料丰富",
    popularSubjects: ["商学", "政治学", "文学"],
  },
  {
    id: "keio",
    name: "庆应义塾大学",
    nameEn: "Keio University",
    emoji: "🎓",
    color: "from-indigo-500 to-indigo-600",
    kakomonCount: 876,
    hotCourses: ["宏观经济学", "财务管理", "统计学", "医学概论"],
    description: "顶尖私立，经济医学资料优质",
    popularSubjects: ["经济学", "医学", "法学"],
  },
  {
    id: "titech",
    name: "东京工业大学",
    nameEn: "Tokyo Institute of Technology",
    emoji: "⚙️",
    color: "from-purple-500 to-purple-600",
    kakomonCount: 734,
    hotCourses: ["算法设计", "电路理论", "热力学", "材料科学"],
    description: "工科名校，理工题库完整",
    popularSubjects: ["计算机", "机械", "电子"],
  },
  {
    id: "kyoto",
    name: "京都大学",
    nameEn: "Kyoto University",
    emoji: "🏯",
    color: "from-amber-500 to-amber-600",
    kakomonCount: 1089,
    hotCourses: ["有机化学", "理论物理", "哲学概论", "生物化学"],
    description: "关西名校，理学资料详尽",
    popularSubjects: ["理学", "工学", "文学"],
  },
  {
    id: "osaka",
    name: "大阪大学",
    nameEn: "Osaka University",
    emoji: "🔬",
    color: "from-green-500 to-green-600",
    kakomonCount: 645,
    hotCourses: ["免疫学", "机械工程", "半导体物理", "经济学原理"],
    description: "综合型大学，医工资料齐全",
    popularSubjects: ["医学", "工学", "理学"],
  },
  {
    id: "tohoku",
    name: "东北大学",
    nameEn: "Tohoku University",
    emoji: "🌲",
    color: "from-teal-500 to-teal-600",
    kakomonCount: 523,
    hotCourses: ["材料物理", "电磁学", "数值分析", "金属工学"],
    description: "东北地区顶尖，材料工学强项",
    popularSubjects: ["材料", "工学", "理学"],
  },
  {
    id: "nagoya",
    name: "名古屋大学",
    nameEn: "Nagoya University",
    emoji: "🔭",
    color: "from-orange-500 to-orange-600",
    kakomonCount: 489,
    hotCourses: ["天体物理", "汽车工程", "化学工程", "地球科学"],
    description: "中部名校，汽车工程见长",
    popularSubjects: ["工学", "理学", "农学"],
  },
  {
    id: "hokkaido",
    name: "北海道大学",
    nameEn: "Hokkaido University",
    emoji: "❄️",
    color: "from-cyan-500 to-cyan-600",
    kakomonCount: 412,
    hotCourses: ["环境科学", "农业经济", "生态学", "兽医学"],
    description: "北方名校，农学环境特色",
    popularSubjects: ["农学", "环境", "兽医"],
  },
];

// 过去问数据
export const mockKakomon: Kakomon[] = [
  {
    id: "k1",
    universityId: "tokyo",
    course: "线性代数 I",
    subject: "数学",
    year: 2024,
    semester: "spring",
    professor: "田中教授",
    downloadCount: 234,
    uploader: "数学系学长",
    uploadDate: "2天前",
    fileType: "PDF",
    verified: true,
  },
  {
    id: "k2",
    universityId: "tokyo",
    course: "数据结构与算法",
    subject: "计算机",
    year: 2023,
    semester: "fall",
    professor: "佐藤教授",
    downloadCount: 189,
    uploader: "CS大四",
    uploadDate: "5天前",
    fileType: "PDF",
    verified: true,
  },
  {
    id: "k3",
    universityId: "waseda",
    course: "市场营销原理",
    subject: "商学",
    year: 2024,
    semester: "spring",
    professor: "山田教授",
    downloadCount: 156,
    uploader: "商学院学姐",
    uploadDate: "1周前",
    fileType: "PDF",
    verified: false,
  },
];

// 题目讨论数据
export const mockDiscussions: Discussion[] = [
  {
    id: "d1",
    universityId: "tokyo",
    course: "线性代数 I",
    title: "2024春季期末第3题求解思路",
    content: "关于特征值分解的那道题，有人能分享下思路吗？",
    author: "数学苦手",
    replyCount: 12,
    viewCount: 234,
    timestamp: "3小时前",
    tags: ["特征值", "期末"],
  },
  {
    id: "d2",
    universityId: "tokyo",
    course: "微积分 II",
    title: "多重积分换序问题讨论",
    content: "田中老师的题目换序技巧总结...",
    author: "理学部学长",
    replyCount: 8,
    viewCount: 156,
    timestamp: "1天前",
    tags: ["积分", "技巧"],
  },
  {
    id: "d3",
    universityId: "waseda",
    course: "经营战略",
    title: "案例分析题答题框架分享",
    content: "整理了山田老师喜欢的答题结构...",
    author: "商学院M1",
    replyCount: 15,
    viewCount: 289,
    timestamp: "2天前",
    tags: ["案例分析", "答题技巧"],
  },
];

// 资料互助数据
export const mockMaterialRequests: MaterialRequest[] = [
  {
    id: "m1",
    universityId: "tokyo",
    course: "量子力学 I",
    title: "求2023年秋季期末真题",
    description: "上次考试缺席了，求学长学姐分享23年秋的题目",
    author: "物理系大三",
    status: "pending",
    timestamp: "2小时前",
    responseCount: 3,
  },
  {
    id: "m2",
    universityId: "keio",
    course: "宏观经济学",
    title: "求笔记：IS-LM模型部分",
    description: "教授讲太快了，求分享这章的课堂笔记",
    author: "经济学部新生",
    status: "solved",
    timestamp: "1天前",
    responseCount: 7,
  },
  {
    id: "m3",
    universityId: "titech",
    course: "算法设计",
    title: "交换动态规划习题答案",
    description: "我有图论部分的完整答案，求交换DP部分",
    author: "CS大二",
    status: "pending",
    timestamp: "3天前",
    responseCount: 5,
  },
];
