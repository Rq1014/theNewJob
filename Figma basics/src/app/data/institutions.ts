// 机构类型
export type InstitutionType = "tutoring" | "language" | "agency";

// 非成交评价的接触阶段
export type ContactStage = "consulted" | "trial" | "interviewed" | "compared";

// 放弃原因
export type AbandonReason = 
  | "price_high" 
  | "unprofessional" 
  | "curriculum_mismatch" 
  | "location_time" 
  | "pushy_sales"
  | "better_option"
  | "policy_issue";

// 雷达图维度定义
export const radarDimensions = {
  tutoring: {
    teaching: "教学质量",
    faculty: "师资水平",
    results: "升学/提分效果",
    curriculum: "课程体系",
    feedback: "作业与反馈",
    value: "性价比",
  },
  language: {
    teaching: "教学质量",
    attendance: "出勤管理",
    advancement: "升学支持",
    lifeSupport: "生活支持",
    environment: "学习环境",
    value: "性价比",
  },
  agency: {
    expertise: "顾问专业度",
    matching: "方案匹配度",
    communication: "沟通响应速度",
    transparency: "流程透明度",
    efficiency: "申请执行效率",
    afterSales: "售后支持",
  },
};

// 评论版本
export interface ReviewVersion {
  version: number;
  content: string;
  scores: Record<string, number>;
  createdAt: string;
}

// 评论
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  university: string;
  isVerified: boolean;
  isTransacted: boolean; // 是否成交评价
  proofVerified?: boolean; // 凭证是否审核通过
  
  // 非成交评价相关
  contactStage?: ContactStage; // 接触阶段
  abandonReasons?: AbandonReason[]; // 放弃原因（可多选）
  
  currentVersion: number;
  versions: ReviewVersion[];
  institutionId: string;
  institutionType: InstitutionType;
  likes: number;
  helpfulCount: number; // 有帮助数
  createdAt: string;
  updatedAt: string;
}

// 机构
export interface Institution {
  id: string;
  type: InstitutionType;
  name: string;
  location: string;
  district: string;
  avgScore: number;
  totalReviews: number;
  transactedReviews: number;
  nonTransactedReviews: number;
  scores: Record<string, number>;
  highlights: string[];
  description: string;
  address: string;
  phone?: string;
  website?: string;
  established?: string;
}

// 私塾数据
export const tutoringSchools: Institution[] = [
  {
    id: "t1",
    type: "tutoring",
    name: "名门升学私塾",
    location: "东京",
    district: "目黑区",
    avgScore: 4.9,
    totalReviews: 312,
    transactedReviews: 187,
    nonTransactedReviews: 125,
    scores: {
      teaching: 4.9,
      faculty: 4.8,
      results: 4.9,
      curriculum: 4.8,
      feedback: 4.7,
      value: 4.6,
    },
    highlights: ["一对一", "名校录取率92%", "东大早大专项"],
    description: "专注于日本top10大学升学辅导，提供个性化教学方案",
    address: "东京都目黑区中目黑1-2-3",
    phone: "03-1234-5678",
    established: "2015年",
  },
  {
    id: "t2",
    type: "tutoring",
    name: "东京精英私塾",
    location: "东京",
    district: "涉谷区",
    avgScore: 4.8,
    totalReviews: 256,
    transactedReviews: 156,
    nonTransactedReviews: 100,
    scores: {
      teaching: 4.8,
      faculty: 4.7,
      results: 4.8,
      curriculum: 4.9,
      feedback: 4.6,
      value: 4.7,
    },
    highlights: ["小班教学", "师资强", "升学率89%"],
    description: "小班精品教学，重点辅导MARCH以上大学",
    address: "东京都涉谷区道玄坂2-10-7",
    established: "2012年",
  },
  {
    id: "t3",
    type: "tutoring",
    name: "早稻田进学塾",
    location: "东京",
    district: "新宿区",
    avgScore: 4.7,
    totalReviews: 198,
    transactedReviews: 134,
    nonTransactedReviews: 64,
    scores: {
      teaching: 4.7,
      faculty: 4.6,
      results: 4.8,
      curriculum: 4.7,
      feedback: 4.6,
      value: 4.8,
    },
    highlights: ["升学率高", "价格透明", "早大专项"],
    description: "邻近早稻田大学，专注于私立名校升学",
    address: "东京都新宿区高田马场3-5-8",
    established: "2010年",
  },
];

