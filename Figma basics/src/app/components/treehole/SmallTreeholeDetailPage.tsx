import { useState } from "react";
import { ArrowLeft, Users, Lock, Globe, MessageSquare, Heart, Edit3, Filter } from "lucide-react";
import { smallTreeholes, bigTreeholes, postTypeOptions } from "../../data/treehole";
import { treeholePosts } from "../../data/treehole-posts";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface SmallTreeholeDetailPageProps {
  smallTreeholeId: string;
  onBack: () => void;
  onCreatePost: (treeholeId: string, treeholeName: string) => void;
}

type FilterTab = "latest" | "hot" | "question" | "partner" | "confession" | "experience";

export function SmallTreeholeDetailPage({
  smallTreeholeId,
  onBack,
  onCreatePost,
}: SmallTreeholeDetailPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("latest");
  const [isJoined, setIsJoined] = useState(false);

  const smallTreehole = smallTreeholes.find((t) => t.id === smallTreeholeId);
  const belongToBigTreehole = smallTreehole
    ? bigTreeholes.find((bt) => bt.id === smallTreehole.belongTo)
    : null;
  const posts = treeholePosts.filter((p) => p.treeholeId === smallTreeholeId);

  if (!smallTreehole) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">树洞不存在</p>
      </div>
    );
  }

  // 根据筛选条件过滤帖子
  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "latest" || activeFilter === "hot") return true;
    return post.postType === activeFilter;
  });

  const handleJoin = () => {
    setIsJoined(true);
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">{smallTreehole.name}</h1>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 树洞信息卡片 */}
        <div className="bg-white p-4">
          {/* 所属大树洞 */}
          {belongToBigTreehole && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <div
                className={`flex size-8 items-center justify-center rounded-lg ${belongToBigTreehole.iconBgColor} text-lg`}
              >
                {belongToBigTreehole.icon}
              </div>
              <span className="text-sm text-gray-600">来自 {belongToBigTreehole.name}</span>
            </div>
          )}

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">{smallTreehole.name}</h2>
                <Badge variant="outline">
                  {smallTreehole.mode === "confession" ? "倾诉" : "搭子"}
                </Badge>
                {smallTreehole.isAnonymous && (
                  <Badge variant="secondary">匿名</Badge>
                )}
              </div>

              <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Users className="size-4" />
                  {smallTreehole.members}人
                </span>
                <span className="flex items-center gap-1">
                  {smallTreehole.isAnonymous ? (
                    <Lock className="size-4" />
                  ) : (
                    <Globe className="size-4" />
                  )}
                  {smallTreehole.validUntil}
                </span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-700">{smallTreehole.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {smallTreehole.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* 加入按钮 */}
          {!isJoined && (
            <Button onClick={handleJoin} className="mt-4 w-full" size="lg">
              加入树洞
            </Button>
          )}

          {isJoined && (
            <div className="mt-4 rounded-lg bg-green-50 p-3 text-center">
              <p className="text-sm font-medium text-green-700">✓ 已加入此树洞</p>
            </div>
          )}
        </div>

        {/* 帖子筛选（仅已加入时显示） */}
        {isJoined && (
          <>
            <div className="bg-white px-4 py-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <Filter className="size-4 shrink-0 text-gray-500" />
                <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as FilterTab)} className="flex-1">
                  <TabsList className="inline-flex">
                    <TabsTrigger value="latest" className="text-xs">最新</TabsTrigger>
                    <TabsTrigger value="hot" className="text-xs">最热</TabsTrigger>
                    <TabsTrigger value="question" className="text-xs">提问</TabsTrigger>
                    <TabsTrigger value="partner" className="text-xs">找搭子</TabsTrigger>
                    <TabsTrigger value="confession" className="text-xs">吐槽</TabsTrigger>
                    <TabsTrigger value="experience" className="text-xs">经验</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* 帖子列表 */}
            <div className="mt-3 px-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                树洞动态
                <span className="ml-1 text-sm font-normal text-gray-500">({filteredPosts.length})</span>
              </h3>

              {filteredPosts.length === 0 ? (
                <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                  <div className="text-4xl">💬</div>
                  <p className="mt-2 text-sm text-gray-500">还没有帖子</p>
                  <p className="mt-1 text-xs text-gray-400">发布第一条动态吧</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* 未加入时的预览提示 */}
        {!isJoined && (
          <div className="mt-3 px-4">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 text-center shadow-sm">
              <div className="text-4xl">🔒</div>
              <p className="mt-3 font-medium text-gray-900">加入后可查看完整内容</p>
              <p className="mt-1 text-sm text-gray-600">加入树洞后可以浏览帖子、发帖互动</p>
            </div>
          </div>
        )}

        {/* 温馨提示 */}
        <div className="mt-6 px-4 pb-4">
          <div className="rounded-xl bg-amber-50 p-4">
            <h4 className="font-medium text-amber-900">💡 树洞规则</h4>
            <ul className="mt-2 space-y-1 text-sm text-amber-700">
              <li>• 加入后可以发帖和参与讨论</li>
              {smallTreehole.isAnonymous && <li>• 支持匿名发言，保护隐私</li>}
              <li>• 请尊重他人，文明交流</li>
              <li>• 不得发布违法违规内容</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 底部发帖按钮（仅已加入时显示） */}
      {isJoined && (
        <div className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white p-4">
          <Button
            onClick={() => onCreatePost(smallTreeholeId, smallTreehole.name)}
            className="w-full gap-2"
            size="lg"
          >
            <Edit3 className="size-5" />
            在{smallTreehole.name}发帖
          </Button>
        </div>
      )}
    </div>
  );
}

// 帖子卡片
function PostCard({ post }: { post: (typeof treeholePosts)[0] }) {
  const postTypeOption = postTypeOptions.find((opt) => opt.type === post.postType);

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-purple-50 text-xl">
          {post.author.isAnonymous ? "🎭" : post.author.avatar || "👤"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{post.author.name}</span>
            <span className="text-xs text-gray-400">{post.createdAt}</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            {postTypeOption && (
              <Badge variant="outline" className="text-xs">
                {postTypeOption.icon} {postTypeOption.label}
              </Badge>
            )}
          </div>

          {post.title && (
            <h3 className="mt-2 font-semibold text-gray-900">{post.title}</h3>
          )}

          <p className="mt-1.5 text-sm leading-relaxed text-gray-700">{post.content}</p>

          {post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
            <button className="flex items-center gap-1 hover:text-red-500">
              <Heart className="size-4" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <MessageSquare className="size-4" />
              <span>{post.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
