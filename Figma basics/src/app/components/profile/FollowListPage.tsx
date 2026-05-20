import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2, UserPlus, UserMinus, Search, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface User {
  id: string;
  name: string;
  avatar: string;
  university: string;
  bio: string;
  isVerified: boolean;
  isFollowing: boolean;
  mutualFollowers?: number;
  tags?: string[];
}

const mockFollowingUsers: User[] = [
  {
    id: "1",
    name: "小明",
    avatar: "M",
    university: "东京工业大学",
    bio: "CS专业 | 喜欢健身和摄影",
    isVerified: true,
    isFollowing: true,
    mutualFollowers: 12,
    tags: ["同学校", "就活"],
  },
  {
    id: "2",
    name: "阿华",
    avatar: "H",
    university: "早稻田大学",
    bio: "摄影爱好者 | 探店达人",
    isVerified: true,
    isFollowing: true,
    mutualFollowers: 8,
    tags: ["同城"],
  },
  {
    id: "3",
    name: "李华",
    avatar: "L",
    university: "京都大学",
    bio: "IT工程师 | 就活经验分享",
    isVerified: true,
    isFollowing: true,
    mutualFollowers: 5,
    tags: ["就活"],
  },
  {
    id: "4",
    name: "小红",
    avatar: "H",
    university: "大阪大学",
    bio: "美食博主 | 关西生活",
    isVerified: false,
    isFollowing: true,
    mutualFollowers: 3,
    tags: ["美食"],
  },
  {
    id: "5",
    name: "王芳",
    avatar: "W",
    university: "庆应义塾大学",
    bio: "商学院 | 喜欢旅行",
    isVerified: true,
    isFollowing: true,
    mutualFollowers: 15,
    tags: ["同城"],
  },
];

const mockFollowers: User[] = [
  {
    id: "6",
    name: "小张",
    avatar: "Z",
    university: "东京大学",
    bio: "经济学专业 | 读书爱好者",
    isVerified: true,
    isFollowing: false,
    mutualFollowers: 6,
    tags: ["同学校"],
  },
  {
    id: "7",
    name: "阿强",
    avatar: "Q",
    university: "一桥大学",
    bio: "户外运动爱好者",
    isVerified: true,
    isFollowing: true,
    mutualFollowers: 4,
    tags: ["户外"],
  },
  {
    id: "8",
    name: "美美",
    avatar: "M",
    university: "上智大学",
    bio: "语言学习 | 文化交流",
    isVerified: false,
    isFollowing: false,
    mutualFollowers: 2,
    tags: ["学习"],
  },
  {
    id: "9",
    name: "小李",
    avatar: "L",
    university: "大阪大学",
    bio: "日语N1 | 备考经验分享",
    isVerified: true,
    isFollowing: false,
    mutualFollowers: 9,
    tags: ["学习"],
  },
  {
    id: "10",
    name: "张三",
    avatar: "Z",
    university: "早稻田大学",
    bio: "图书馆常驻 | 学术分享",
    isVerified: true,
    isFollowing: true,
    mutualFollowers: 7,
    tags: ["同城", "学习"],
  },
];

interface FollowListPageProps {
  type: "following" | "followers";
  onBack: () => void;
}

export function FollowListPage({ type, onBack }: FollowListPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>(
    type === "following" ? mockFollowingUsers : mockFollowers
  );

  const handleToggleFollow = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="font-bold text-lg text-gray-900">
              {type === "following" ? "我的关注" : "我的粉丝"}
            </h1>
            <p className="text-xs text-gray-500">
              {filteredUsers.length} 人
            </p>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索用户..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 rounded-full bg-gray-100 border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 用户列表 */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 space-y-3">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 truncate">
                      {user.name}
                    </span>
                    {user.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{user.university}</p>
                  <p className="text-sm text-gray-600 line-clamp-1 mb-2">{user.bio}</p>

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1.5">
                    {user.tags?.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs px-2 py-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {user.mutualFollowers && user.mutualFollowers > 0 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-0 border-blue-300 text-blue-700 bg-blue-50"
                      >
                        {user.mutualFollowers} 位共同关注
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant={user.isFollowing ? "outline" : "default"}
                    onClick={() => handleToggleFollow(user.id)}
                    className={`flex-shrink-0 h-8 px-4 rounded-full ${
                      user.isFollowing
                        ? "hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    }`}
                  >
                    {user.isFollowing ? (
                      <>
                        <UserMinus className="w-3.5 h-3.5 mr-1" />
                        已关注
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5 mr-1" />
                        关注
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // 这里可以导航到私聊页面
                      console.log(`开始与 ${user.name} 私聊`);
                    }}
                    className="flex-shrink-0 h-8 px-4 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-1" />
                    私聊
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">未找到相关用户</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}