// 语言学校数据
export const languageSchools: Institution[] = [
  {
    id: "l1",
    type: "language",
    name: "富士日本语学校",
    location: "东京",
    district: "池袋",
    avgScore: 4.5,
    totalReviews: 412,
    transactedReviews: 298,
    nonTransactedReviews: 114,
    scores: {
      teaching: 4.6,
      attendance: 4.3,
      advancement: 4.5,
      lifeSupport: 4.7,
      environment: 4.8,
      value: 4.5,
    },
    highlights: ["环境好", "签证稳定", "升学支持完善"],
    description: "老牌语言学校，签证通过率98%，提供升学辅导",
    address: "东京都豊島区東池袋1-15-6",
    phone: "03-5678-1234",
    website: "www.fuji-japanese.jp",
    established: "2005年",
  },
  {
    id: "l2",
    type: "language",
    name: "优尼塔斯日本语学校",
    location: "东京",
    district: "新宿区",
    avgScore: 4.4,
    totalReviews: 356,
    transactedReviews: 245,
    nonTransactedReviews: 111,
    scores: {
      teaching: 4.5,
      attendance: 4.2,
      advancement: 4.4,
      lifeSupport: 4.6,
      environment: 4.5,
      value: 4.4,
    },
    highlights: ["课程丰富", "多国籍学生", "升学率高"],
    description: "提供从N5到N1的完整课程体系",
    address: "东京都新宿区西新宿8-11-10",
    established: "2008年",
  },
  {
    id: "l3",
    type: "language",
    name: "赤门会日本语学校",
    location: "东京",
    district: "本乡",
    avgScore: 4.6,
    totalReviews: 289,
    transactedReviews: 201,
    nonTransactedReviews: 88,
    scores: {
      teaching: 4.7,
      attendance: 4.5,
      advancement: 4.7,
      lifeSupport: 4.5,
      environment: 4.6,
      value: 4.5,
    },
    highlights: ["升学导向", "邻近东大", "师资优秀"],
    description: "位于本乡，升学导向明确，适合考学生",
    address: "东京都文京区本郷4-3-12",
    established: "2003年",
  },
];

// 留学中介数据
export const agencies: Institution[] = [
  {
    id: "a1",
    type: "agency",
    name: "樱花留学中介",
    location: "东京",
    district: "新宿区",
    avgScore: 4.8,
    totalReviews: 428,
    transactedReviews: 312,
    nonTransactedReviews: 116,
    scores: {
      expertise: 4.9,
      matching: 4.8,
      communication: 4.7,
      transparency: 4.8,
      efficiency: 4.7,
      afterSales: 4.8,
    },
    highlights: ["价格透明", "专业可靠", "响应迅速"],
    description: "15年经验，累计帮助3000+学生赴日留学",
    address: "东京都新宿区西新宿1-1-1",
    phone: "03-9999-8888",
    website: "www.sakura-ryugaku.jp",
    established: "2009年",
  },
  {
    id: "a2",
    type: "agency",
    name: "启程留学咨询",
    location: "大阪",
    district: "梅田",
    avgScore: 4.6,
    totalReviews: 356,
    transactedReviews: 234,
    nonTransactedReviews: 122,
    scores: {
      expertise: 4.7,
      matching: 4.6,
      communication: 4.5,
      transparency: 4.7,
      efficiency: 4.6,
      afterSales: 4.5,
    },
    highlights: ["经验丰富", "后续服务好", "关西专业"],
    description: "关西地区专业留学中介，提供一站式服务",
    address: "大阪府大阪市北区梅田2-2-2",
    phone: "06-1111-2222",
    established: "2011年",
  },
  {
    id: "a3",
    type: "agency",
    name: "未来之路留学",
    location: "东京",
    district: "池袋",
    avgScore: 4.5,
    totalReviews: 289,
    transactedReviews: 198,
    nonTransactedReviews: 91,
    scores: {
      expertise: 4.6,
      matching: 4.5,
      communication: 4.6,
      transparency: 4.5,
      efficiency: 4.4,
      afterSales: 4.6,
    },
    highlights: ["响应迅速", "后续服务好", "学生党友好"],
    description: "专注于提供高性价比留学服务",
    address: "东京都豊島区南池袋1-20-9",
    established: "2013年",
  },
];

// 所有机构
export const allInstitutions = [...tutoringSchools, ...languageSchools, ...agencies];

// 获取指定类型的机构
export function getInstitutionsByType(type: InstitutionType): Institution[] {
  switch (type) {
    case "tutoring":
      return tutoringSchools;
    case "language":
      return languageSchools;
    case "agency":
      return agencies;
    default:
      return [];
  }
}

// 根据ID获取机构
export function getInstitutionById(id: string): Institution | undefined {
  return allInstitutions.find((inst) => inst.id === id);
}