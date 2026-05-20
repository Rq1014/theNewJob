import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  Filter,
  Home,
  Utensils,
  FileText,
  Heart,
  MessageCircle,
  Bookmark,
  MapPin,
  Eye,
  Edit3,
  CheckCircle2,
  Star,
  ThumbsUp,
  Clock,
  Smartphone,
  CreditCard,
  Droplets,
  AlertTriangle,
  Users,
} from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { japanCommunityPosts, cityNames } from "../../data/japan-community";

interface LifeCommunityPageProps {
  onBack: () => void;
  onPostClick: (postId: string) => void;
  onUserClick: (userId: string) => void;
}

const quickTags = [
  { id: "mobile", label: "手机卡", icon: Smartphone },
  { id: "bank", label: "银行卡", icon: CreditCard },
  { id: "resident", label: "住民票", icon: FileText },
  { id: "utilities", label: "水电网", icon: Droplets },
  { id: "housing-area", label: "区域租房", icon: MapPin },
  { id: "warning", label: "黑中介", icon: AlertTriangle },
  { id: "solo-dining", label: "一人食", icon: Utensils },
  { id: "group-dining", label: "聚餐推荐", icon: Users },
];

export function LifeCommunityPage({
  onBack,
  onPostClick,
  onUserClick,
}: LifeCommunityPageProps) {
  const [activeTab, setActiveTab] = useState("guide");
  const [showPublishMenu, setShowPublishMenu] = useState(false);

  // 筛选生活相关帖子
  const lifePosts = japanCommunityPosts.filter((post) => post.domain === "life");
  const guidePosts = lifePosts.filter(
    (post) => post.category === "finance" || post.category === "admin"
  );
  const housingPosts = lifePosts.filter((post) => post.category === "housing");
  const foodPosts = lifePosts.filter((post) => post.category === "food");

  const getCurrentPosts = () => {
    switch (activeTab) {
      case "guide":
        return guidePosts;
      case "housing":
        return housingPosts;
      case "food":
        return foodPosts;
      default:
        return lifePosts;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg flex-1">生活社区</h1>
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* Tab 切换 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-slate-50 p-1">
              <TabsTrigger value="guide" className="flex-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                生活指南
              </TabsTrigger>
              <TabsTrigger value="housing" className="flex-1 flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                租房避坑
              </TabsTrigger>
              <TabsTrigger value="food" className="flex-1 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5" />
                美食推荐
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="pb-[84px]">
        {/* 快捷标签 */}
        <div className="bg-white border-b border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900 mb-3 text-sm">快捷标签</h3>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {quickTags.map((tag) => {
              const Icon = tag.icon;
              return (
                <button
                  key={tag.id}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-sm text-slate-700 whitespace-nowrap">{tag.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 内容列表 */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900">
              {activeTab === "guide"
                ? "生活指南"
                : activeTab === "housing"
                ? "租房避坑"
                : "美食推荐"}
            </h3>
            <span className="text-xs text-slate-500">{getCurrentPosts().length}条内容</span>
          </div>

          {getCurrentPosts().map((post) => (
            <motion.button
              key={post.id}
              onClick={() => onPostClick(post.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all text-left"
            >
              {/* 内容类型和城市 */}
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                  {post.category === "housing"
                    ? "租房"
                    : post.category === "food"
                    ? "美食"
                    : post.category === "finance"
                    ? "办卡"
                    : "生活"}
                </Badge>
                {post.city && (
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {cityNames[post.city]}
                  </Badge>
                )}
                {post.featured && (
                  <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">精选</Badge>
                )}
              </div>

              {/* 标题 */}
              <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>

              {/* 摘要 */}
              <p className="text-sm text-slate-600 line-clamp-2 mb-3">{post.summary}</p>

              {/* 评分/实用度 */}
              {(post.rating || post.helpful) && (
                <div className="flex items-center gap-3 mb-3 p-2.5 bg-green-50 rounded-lg">
                  {post.rating && (
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-slate-900">{post.rating}</span>
                      <span className="text-xs text-slate-500">评分</span>
                    </div>
                  )}
                  {post.helpful && (
                    <div className="flex items-center gap-1.5">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-semibold text-slate-900">{post.helpful}%</span>
                      <span className="text-xs text-slate-500">实用度</span>
                    </div>
                  )}
                </div>
              )}

              {/* 作者信息 */}
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-gradient-to-br from-green-500 to-teal-500 text-white text-xs">
                    {post.author.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-slate-700">{post.author.name}</span>
                {post.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                {post.author.badges?.includes("本地达人") && (
                  <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">本地达人</Badge>
                )}
              </div>

              {/* 互动数据 */}
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
                    <Bookmark className="w-3.5 h-3.5" />
                    {post.bookmarks}
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

      {/* 悬浮发布按钮 */}
      {showPublishMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-20"
            onClick={() => setShowPublishMenu(false)}
          />
          <div className="fixed bottom-[100px] right-4 z-30 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-2">
              {[
                { icon: FileText, label: "分享经验", color: "text-green-600" },
                { icon: AlertTriangle, label: "曝光避坑", color: "text-red-600" },
                { icon: Utensils, label: "推荐餐厅", color: "text-orange-600" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    <span className="font-medium text-slate-900">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPublishMenu(!showPublishMenu)}
        className="fixed bottom-[100px] right-4 z-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="w-14 h-14 flex items-center justify-center">
          <Edit3 className="w-5 h-5 text-white" />
        </div>
      </motion.button>
    </div>
  );
}
