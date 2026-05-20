import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  MessageSquare,
  HelpCircle,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Users,
  Flame,
  Sparkles,
  ChevronRight,
  Heart,
  Eye,
  Lock,
  Coins,
  Gift,
} from "lucide-react";
import { universities, mockKakomon, mockDiscussions, mockMaterialRequests, type UniversityId } from "../../data/kakomon";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface NewKakomonPageProps {
  onBack: () => void;
  onUniversityClick: (universityId: UniversityId) => void;
}

type Tab = "recommend" | "discussion" | "materials" | "download";

// 模拟题目讨论帖子数据
const mockQuestionPosts = [
  {
    id: "q1",
    type: "question" as const,
    title: "东京大学2023年春季线性代数期中考试第3题求解思路",
    university: "todai",
    course: "线性代数",
    year: 2023,
    semester: "春季",
    author: { id: "u1", name: "数学小王子", avatar: "王", verified: true },
    content: "这道题关于特征值分解，我的思路是先求特征多项式...",
    replies: 23,
    likes: 156,
    helpful: 89,
    views: 1234,
    timestamp: "2小时前",
    tags: ["线性代数", "特征值", "求解思路"],
  },
  {
    id: "q2",
    type: "solution" as const,
    title: "早稻田大学经济学2022年过去问详细解析（含答案）",
    university: "waseda",
    course: "宏观经济学",
    year: 2022,
    semester: "秋季",
    author: { id: "u2", name: "经济学姐", avatar: "学", verified: true },
    content: "整理了完整的答案和解题步骤，特别是第二大题的IS-LM模型...",
    replies: 67,
    likes: 423,
    helpful: 95,
    views: 3456,
    timestamp: "1天前",
    tags: ["宏观经济", "IS-LM", "答案解析"],
    hasAcceptedAnswer: true,
  },
  {
    id: "q3",
    type: "request" as const,
    title: "求京都大学计算机科学算法课程2024年春季过去问",
    university: "kyodai",
    course: "算法与数据结构",
    year: 2024,
    semester: "春季",
    author: { id: "u3", name: "CS准备中", avatar: "准", verified: false },
    content: "马上要考试了，急需这份过去问，有的同学可以分享一下吗...",
    replies: 12,
    likes: 34,
    views: 567,
    timestamp: "5小时前",
    tags: ["算法", "求助", "京都大学"],
    bounty: 50,
  },
];

// 热门资料下载
const mockHotDownloads = [
  {
    id: "d1",
    university: "todai",
    course: "微积分II",
    year: 2023,
    semester: "春季",
    type: "free" as const,
    downloads: 1234,
    rating: 4.8,
    uploadDate: "3天前",
  },
  {
    id: "d2",
    university: "waseda",
    course: "统计学基础",
    year: 2023,
    semester: "秋季",
    type: "points" as const,
    points: 20,
    downloads: 856,
    rating: 4.9,
    uploadDate: "1周前",
  },
  {
    id: "d3",
    university: "keio",
    course: "日本近代史",
    year: 2024,
    semester: "春季",
    type: "ad" as const,
    downloads: 432,
    rating: 4.6,
    uploadDate: "5天前",
  },
];

