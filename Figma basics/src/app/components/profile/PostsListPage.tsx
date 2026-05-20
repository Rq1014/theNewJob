import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";

interface PostsListPageProps {
  onBack: () => void;
  onContentClick: (id: string) => void;
}

const mockPosts = [
  {
    id: "1",
    category: "租房",
    title: "东京23区租房避坑整理",
    description: "两年租房经验总结",
    likes: 234,
    comments: 45,
    emoji: "🏠",
    gradient: "from-yellow-100 to-orange-100",
  },
  {
    id: "4",
    category: "活动",
    title: "赏樱搭子招募",
    description: "本周末上野公园",
    likes: 567,
    comments: 89,
    emoji: "🌸",
    gradient: "from-green-100 to-emerald-100",
  },
];

export function PostsListPage({ onBack, onContentClick }: PostsListPageProps) {
  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">我的发布</h1>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {mockPosts.map((post, index) => (
            <motion.button
              key={post.id}
              onClick={() => onContentClick(post.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full overflow-hidden rounded-xl bg-white text-left shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`h-24 bg-gradient-to-br ${post.gradient} relative flex items-center justify-center`}>
                <span className="text-4xl">{post.emoji}</span>
              </div>
              <div className="p-4">
                <div className="mb-1">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                </div>
                <h4 className="font-semibold text-gray-900">{post.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{post.description}</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart className="size-4" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-4" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
