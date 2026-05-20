import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Users,
  Heart,
  Bookmark,
  CheckCircle2,
  Grid3x3,
  List,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { JapanCommunityPost, japanCommunityPosts } from "../../data/japan-community";

interface UserProfilePageProps {
  userId: string;
  onBack: () => void;
  onPostClick: (postId: string) => void;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  university: string;
  city: string;
  verified: boolean;
  badges: string[];
  bio: string;
  joinDate: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    likes: number;
  };
}

const mockUser: UserProfile = {
  id: "u1",
  name: "小李",
  avatar: "L",
  university: "东京大学",
  city: "东京",
  verified: true,
  badges: ["已获内定", "学校认证", "活跃用户"],
  bio: "东大CS在读｜已获乐天内定｜分享就活经验和东京生活攻略",
  joinDate: "2024年3月加入",
  stats: {
    posts: 42,
    followers: 1234,
    following: 567,
    likes: 8901,
  },
};

export function UserProfilePage({ userId, onBack, onPostClick }: UserProfilePageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [isFollowing, setIsFollowing] = useState(false);

  // 模拟用户发布的帖子
  const userPosts = japanCommunityPosts.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg">{mockUser.name}</h1>
          </div>
        </div>
      </div>

      <div className="pb-6">
        {/* 用户信息卡 */}
        <div className="bg-white border-b border-slate-200">
          <div className="p-6">
            {/* 头像和基本信息 */}
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
                  {mockUser.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-xl font-bold text-slate-900">{mockUser.name}</h2>
                  {mockUser.verified && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {mockUser.badges.map((badge) => (
                    <Badge
                      key={badge}
                      className={`text-xs border-0 ${
                        badge === "已获内定"
                          ? "bg-green-100 text-green-700"
                          : badge === "学校认证"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {mockUser.university}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {mockUser.city}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {mockUser.joinDate}
                  </div>
                </div>
              </div>
            </div>

            {/* 个人简介 */}
            <p className="text-sm text-slate-700 leading-relaxed mb-4">{mockUser.bio}</p>

            {/* 统计数据 */}
            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">{mockUser.stats.posts}</div>
                <div className="text-xs text-slate-500">帖子</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">{mockUser.stats.followers}</div>
                <div className="text-xs text-slate-500">粉丝</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">{mockUser.stats.following}</div>
                <div className="text-xs text-slate-500">关注</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-slate-900">{mockUser.stats.likes}</div>
                <div className="text-xs text-slate-500">获赞</div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                variant={isFollowing ? "outline" : "default"}
                className="flex-1"
              >
                {isFollowing ? "已关注" : "关注"}
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageCircle className="w-4 h-4 mr-2" />
                私信
              </Button>
            </div>
          </div>
        </div>

        {/* 内容标签页 */}
        <div className="bg-white mt-2">
          <Tabs defaultValue="posts" className="w-full">
            <div className="border-b border-slate-200 px-4">
              <TabsList className="w-full bg-transparent border-0 p-0 h-auto">
                <TabsTrigger
                  value="posts"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
                >
                  <Grid3x3 className="w-4 h-4 mr-2" />
                  帖子
                </TabsTrigger>
                <TabsTrigger
                  value="liked"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  点赞
                </TabsTrigger>
                <TabsTrigger
                  value="bookmarks"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none bg-transparent"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  收藏
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="posts" className="mt-0">
              <div className="p-4 space-y-3">
                {userPosts.map((post) => (
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
                          {post.city}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">{post.summary}</p>
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
                  </motion.button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="liked" className="mt-0">
              <div className="p-8 text-center text-slate-500">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p>暂无点赞内容</p>
              </div>
            </TabsContent>

            <TabsContent value="bookmarks" className="mt-0">
              <div className="p-8 text-center text-slate-500">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p>暂无收藏内容</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
