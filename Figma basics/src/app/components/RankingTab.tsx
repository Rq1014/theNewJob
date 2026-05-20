import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy,
  Star,
  TrendingUp,
  AlertTriangle,
  ThumbsUp,
  Medal,
  Search,
  SlidersHorizontal,
  X,
  Clock,
  Flame,
  MapPin,
  GraduationCap,
  Target,
  Users,
  Check,
  RotateCcw,
  FileText,
  BookOpen,
  ArrowRight,
  Download,
  Heart,
  Eye,
  CheckCircle2,
  Filter,
  Calendar,
  ArrowLeft,
  MessageCircle,
  Bookmark,
  AlertCircle,
  Upload,
  Flag,
  Shield,
  History,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";

type InstitutionType = "tutoring" | "language" | "agency" | "all";

interface RankingItem {
  rank: number;
  name: string;
  score: number;
  tags: string[];
  location: string;
  reviewCount: number;
  type: InstitutionType;
  verified?: boolean;
  courses?: string[];
  targetSchools?: string[];
  oneOnOne?: boolean;
}

interface RankingCategory {
  id: string;
  title: string;
  icon: any;
  gradient: string;
  items: RankingItem[];
}

interface FilterOptions {
  regions: string[];
  institutionTypes: InstitutionType[];
  minScore: number | null;
  verifiedOnly: boolean;
  courseDirections: string[];
  oneOnOneOnly: boolean;
  targetSchools: string[];
}

const mockRankings: RankingCategory[] = [
  {
    id: "tutoring-praise",
    title: "私塾好评榜",
    icon: ThumbsUp,
    gradient: "from-green-500 to-emerald-600",
    items: [
      {
        rank: 1,
        name: "名门升学私塾",
        score: 4.9,
        tags: ["一对一", "名校录取"],
        location: "东京·目黑区",
        reviewCount: 312,
        type: "tutoring",
        verified: true,
        courses: ["理科数学", "物理", "化学"],
        targetSchools: ["东大", "京大", "早稻田"],
        oneOnOne: true,
      },
      {
        rank: 2,
        name: "东京精英私塾",
        score: 4.8,
        tags: ["小班教学", "师资强"],
        location: "东京·涉谷区",
        reviewCount: 256,
        type: "tutoring",
        verified: true,
        courses: ["文科综合", "日语"],
        targetSchools: ["早稻田", "庆应"],
        oneOnOne: false,
      },
      {
        rank: 3,
        name: "早稻田进学塾",
        score: 4.7,
        tags: ["升学率高", "价格透明"],
        location: "东京·新宿区",
        reviewCount: 198,
        type: "tutoring",
        verified: true,
        courses: ["综合辅导"],
        targetSchools: ["早稻田", "上智"],
        oneOnOne: true,
      },
    ],
  },
  {
    id: "language-warning",
    title: "语言学校避雷榜",
    icon: AlertTriangle,
    gradient: "from-orange-500 to-red-600",
    items: [
      {
        rank: 1,
        name: "XX日本语学校",
        score: 2.3,
        tags: ["签证问题", "管理混乱"],
        location: "东京·足立区",
        reviewCount: 89,
        type: "language",
        verified: false,
      },
      {
        rank: 2,
        name: "△△国际学院",
        score: 2.5,
        tags: ["师资流动大", "环境差"],
        location: "大阪·浪速区",
        reviewCount: 67,
        type: "language",
        verified: false,
      },
      {
        rank: 3,
        name: "○○语言中心",
        score: 2.7,
        tags: ["课程水", "性价比低"],
        location: "东京·江户川区",
        reviewCount: 54,
        type: "language",
        verified: false,
      },
    ],
  },
  {
    id: "agent-reliable",
    title: "中介可靠榜",
    icon: Medal,
    gradient: "from-blue-500 to-indigo-600",
    items: [
      {
        rank: 1,
        name: "樱花留学中介",
        score: 4.8,
        tags: ["价格透明", "专业可靠"],
        location: "东京·新宿区",
        reviewCount: 428,
        type: "agency",
        verified: true,
        targetSchools: ["东大", "京大", "早稻田"],
      },
      {
        rank: 2,
        name: "启程留学咨询",
        score: 4.6,
        tags: ["服务好", "经验丰富"],
        location: "大阪·梅田",
        reviewCount: 356,
        type: "agency",
        verified: true,
        targetSchools: ["大阪大学", "神户大学"],
      },
      {
        rank: 3,
        name: "未来之路留学",
        score: 4.5,
        tags: ["响应迅速", "后续服务好"],
        location: "东京·池袋",
        reviewCount: 289,
        type: "agency",
        verified: true,
        targetSchools: ["早稻田", "上智"],
      },
    ],
  },
];

