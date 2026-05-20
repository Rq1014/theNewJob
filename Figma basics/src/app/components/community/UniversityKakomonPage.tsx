import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  MessageSquare,
  HelpCircle,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Calendar,
  User,
} from "lucide-react";
import { universities, mockKakomon, mockDiscussions, mockMaterialRequests, type UniversityId } from "../../data/kakomon";
import { Badge } from "../ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface UniversityKakomonPageProps {
  universityId: UniversityId;
  onBack: () => void;
}

type TabType = "kakomon" | "discussion" | "material";

export function UniversityKakomonPage({ universityId, onBack }: UniversityKakomonPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>("kakomon");
  const [searchQuery, setSearchQuery] = useState("");

  const university = universities.find((u) => u.id === universityId);

  if (!university) {
    return <div>大学未找到</div>;
  }

  // 筛选当前大学的数据
  const filteredKakomon = mockKakomon.filter((k) => k.universityId === universityId);
  const filteredDiscussions = mockDiscussions.filter((d) => d.universityId === universityId);
  const filteredMaterialRequests = mockMaterialRequests.filter((m) => m.universityId === universityId);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-base text-slate-900 truncate">{university.name}</h1>
              <p className="text-xs text-slate-500">{university.nameEn}</p>
            </div>
          </div>

          {/* 搜索栏 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索课程、教授、学科..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-200 rounded-lg transition-colors">
              <Filter className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Tab切换 */}
        <div className="px-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-50">
              <TabsTrigger value="kakomon" className="text-sm">
                <Download className="w-4 h-4 mr-1.5" />
                过去问
              </TabsTrigger>
              <TabsTrigger value="discussion" className="text-sm">
                <MessageSquare className="w-4 h-4 mr-1.5" />
                题目讨论
              </TabsTrigger>
              <TabsTrigger value="material" className="text-sm">
                <HelpCircle className="w-4 h-4 mr-1.5" />
                资料互助
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* 大学信息卡片 */}
      <div className="bg-white border-b border-slate-200 p-4">
        <div className="flex items-start gap-3">
          <div className={`w-16 h-16 bg-gradient-to-br ${university.color} rounded-2xl flex items-center justify-center shadow-md flex-shrink-0`}>
            <span className="text-4xl">{university.emoji}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-600 mb-2">{university.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-slate-900">{university.kakomonCount}</span>
                <span className="text-slate-600">份资料</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {university.popularSubjects.map((subject) => (
                <Badge
                  key={subject}
                  className={`bg-gradient-to-r ${university.color} text-white border-0 text-xs font-medium`}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="p-4 pb-24">
        {/* 过去问Tab */}
        {activeTab === "kakomon" && (
          <div className="space-y-3">
            {filteredKakomon.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">暂无过去问资料</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  上传第一份资料
                </button>
              </div>
            ) : (
              <>
                {/* 筛选标签 */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <Badge variant="secondary" className="bg-blue-600 text-white border-0 text-sm px-3 py-1.5 font-medium whitespace-nowrap">
                    全部
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1.5 font-medium whitespace-nowrap border-slate-300">
                    2024年
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1.5 font-medium whitespace-nowrap border-slate-300">
                    2023年
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1.5 font-medium whitespace-nowrap border-slate-300">
                    已验证
                  </Badge>
                </div>

                {/* 过去问列表 */}
                {filteredKakomon.map((kakomon, index) => (
                  <motion.div
                    key={kakomon.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="font-bold text-base text-slate-900">{kakomon.course}</h3>
                          {kakomon.verified && (
                            <Badge className="bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-0.5 font-medium">
                              <CheckCircle className="w-3 h-3 mr-0.5" />
                              已验证
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {kakomon.professor}
                          </span>
                          <span>·</span>
                          <span>{kakomon.subject}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-sm border-blue-300 text-blue-700 bg-blue-50 px-2.5 py-1 font-medium flex-shrink-0"
                      >
                        {kakomon.fileType}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {kakomon.year}年{kakomon.semester === "spring" ? "春季" : "秋季"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" />
                        {kakomon.downloadCount}次下载
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {kakomon.uploadDate}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs text-slate-500">
                        上传者：<span className="font-medium text-slate-700">{kakomon.uploader}</span>
                      </span>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-1.5">
                        <Download className="w-4 h-4" />
                        下载
                      </button>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        )}

        {/* 题目讨论Tab */}
        {activeTab === "discussion" && (
          <div className="space-y-3">
            {filteredDiscussions.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">暂无讨论</p>
                <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                  发起第一个讨论
                </button>
              </div>
            ) : (
              <>
                {/* 排序选项 */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <Badge variant="secondary" className="bg-indigo-600 text-white border-0 text-sm px-3 py-1.5 font-medium whitespace-nowrap">
                    最新
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1.5 font-medium whitespace-nowrap border-slate-300">
                    最热
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1.5 font-medium whitespace-nowrap border-slate-300">
                    未解决
                  </Badge>
                </div>

                {/* 讨论列表 */}
                {filteredDiscussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all"
                  >
                    <div className="mb-3">
                      <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug">{discussion.title}</h3>
                      <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">{discussion.content}</p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <Badge variant="outline" className="text-xs border-indigo-300 text-indigo-700 bg-indigo-50 px-2 py-0.5 font-medium">
                        {discussion.course}
                      </Badge>
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-700 border-0 px-2 py-0.5 font-medium">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="font-medium text-slate-700">{discussion.author}</span>
                        <span>·</span>
                        <span>{discussion.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {discussion.replyCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {discussion.viewCount}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        )}

        {/* 资料互助Tab */}
        {activeTab === "material" && (
          <div className="space-y-3">
            {filteredMaterialRequests.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">暂无互助请求</p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  发布第一个请求
                </button>
              </div>
            ) : (
              <>
                {/* 筛选选项 */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <Badge variant="secondary" className="bg-purple-600 text-white border-0 text-sm px-3 py-1.5 font-medium whitespace-nowrap">
                    全部
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1.5 font-medium whitespace-nowrap border-slate-300">
                    求助中
                  </Badge>
                  <Badge variant="outline" className="text-sm px-3 py-1.5 font-medium whitespace-nowrap border-slate-300">
                    已解决
                  </Badge>
                </div>

                {/* 互助列表 */}
                {filteredMaterialRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all"
                  >
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-base text-slate-900 flex-1">{request.title}</h3>
                        {request.status === "solved" ? (
                          <Badge className="bg-green-50 text-green-700 border border-green-200 text-xs px-2 py-0.5 font-medium flex-shrink-0">
                            <CheckCircle className="w-3 h-3 mr-0.5" />
                            已解决
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-50 text-orange-700 border border-orange-200 text-xs px-2 py-0.5 font-medium flex-shrink-0">
                            求助中
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{request.description}</p>
                    </div>

                    <div className="mb-3">
                      <Badge variant="outline" className="text-xs border-purple-300 text-purple-700 bg-purple-50 px-2 py-0.5 font-medium">
                        {request.course}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="font-medium text-slate-700">{request.author}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {request.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {request.responseCount}条回应
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* 底部浮动按钮 */}
      <div className="fixed bottom-20 right-4 z-20">
        <button className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
          <span className="text-2xl">+</span>
        </button>
      </div>
    </div>
  );
}
