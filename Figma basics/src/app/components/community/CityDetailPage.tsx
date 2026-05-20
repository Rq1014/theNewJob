import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  Stethoscope,
  Home,
  Utensils,
  FileText,
  Bus,
  Briefcase,
  GraduationCap,
  TrendingUp,
  MapPin,
  Heart,
  MessageCircle,
  Bookmark,
  Eye,
  Star,
  ThumbsUp,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { City, cityNames, japanCommunityPosts } from "../../data/japan-community";

interface CityDetailPageProps {
  city: City;
  onBack: () => void;
  onPostClick: (postId: string) => void;
}

const moduleIcons: Record<string, any> = {
  medical: Stethoscope,
  housing: Home,
  food: Utensils,
  admin: FileText,
  transport: Bus,
  career: Briefcase,
  school: GraduationCap,
  trending: TrendingUp,
};

export function CityDetailPage({ city, onBack, onPostClick }: CityDetailPageProps) {
  const cityName = cityNames[city];

  // 筛选该城市的帖子
  const cityPosts = japanCommunityPosts.filter((post) => post.city === city);
  const medicalPosts = cityPosts.filter((post) => post.category === "medical");
  const housingPosts = cityPosts.filter((post) => post.category === "housing");
  const foodPosts = cityPosts.filter((post) => post.category === "food");
  const careerPosts = cityPosts.filter((post) => post.domain === "career");

  const modules = [
    {
      id: "medical",
      title: "中文友好医院",
      subtitle: `${medicalPosts.length}家医院推荐`,
      icon: "medical",
      color: "from-teal-500 to-cyan-500",
      count: medicalPosts.length,
    },
    {
      id: "housing",
      title: "租房信息",
      subtitle: `${housingPosts.length}条租房经验`,
      icon: "housing",
      color: "from-red-500 to-pink-500",
      count: housingPosts.length,
    },
    {
      id: "food",
      title: "美食推荐",
      subtitle: `${foodPosts.length}家餐厅推荐`,
      icon: "food",
      color: "from-orange-500 to-yellow-500",
      count: foodPosts.length,
    },
    {
      id: "admin",
      title: "办事指南",
      subtitle: "行政手续与办事攻略",
      icon: "admin",
      color: "from-blue-500 to-indigo-500",
      count: 12,
    },
    {
      id: "transport",
      title: "交通出行",
      subtitle: "地铁、公交、交通卡",
      icon: "transport",
      color: "from-green-500 to-emerald-500",
      count: 8,
    },
    {
      id: "career",
      title: "求职信息",
      subtitle: `${careerPosts.length}条求职经验`,
      icon: "career",
      color: "from-purple-500 to-violet-500",
      count: careerPosts.length,
    },
    {
      id: "school",
      title: "学校周边",
      subtitle: "大学周边生活指南",
      icon: "school",
      color: "from-pink-500 to-rose-500",
      count: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg flex-1">{cityName}</h1>
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="pb-6">
        {/* 城市头部 */}
        <div className="bg-gradient-to-br from-green-50 to-white p-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">{cityName[0]}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{cityName}</h2>
              <p className="text-sm text-slate-600">{cityPosts.length}条相关信息</p>
            </div>
          </div>
        </div>

        {/* 功能模块 */}
        <div className="p-4">
          <h3 className="font-semibold text-slate-900 mb-3">功能模块</h3>
          <div className="grid grid-cols-2 gap-3">
            {modules.map((module, index) => {
              const Icon = moduleIcons[module.icon];
              return (
                <motion.button
                  key={module.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-gradient-to-br ${module.color} rounded-xl p-4 text-white shadow-md hover:shadow-lg transition-all text-left min-h-[100px] flex flex-col justify-between`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <div>
                    <div className="font-bold text-sm mb-1">{module.title}</div>
                    <div className="text-xs opacity-90">{module.subtitle}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 中文友好医院（重点模块） */}
        <div className="px-4 mt-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-slate-900">中文友好医院</h3>
              </div>
              <button className="text-sm text-teal-600 flex items-center gap-1">
                查看全部
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {medicalPosts.map((post) => (
                <button
                  key={post.id}
                  onClick={() => onPostClick(post.id)}
                  className="w-full bg-teal-50 rounded-lg p-3 hover:bg-teal-100 transition-colors text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1 flex-1">
                      {post.title}
                    </h4>
                    {post.rating && (
                      <div className="flex items-center gap-1 ml-2">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{post.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-1 mb-2">{post.summary}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.comments}
                    </div>
                    {post.helpful && (
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {post.helpful}%实用
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 热门帖子 */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <h3 className="font-semibold text-slate-900">热门帖子</h3>
            </div>
            <button className="text-sm text-blue-600">查看全部</button>
          </div>

          <div className="space-y-3">
            {cityPosts.slice(0, 5).map((post) => (
              <motion.button
                key={post.id}
                onClick={() => onPostClick(post.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className={`text-xs border-0 ${
                      post.domain === "career"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {post.domain === "career" ? "就活" : "生活"}
                  </Badge>
                  {post.featured && (
                    <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">精选</Badge>
                  )}
                </div>

                <h4 className="font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h4>
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">{post.summary}</p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {post.comments}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {post.views}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {post.timestamp}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