// 搜索历史数据
const initialSearchHistory = ["东大", "早稻田", "新宿", "一对一"];

// 热门搜索数据
const hotSearchKeywords = [
  { keyword: "东大升学", heat: "热" },
  { keyword: "早稻田私塾", heat: "热" },
  { keyword: "新宿", heat: "" },
  { keyword: "一对一辅导", heat: "新" },
  { keyword: "理科数学", heat: "热" },
  { keyword: "JLPT辅导", heat: "" },
  { keyword: "大阪语言学校", heat: "" },
  { keyword: "留学中介", heat: "新" },
];

// 过去问资料数据
interface PastExamResource {
  id: string;
  school: string;
  major: string;
  year: number;
  examType: string;
  hasAnswers: boolean;
  hasSolutions: boolean;
  downloads: number;
  favorites: number;
  verified: boolean;
  updateDate: string;
  tags: string[];
}

const mockPastExams: PastExamResource[] = [
  {
    id: "1",
    school: "东京大学",
    major: "情报理工学",
    year: 2024,
    examType: "院试笔试",
    hasAnswers: true,
    hasSolutions: true,
    downloads: 1234,
    favorites: 567,
    discussions: 42,
    verified: true,
    updateDate: "2024-03-15",
    tags: ["数学", "算法", "含解析"],
  },
  {
    id: "2",
    school: "早稻田大学",
    major: "经济学研究科",
    year: 2024,
    examType: "院试笔试",
    hasAnswers: true,
    hasSolutions: false,
    downloads: 892,
    favorites: 423,
    discussions: 28,
    verified: true,
    updateDate: "2024-02-20",
    tags: ["经济学", "统计学"],
  },
  {
    id: "3",
    school: "京都大学",
    major: "工学研究科",
    year: 2023,
    examType: "面试题",
    hasAnswers: false,
    hasSolutions: true,
    downloads: 678,
    favorites: 312,
    discussions: 15,
    verified: true,
    updateDate: "2023-11-08",
    tags: ["面试经验", "研究计划"],
  },
  {
    id: "4",
    school: "EJU",
    major: "理科综合",
    year: 2024,
    examType: "EJU",
    hasAnswers: true,
    hasSolutions: true,
    downloads: 2341,
    favorites: 891,
    discussions: 67,
    verified: true,
    updateDate: "2024-06-25",
    tags: ["物理", "化学", "生物"],
  },
  {
    id: "5",
    school: "JLPT",
    major: "N1",
    year: 2024,
    examType: "JLPT",
    hasAnswers: true,
    hasSolutions: true,
    downloads: 3456,
    favorites: 1234,
    discussions: 89,
    verified: true,
    updateDate: "2024-07-10",
    tags: ["词汇", "语法", "阅读"],
  },
];

