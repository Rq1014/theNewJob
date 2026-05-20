import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface ContentDetailPageProps {
  contentId: string;
  onBack: () => void;
}

export function ContentDetailPage({ contentId, onBack }: ContentDetailPageProps) {
  const mockContent = {
    id: contentId,
    category: "租房",
    title: "东京23区租房避坑整理",
    content: "在东京租房两年的经验总结，分享一些避坑技巧和注意事项。\n\n第一要避开黑中介，多通过学校或朋友推荐的正规中介找房...",
    author: {
      name: "张同学",
      university: "东京大学",
    },
    createdAt: "2天前",
    likes: 234,
    comments: 45,
    isLiked: false,
    emoji: "🏠",
    gradient: "from-yellow-100 to-orange-100",
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">详情</h1>
        <button className="rounded-lg p-1 hover:bg-gray-100">
          <MoreHorizontal className="size-5 text-gray-700" />
        </button>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto">
        {/* 顶部图片 */}
        <div className={`h-48 bg-gradient-to-br ${mockContent.gradient} relative flex items-center justify-center`}>
          <span className="text-6xl">{mockContent.emoji}</span>
        </div>

        {/* 内容 */}
        <div className="bg-white p-4">
          <div className="mb-3">
            <Badge variant="secondary">{mockContent.category}</Badge>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">{mockContent.title}</h1>

          {/* 作者信息 */}
          <div className="mt-4 flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                张
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{mockContent.author.name}</p>
              <p className="text-xs text-gray-500">{mockContent.author.university} · {mockContent.createdAt}</p>
            </div>
          </div>

          {/* 正文 */}
          <div className="mt-4 text-gray-700 whitespace-pre-line leading-relaxed">
            {mockContent.content}
          </div>

          {/* 互动数据 */}
          <div className="mt-6 flex items-center gap-6 border-t border-gray-100 pt-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
              <Heart className={`size-5 ${mockContent.isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="text-sm">{mockContent.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500">
              <MessageCircle className="size-5" />
              <span className="text-sm">{mockContent.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-green-500">
              <Share2 className="size-5" />
              <span className="text-sm">分享</span>
            </button>
          </div>
        </div>

        {/* 评论区 */}
        <div className="mt-2 bg-white p-4">
          <h3 className="mb-3 font-semibold text-gray-900">评论 ({mockContent.comments})</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                    U{i}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">用户{i}</p>
                  <p className="mt-1 text-sm text-gray-700">很有用的分享，谢谢！</p>
                  <p className="mt-1 text-xs text-gray-500">{i}小时前</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="写下你的评论..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Button>发送</Button>
        </div>
      </div>
    </div>
  );
}
