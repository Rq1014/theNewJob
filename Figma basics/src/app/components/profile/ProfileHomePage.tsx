import { motion } from "motion/react";
import {
  Settings,
  CheckCircle2,
  Edit3,
  Heart,
  MessageCircle,
  Bookmark,
  Eye,
  Star,
  ThumbsUp,
  ArrowUpRight,
  FileText,
  MapPin,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Pin,
  EyeOff,
  BarChart3,
  Inbox,
  Building,
  BookOpen,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";
import { japanCommunityPosts } from "../../data/japan-community";
import { categoryLabels, categoryIcons } from "../community/utils";

interface ProfileHomePageProps {
  onEditProfile: () => void;
  onSettings: () => void;
  onContentClick: (id: string) => void;
}

type ContentTab = "posts" | "favorites" | "reviews" | "treeholes" | "resources";

export function ProfileHomePage({
  onEditProfile,
  onSettings,
  onContentClick,
}: ProfileHomePageProps) {
  const [activeTab, setActiveTab] = useState<ContentTab>("posts");
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  // 点击外部关闭操作菜单
  useEffect(() => {
    const handleClickOutside = () => {
      if (openActionMenuId) {
        setOpenActionMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openActionMenuId]);

  const user = {
    name: "张同学",
    university: "东京大学",
    location: "东京都",
    userType: "在读研究生",
    joinDate: "2024年3月",
    bio: "在东京的留学生活 | 喜欢探店和摄影 📷",
    isVerified: true,
    postsCount: 24,
    likesReceived: 389, // 获赞数
    favoritesCount: 36,
    reviewsCount: 12,
  };

  // 常用功能列表 - 只保留4个核心入口
  const quickActions = [
    { id: "my-drafts", label: "我的草稿", icon: Inbox, count: 3, color: "text-orange-600 bg-orange-50" },
    { id: "my-past-exams", label: "我的过去问", icon: BookOpen, count: 8, color: "text-indigo-600 bg-indigo-50" },
    { id: "my-treeholes", label: "我的树洞", icon: MessageCircle, count: 7, color: "text-teal-600 bg-teal-50" },
    { id: "my-reviews", label: "机构评价", icon: Building, count: 12, color: "text-amber-600 bg-amber-50" },
  ];

  // 根据Tab获取内容 - 使用社区帖子数据
  const getContentByTab = () => {
    switch (activeTab) {
      case "posts":
        // 发布：显示用户发布的帖子
        return japanCommunityPosts.slice(0, 8);
      case "favorites":
        // 收藏：显示用户收藏的帖子
        return japanCommunityPosts.slice(1, 9);
      case "reviews":
        // 评价：显示用户的评价（筛选带评分的）
        return japanCommunityPosts.filter(p => p.rating || p.helpful).slice(0, 6);
      case "treeholes":
        // 树洞：显示用户在树洞发布的内容
        return japanCommunityPosts.slice(3, 8);
      case "resources":
        // 资料：显示用户上传/下载的过去问资料
        return japanCommunityPosts.filter(p => p.category === "academic").slice(0, 5);
      default:
        return japanCommunityPosts.slice(0, 8);
    }
  };

  const currentContent = getContentByTab();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* 顶部个人信息区 */}
      <div className="bg-white px-4 pt-4 pb-4 shadow-sm">
        <div className="flex items-start gap-4 mb-4">
          {/* 左侧：头像 */}
          <Avatar className="size-20 border-2 border-slate-200 shadow-sm flex-shrink-0">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-2xl font-semibold text-white">
              张
            </AvatarFallback>
          </Avatar>

          {/* 右侧：个人信息 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
              {user.isVerified && (
                <div className="flex items-center gap-0.5 rounded-full bg-blue-50 px-2 py-0.5">
                  <CheckCircle2 className="size-3.5 text-blue-600" />
                  <span className="text-[10px] font-medium text-blue-600">已认证</span>
                </div>
              )}
            </div>

            {/* 大学、所在地、身份类型 */}
            <div className="flex items-center gap-3 text-sm text-slate-600 mb-1">
              <span className="flex items-center gap-1">
                <Shield className="size-3.5" />
                {user.university}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" />
                {user.location}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>{user.userType}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3 inline" />
                {user.joinDate}加入
              </span>
            </div>
          </div>

          {/* 右上角操作按钮 */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={onEditProfile}
              className="flex items-center justify-center size-8 rounded-lg hover:bg-slate-100 transition-colors"
              title="编辑资料"
            >
              <Edit3 className="size-4 text-slate-600" />
            </button>
            <button
              onClick={onSettings}
              className="flex items-center justify-center size-8 rounded-lg hover:bg-slate-100 transition-colors"
              title="设置"
            >
              <Settings className="size-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* 个人简介 */}
        <p className="text-sm text-slate-700 leading-relaxed mb-4">{user.bio}</p>

        {/* 数据统计区 - 横向数字统计 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{user.postsCount}</div>
            <div className="text-xs text-slate-500 mt-0.5">发布</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{user.likesReceived}</div>
            <div className="text-xs text-slate-500 mt-0.5">获赞</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{user.favoritesCount}</div>
            <div className="text-xs text-slate-500 mt-0.5">收藏</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{user.reviewsCount}</div>
            <div className="text-xs text-slate-500 mt-0.5">评价</div>
          </div>
        </div>
      </div>

      {/* 常用功能入口 - 4个核心入口 */}
      <div className="bg-white mt-2 px-4 py-4">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => {
                  // TODO: 处理功能入口点击
                  console.log("Quick action:", action.id);
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center relative shadow-sm`}>
                  <Icon className="size-5" />
                  {action.count > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center px-1 shadow-sm">
                      {action.count > 99 ? "99+" : action.count}
                    </div>
                  )}
                </div>
                <span className="text-xs text-slate-700 font-medium text-center leading-tight">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 内容Tab切换 */}
      <div className="bg-white mt-2 border-b border-slate-200">
        <div className="flex items-center px-4">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "posts" ? "text-blue-600" : "text-slate-600"
            }`}
          >
            发布
            {activeTab === "posts" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "favorites" ? "text-blue-600" : "text-slate-600"
            }`}
          >
            收藏
            {activeTab === "favorites" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "reviews" ? "text-blue-600" : "text-slate-600"
            }`}
          >
            评价
            {activeTab === "reviews" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("treeholes")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "treeholes" ? "text-blue-600" : "text-slate-600"
            }`}
          >
            树洞
            {activeTab === "treeholes" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === "resources" ? "text-blue-600" : "text-slate-600"
            }`}
          >
            资料
            {activeTab === "resources" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
        </div>
      </div>

      {/* 帖子列表 */}
      <div className="bg-white">
        {currentContent.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-slate-500">暂无内容</p>
          </div>
        ) : (
          <div className="px-4">
            {currentContent.map((post, index) => {
              const CategoryIcon = categoryIcons[post.category] || FileText;
              const isMenuOpen = openActionMenuId === post.id;

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="w-full bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors text-left py-3 px-0 relative"
                >
                  <div onClick={() => onContentClick(post.id)} className="cursor-pointer">
                    {/* 第一行：标签信息 + 操作按钮 */}
                    <div className="flex items-center justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-1.5">
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
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenActionMenuId(isMenuOpen ? null : post.id);
                          }}
                          className="p-1.5 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-slate-500" />
                        </button>

                        {/* 操作菜单 */}
                        {isMenuOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10 min-w-[140px]"
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionMenuId(null);
                                // TODO: 编辑操作
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Edit className="w-4 h-4" />
                              编辑
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionMenuId(null);
                                // TODO: 置顶操作
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Pin className="w-4 h-4" />
                              置顶
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionMenuId(null);
                                // TODO: 仅自己可见操作
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <EyeOff className="w-4 h-4" />
                              仅自己可见
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionMenuId(null);
                                // TODO: 查看数据操作
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <BarChart3 className="w-4 h-4" />
                              查看数据
                            </button>
                            <div className="h-px bg-slate-200 my-1" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionMenuId(null);
                                // TODO: 删除操作
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                              删除
                            </button>
                          </div>
                        )}
                      </div>
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

                    {/* 第五行：发布时间 */}
                    <div className="flex items-center gap-1 text-[12px] text-slate-500 mb-2">
                      <span>{post.timestamp}</span>
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
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}