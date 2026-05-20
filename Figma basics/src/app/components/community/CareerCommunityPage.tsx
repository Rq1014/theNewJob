import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  Filter,
  FileText,
  Trophy,
  HelpCircle,
  Heart,
  MessageCircle,
  Bookmark,
  TrendingUp,
  Building,
  MapPin,
  Eye,
  Edit3,
  Briefcase,
  CheckCircle2,
  Star,
  Clock,
} from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { japanCommunityPosts, cityNames } from "../../data/japan-community";

interface CareerCommunityPageProps {
  onBack: () => void;
  onPostClick: (postId: string) => void;
  onCompanyClick: (companyName: string) => void;
  onUserClick: (userId: string) => void;
}

const featuredCompanies = [
  { name: "乐天", logo: "🏢", posts: 45 },
  { name: "三菱商事", logo: "💼", posts: 38 },
  { name: "索尼", logo: "📱", posts: 32 },
  { name: "丰田", logo: "🚗", posts: 28 },
  { name: "NTT Data", logo: "💻", posts: 24 },
];

export function CareerCommunityPage({
  onBack,
  onPostClick,
  onCompanyClick,
  onUserClick,
}: CareerCommunityPageProps) {
  const [activeTab, setActiveTab] = useState("interview");
  const [showPublishMenu, setShowPublishMenu] = useState(false);

  // 筛选求职相关帖子
  const careerPosts = japanCommunityPosts.filter((post) => post.domain === "career");
  const interviewPosts = careerPosts.filter((post) => post.category === "interview");
  const offerPosts = careerPosts.filter((post) => post.category === "offer");
  const qaPosts = careerPosts.filter((post) => post.category === "career-qa");

  const getCurrentPosts = () => {
    switch (activeTab) {
      case "interview":
        return interviewPosts;
      case "offer":
        return offerPosts;
      case "qa":
        return qaPosts;
      default:
        return careerPosts;
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
            <h1 className="font-bold text-lg flex-1">求职交流</h1>
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
              <TabsTrigger value="interview" className="flex-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                面经
              </TabsTrigger>
              <TabsTrigger value="offer" className="flex-1 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                内定经验
              </TabsTrigger>
              <TabsTrigger value="qa" className="flex-1 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                问答
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="pb-[84px]">
        {/* 精选内容 */}
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-yellow-500" />
            <h3 className="font-semibold text-slate-900">精选内容</h3>
          </div>
          <div className="space-y-2">
            {careerPosts.filter((p) => p.featured).slice(0, 2).map((post) => (
              <button
                key={post.id}
                onClick={() => onPostClick(post.id)}
                className="w-full bg-gradient-to-br from-yellow-50 to-white rounded-xl p-3 border border-yellow-200 hover:border-yellow-300 transition-all text-left"
              >
                <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">
                  {post.title}
                </h4>
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
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 热门公司 */}
        <div className="bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-slate-900">热门公司</h3>
            </div>
            <button className="text-xs text-blue-600">查看全部</button>
          </div>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4">
            {featuredCompanies.map((company) => (
              <button
                key={company.name}
                onClick={() => onCompanyClick(company.name)}
                className="flex-shrink-0 bg-slate-50 rounded-xl p-3 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all min-w-[100px]"
              >
                <div className="text-2xl mb-1">{company.logo}</div>
                <div className="font-medium text-sm text-slate-900 mb-1">{company.name}</div>
                <div className="text-xs text-slate-500">{company.posts}篇内容</div>
              </button>
            ))}
          </div>
        </div>

        {/* 内容列表 */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900">
              {activeTab === "interview"
                ? "面经分享"
                : activeTab === "offer"
                ? "内定经验"
                : "求职问答"}
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
                <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                  {post.category === "interview"
                    ? "面经"
                    : post.category === "offer"
                    ? "内定"
                    : "问答"}
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

              {/* 公司信息 */}
              {post.company && (
                <div className="mb-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg shadow-sm">
                      {post.company.logo}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900">
                        {post.company.name}
                      </div>
                      <div className="text-xs text-slate-600">{post.position}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 作者信息 */}
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                    {post.author.avatar}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-slate-700">{post.author.name}</span>
                {post.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />}
                {post.author.university && (
                  <span className="text-xs text-slate-500">・{post.author.university}</span>
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
                { icon: FileText, label: "分享面经", color: "text-blue-600" },
                { icon: Trophy, label: "分享内定", color: "text-yellow-600" },
                { icon: HelpCircle, label: "我要提问", color: "text-purple-600" },
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
        className="fixed bottom-[100px] right-4 z-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="w-14 h-14 flex items-center justify-center">
          <Edit3 className="w-5 h-5 text-white" />
        </div>
      </motion.button>
    </div>
  );
}