export function NewKakomonPage({ onBack, onUniversityClick }: NewKakomonPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("recommend");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "hot" | "new">("hot");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg flex-1">过去问</h1>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab切换 */}
        <div className="flex border-b border-slate-200 px-4 gap-6">
          {[
            { id: "recommend" as Tab, label: "推荐", icon: Sparkles },
            { id: "discussion" as Tab, label: "题目讨论", icon: MessageSquare },
            { id: "materials" as Tab, label: "资料互助", icon: HelpCircle },
            { id: "download" as Tab, label: "下载中心", icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pb-6">
        {/* 推荐 Tab */}
        {activeTab === "recommend" && (
          <div className="space-y-4">
            {/* 功能介绍卡 */}
            <div className="bg-gradient-to-br from-indigo-500 via-blue-500 to-blue-600 p-6 text-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1.5">过去问社区</h2>
                  <p className="text-sm opacity-95 leading-relaxed">不只是资料下载，更是题目讨论与学习互助的平台</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold mb-1">5,234</div>
                  <div className="text-xs opacity-90">份过去问</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold mb-1">1,089</div>
                  <div className="text-xs opacity-90">题目讨论</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold mb-1">856</div>
                  <div className="text-xs opacity-90">互助帖</div>
                </div>
              </div>
            </div>

            {/* 热门学校入口 */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />
                  热门学校
                </h3>
                <button className="text-sm text-blue-600 font-medium">查看全部</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {universities.slice(0, 4).map((university) => (
                  <motion.button
                    key={university.id}
                    onClick={() => onUniversityClick(university.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${university.color} rounded-xl flex items-center justify-center shadow-sm mb-3`}>
                      <span className="text-2xl">{university.emoji}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">{university.name}</h4>
                    <p className="text-xs text-slate-500">{university.kakomonCount}份过去问</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* 热门讨论 */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  热门讨论
                </h3>
                <button className="text-sm text-blue-600 font-medium">查看更多</button>
              </div>
              <div className="space-y-3">
                {mockQuestionPosts.slice(0, 3).map((post) => (
                  <QuestionPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* 资料互助 */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  资料互助
                </h3>
                <button className="text-sm text-purple-600 font-medium">查看更多</button>
              </div>
              <div className="space-y-2">
                {mockMaterialRequests.slice(0, 3).map((request) => {
                  const university = universities.find((u) => u.id === request.universityId);
                  return (
                    <div
                      key={request.id}
                      className="bg-white rounded-lg p-3.5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${university?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <span className="text-xl">{university?.emoji}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm text-slate-900 line-clamp-1">{request.title}</h4>
                            {request.status === "solved" ? (
                              <Badge className="bg-green-50 text-green-700 border border-green-200 text-xs px-1.5 py-0">
                                已解决
                              </Badge>
                            ) : (
                              <Badge className="bg-orange-50 text-orange-700 border border-orange-200 text-xs px-1.5 py-0">
                                求助中
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 mb-2">{university?.name} · {request.course}</p>
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {request.responseCount}条回应
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {request.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 题目讨论 Tab */}
        {activeTab === "discussion" && (
          <div className="space-y-3 px-4 pt-4">
            {/* 筛选器 */}
            <div className="flex gap-2 mb-4">
              {[
                { id: "all" as const, label: "全部" },
                { id: "hot" as const, label: "最热" },
                { id: "new" as const, label: "最新" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {mockQuestionPosts.map((post) => (
              <QuestionPostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* 资料互助 Tab */}
        {activeTab === "materials" && (
          <div className="space-y-3 px-4 pt-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-4">
              <h4 className="font-bold text-sm text-blue-900 mb-2">💡 互助说明</h4>
              <ul className="space-y-1.5 text-sm text-blue-800">
                <li>• 发布求助帖，说明需要的过去问信息</li>
                <li>• 其他同学看到后可以分享资料</li>
                <li>• 成功获得资料后，记得标记"已解决"并感谢</li>
              </ul>
            </div>

            {mockMaterialRequests.map((request) => {
              const university = universities.find((u) => u.id === request.universityId);
              return (
                <div
                  key={request.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${university?.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <span className="text-2xl">{university?.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-base text-slate-900">{request.title}</h4>
                        {request.status === "solved" ? (
                          <Badge className="bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-0.5">
                            已解决
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-50 text-orange-700 border border-orange-200 text-xs px-2 py-0.5">
                            求助中
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{university?.name} · {request.course}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4" />
                          {request.responseCount}条回应
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {request.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 下载中心 Tab */}
        {activeTab === "download" && (
          <div className="space-y-4 pt-4">
            {/* 下载说明 */}
            <div className="px-4">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <h4 className="font-bold text-sm text-purple-900 mb-3">📥 下载方式</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Gift className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <div className="text-xs font-medium text-slate-900 mb-0.5">免费下载</div>
                    <div className="text-[10px] text-slate-500">直接获取</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Coins className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                    <div className="text-xs font-medium text-slate-900 mb-0.5">积分兑换</div>
                    <div className="text-[10px] text-slate-500">上传资料赚取</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <Eye className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-medium text-slate-900 mb-0.5">观看广告</div>
                    <div className="text-[10px] text-slate-500">30秒解锁</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 热门下载 */}
            <div className="px-4">
              <h3 className="font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-600" />
                热门下载
              </h3>
              <div className="space-y-3">
                {mockHotDownloads.map((item) => {
                  const university = universities.find((u) => u.id === item.university);
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${university?.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <span className="text-2xl">{university?.emoji}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-base text-slate-900">{item.course}</h4>
                            {item.type === "free" && (
                              <Badge className="bg-green-50 text-green-700 border-0 text-xs">免费</Badge>
                            )}
                            {item.type === "points" && (
                              <Badge className="bg-amber-50 text-amber-700 border-0 text-xs">{item.points}积分</Badge>
                            )}
                            {item.type === "ad" && (
                              <Badge className="bg-blue-50 text-blue-700 border-0 text-xs">广告解锁</Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-2">
                            {university?.name} · {item.year}年{item.semester === "spring" ? "春季" : "秋季"}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-slate-600">
                              <Download className="w-3.5 h-3.5" />
                              {item.downloads}次
                            </span>
                            <span className="flex items-center gap-1 text-amber-600">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              {item.rating}
                            </span>
                            <span className="text-slate-500 text-xs ml-auto">{item.uploadDate}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex-shrink-0">
                          下载
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 题目讨论帖子卡片
function QuestionPostCard({ post }: { post: typeof mockQuestionPosts[0] }) {
  const university = universities.find((u) => u.id === post.university);

  const typeConfig = {
    question: { label: "题目讨论", color: "bg-blue-50 text-blue-700 border-blue-200" },
    solution: { label: "答案解析", color: "bg-green-50 text-green-700 border-green-200" },
    request: { label: "求助", color: "bg-orange-50 text-orange-700 border-orange-200" },
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all">
      {/* 标签行 */}
      <div className="flex items-center gap-2 mb-2">
        <Badge className={`${typeConfig[post.type].color} border text-xs px-2 py-0.5`}>
          {typeConfig[post.type].label}
        </Badge>
        {post.hasAcceptedAnswer && (
          <Badge className="bg-green-50 text-green-700 border-0 text-xs px-2 py-0.5 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            已采纳
          </Badge>
        )}
        {post.bounty && (
          <Badge className="bg-amber-50 text-amber-700 border-0 text-xs px-2 py-0.5 flex items-center gap-1">
            <Coins className="w-3 h-3" />
            悬赏{post.bounty}积分
          </Badge>
        )}
      </div>

      {/* 标题 */}
      <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug line-clamp-2">{post.title}</h3>

      {/* 课程信息 */}
      <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
        <div className={`w-5 h-5 bg-gradient-to-br ${university?.color} rounded flex items-center justify-center flex-shrink-0`}>
          <span className="text-xs">{university?.emoji}</span>
        </div>
        <span className="font-medium">{university?.name}</span>
        <span className="text-slate-400">·</span>
        <span>{post.course}</span>
        <span className="text-slate-400">·</span>
        <span>{post.year}年</span>
      </div>

      {/* 内容摘要 */}
      <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">{post.content}</p>

      {/* 标签 */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-xs">
            #{tag}
          </span>
        ))}
      </div>

      {/* 作者和互动数据 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
              {post.author.avatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-slate-700">{post.author.name}</span>
          {post.author.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500" />}
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500">{post.timestamp}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {post.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            {post.replies}
          </span>
          {post.helpful && (
            <span className="flex items-center gap-1 text-green-600">
              <Star className="w-4 h-4" />
              {post.helpful}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
