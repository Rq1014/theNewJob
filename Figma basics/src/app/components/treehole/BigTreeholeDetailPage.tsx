import { useState } from "react";
import { ArrowLeft, Users, Plus, Lock, Globe, MessageSquare, Heart, Edit3, Filter } from "lucide-react";
import { bigTreeholes, smallTreeholes, postTypeOptions, type PostType } from "../../data/treehole";
import { treeholePosts } from "../../data/treehole-posts";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface BigTreeholeDetailPageProps {
  bigTreeholeId: string;
  onBack: () => void;
  onCreateSmallTreehole: (bigTreeholeId: string) => void;
  onSmallTreeholeClick: (id: string) => void;
  onCreatePost: (treeholeId: string, treeholeName: string) => void;
}

type FilterTab = "latest" | "hot" | "question" | "partner" | "confession" | "experience";

export function BigTreeholeDetailPage({
  bigTreeholeId,
  onBack,
  onCreateSmallTreehole,
  onSmallTreeholeClick,
  onCreatePost,
}: BigTreeholeDetailPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("latest");

  const bigTreehole = bigTreeholes.find((t) => t.id === bigTreeholeId);
  const relatedSmallTreeholes = smallTreeholes.filter((t) => t.belongTo === bigTreeholeId);
  const posts = treeholePosts.filter((p) => p.treeholeId === bigTreeholeId);

  if (!bigTreehole) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">树洞不存在</p>
      </div>
    );
  }

  const isSchool = bigTreehole.type === "school";

  // 根据筛选条件过滤帖子
  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "latest" || activeFilter === "hot") return true;
    return post.postType === activeFilter;
  });

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">{bigTreehole.name}</h1>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 树洞信息卡片 */}
        <div className="bg-white p-4">
          <div className="flex items-start gap-4">
            <div
              className={`flex size-16 shrink-0 items-center justify-center rounded-2xl ${bigTreehole.iconBgColor} text-4xl shadow-sm`}
            >
              {bigTreehole.icon}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{bigTreehole.name}</h2>
              <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                <Users className="size-4" />
                <span>{bigTreehole.activeUsers}人活跃</span>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-gray-700">{bigTreehole.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {bigTreehole.hotTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                # {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* 帖子筛选 */}
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
            社区动态
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

        {/* 二级树洞列表 */}
        <div className="mt-6 px-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              {isSchool ? "校内小树洞" : "地区小树洞"}
              <span className="ml-1 text-sm font-normal text-gray-500">
                ({relatedSmallTreeholes.length})
              </span>
            </h3>
            <Button
              size="sm"
              onClick={() => onCreateSmallTreehole(bigTreeholeId)}
              className="gap-1"
            >
              <Plus className="size-4" />
              创建树洞
            </Button>
          </div>

          {relatedSmallTreeholes.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl">🌱</div>
              <p className="mt-2 text-sm text-gray-500">还没有小树洞</p>
              <p className="mt-1 text-xs text-gray-400">创建第一个，邀请大家加入吧</p>
            </div>
          ) : (
            <div className="space-y-3">
              {relatedSmallTreeholes.map((treehole) => (
                <SmallTreeholeCard
                  key={treehole.id}
                  treehole={treehole}
                  onClick={() => onSmallTreeholeClick(treehole.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* 温馨提示 */}
        <div className="mt-6 px-4 pb-4">
          <div className="rounded-xl bg-blue-50 p-4">
            <h4 className="font-medium text-blue-900">💡 温馨提示</h4>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>• 在大树洞可以直接发帖交流</li>
              <li>• 小树洞是基于兴趣、话题的更细分社区</li>
              <li>• {isSchool ? "只有本校同学可以创建和加入" : "同城留学生都可以创建和加入"}</li>
              <li>• 请文明发言，友善交流</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 底部发帖按钮 */}
      <div className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white p-4">
        <Button
          onClick={() => onCreatePost(bigTreeholeId, bigTreehole.name)}
          className="w-full gap-2"
          size="lg"
        >
          <Edit3 className="size-5" />
          在{bigTreehole.name}发帖
        </Button>
      </div>
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

// 小树洞卡片
function SmallTreeholeCard({
  treehole,
  onClick,
}: {
  treehole: (typeof smallTreeholes)[0];
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="cursor-pointer rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{treehole.name}</h3>
            <Badge variant="outline" className="text-xs">
              {treehole.mode === "confession" ? "倾诉" : "搭子"}
            </Badge>
            {treehole.isAnonymous && (
              <Badge variant="secondary" className="text-xs">
                匿名
              </Badge>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">{treehole.description}</p>

          <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users className="size-3" />
              {treehole.members}人
            </span>
            <span className="flex items-center gap-1">
              {treehole.isAnonymous ? (
                <Lock className="size-3" />
              ) : (
                <Globe className="size-3" />
              )}
              {treehole.validUntil}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {treehole.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
