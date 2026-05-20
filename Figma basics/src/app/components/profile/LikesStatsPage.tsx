import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Heart, Bookmark, TrendingUp, Eye } from "lucide-react";
import { Badge } from "../ui/badge";

interface LikeStat {
  id: string;
  type: "like" | "favorite";
  postTitle: string;
  postCategory: string;
  count: number;
  trend: "up" | "down" | "stable";
  trendValue: number;
  emoji: string;
  gradient: string;
}

const mockLikeStats: LikeStat[] = [
  {
    id: "1",
    type: "like",
    postTitle: "东京23区租房避坑整理",
    postCategory: "租房",
    count: 234,
    trend: "up",
    trendValue: 12,
    emoji: "🏠",
    gradient: "from-yellow-100 to-orange-100",
  },
  {
    id: "2",
    type: "favorite",
    postTitle: "赏樱搭子招募",
    postCategory: "活动",
    count: 567,
    trend: "up",
    trendValue: 45,
    emoji: "🌸",
    gradient: "from-pink-100 to-rose-100",
  },
  {
    id: "3",
    type: "like",
    postTitle: "索尼2026秋招面试分享",
    postCategory: "就活",
    count: 178,
    trend: "stable",
    trendValue: 0,
    emoji: "💼",
    gradient: "from-blue-100 to-cyan-100",
  },
  {
    id: "4",
    type: "favorite",
    postTitle: "新宿车站周边美食探店",
    postCategory: "美食",
    count: 389,
    trend: "up",
    trendValue: 23,
    emoji: "🍜",
    gradient: "from-orange-100 to-amber-100",
  },
  {
    id: "5",
    type: "like",
    postTitle: "日语能力考N1备考经验",
    postCategory: "学习",
    count: 245,
    trend: "down",
    trendValue: 8,
    emoji: "📚",
    gradient: "from-purple-100 to-violet-100",
  },
];

interface LikesStatsPageProps {
  onBack: () => void;
}

export function LikesStatsPage({ onBack }: LikesStatsPageProps) {
  const [activeTab, setActiveTab] = useState<"all" | "like" | "favorite">("all");

  const totalLikes = mockLikeStats
    .filter((stat) => stat.type === "like")
    .reduce((sum, stat) => sum + stat.count, 0);

  const totalFavorites = mockLikeStats
    .filter((stat) => stat.type === "favorite")
    .reduce((sum, stat) => sum + stat.count, 0);

  const filteredStats = mockLikeStats.filter((stat) => {
    if (activeTab === "all") return true;
    return stat.type === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-lg text-gray-900">获赞与收藏</h1>
            <p className="text-xs text-gray-500">我的内容影响力数据</p>
          </div>
        </div>
      </div>

      {/* 数据概览卡片 */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-white" />
            <span className="text-white/90 text-sm font-medium">总影响力</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-xs">获赞数</span>
              </div>
              <div className="text-3xl font-bold text-white">{totalLikes}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Bookmark className="w-4 h-4 text-white/80" />
                <span className="text-white/80 text-xs">收藏数</span>
              </div>
              <div className="text-3xl font-bold text-white">{totalFavorites}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between text-white/90 text-xs">
              <span>总计</span>
              <span className="font-semibold text-base">
                {totalLikes + totalFavorites} 次互动
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab切换 */}
      <div className="px-4">
        <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "all"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
            }`}
          >
            全部
          </button>
          <button
            onClick={() => setActiveTab("like")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "like"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
            }`}
          >
            获赞
          </button>
          <button
            onClick={() => setActiveTab("favorite")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "favorite"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600"
            }`}
          >
            收藏
          </button>
        </div>
      </div>

      {/* 内容列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {filteredStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div
                className={`h-20 bg-gradient-to-br ${stat.gradient} flex items-center justify-center relative`}
              >
                <span className="text-4xl">{stat.emoji}</span>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-white/80 text-gray-700 backdrop-blur-sm">
                    {stat.postCategory}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-1">
                  {stat.postTitle}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      {stat.type === "like" ? (
                        <Heart className="w-4 h-4 text-red-500" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-lg font-bold text-gray-900">
                        {stat.count}
                      </span>
                      <span className="text-xs text-gray-500">
                        {stat.type === "like" ? "赞" : "收藏"}
                      </span>
                    </div>

                    {stat.trend !== "stable" && (
                      <div
                        className={`flex items-center gap-1 text-xs font-medium ${
                          stat.trend === "up" ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        <TrendingUp
                          className={`w-3.5 h-3.5 ${
                            stat.trend === "down" ? "rotate-180" : ""
                          }`}
                        />
                        {stat.trend === "up" ? "+" : "-"}
                        {stat.trendValue}
                      </div>
                    )}
                  </div>

                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    查看详情
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStats.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm">暂无数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
