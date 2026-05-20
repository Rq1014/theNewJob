import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  TrendingUp,
  Hash,
  Heart,
  MessageCircle,
  Bookmark,
  MapPin,
  Filter,
  Calendar,
  Flame,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { JapanCommunityPost, japanCommunityPosts } from "../../data/japan-community";

interface TagPageProps {
  tag: string;
  onBack: () => void;
  onPostClick: (postId: string) => void;
}

type SortType = "hot" | "new" | "popular";

const sortOptions = [
  { id: "hot" as SortType, label: "最热", icon: Flame },
  { id: "new" as SortType, label: "最新", icon: Calendar },
  { id: "popular" as SortType, label: "最多互动", icon: TrendingUp },
];

export function TagPage({ tag, onBack, onPostClick }: TagPageProps) {
  const [sortType, setSortType] = useState<SortType>("hot");

  // 筛选包含该标签的帖子
  const tagPosts = japanCommunityPosts.filter((post) => post.tags.includes(tag));

  const tagStats = {
    followCount: 2345,
    postCount: tagPosts.length,
    viewCount: 12456,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="font-bold text-lg">#{tag}</h1>
            </div>
          </div>

          {/* 排序选项 */}
          <div className="flex gap-2">
            {sortOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setSortType(option.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    sortType === option.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pb-6">
        {/* 标签信息卡 */}
        <div className="bg-white border-b border-slate-200 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Hash className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900 mb-2">#{tag}</h2>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {tagStats.followCount}人关注
                </div>
                <div>{tagStats.postCount}篇内容</div>
                <div>{tagStats.viewCount}次浏览</div>
              </div>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <Hash className="w-4 h-4 mr-2" />
            关注标签
          </Button>
        </div>

        {/* 相关标签 */}
        <div className="bg-white border-b border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900 mb-3 text-sm">相关标签</h3>
          <div className="flex flex-wrap gap-2">
            {["面试经验", "求职技巧", "IT", "内定经验", "日本求职"].map((relatedTag) => (
              <button
                key={relatedTag}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-sm text-slate-700 transition-colors"
              >
                #{relatedTag}
              </button>
            ))}
          </div>
        </div>

        {/* 内容列表 */}
        <div className="p-4 space-y-3">
          <div className="text-sm text-slate-500 mb-3">共 {tagPosts.length} 条内容</div>
          {tagPosts.map((post) => (
            <motion.button
              key={post.id}
              onClick={() => onPostClick(post.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all text-left"
            >
              <div className="flex items-start gap-2 mb-2">
                <Badge
                  className={`text-xs border-0 ${
                    post.domain === "career"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {post.domain === "career" ? "就活" : "生活"}
                </Badge>
                {post.city && (
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="w-3 h-3 mr-1" />
                    {post.city}
                  </Badge>
                )}
                {post.featured && (
                  <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">精选</Badge>
                )}
              </div>
              <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-2 mb-3">{post.summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-slate-500">
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
                </div>
                <div className="text-xs text-slate-400">{post.timestamp}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
