import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  MapPin,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  Shield,
  Search,
  BookOpen,
  ArrowLeft,
  Download,
  Heart,
  MessageCircle,
  Eye,
  Clock,
  SlidersHorizontal,
  X,
  GraduationCap,
  Calendar,
  FileText,
  Bookmark,
  AlertCircle,
  Upload,
  Flag,
  ThumbsUp,
  Share2,
  Check,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  InstitutionType,
  Institution,
  getInstitutionsByType,
  radarDimensions,
} from "../data/institutions";

interface NewRankingTabProps {
  onInstitutionClick?: (id: string) => void;
}

const institutionTypes = [
  { id: "tutoring" as InstitutionType, label: "私塾", icon: "📚" },
  { id: "language" as InstitutionType, label: "语言学校", icon: "🏫" },
  { id: "agency" as InstitutionType, label: "留学中介", icon: "✈️" },
];

// 过去问资料数据结构
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
  discussions?: number;
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
  const [activeTab, setActiveTab] = useState<"discussion" | "answers" | "materials">("discussion");
  const [saved, setSaved] = useState(false);
  const [sortBy, setSortBy] = useState<"hot" | "latest" | "accepted">("hot");

  return (
    <div className="min-h-screen bg-[#F4FFFD] pb-20">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-teal-100/50 px-4 py-3">
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
            <Bookmark className={`w-5 h-5 ${saved ? "fill-teal-500 text-teal-500" : "text-slate-600"}`} />
          </button>
        </div>
      </div>

      {/* 资料基本信息 */}
      <div className="bg-white border-b border-teal-100/50 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-bold text-slate-900">{exam.school}</h2>
              {exam.verified && (
                <Badge className="bg-teal-50 text-teal-700 border border-teal-200 text-[10px] px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3 inline mr-0.5" />
                  已审核
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-600 mb-2">{exam.major}</p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
              <span>{exam.year}年</span>
              <span>•</span>
              <span>{exam.examType}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {exam.hasAnswers && (
                <Badge className="bg-teal-50 text-teal-700 border border-teal-200 text-xs px-2.5 py-0.5 rounded-full">
                  含答案
                </Badge>
              )}
              {exam.hasSolutions && (
                <Badge className="bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs px-2.5 py-0.5 rounded-full">
                  含解析
                </Badge>
              )}
              {exam.tags.map((tag: string) => (
                <Badge key={tag} className="bg-white text-slate-600 border border-slate-200 text-xs px-2.5 py-0.5 rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* 资料信息卡片 */}
        <div className="bg-teal-50/30 rounded-xl p-3 mb-4 border border-teal-100/60">
          <h4 className="text-xs font-semibold text-teal-900 mb-2">资料信息</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-slate-700">PDF文件</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-700">12页 · 3.2MB</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-slate-700">{exam.updateDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-700">@学长上传</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-teal-200/40">
            <p className="text-xs text-slate-700">
              <span className="font-medium text-teal-900">包含内容：</span>完整试题、标准答案、详细解析、考点分析
            </p>
          </div>
        </div>

        {/* 预览区域 */}
        <div className="mb-4">
          <div className="bg-teal-50/20 rounded-lg p-4 text-center border border-teal-100/60">
            <FileText className="w-8 h-8 text-teal-400 mx-auto mb-2" />
            <p className="text-xs text-slate-600 mb-1">资料预览</p>
            <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">
              查看前2页缩略图 →
            </button>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <span className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            {exam.downloads}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {exam.favorites}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {exam.discussions || 0}
          </span>
        </div>

        {/* 操作按钮组 */}
        <div className="flex gap-2 mb-3">
          <button className="flex-1 py-3 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            免费下载
          </button>
          <button className="px-4 py-3 bg-white hover:bg-teal-50 text-teal-600 border border-teal-200 rounded-xl transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="px-4 py-3 bg-white hover:bg-teal-50 text-teal-600 border border-teal-200 rounded-xl transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* 使用说明 */}
        <div className="bg-teal-50/50 border border-teal-100 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-teal-900">
              本资料已通过平台审核：确认文件可打开，信息与学校/专业基本匹配，但内容准确性仍建议结合讨论区判断。
            </p>
          </div>
          <button className="mt-2 text-xs text-teal-700 hover:text-teal-800 font-medium flex items-center gap-1">
            <Flag className="w-3 h-3" />
            举报问题
          </button>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="sticky top-[57px] z-10 bg-white/80 backdrop-blur-md border-b border-teal-100/50">
        <div className="flex items-center px-4">
          <button
            onClick={() => setActiveTab("discussion")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "discussion"
                ? "text-teal-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            题目讨论
            {activeTab === "discussion" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("answers")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "answers"
                ? "text-teal-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            答案解析
            {activeTab === "answers" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "materials"
                ? "text-teal-600"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            补充资料
            {activeTab === "materials" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />
            )}
          </button>
        </div>
        {/* Tab说明文字 */}
        <div className="px-4 py-2 bg-teal-50/20 border-t border-teal-100/50">
          <p className="text-xs text-slate-600">
            {activeTab === "discussion" && "讨论题目难度、解题思路和常见疑问"}
            {activeTab === "answers" && "分享详细解题过程、答案要点和技巧"}
            {activeTab === "materials" && "上传相关参考资料、笔记和补充内容"}
          </p>
        </div>
      </div>

      {/* Tab 内容 */}
      <div className="p-4">
        {activeTab === "discussion" && (
          <div className="space-y-3">
            {/* 排序选项 */}
            <div className="flex items-center gap-2 pb-2">
              <span className="text-xs text-slate-500">排序：</span>
              <div className="flex gap-2">
                {[
                  { id: "hot", label: "最热" },
                  { id: "latest", label: "最新" },
                  { id: "accepted", label: "已采纳" },
                ].map((sort) => (
                  <button
                    key={sort.id}
                    onClick={() => setSortBy(sort.id as any)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      sortBy === sort.id
                        ? "bg-teal-100 text-teal-700 border border-teal-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/60">
              <div className="flex items-start gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-gradient-to-br from-teal-400 to-cyan-400 text-white text-sm">
                    李
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-sm">李学长</span>
                    <Badge className="bg-teal-50 text-teal-700 border border-teal-200 text-[9px] px-1.5 py-0 rounded-full">
                      <CheckCircle2 className="w-2.5 h-2.5 inline mr-0.5" />
                      已认证
                    </Badge>
                    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[9px] px-1.5 py-0 rounded-full">
                      高赞回答
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
                    <button className="flex items-center gap-1 hover:text-teal-600 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      8回复
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/60">
              <div className="flex items-start gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-teal-400 text-white text-sm">
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
                    <button className="flex items-center gap-1 hover:text-teal-600 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      5回复
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-3 border-2 border-dashed border-teal-200 hover:border-teal-400 hover:bg-teal-50/30 rounded-xl text-sm text-slate-700 hover:text-teal-700 font-medium transition-all">
              + 发布题目讨论
            </button>
          </div>
        )}

        {activeTab === "answers" && (
          <div className="space-y-3">
            {/* 排序选项 */}
            <div className="flex items-center gap-2 pb-2">
              <span className="text-xs text-slate-500">排序：</span>
              <div className="flex gap-2">
                {[
                  { id: "hot", label: "最热" },
                  { id: "latest", label: "最新" },
                  { id: "accepted", label: "已采纳" },
                ].map((sort) => (
                  <button
                    key={sort.id}
                    onClick={() => setSortBy(sort.id as any)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      sortBy === sort.id
                        ? "bg-teal-100 text-teal-700 border border-teal-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/60">
              <div className="flex items-start gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-teal-400 text-white text-sm">
                    张
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-sm">张同学</span>
                    <Badge className="bg-green-50 text-green-700 border border-green-200 text-[9px] px-1.5 py-0 rounded-full">
                      <Check className="w-2.5 h-2.5 inline mr-0.5" />
                      被采纳
                    </Badge>
                    <span className="text-xs text-slate-500">2天前</span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong className="text-teal-600">第5题答案参考：</strong>
                    <br />
                    使用泰勒展开，先求f'(x)和f''(x)，然后代入x=0得到系数...
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <button className="flex items-center gap-1 hover:text-teal-600 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5 fill-teal-600 text-teal-600" />
                      15有帮助
                    </button>
                    <button className="flex items-center gap-1 hover:text-teal-600 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" />
                      3回复
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-3 border-2 border-dashed border-teal-200 hover:border-teal-400 hover:bg-teal-50/30 rounded-xl text-sm text-slate-700 hover:text-teal-700 font-medium transition-all">
              + 分享答案解析
            </button>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-slate-200/60 hover:border-teal-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 border border-teal-100">
                  <FileText className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-slate-900 mb-0.5">2023年详细解析（学长整理）</h4>
                  <p className="text-xs text-slate-500">PDF · 2.3MB · 18次下载</p>
                </div>
                <button className="px-3 py-1.5 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white rounded-lg text-xs font-medium transition-colors flex-shrink-0 shadow-sm">
                  下载
                </button>
              </div>
            </div>

            <button className="w-full py-3 border-2 border-dashed border-teal-200 hover:border-teal-400 hover:bg-teal-50/30 rounded-xl text-sm text-slate-700 hover:text-teal-700 font-medium transition-all flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              上传补充资料
            </button>
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
  const [sortBy, setSortBy] = useState<"latest" | "downloads" | "favorites" | "discussions">("latest");
  const [filters, setFilters] = useState({
    schools: [] as string[],
    majors: [] as string[],
    examTypes: [] as string[],
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
    <div className="min-h-screen bg-[#F4FFFD] pb-[84px]">
      {/* 顶部 */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-teal-100/50 shadow-sm">
        <div className="p-4 pb-3">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center hover:bg-teal-100 transition-colors border border-teal-100"
            >
              <ArrowLeft className="w-5 h-5 text-teal-700" />
            </button>
            <div className="flex-1">
              <h1 className="font-bold text-slate-900 text-lg">过去问资料库</h1>
              <p className="text-xs text-slate-600">历年真题・答案・解析・经验交流</p>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索学校、专业、考试类型或年份"
              className="pl-10 h-10 bg-white border border-teal-100/50 rounded-full shadow-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-teal-200/50 focus:border-teal-300"
            />
          </div>

          {/* 横向筛选标签 */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            <button
              onClick={() => setFilterPanelOpen(true)}
              className="px-3 py-1.5 bg-teal-50/50 hover:bg-teal-50 text-slate-700 rounded-full text-xs font-medium transition-colors flex items-center gap-1 whitespace-nowrap border border-transparent"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              筛选
              {(filters.schools.length + filters.years.length + filters.examTypes.length) > 0 && (
                <span className="ml-0.5 w-4 h-4 bg-teal-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {filters.schools.length + filters.years.length + filters.examTypes.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setSortBy("latest")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                sortBy === "latest"
                  ? "bg-white text-teal-600 shadow-sm border border-teal-200"
                  : "bg-teal-50/50 text-slate-700 hover:bg-teal-50 border border-transparent"
              }`}
            >
              最新上传
            </button>
            <button
              onClick={() => setSortBy("downloads")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                sortBy === "downloads"
                  ? "bg-white text-teal-600 shadow-sm border border-teal-200"
                  : "bg-teal-50/50 text-slate-700 hover:bg-teal-50 border border-transparent"
              }`}
            >
              最多下载
            </button>
            <button
              onClick={() => setSortBy("favorites")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                sortBy === "favorites"
                  ? "bg-white text-teal-600 shadow-sm border border-teal-200"
                  : "bg-teal-50/50 text-slate-700 hover:bg-teal-50 border border-transparent"
              }`}
            >
              最多收藏
            </button>
            <button
              onClick={() => setSortBy("discussions")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                sortBy === "discussions"
                  ? "bg-white text-teal-600 shadow-sm border border-teal-200"
                  : "bg-teal-50/50 text-slate-700 hover:bg-teal-50 border border-transparent"
              }`}
            >
              最多讨论
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
                    <GraduationCap className="w-4 h-4 text-teal-600" />
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
                              ? "bg-teal-500 text-white shadow-sm"
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
                    <Calendar className="w-4 h-4 text-cyan-600" />
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
                              ? "bg-teal-500 text-white shadow-sm"
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
                    <FileText className="w-4 h-4 text-teal-600" />
                    资料类型
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between py-2">
                      <span className="text-sm text-slate-700">含答案</span>
                      <button
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, hasAnswers: !prev.hasAnswers }))
                        }
                        className={`relative w-12 h-7 rounded-full transition-colors ${
                          filters.hasAnswers ? "bg-teal-500" : "bg-slate-200"
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
                          filters.hasSolutions ? "bg-teal-500" : "bg-slate-200"
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
                      majors: [],
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
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl font-medium transition-colors shadow-sm"
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
        {filteredExams.length > 0 ? (
          filteredExams.map((exam, index) => (
            <motion.button
              key={exam.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedExam(exam)}
              className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-teal-300 hover:bg-teal-50/5 transition-all text-left"
            >
              {/* 第一行：学校名 + 已审核标签 */}
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-slate-900 text-base">{exam.school}</h3>
                {exam.verified && (
                  <Badge className="bg-teal-50 text-teal-700 border border-teal-200 text-[10px] px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-2.5 h-2.5 inline mr-0.5" />
                    已审核
                  </Badge>
                )}
              </div>

              {/* 第二行：研究科/专业 */}
              <p className="text-sm text-slate-600 mb-2">{exam.major}</p>

              {/* 第三行：年份 + 考试类型 */}
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <span className="font-medium">{exam.year}年</span>
                <span>·</span>
                <span>{exam.examType}</span>
              </div>

              {/* 第四行：资料标签 */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {exam.hasAnswers && (
                  <Badge className="bg-teal-50 text-teal-700 border border-teal-200 text-xs px-2.5 py-0.5 rounded-full">
                    含答案
                  </Badge>
                )}
                {exam.hasSolutions && (
                  <Badge className="bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs px-2.5 py-0.5 rounded-full">
                    含解析
                  </Badge>
                )}
                {exam.tags.map((tag) => (
                  <Badge key={tag} className="bg-white text-slate-600 border border-slate-200 text-xs px-2.5 py-0.5 rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* 第五行：下载数/收藏数/评论数 + 查看详情 */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-4 text-xs text-slate-500">
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
                <div className="flex items-center gap-1 text-teal-600 text-sm font-medium">
                  查看详情
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.button>
          ))
        ) : (
          /* 空状态 */
          <div className="text-center py-16 px-6">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100">
              <FileText className="w-10 h-10 text-teal-400" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2 text-lg">暂无相关资料</h3>
            <p className="text-sm text-slate-600 mb-6">
              你可以发布求助，或订阅该学校资料更新
            </p>
            <div className="flex gap-3 justify-center">
              <button className="px-4 py-2.5 bg-white hover:bg-teal-50 text-slate-700 border border-teal-200 rounded-xl text-sm font-medium transition-colors flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                发布求助
              </button>
              <button className="px-4 py-2.5 bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
                <Star className="w-4 h-4" />
                订阅更新
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getMedalColor(rank: number): string {
  if (rank === 1) return "from-yellow-300/80 to-amber-400/80";
  if (rank === 2) return "from-teal-200 to-cyan-300";
  if (rank === 3) return "from-cyan-200 to-teal-200";
  return "from-slate-200 to-slate-300";
}

function InstitutionCard({
  institution,
  rank,
  type,
  onClick,
}: {
  institution: Institution;
  rank: number;
  type: InstitutionType;
  onClick?: () => void;
}) {
  const dimensions = radarDimensions[type];
  const topScores = Object.entries(institution.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.05 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 hover:shadow-md hover:border-teal-200 transition-all cursor-pointer"
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${getMedalColor(
            rank
          )} flex items-center justify-center font-bold text-white shadow-md`}
        >
          {rank}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-slate-900 mb-1">{institution.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-slate-600 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {institution.location}·{institution.district}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-teal-400 text-teal-400" />
              <span className="font-bold text-lg text-slate-900">{institution.avgScore}</span>
            </div>
            <div className="text-sm text-slate-600">
              {institution.totalReviews} 条评价
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full border border-slate-200">
              <span className="text-slate-600">{institution.nonTransactedReviews} 普通评价</span>
            </div>
            <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-full border border-teal-200">
              <Shield className="w-3 h-3 text-teal-600" />
              <span className="text-teal-700 font-medium">
                {institution.transactedReviews} 认证评价
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {institution.highlights.map((highlight) => (
              <Badge key={highlight} variant="secondary" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>

          <div className="bg-teal-50/30 rounded-lg p-2 mb-3 border border-teal-100/50">
            <div className="text-xs text-slate-600 mb-1">优势维度</div>
            <div className="flex gap-3">
              {topScores.map(([key, value]) => (
                <div key={key} className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-teal-600" />
                  <span className="text-xs text-slate-700">
                    {dimensions[key as keyof typeof dimensions]}
                  </span>
                  <span className="text-xs font-semibold text-teal-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="text-xs text-slate-500">
              成立于 {institution.established}
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-8">
              查看详情
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function NewRankingTab({ onInstitutionClick }: NewRankingTabProps) {
  const [selectedType, setSelectedType] = useState<InstitutionType>("tutoring");
  const [currentView, setCurrentView] = useState<"ranking" | "past-exams">("ranking");
  const [searchQuery, setSearchQuery] = useState("");

  const institutions = getInstitutionsByType(selectedType);

  // 如果在过去问页面，显示过去问组件
  if (currentView === "past-exams") {
    return <PastExamLibraryPage onBack={() => setCurrentView("ranking")} />;
  }

  return (
    <div className="min-h-screen bg-[#F4FFFD] pb-[84px]">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-teal-100/50 shadow-sm">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl flex items-center justify-center border border-teal-100">
              <TrendingUp className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-900">机构榜单</h1>
              <p className="text-xs text-slate-600">基于真实用户评价的排名</p>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索机构、地区或升学方向"
              className="pl-10 h-10 bg-white border border-teal-100/50 rounded-full shadow-sm focus:ring-2 focus:ring-teal-200/50 focus:border-teal-300 text-slate-900 placeholder:text-slate-500"
            />
          </div>

          {/* 分类入口 */}
          <div className="flex gap-2">
            {institutionTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedType(type.id);
                  setCurrentView("ranking");
                }}
                className={`flex-1 py-2.5 px-3 rounded-full font-medium text-sm transition-all ${
                  selectedType === type.id && currentView === "ranking"
                    ? "bg-white text-teal-600 shadow-md border border-teal-200"
                    : "bg-teal-50/50 text-slate-700 hover:bg-teal-50 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </div>
              </button>
            ))}
            {/* 过去问入口 */}
            <button
              onClick={() => setCurrentView("past-exams")}
              className={`flex-1 py-2.5 px-3 rounded-full font-medium text-sm transition-all ${
                currentView === "past-exams"
                  ? "bg-white text-teal-600 shadow-md border border-teal-200"
                  : "bg-teal-50/50 text-slate-700 hover:bg-teal-50 border border-transparent"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>过去问</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-teal-50/40 border border-teal-100/60 rounded-xl p-3 mb-4">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-teal-900 text-sm mb-1">
                可信评价机制
              </div>
              <div className="text-xs text-teal-800 space-y-0.5">
                <p>✓ 认证评价需上传材料审核</p>
                <p>✓ 评论历史版本完整保留</p>
                <p>✓ 防刷评防洗评论机制</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {institutions.map((institution, index) => (
            <InstitutionCard
              key={institution.id}
              institution={institution}
              rank={index + 1}
              type={selectedType}
              onClick={() => onInstitutionClick?.(institution.id)}
            />
          ))}
        </div>

        {institutions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">暂无数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
