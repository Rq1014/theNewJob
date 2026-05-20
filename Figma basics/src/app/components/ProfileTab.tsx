import { useState } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Heart,
  ShieldCheck,
  Settings,
  ChevronRight,
  Crown,
  Mail,
  CheckCircle2,
  ArrowLeft,
  MessageCircle,
  Bookmark,
  Eye,
  Star,
  ThumbsUp,
  ArrowUpRight,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { categoryLabels, categoryIcons } from "./community/utils";
import { japanCommunityPosts } from "../data/japan-community";

interface MenuItem {
  id: string;
  icon: any;
  label: string;
  badge?: string;
  color?: string;
}

const menuItems: MenuItem[] = [
  {
    id: "posts",
    icon: FileText,
    label: "我的发布",
    badge: "12",
  },
  {
    id: "favorites",
    icon: Heart,
    label: "我的收藏",
    badge: "36",
  },
  {
    id: "verification",
    icon: ShieldCheck,
    label: "我的认证",
    color: "text-blue-600",
  },
  {
    id: "settings",
    icon: Settings,
    label: "设置",
  },
];

interface ProfileTabProps {
  onPostClick?: (postId: string) => void;
}

export function ProfileTab({ onPostClick }: ProfileTabProps = {}) {
  const [currentView, setCurrentView] = useState<"profile" | "posts" | "favorites" | "likes" | "reviews">("profile");

  const user = {
    name: "张同学",
    university: "东京大学",
    email: "zhang@g.ecc.u-tokyo.ac.jp",
    isVerified: true,
    isVIP: false,
  };

  // 模拟用户的发布、收藏、点赞的帖子（这里使用社区数据的前几条）
  const myPosts = japanCommunityPosts.slice(0, 5);
  const myFavorites = japanCommunityPosts.slice(2, 7);
  const myLikes = japanCommunityPosts.slice(1, 6);

  // 如果是列表视图，显示帖子列表
  if (currentView !== "profile") {
    const getTitle = () => {
      switch (currentView) {
        case "posts": return "我的发布";
        case "favorites": return "我的收藏";
        case "likes": return "我的点赞";
        case "reviews": return "我的评价";
        default: return "";
      }
    };

    const getPosts = () => {
      switch (currentView) {
        case "posts": return myPosts;
        case "favorites": return myFavorites;
        case "likes": return myLikes;
        case "reviews": return myPosts.slice(0, 3);
        default: return [];
      }
    };

    return (
      <div className="min-h-screen bg-slate-50">
        {/* 顶部导航 */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView("profile")}
              className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <h1 className="font-bold text-lg">{getTitle()}</h1>
            <span className="ml-auto text-sm text-slate-500">{getPosts().length}条</span>
          </div>
        </div>

        {/* 帖子列表 */}
        <div className="px-4 pb-20">
          {getPosts().map((post, index) => {
            const CategoryIcon = categoryIcons[post.category] || FileText;
            return (
              <motion.button
                key={post.id}
                onClick={() => onPostClick?.(post.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="w-full bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors text-left py-3 px-0"
              >
                {/* 第一行：标签信息 */}
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Badge
                    className={`text-[10px] px-1.5 py-0 h-4 border-0 ${
                      post.domain === "career"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {categoryLabels[post.category]}
                  </Badge>
                  {post.featured && (
                    <Badge className="bg-yellow-100 text-yellow-700 border-0 text-[10px] px-1.5 py-0 h-4">
                      精选
                    </Badge>
                  )}
                </div>

                {/* 第二行：标题 */}
                <h3 className="font-semibold text-[15px] text-slate-900 mb-1.5 leading-snug line-clamp-2">
                  {post.title}
                </h3>

                {/* 第三行：摘要 */}
                <p className="text-[13px] text-slate-600 leading-relaxed mb-2 line-clamp-2">
                  {post.summary}
                </p>

                {/* 第四行：公司/实体信息 */}
                {post.company && (
                  <div className="flex items-center gap-2 mb-2 py-1.5 px-2 bg-slate-50 rounded border border-slate-100">
                    <span className="text-base">{post.company.logo}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-slate-900 truncate">
                        {post.company.name}
                        {post.position && <span className="text-slate-500 ml-1.5">・{post.position}</span>}
                      </div>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </div>
                )}

                {/* 评分信息 */}
                {(post.rating || post.helpful) && (
                  <div className="flex items-center gap-3 mb-2 text-[12px]">
                    {post.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-slate-700">{post.rating}</span>
                      </div>
                    )}
                    {post.helpful && (
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-green-600" />
                        <span className="font-medium text-slate-700">{post.helpful}%实用</span>
                      </div>
                    )}
                  </div>
                )}

                {/* 第五行：作者信息 + 时间 */}
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-5 h-5">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-[10px] font-medium">
                      {post.author.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-1 flex-1 min-w-0 text-[12px] text-slate-500">
                    <span className="font-medium text-slate-700 truncate">
                      {post.author.name}
                    </span>
                    {post.author.verified && (
                      <CheckCircle2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
                    )}
                    {post.author.university && (
                      <span className="truncate">・{post.author.university}</span>
                    )}
                    <span className="ml-auto flex-shrink-0">・{post.timestamp}</span>
                  </div>
                </div>

                {/* 第六行：互动数据 */}
                <div className="flex items-center gap-4 text-[12px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{post.bookmarks}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{post.views}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-[84px]">
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-6 pt-8 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20 border-4 border-white shadow-xl">
            <AvatarFallback className="bg-white text-blue-600 text-2xl font-semibold">
              张
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-semibold text-white text-xl">{user.name}</h2>
              {user.isVerified && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs text-white">已认证</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-white/90 text-sm">
              <Mail className="w-4 h-4" />
              <span className="truncate">{user.university}</span>
            </div>
          </div>
        </div>

        {!user.isVIP && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white">升级 VIP 会员</div>
                  <div className="text-xs text-white/80">解锁专属特权，畅享全部功能</div>
                </div>
              </div>
              <Button size="sm" variant="secondary" className="flex-shrink-0">
                立即升级
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === menuItems.length - 1;

            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  if (item.id === "posts") setCurrentView("posts");
                  else if (item.id === "favorites") setCurrentView("favorites");
                  else if (item.id === "verification") setCurrentView("reviews");
                }}
                whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }}
                className={`w-full flex items-center gap-4 px-5 py-4 transition-colors ${
                  !isLast ? "border-b border-slate-100" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${
                    item.color || "text-slate-600"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 text-left">
                  <span className="font-medium text-slate-900">{item.label}</span>
                </div>

                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}

                <ChevronRight className="w-5 h-5 text-slate-400" />
              </motion.button>
            );
          })}
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">大学邮箱认证</h3>
              <p className="text-sm text-slate-600 mb-3">
                {user.isVerified
                  ? `已通过 ${user.email} 完成认证，享受官方认证用户特权`
                  : "使用学校邮箱认证身份，解锁更多功能和可信度提升"}
              </p>
              {!user.isVerified && (
                <Button size="sm" className="w-full">
                  立即认证
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500 space-y-1">
          <p>在日留学生交流平台 v1.0.0</p>
          <div className="flex items-center justify-center gap-3">
            <button className="hover:text-blue-600 transition-colors">用户协议</button>
            <span>·</span>
            <button className="hover:text-blue-600 transition-colors">隐私政策</button>
          </div>
        </div>
      </div>
    </div>
  );
}
