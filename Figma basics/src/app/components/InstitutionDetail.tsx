import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Globe,
  Shield,
  ThumbsUp,
  MessageCircle,
  ChevronDown,
  CheckCircle2,
  Clock,
  Bookmark,
  TrendingUp,
  History,
  AlertCircle,
  Flag,
} from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Institution,
  radarDimensions,
  getInstitutionById,
  InstitutionType,
  Review,
} from "../data/institutions";
import {
  getReviewsByInstitution,
  getReviewsWithHistory,
  getMostHelpfulReviews,
  getLatestReviews,
  contactStageLabels,
  abandonReasonLabels,
} from "../data/reviews";
import { ReviewDetailPage } from "./ReviewDetailPage";

interface InstitutionDetailProps {
  institutionId: string;
  onBack: () => void;
  onReviewSubmit?: (institutionId: string) => void;
}

type ReviewFilter = "all" | "regular" | "certified" | "latest" | "helpful";

function RadarChartComponent({
  institution,
  type,
}: {
  institution: Institution;
  type: InstitutionType;
}) {
  const dimensions = radarDimensions[type];
  const data = Object.entries(dimensions).map(([key, label]) => ({
    id: key,
    dimension: label,
    score: institution.scores[key] || 0,
    fullMark: 5,
  }));

  // 自定义角度标签渲染函数，确保文字完整显示
  const CustomAngleAxisTick = ({ payload, x, y, cx, cy }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = 120; // 标签距离中心的距离
    const angle = payload.coordinate;
    
    // 计算标签位置
    const cos = Math.cos(-RADIAN * angle);
    const sin = Math.sin(-RADIAN * angle);
    const tx = cx + radius * cos;
    const ty = cy + radius * sin;
    
    // 根据角度调整文字对齐方式
    let textAnchor = 'middle';
    if (cos > 0.1) {
      textAnchor = 'start';
    } else if (cos < -0.1) {
      textAnchor = 'end';
    }
    
    return (
      <text
        x={tx}
        y={ty}
        textAnchor={textAnchor}
        dominantBaseline="middle"
        className="fill-slate-700 text-xs font-medium"
      >
        {payload.value}
      </text>
    );
  };

  return (
    <div className="flex justify-center bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-6">
      <RadarChart width={340} height={340} data={data} key={`radar-${type}`}>
        <PolarGrid
          key={`grid-${type}`}
          stroke="#cbd5e1"
          strokeWidth={1.5}
          gridType="polygon"
        />
        <PolarAngleAxis
          key={`angle-${type}`}
          dataKey="dimension"
          tick={CustomAngleAxisTick}
        />
        <PolarRadiusAxis
          key={`radius-${type}`}
          angle={90}
          domain={[0, 5]}
          tick={{ fill: "#94a3b8", fontSize: 11 }}
          tickCount={6}
        />
        <Radar
          key={`radar-data-${type}`}
          name="评分"
          dataKey="score"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.5}
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
        />
      </RadarChart>
    </div>
  );
}