// 过去问详情页组件
function PastExamDetailPage({ exam, onBack }: { exam: any; onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"info" | "discussion" | "answers" | "materials">("info");
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="font-bold text-lg flex-1 line-clamp-1">{exam.school}</h1>
          <button
            onClick={() => setSaved(!saved)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bookmark className={`w-5 h-5 ${saved ? "fill-emerald-600 text-emerald-600" : "text-slate-600"}`} />
          </button>
        </div>
      </div>

      {/* 资料基本信息 */}
      <div className="bg-white border-b border-slate-200 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-900 mb-1">{exam.school}</h2>
            <p className="text-sm text-slate-600 mb-2">{exam.major}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
              <span>{exam.year}年</span>
              <span>•</span>
              <span>{exam.examType}</span>
              {exam.verified && (
                <>
                  <span>•</span>
                  <Badge className="bg-green-100 text-green-700 border-0 text-[10px] px-1.5 py-0">
                    <CheckCircle2 className="w-2.5 h-2.5 inline mr-0.5" />
                    平台审核
                  </Badge>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {exam.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {exam.hasAnswers && (
                <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">
                  含答案
                </Badge>
              )}
              {exam.hasSolutions && (
                <Badge className="bg-teal-100 text-teal-700 border-0 text-xs">
                  含解析
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <span className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            {exam.downloads}次下载
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {exam.favorites}人收藏
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {exam.discussions || 0}条讨论
          </span>
        </div>

        {/* 下载按钮 */}
        <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          立即下载
        </button>

        {/* 使用说明 */}
        <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-900">
              本资料已通过平台审核，免费下载。建议先查看讨论区了解其他同学的解题思路和难点。
            </p>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="sticky top-[57px] z-10 bg-white border-b border-slate-200">
        <div className="flex items-center px-4">
          <button
            onClick={() => setActiveTab("discussion")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "discussion"
                ? "text-emerald-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            题目讨论
            {activeTab === "discussion" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("answers")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "answers"
                ? "text-emerald-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            答案交流
            {activeTab === "answers" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "materials"
                ? "text-emerald-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            补充资料
            {activeTab === "materials" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
            )}
          </button>
        </div>
      </div>

      {/* Tab 内容 */}
      <div className="p-4 pb-20">
        {activeTab === "discussion" && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-start gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white text-sm">
                    王
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">王同学</span>
                    <span className="text-xs text-slate-500">3天前</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">
                    第3题的微分方程部分有点难，想问问大家是怎么推导的？我试了分离变量法但是算不出来...
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                      12
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      5回复
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-start gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-400 text-white text-sm">
                    李
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">李学长</span>
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[9px] px-1 py-0">
                      已录取
                    </Badge>
                    <span className="text-xs text-slate-500">1周前</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">
                    整体难度中等偏上，重点是线性代数和概率论部分。建议大家先做一遍2022年的题，难度相近。
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      28
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      8回复
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl text-sm text-slate-600 hover:text-emerald-600 font-medium transition-all">
              + 发布新讨论
            </button>
          </div>
        )}

        {activeTab === "answers" && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-start gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-sm">
                    张
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">张同学</span>
                    <span className="text-xs text-slate-500">2天前</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong className="text-emerald-600">第5题答案参考：</strong>
                    <br />
                    使用泰勒展开，先求f'(x)和f''(x)，然后代入x=0得到系数...
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      15有帮助
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      3回复
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl text-sm text-slate-600 hover:text-emerald-600 font-medium transition-all">
              + 分享我的答案
            </button>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-slate-900">2023年详细解析（学长整理）</h4>
                  <p className="text-xs text-slate-500">PDF · 2.3MB</p>
                </div>
                <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors">
                  下载
                </button>
              </div>
            </div>

            <button className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl text-sm text-slate-600 hover:text-emerald-600 font-medium transition-all flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              上传补充资料
            </button>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mt-4">
              <div className="flex items-start gap-2">
                <Flag className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-amber-900 mb-1">发现错误？</p>
                  <button className="text-xs text-amber-700 underline">提交纠错反馈</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 过去问资料库页面组件
function PastExamLibraryPage({ onBack }: { onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);
  const [filters, setFilters] = useState({
    schools: [] as string[],
    majors: [] as string[],
    examTypes: [] as string[],
    subjects: [] as string[],
    years: [] as number[],
    hasAnswers: false,
    hasSolutions: false,
  });

  const filteredExams = mockPastExams.filter((exam) => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchSchool = exam.school.toLowerCase().includes(query);
      const matchMajor = exam.major.toLowerCase().includes(query);
      const matchTags = exam.tags.some((tag) => tag.toLowerCase().includes(query));
      if (!matchSchool && !matchMajor && !matchTags) return false;
    }

    if (filters.schools.length > 0 && !filters.schools.includes(exam.school)) return false;
    if (filters.examTypes.length > 0 && !filters.examTypes.includes(exam.examType)) return false;
    if (filters.years.length > 0 && !filters.years.includes(exam.year)) return false;
    if (filters.hasAnswers && !exam.hasAnswers) return false;
    if (filters.hasSolutions && !exam.hasSolutions) return false;

    return true;
  });

  // 如果选中了某个资料，显示详情页
  if (selectedExam) {
    return <PastExamDetailPage exam={selectedExam} onBack={() => setSelectedExam(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-[84px]">
      {/* 顶部 */}
      <div className="sticky top-0 z-20 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 shadow-lg">
        <div className="p-4 pb-3">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1">
              <h1 className="font-bold text-white">过去问资料库</h1>
              <p className="text-xs text-emerald-50">平台整理｜含答案解析与面试经验</p>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索学校、专业或资料类型"
              className="pl-10 pr-10 h-10 bg-white/95 backdrop-blur-sm border-0 rounded-full shadow-sm"
            />
            <button
              onClick={() => setFilterPanelOpen(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-full transition-colors z-10"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 筛选面板 */}
      <AnimatePresence>
        {filterPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterPanelOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 max-h-[70vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">筛选资料</h3>
                <button
                  onClick={() => setFilterPanelOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* 学校筛选 */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    学校
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["东京大学", "京都大学", "早稻田大学", "EJU", "JLPT"].map((school) => {
                      const isSelected = filters.schools.includes(school);
                      return (
                        <button
                          key={school}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              schools: isSelected
                                ? prev.schools.filter((s) => s !== school)
                                : [...prev.schools, school],
                            }))
                          }
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            isSelected
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {school}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 年份筛选 */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    年份
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[2024, 2023, 2022, 2021].map((year) => {
                      const isSelected = filters.years.includes(year);
                      return (
                        <button
                          key={year}
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              years: isSelected
                                ? prev.years.filter((y) => y !== year)
                                : [...prev.years, year],
                            }))
                          }
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            isSelected
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {year}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 资料类型 */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    类型
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between py-2">
                      <span className="text-sm text-slate-700">含答案</span>
                      <button
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, hasAnswers: !prev.hasAnswers }))
                        }
                        className={`relative w-12 h-7 rounded-full transition-colors ${
                          filters.hasAnswers ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                      >
                        <motion.div
                          layout
                          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
                          animate={{ left: filters.hasAnswers ? "calc(100% - 24px)" : "4px" }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </label>
                    <label className="flex items-center justify-between py-2">
                      <span className="text-sm text-slate-700">含解析</span>
                      <button
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, hasSolutions: !prev.hasSolutions }))
                        }
                        className={`relative w-12 h-7 rounded-full transition-colors ${
                          filters.hasSolutions ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                      >
                        <motion.div
                          layout
                          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
                          animate={{ left: filters.hasSolutions ? "calc(100% - 24px)" : "4px" }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </label>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-slate-200 px-4 py-3 flex gap-3">
                <button
                  onClick={() =>
                    setFilters({
                      schools: [],
                      examTypes: [],
                      years: [],
                      hasAnswers: false,
                      hasSolutions: false,
                    })
                  }
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors"
                >
                  重置
                </button>
                <button
                  onClick={() => setFilterPanelOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors"
                >
                  查看结果 ({filteredExams.length})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 资料列表 */}
      <div className="p-4 space-y-3">
        {filteredExams.map((exam, index) => (
          <motion.div
            key={exam.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">{exam.school}</h3>
                  {exam.verified && (
                    <Badge className="bg-green-100 text-green-700 border-0 text-[10px] px-1.5 py-0">
                      <CheckCircle2 className="w-2.5 h-2.5 inline mr-0.5" />
                      已审核
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-1">{exam.major}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{exam.year}年</span>
                  <span>•</span>
                  <span>{exam.examType}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {exam.hasAnswers && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[10px] px-1.5 py-0">
                    含答案
                  </Badge>
                )}
                {exam.hasSolutions && (
                  <Badge className="bg-teal-100 text-teal-700 border-0 text-[10px] px-1.5 py-0">
                    含解析
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {exam.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  {exam.downloads}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" />
                  {exam.favorites}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {exam.discussions || 0}
                </span>
              </div>
              <button
                onClick={() => setSelectedExam(exam)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                查看详情
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function RankingTab() {
  const [currentView, setCurrentView] = useState<"ranking" | "past-exams">("ranking");
  const [selectedType, setSelectedType] = useState<InstitutionType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState(initialSearchHistory);

  // 如果在过去问页面，显示过去问组件
  if (currentView === "past-exams") {
    return <PastExamLibraryPage onBack={() => setCurrentView("ranking")} />;
  }

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleRemoveHistory = (keyword: string) => {
    setSearchHistory((prev) => prev.filter((k) => k !== keyword));
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    setSearchFocused(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setSearchFocused(false);
    }
  };

  // 获取所有榜单项
  const allItems = mockRankings.flatMap((category) => category.items);

  // 筛选逻辑
  const filteredItems = allItems.filter((item) => {
    // 类型筛选
    if (selectedType !== "all" && item.type !== selectedType) {
      return false;
    }

    // 搜索关键词筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(query);
      const matchLocation = item.location.toLowerCase().includes(query);
      const matchTags = item.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchCourses = item.courses?.some((course) => course.toLowerCase().includes(query));
      const matchTargetSchools = item.targetSchools?.some((school) =>
        school.toLowerCase().includes(query)
      );

      if (!matchName && !matchLocation && !matchTags && !matchCourses && !matchTargetSchools) {
        return false;
      }
    }

    return true;
  });

  const institutionTypes = [
    { id: "all" as InstitutionType, label: "全部", isPlatform: false },
    { id: "tutoring" as InstitutionType, label: "私塾", isPlatform: false },
    { id: "language" as InstitutionType, label: "语言学校", isPlatform: false },
    { id: "agency" as InstitutionType, label: "留学中介", isPlatform: false },
  ];

  const showSearchPanel = searchFocused && searchQuery.trim() === "";

  return (
    <div className="min-h-screen bg-slate-50 pb-[84px]">
      {/* 顶部渐变区域 */}
      <div className="sticky top-0 z-20 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 shadow-lg">
        <div className="p-4 pb-3">
          {/* 标题 */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white">机构榜单</h1>
              <p className="text-xs text-emerald-50">基于真实用户评价的排名</p>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
            <Input
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder="搜索机构、地区或升学方向"
              className="pl-10 h-10 bg-white/95 backdrop-blur-sm border-0 rounded-full shadow-sm focus:ring-2 focus:ring-white/40 text-slate-900 placeholder:text-slate-500"
            />
          </div>

          {/* 分类入口 */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {institutionTypes.map((type) => {
              const isActive = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-emerald-600 shadow-md"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {type.label}
                </button>
              );
            })}
            {/* 过去问入口 - 平台资料库 */}
            <button
              onClick={() => setCurrentView("past-exams")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentView === "past-exams"
                  ? "bg-white text-emerald-600 shadow-md"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>过去问</span>
            </button>
          </div>
        </div>
      </div>

      {/* 搜索面板 */}
      <AnimatePresence>
        {showSearchPanel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[180px] bottom-0 bg-white z-30 overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-6">
              {/* 搜索历史 */}
              {searchHistory.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <h3 className="font-semibold text-slate-900">搜索历史</h3>
                    </div>
                    <button
                      onClick={handleClearHistory}
                      className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      清空
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchHistory.map((keyword) => (
                      <motion.div
                        key={keyword}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="group relative"
                      >
                        <button
                          onClick={() => handleKeywordClick(keyword)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition-colors"
                        >
                          {keyword}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveHistory(keyword);
                          }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-2.5 h-2.5 text-white" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* 热门搜索 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <h3 className="font-semibold text-slate-900">热门搜索</h3>
                </div>
                <div className="space-y-2">
                  {hotSearchKeywords.map((item, index) => (
                    <motion.button
                      key={item.keyword}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => handleKeywordClick(item.keyword)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors text-left group"
                    >
                      <span
                        className={`flex-shrink-0 w-5 text-center font-semibold text-sm ${
                          index < 3 ? "text-emerald-500" : "text-slate-400"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="flex-1 text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">
                        {item.keyword}
                      </span>
                      {item.heat && (
                        <Badge
                          className={`flex-shrink-0 text-[10px] px-1.5 py-0 border-0 ${
                            item.heat === "热"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {item.heat}
                        </Badge>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* 可信评价机制卡片 */}
      <div className="px-4 pb-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-4 border border-emerald-100/50 shadow-sm"
        >
          {/* 背景装饰 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/10 rounded-full blur-2xl -translate-y-12 translate-x-12" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-teal-200/10 rounded-full blur-xl translate-y-10 -translate-x-10" />
          </div>

          <div className="relative">
            {/* 标题 */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900 mb-1">可信评价机制</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  认证评价 + 普通评价 + 历史版本 + 社区反馈
                </p>
              </div>
            </div>

            {/* 机制说明 */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2.5 border border-emerald-100/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-900">认证评价</span>
                </div>
                <p className="text-[10px] text-slate-600">上传材料审核认证</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2.5 border border-emerald-100/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-xs font-semibold text-slate-900">普通评价</span>
                </div>
                <p className="text-[10px] text-slate-600">广泛参与真实反馈</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2.5 border border-emerald-100/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <History className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-xs font-semibold text-slate-900">历史版本</span>
                </div>
                <p className="text-[10px] text-slate-600">评价更新可追溯</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2.5 border border-emerald-100/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <ThumbsUp className="w-3.5 h-3.5 text-orange-600" />
                  <span className="text-xs font-semibold text-slate-900">社区反馈</span>
                </div>
                <p className="text-[10px] text-slate-600">标记有用 / 收藏评价</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 榜单列表 */}
      <div className="py-4">
        {filteredItems.length > 0 ? (
          <div className="space-y-3 px-4">
            {filteredItems.map((item, index) => {
              // 根据机构类型设置配色
              const typeColors = {
                tutoring: "from-emerald-50/50 to-green-50/30 border-emerald-100",
                language: "from-blue-50/50 to-cyan-50/30 border-blue-100",
                agency: "from-teal-50/50 to-emerald-50/30 border-teal-100",
                all: "from-slate-50/50 to-slate-50/30 border-slate-100",
              };

              return (
                <motion.div
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-gradient-to-br ${
                    typeColors[item.type]
                  } rounded-xl p-4 shadow-sm border hover:shadow-md transition-all cursor-pointer group`}
                >
                  <div className="flex items-start gap-3">
                    {/* 排名徽章 */}
                    <div
                      className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shadow-sm ${
                        item.rank === 1
                          ? "bg-gradient-to-br from-yellow-400 to-amber-500"
                          : item.rank === 2
                          ? "bg-gradient-to-br from-emerald-400 to-green-500"
                          : item.rank === 3
                          ? "bg-gradient-to-br from-teal-400 to-cyan-500"
                          : "bg-gradient-to-br from-slate-400 to-slate-500"
                      }`}
                    >
                      {item.rank === 1 && <Trophy className="w-4 h-4" />}
                      {item.rank !== 1 && <span className="text-sm">{item.rank}</span>}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* 头部信息 */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {item.name}
                            </h3>
                            {item.verified && (
                              <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[10px] px-1.5 py-0 flex items-center gap-0.5">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                认证
                              </Badge>
                            )}
                            {/* 机构类型标签 */}
                            <Badge
                              variant="outline"
                              className={`text-[10px] px-1.5 py-0 border ${
                                item.type === "tutoring"
                                  ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                                  : item.type === "language"
                                  ? "border-blue-300 text-blue-700 bg-blue-50"
                                  : "border-teal-300 text-teal-700 bg-teal-50"
                              }`}
                            >
                              {item.type === "tutoring"
                                ? "私塾"
                                : item.type === "language"
                                ? "语言学校"
                                : "留学中介"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <MapPin className="w-3 h-3" />
                            <span>{item.location}</span>
                          </div>
                        </div>

                        {/* 评分 */}
                        <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                          <div className="flex items-center gap-1">
                            <Star
                              className={`w-4 h-4 ${
                                item.score >= 4.5
                                  ? "fill-yellow-400 text-yellow-400"
                                  : item.score >= 4
                                  ? "fill-emerald-400 text-emerald-400"
                                  : "fill-orange-400 text-orange-400"
                              }`}
                            />
                            <span className="text-base font-bold text-slate-900">{item.score}</span>
                          </div>
                          <div className="text-[10px] text-slate-500">
                            <span className="text-slate-600">普通评价 {Math.floor(item.reviewCount * 0.4)}</span>
                            <span className="mx-1">|</span>
                            <span className="text-emerald-600 font-medium">认证评价 {Math.floor(item.reviewCount * 0.6)}</span>
                          </div>
                        </div>
                      </div>

                      {/* 标签 */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className="bg-white/60 text-slate-700 border border-slate-200/50 text-xs px-2 py-0.5"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* 课程和目标学校信息 */}
                      {(item.courses || item.targetSchools) && (
                        <div className="space-y-1">
                          {item.courses && item.courses.length > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                              <BookOpen className="w-3 h-3 text-emerald-600" />
                              <span className="truncate">{item.courses.join(" · ")}</span>
                            </div>
                          )}
                          {item.targetSchools && item.targetSchools.length > 0 && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                              <GraduationCap className="w-3 h-3 text-emerald-600" />
                              <span className="truncate">{item.targetSchools.join(" · ")}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 底部操作按钮 */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100/50">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          {item.oneOnOne && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-emerald-600" />
                              一对一
                            </span>
                          )}
                        </div>
                        <button className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-lg text-xs font-medium shadow-sm transition-all group-hover:shadow-md">
                          查看详情
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-8 h-8 text-emerald-400" />
            </div>
            <p className="text-slate-500 text-sm">未找到匹配的机构</p>
            <p className="text-slate-400 text-xs mt-1">试试调整筛选条件</p>
          </div>
        )}
      </div>
    </div>
  );
}
