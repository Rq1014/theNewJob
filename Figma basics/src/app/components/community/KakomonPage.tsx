import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  ChevronRight,
  Download,
  MessageSquare,
  HelpCircle,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";
import { universities, mockKakomon, mockDiscussions, mockMaterialRequests, type UniversityId } from "../../data/kakomon";
import { Badge } from "../ui/badge";

interface KakomonPageProps {
  onBack: () => void;
  onUniversityClick: (universityId: UniversityId) => void;
}

export function KakomonPage({ onBack, onUniversityClick }: KakomonPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg flex-1">日本大学过去问</h1>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="pb-6">
        {/* 顶部说明 */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">大学过去问资料库</h2>
              <p className="text-sm text-slate-600 mt-0.5">历年真题 · 题目讨论 · 资料互助</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-700 mt-4">
            <div className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-blue-600" />
              <span><span className="font-semibold text-blue-600">5,234</span> 份真题</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-600" />
              <span><span className="font-semibold text-indigo-600">1,089</span> 条讨论</span>
            </div>
          </div>
        </div>

        {/* 大学入口卡片 */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base text-slate-900">选择大学</h3>
            <span className="text-sm text-slate-500">共{universities.length}所</span>
          </div>
          <div className="space-y-3">
            {universities.map((university, index) => (
              <motion.button
                key={university.id}
                onClick={() => onUniversityClick(university.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  {/* 校徽 */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${university.color} rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <span className="text-3xl">{university.emoji}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* 学校名称 */}
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-base text-slate-900">{university.name}</h4>
                      {index < 3 && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-xs px-2 py-0.5">
                          <TrendingUp className="w-3 h-3 mr-0.5" />
                          热门
                        </Badge>
                      )}
                    </div>

                    {/* 英文名 */}
                    <p className="text-xs text-slate-500 mb-2">{university.nameEn}</p>

                    {/* 描述 */}
                    <p className="text-sm text-slate-600 mb-2.5">{university.description}</p>

                    {/* 数据 */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Download className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-slate-900">{university.kakomonCount}</span>
                        <span className="text-slate-600">份过去问</span>
                      </div>
                    </div>

                    {/* 热门课程标签 */}
                    <div className="flex flex-wrap gap-1.5">
                      {university.hotCourses.slice(0, 4).map((course) => (
                        <Badge
                          key={course}
                          variant="secondary"
                          className="text-xs bg-slate-100 text-slate-700 border-0 font-medium"
                        >
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 热门内容预览 */}
        <div className="px-4 mt-6 space-y-5">
          {/* 最新过去问 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Download className="w-4.5 h-4.5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">最新过去问</h3>
              </div>
              <button className="text-sm text-blue-600 font-medium hover:underline">查看更多</button>
            </div>
            <div className="space-y-2">
              {mockKakomon.slice(0, 3).map((kakomon) => {
                const university = universities.find((u) => u.id === kakomon.universityId);
                return (
                  <div
                    key={kakomon.id}
                    className="bg-white rounded-lg p-3.5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${university?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xl">{university?.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm text-slate-900">{kakomon.course}</h4>
                          {kakomon.verified && (
                            <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mb-2">
                          {university?.name} · {kakomon.year}年{kakomon.semester === "spring" ? "春季" : "秋季"} · {kakomon.professor}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {kakomon.downloadCount}次下载
                          </span>
                          <span>{kakomon.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 热门讨论 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4.5 h-4.5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-900">热门讨论</h3>
              </div>
              <button className="text-sm text-indigo-600 font-medium hover:underline">查看更多</button>
            </div>
            <div className="space-y-2">
              {mockDiscussions.slice(0, 3).map((discussion) => {
                const university = universities.find((u) => u.id === discussion.universityId);
                return (
                  <div
                    key={discussion.id}
                    className="bg-white rounded-lg p-3.5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${university?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <span className="text-xl">{university?.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-slate-900 mb-1 line-clamp-1">{discussion.title}</h4>
                        <p className="text-xs text-slate-600 mb-2">{university?.name} · {discussion.course}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {discussion.replyCount}条回复
                          </span>
                          <span>{discussion.viewCount}次浏览</span>
                          <span>{discussion.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 资料互助 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 text-purple-600" />
                <h3 className="font-bold text-base text-slate-900">资料互助</h3>
              </div>
              <button className="text-sm text-purple-600 font-medium hover:underline">查看更多</button>
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

        {/* 底部提示 */}
        <div className="px-4 mt-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <h4 className="font-bold text-sm text-blue-900 mb-2.5">📖 使用说明</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                <span>所有资料均由学长学姐无偿分享，下载前请点赞感谢</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                <span>题目讨论区严禁抄袭，鼓励独立思考后交流</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                <span>上传资料将获得积分奖励，可兑换其他大学资料</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