function ReviewCard({
  review,
  onClick,
}: {
  review: Review;
  onClick: () => void;
}) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showVersionPreview, setShowVersionPreview] = useState(false);

  const currentReview = review.versions.find((v) => v.version === review.currentVersion);
  const avgScore = currentReview
    ? Object.values(currentReview.scores).reduce((a, b) => a + b, 0) /
      Object.values(currentReview.scores).length
    : 0;

  // 判断是否是成交评价
  const isTransacted = review.isTransacted;

  return (
    <div
      className={`rounded-2xl p-4 shadow-sm border transition-all ${
        isTransacted
          ? "bg-gradient-to-br from-white to-green-50/30 border-green-200/50"
          : "bg-white border-slate-200"
      }`}
    >
      {/* 头部信息 */}
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="w-11 h-11">
          <AvatarFallback
            className={`text-white ${
              isTransacted
                ? "bg-gradient-to-br from-green-500 to-emerald-600"
                : "bg-gradient-to-br from-blue-500 to-purple-500"
            }`}
          >
            {review.userAvatar}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-slate-900">{review.userName}</span>
            {review.isVerified && <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* 认证评价标签 */}
            {isTransacted && review.proofVerified && (
              <Badge className="bg-gradient-to-r from-emerald-600 to-green-600 text-white border-0 text-xs gap-1 shadow-sm">
                <Shield className="w-3 h-3" />
                已认证评价
              </Badge>
            )}

            {/* 历史版本标签 */}
            {review.versions.length > 1 && (
              <Badge variant="outline" className="text-xs border-blue-500 text-blue-700 gap-1">
                <History className="w-3 h-3" />
                {review.versions.length}次更新
              </Badge>
            )}

            <span className="text-xs text-slate-500">{review.university}</span>
          </div>
        </div>
      </div>

      {/* 更新时间 */}
      {review.versions.length > 1 && (
        <div className="flex items-center gap-1.5 mb-3 text-xs text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5" />
          <span>最近更新于 {review.updatedAt.split(" ")[0]}</span>
        </div>
      )}

      {/* 评分 */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(avgScore)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-slate-200 text-slate-200"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-slate-900">{avgScore.toFixed(1)}</span>
      </div>

      {/* 评价内容预览 */}
      <button onClick={onClick} className="w-full text-left group">
        <p className="text-sm text-slate-700 leading-relaxed line-clamp-3 mb-3 group-hover:text-slate-900 transition-colors">
          {currentReview?.content}
        </p>
        <span className="text-xs text-blue-600 group-hover:text-blue-700 font-medium">
          查看完整评价 →
        </span>
      </button>

      {/* 历史版本预览 */}
      {review.versions.length > 1 && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowVersionPreview(!showVersionPreview);
            }}
            className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            <History className="w-3.5 h-3.5" />
            查看{review.versions.length}个历史版本
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showVersionPreview ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {showVersionPreview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 space-y-1.5 overflow-hidden"
              >
                {review.versions.map((version) => (
                  <div
                    key={version.version}
                    className="px-3 py-2 rounded-lg bg-slate-50 text-xs"
                  >
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="font-medium">V{version.version}</span>
                      <span>{version.createdAt.split(" ")[0]}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 底部互动栏 */}
      <div className="pt-3 mt-3 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsHelpful(!isHelpful);
              }}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                isHelpful ? "text-emerald-600" : "text-slate-500 hover:text-emerald-600"
              }`}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${isHelpful ? "fill-current" : ""}`} />
              <span className="font-medium">
                有帮助 ({review.helpfulCount + (isHelpful ? 1 : 0)})
              </span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsSaved(!isSaved);
              }}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                isSaved ? "text-blue-600" : "text-slate-500 hover:text-blue-600"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
              <span className="font-medium">{isSaved ? "已收藏" : "收藏"}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: 实现回复功能
              }}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="font-medium">回复</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: 实现举报功能
              }}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              <span className="font-medium">举报</span>
            </button>
          </div>

          <span className="text-xs text-slate-400 flex-shrink-0 ml-2">
            {currentReview?.createdAt.split(" ")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

export function InstitutionDetail({ institutionId, onBack, onReviewSubmit }: InstitutionDetailProps) {
  const institution = getInstitutionById(institutionId);
  const allReviews = getReviewsByInstitution(institutionId);
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // 根据筛选条件获取评价列表
  const getFilteredReviews = (): Review[] => {
    switch (filter) {
      case "all":
        return allReviews;
      case "regular":
        return allReviews.filter((r) => !r.isTransacted);
      case "certified":
        return allReviews.filter((r) => r.isTransacted);
      case "latest":
        return getLatestReviews(institutionId);
      case "helpful":
        return getMostHelpfulReviews(institutionId);
      default:
        return allReviews;
    }
  };

  const filteredReviews = getFilteredReviews();
  const certifiedCount = allReviews.filter((r) => r.isTransacted).length;
  const regularCount = allReviews.filter((r) => !r.isTransacted).length;

  if (!institution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">机构不存在</p>
      </div>
    );
  }

  // 如果选中了某个评价，显示详情页
  if (selectedReview) {
    return <ReviewDetailPage review={selectedReview} onBack={() => setSelectedReview(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg">{institution.name}</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* 机构基本信息 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold text-slate-900">{institution.avgScore}</span>
            </div>
            <div>
              <div className="text-sm text-slate-600">{institution.totalReviews} 条评价</div>
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="text-emerald-700">
                  <Shield className="w-3 h-3 inline mr-0.5" />
                  {institution.transactedReviews} 认证
                </span>
                <span className="text-slate-500">{institution.nonTransactedReviews} 普通</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700">{institution.address}</span>
            </div>
            {institution.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700">{institution.phone}</span>
              </div>
            )}
            {institution.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="text-blue-600">{institution.website}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {institution.highlights.map((highlight) => (
              <Badge key={highlight} variant="secondary">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>

        {/* 综合评分 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <h2 className="font-semibold text-slate-900 mb-3">综合评分</h2>
          <RadarChartComponent institution={institution} type={institution.type} />

          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.entries(radarDimensions[institution.type]).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                <span className="text-xs text-slate-600">{label}</span>
                <span className="text-sm font-semibold text-slate-900">
                  {institution.scores[key]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 评价筛选和列表 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
          <div className="mb-4">
            <h2 className="font-semibold text-slate-900 mb-3">用户评价</h2>
            
            {/* 筛选按钮组 */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                全部 ({allReviews.length})
              </button>
              <button
                onClick={() => setFilter("regular")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filter === "regular"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                普通评价 ({regularCount})
              </button>
              <button
                onClick={() => setFilter("certified")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                  filter === "certified"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Shield className="w-3 h-3" />
                认证评价 ({certifiedCount})
              </button>
              <button
                onClick={() => setFilter("latest")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                  filter === "latest"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Clock className="w-3 h-3" />
                最新
              </button>
              <button
                onClick={() => setFilter("helpful")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 ${
                  filter === "helpful"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <ThumbsUp className="w-3 h-3" />
                最有帮助
              </button>
            </div>
          </div>

          {/* 评价列表 */}
          <div className="space-y-3">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onClick={() => setSelectedReview(review)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">暂无评价</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部发布评价按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-10 shadow-lg">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm"
          size="lg"
          onClick={() => onReviewSubmit?.(institutionId)}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          发布评价
        </Button>
      </div>
    </div>
  );
}