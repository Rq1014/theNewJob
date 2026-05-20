import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Users,
  TrendingUp,
  Star,
  Briefcase,
  Building,
  Calendar,
  ExternalLink,
  FileText,
  Trophy,
  MessageCircle,
  Heart,
  Bookmark,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { JapanCommunityPost, japanCommunityPosts } from "../../data/japan-community";

interface CompanyDetailPageProps {
  companyName: string;
  onBack: () => void;
  onPostClick: (postId: string) => void;
}

interface CompanyInfo {
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  website: string;
  rating: number;
  reviewCount: number;
  offerCount: number;
  interviewCount: number;
  tags: string[];
  description: string;
}

const mockCompany: CompanyInfo = {
  name: "乐天",
  logo: "🏢",
  industry: "互联网/电商",
  location: "东京・品川",
  size: "10000+人",
  website: "rakuten.co.jp",
  rating: 4.2,
  reviewCount: 156,
  offerCount: 23,
  interviewCount: 89,
  tags: ["IT", "外资", "福利好", "技术氛围"],
  description:
    "乐天株式会社是日本最大的电子商务平台运营商之一，业务涵盖电商、金融科技、通信等多个领域。公司以创新技术和国际化视野著称，为员工提供良好的职业发展空间。",
};

export function CompanyDetailPage({ companyName, onBack, onPostClick }: CompanyDetailPageProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  // 筛选该公司相关的帖子
  const companyPosts = japanCommunityPosts.filter(
    (post) => post.company?.name === companyName
  );

  const interviewPosts = companyPosts.filter((post) => post.category === "interview");
  const offerPosts = companyPosts.filter((post) => post.category === "offer");
  const reviewPosts = companyPosts.filter((post) => post.category === "company-review");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg">公司详情</h1>
          </div>
        </div>
      </div>

      <div className="pb-6">
        {/* 公司信息卡 */}
        <div className="bg-white border-b border-slate-200">
          <div className="p-6">
            {/* Logo和基本信息 */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-white rounded-2xl flex items-center justify-center text-4xl shadow-lg border border-slate-200">
                {mockCompany.logo}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{mockCompany.name}</h2>
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {mockCompany.industry}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {mockCompany.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {mockCompany.size}
                  </div>
                </div>
              </div>
            </div>

            {/* 评分和数据 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-100">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold text-slate-900">{mockCompany.rating}</span>
                  </div>
                  <div className="text-xs text-slate-600">{mockCompany.reviewCount}条评价</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-lg font-bold text-slate-900">{mockCompany.offerCount}</span>
                  </div>
                  <div className="text-xs text-slate-600">内定经验</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="text-lg font-bold text-slate-900">
                      {mockCompany.interviewCount}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">面经分享</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-lg font-bold text-slate-900">热门</span>
                  </div>
                  <div className="text-xs text-slate-600">热度排名</div>
                </div>
              </div>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {mockCompany.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-slate-100 text-slate-700 border-slate-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* 公司简介 */}
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              {mockCompany.description}
            </p>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? "outline" : "default"}
                className="flex-1"
              >
                {isFollowing ? "已关注" : "关注公司"}
              </Button>
              <Button variant="outline" className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                官网
              </Button>
            </div>
          </div>
        </div>

        {/* 内容标签页 */}
        <div className="bg-white mt-2">
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b border-slate-200 px-4">
              <TabsList className="w-full bg-transparent border-0 p-0 h-auto">
                <TabsTrigger
                  value="all"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
                >
                  全部 ({companyPosts.length})
                </TabsTrigger>
                <TabsTrigger
                  value="interview"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  面经 ({interviewPosts.length})
                </TabsTrigger>
                <TabsTrigger
                  value="offer"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
                >
                  <Trophy className="w-4 h-4 mr-1" />
                  内定 ({offerPosts.length})
                </TabsTrigger>
                <TabsTrigger
                  value="review"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
                >
                  <Star className="w-4 h-4 mr-1" />
                  评价 ({reviewPosts.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="p-4 space-y-3">
                {companyPosts.map((post) => (
                  <PostCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="interview" className="mt-0">
              <div className="p-4 space-y-3">
                {interviewPosts.map((post) => (
                  <PostCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="offer" className="mt-0">
              <div className="p-4 space-y-3">
                {offerPosts.map((post) => (
                  <PostCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="review" className="mt-0">
              <div className="p-4 space-y-3">
                {reviewPosts.length > 0 ? (
                  reviewPosts.map((post) => (
                    <PostCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p>暂无企业评价</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, onClick }: { post: JapanCommunityPost; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all text-left"
    >
      <div className="flex items-start gap-2 mb-2">
        <Badge
          className={`text-xs border-0 ${
            post.category === "offer"
              ? "bg-yellow-100 text-yellow-700"
              : post.category === "interview"
              ? "bg-blue-100 text-blue-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {post.category === "offer" ? "内定" : post.category === "interview" ? "面经" : "评价"}
        </Badge>
        {post.featured && (
          <Badge className="bg-red-100 text-red-700 border-0 text-xs">精选</Badge>
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
  );
}
