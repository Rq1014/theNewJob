import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  TrendingUp,
  Award,
  HelpCircle,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Clock,
  MapPin,
  Flame,
  ArrowUpRight,
  Edit3,
  FileText,
  Trophy,
  MessageSquare,
  Coffee,
  CheckCircle2,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import {
  mockCommunityPosts,
  trendingTopics,
  hotDiscussions,
  beginnerGuides,
  PostType,
} from "../data/community";

type Channel = "all" | "experience" | "offer" | "question" | "life";

const channels = [
  { id: "all" as Channel, label: "全部", icon: null },
  { id: "experience" as Channel, label: "面经分享", icon: FileText },
  { id: "offer" as Channel, label: "内定榜单", icon: Trophy },
  { id: "question" as Channel, label: "求助问答", icon: MessageSquare },
  { id: "life" as Channel, label: "留学生活", icon: Coffee },
];

const quickChannels = [
  {
    id: "experience",
    title: "面经分享",
    subtitle: "真实面试经验分享",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "offer",
    title: "内定榜单",
    subtitle: "最新内定喜报",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "question",
    title: "求助答疑",
    subtitle: "互帮互助解决问题",
    icon: HelpCircle,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "life",
    title: "留学日常",
    subtitle: "生活经验与心得",
    icon: Coffee,
    color: "from-green-500 to-teal-500",
  },
];

export function CommunityTab() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPostMenu, setShowPostMenu] = useState(false);

  const filteredPosts = mockCommunityPosts.filter((post) => {
    if (selectedChannel === "all") return true;
    return post.type === selectedChannel;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-[84px]">
      {/* 顶部搜索和频道区 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="p-4 pb-3">
          {/* 搜索框 */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索面经、公司、问题..."
              className="pl-9 bg-slate-50 border-0 h-10"
            />
          </div>

          {/* 频道切换 */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedChannel === channel.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {channel.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* 快捷频道入口 */}
        <div className="bg-white border-b border-slate-200 px-4 pt-4 pb-3">
          <div className="grid grid-cols-2 gap-2.5">
            {quickChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <motion.button
                  key={channel.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-br ${channel.color} rounded-xl p-3 text-white shadow-sm hover:shadow-md transition-shadow text-left`}
                >
                  <Icon className="w-5 h-5 mb-1.5" />
                  <div className="font-semibold text-sm mb-0.5">{channel.title}</div>
                  <div className="text-xs opacity-90">{channel.subtitle}</div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 运营模块 */}
        <div className="px-4 space-y-3">
          {/* 今日热议 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <h3 className="font-semibold text-slate-900">今日热议</h3>
              </div>
              <button className="text-xs text-blue-600 flex items-center gap-0.5">
                更多
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {hotDiscussions.slice(0, 3).map((topic) => (
                <button
                  key={topic.id}
                  className="w-full flex items-start justify-between text-left hover:bg-slate-50 rounded-lg p-2 -m-2 transition-colors"
                >
                  <span className="text-sm text-slate-700 line-clamp-1 flex-1">{topic.title}</span>
                  <span className="text-xs text-slate-500 ml-2">{topic.replies}回复</span>
                </button>
              ))}
            </div>
          </div>

          {/* 热门标签 */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <h3 className="font-semibold text-slate-900">热门标签</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingTopics.map((topic) => (
                <button
                  key={topic.tag}
                  className="px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-sm text-slate-700">#{topic.tag}</span>
                  {topic.trend === "hot" && <Flame className="w-3 h-3 text-orange-500" />}
                  {topic.trend === "rising" && <TrendingUp className="w-3 h-3 text-blue-500" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 帖子列表 */}
        <div className="px-4 space-y-3 pb-4">
          {filteredPosts.map((post, index) => {
            const isHelpPost = post.priority === "help";
            const isFeatured = post.priority === "featured";

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${
                  isFeatured
                    ? "border-yellow-200 bg-gradient-to-br from-yellow-50/50 to-white"
                    : isHelpPost
                    ? "border-purple-200 bg-gradient-to-br from-purple-50/30 to-white"
                    : "border-slate-200"
                }`}
              >
                {/* 精选标识 */}
                {isFeatured && (
                  <div className="flex items-center gap-1.5 px-4 pt-3 pb-1">
                    <Award className="w-3.5 h-3.5 text-yellow-600" />
                    <span className="text-xs font-medium text-yellow-700">精选内容</span>
                  </div>
                )}

                <div className="p-4">
                  {/* 作者信息 */}
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-medium">
                        {post.author.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium text-slate-900">{post.author.name}</span>
                        {post.author.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                        )}
                        <Badge variant="outline" className="text-xs border-slate-200">
                          {post.author.university}
                        </Badge>
                        {post.author.tags && post.author.tags.length > 0 && (
                          <>
                            {post.author.tags.map((tag) => (
                              <Badge
                                key={tag}
                                className={`text-xs border-0 ${
                                  tag === "已获内定"
                                    ? "bg-green-100 text-green-700"
                                    : tag === "学校认证"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* 帖子标题 */}
                  <h3 className="font-bold text-slate-900 mb-2 leading-snug">
                    {isHelpPost && (
                      <HelpCircle className="inline w-4 h-4 text-purple-600 mr-1 -mt-0.5" />
                    )}
                    {post.title}
                  </h3>

                  {/* 帖子摘要 */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {post.summary}
                  </p>

                  {/* 公司/学校信息卡 */}
                  {post.company && (
                    <div className="mb-3 p-3 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm border border-slate-100">
                          {post.company.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-900 mb-0.5">
                            {post.company.name}
                          </div>
                          <div className="text-sm text-slate-600 mb-1">{post.position}</div>
                          {post.company.location && (
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <MapPin className="w-3 h-3" />
                              {post.company.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className={`text-xs ${
                          tag === "内定" || tag.includes("内定")
                            ? "bg-green-100 text-green-700 border-green-200"
                            : tag === "面经" || tag.includes("面经")
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : tag === "求助"
                            ? "bg-purple-100 text-purple-700 border-purple-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  {/* 互动区 */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex gap-4">
                      <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-red-600 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-yellow-600 transition-colors">
                        <Bookmark className="w-4 h-4" />
                        <span>{post.bookmarks}</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 发帖按钮 */}
      <AnimatePresence>
        {showPostMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-20"
              onClick={() => setShowPostMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-[100px] right-4 z-30 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
            >
              <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900">选择发帖类型</span>
                <button
                  onClick={() => setShowPostMenu(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-2">
                {[
                  { icon: FileText, label: "分享面经", color: "text-blue-600" },
                  { icon: Trophy, label: "发布内定", color: "text-yellow-600" },
                  { icon: HelpCircle, label: "提问求助", color: "text-purple-600" },
                  { icon: Coffee, label: "生活分享", color: "text-green-600" },
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
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPostMenu(!showPostMenu)}
        className="fixed bottom-[100px] right-4 z-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="w-14 h-14 flex items-center justify-center">
          <Edit3 className="w-5 h-5 text-white" />
        </div>
      </motion.button>
    </div>
  );
}
