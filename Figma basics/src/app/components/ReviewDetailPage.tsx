import { useState } from "react";
import { ArrowLeft, Star, Shield, ThumbsUp, Bookmark, Clock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Review } from "../data/institutions";
import { contactStageLabels, abandonReasonLabels } from "../data/reviews";

interface ReviewDetailPageProps {
  review: Review;
  onBack: () => void;
}

export function ReviewDetailPage({ review, onBack }: ReviewDetailPageProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(review.currentVersion);

  const currentReview = review.versions.find((v) => v.version === selectedVersion);
  const avgScore = currentReview
    ? Object.values(currentReview.scores).reduce((a, b) => a + b, 0) /
      Object.values(currentReview.scores).length
    : 0;

  // 获取版本标签
  const getVersionLabel = (version: number) => {
    if (version === 1) return "初版评价";
    if (version === review.versions.length) return "最终更新";
    return `学习中更新`;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg">评价详情</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* 用户信息卡片 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-start gap-3 mb-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
                {review.userAvatar}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-900">{review.userName}</span>
                {review.isVerified && (
                  <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">
                    已认证
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-600">{review.university}</p>
            </div>
          </div>

          {/* 评价类型标签 */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {review.isTransacted && review.proofVerified && (
              <Badge className="bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0 gap-1 shadow-sm">
                <Shield className="w-3.5 h-3.5" />
                已认证评价
              </Badge>
            )}
            {review.versions.length > 1 && (
              <Badge variant="outline" className="border-blue-500 text-blue-700 gap-1">
                <Clock className="w-3 h-3" />
                已更新{review.versions.length}次
              </Badge>
            )}
          </div>

          {/* 评分 */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(avgScore)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-slate-200 text-slate-200"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-slate-900">{avgScore.toFixed(1)}</span>
          </div>
        </div>

        {/* 历史版本时间线 */}
        {review.versions.length > 1 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-blue-600" />
              <h2 className="font-semibold text-slate-900">历史版本</h2>
              <Badge variant="secondary" className="text-xs">
                {review.versions.length}个版本
              </Badge>
            </div>

            {/* 评价规则提示 */}
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg mb-4">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                评价不可删除初版，只能追加修改。这样确保评价的真实性和可追溯性。
              </p>
            </div>

            {/* 版本时间线 */}
            <div className="space-y-3">
              {review.versions.map((version, index) => (
                <button
                  key={version.version}
                  onClick={() => setSelectedVersion(version.version)}
                  className={`w-full text-left transition-all ${
                    selectedVersion === version.version ? "" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="flex gap-3">
                    {/* 时间线指示器 */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          selectedVersion === version.version
                            ? "bg-blue-600 text-white ring-4 ring-blue-100"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        <span className="text-xs font-semibold">V{version.version}</span>
                      </div>
                      {index < review.versions.length - 1 && (
                        <div className="w-0.5 h-full min-h-[40px] bg-slate-200 mt-1" />
                      )}
                    </div>

                    {/* 版本信息 */}
                    <div
                      className={`flex-1 pb-2 ${
                        selectedVersion === version.version
                          ? "border-l-2 border-blue-600 pl-3 -ml-px"
                          : "pl-3"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-sm font-semibold ${
                            selectedVersion === version.version
                              ? "text-blue-600"
                              : "text-slate-900"
                          }`}
                        >
                          {getVersionLabel(version.version)}
                        </span>
                        {version.version === review.currentVersion && (
                          <Badge className="bg-blue-600 text-white text-xs border-0">最新</Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{version.createdAt}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 当前选中版本的内容 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">
              {review.versions.length > 1 ? `V${selectedVersion} 内容` : "评价内容"}
            </h2>
            <span className="text-xs text-slate-500">{currentReview?.createdAt}</span>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {currentReview?.content}
            </p>
          </div>

          {/* 详细评分 */}
          {currentReview && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">各项评分</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(currentReview.scores).map(([key, score]) => {
                  // 根据机构类型获取对应的维度名称
                  let dimensionName = key;
                  if (review.institutionType === "tutoring") {
                    const dimensions: Record<string, string> = {
                      teaching: "教学质量",
                      faculty: "师资水平",
                      results: "升学/提分效果",
                      curriculum: "课程体系",
                      feedback: "作业与反馈",
                      value: "性价比",
                    };
                    dimensionName = dimensions[key] || key;
                  } else if (review.institutionType === "language") {
                    const dimensions: Record<string, string> = {
                      teaching: "教学质量",
                      attendance: "出勤管理",
                      advancement: "升学支持",
                      lifeSupport: "生活支持",
                      environment: "学习环境",
                      value: "性价比",
                    };
                    dimensionName = dimensions[key] || key;
                  } else if (review.institutionType === "agency") {
                    const dimensions: Record<string, string> = {
                      expertise: "顾问专业度",
                      matching: "方案匹配度",
                      communication: "沟通响应速度",
                      transparency: "流程透明度",
                      efficiency: "申请执行效率",
                      afterSales: "售后支持",
                    };
                    dimensionName = dimensions[key] || key;
                  }

                  return (
                    <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-xs text-slate-600">{dimensionName}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= score
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-slate-200 text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-900 min-w-[20px] text-right">
                          {score}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 互动数据 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-slate-900">{review.helpfulCount}</p>
              <p className="text-xs text-slate-500 mt-1">觉得有帮助</p>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{review.likes}</p>
              <p className="text-xs text-slate-500 mt-1">点赞数</p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-10">
        <div className="flex gap-3">
          <Button
            variant={isHelpful ? "default" : "outline"}
            size="lg"
            className="flex-1"
            onClick={() => setIsHelpful(!isHelpful)}
          >
            <ThumbsUp className={`w-4 h-4 mr-2 ${isHelpful ? "fill-current" : ""}`} />
            {isHelpful ? "已标记有帮助" : "有帮助"}
          </Button>
          <Button
            variant={isSaved ? "default" : "outline"}
            size="lg"
            className="flex-1"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
            {isSaved ? "已收藏" : "收藏"}
          </Button>
        </div>
      </div>
    </div>
  );
}
