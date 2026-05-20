import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Search, Sparkles, GraduationCap, MapPin, Bookmark, Shield, TrendingUp, Flame, Star, ArrowLeft } from "lucide-react";
import { bigTreeholes, smallTreeholes, recommendReasonLabels, type SmallTreeholeWithReason } from "../../data/treehole";
import { Badge } from "../ui/badge";
import { Users, Clock, ChevronRight } from "lucide-react";

type MainTab = "recommend" | "school" | "region";

interface TreeholeHomePageProps {
  onBigTreeholeClick: (id: string) => void;
  onSmallTreeholeClick: (id: string) => void;
  onMyTreeholesClick: () => void;
  onBack?: () => void;
}

export function TreeholeHomePage({ onBigTreeholeClick, onSmallTreeholeClick, onMyTreeholesClick, onBack }: TreeholeHomePageProps) {
  const [activeTab, setActiveTab] = useState<MainTab>("recommend");
  const [searchQuery, setSearchQuery] = useState("");

  const schoolTreeholes = bigTreeholes.filter((t) => t.type === "school");
  const regionTreeholes = bigTreeholes.filter((t) => t.type === "region");

  // 平台推荐小树洞
  const platformRecommendedTreeholes: SmallTreeholeWithReason[] = [
    { ...smallTreeholes[1], recommendReason: "school-hot" },
    { ...smallTreeholes[4], recommendReason: "school-hot" },
  ];

  // 最近活跃小树洞
  const recentlyActiveTreeholes: SmallTreeholeWithReason[] = [
    { ...smallTreeholes[0], recommendReason: "region-hot" },
    { ...smallTreeholes[3], recommendReason: "recently-active" },
  ];

  // 用户创建小树洞（示例数据，实际应标记创建者）
  const userCreatedTreeholes = [
    smallTreeholes[2],
    smallTreeholes[5],
  ];

  return (
    <div className="flex h-full flex-col bg-slate-50">
      {/* 顶部标题区 */}
      <div className="bg-white px-4 pb-3 pt-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">树洞</h1>
              <p className="mt-1 text-sm text-slate-500">匿名分享，真实交流</p>
            </div>
          </div>
          <button
            onClick={onMyTreeholesClick}
            className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <Bookmark className="size-4" />
            我的树洞
          </button>
        </div>

        {/* 搜索框 */}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="搜索学校、地区、树洞名称"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-50 border-slate-200"
          />
        </div>

        {/* Tab */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as MainTab)}
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommend" className="text-xs">
              <Sparkles className="mr-1 size-3.5" />
              推荐
            </TabsTrigger>
            <TabsTrigger value="school" className="text-xs">
              <GraduationCap className="mr-1 size-3.5" />
              学校树洞
            </TabsTrigger>
            <TabsTrigger value="region" className="text-xs">
              <MapPin className="mr-1 size-3.5" />
              地区树洞
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* 推荐 Tab */}
        {activeTab === "recommend" && (
          <div className="space-y-6 pt-4">
            {/* 第一层：热门树洞广场 */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Flame className="size-4 text-orange-600" />
                <h2 className="text-sm font-semibold text-slate-900">热门树洞广场</h2>
                <Badge className="bg-orange-50 text-orange-700 border-0 text-[10px] px-1.5 py-0">
                  高活跃度
                </Badge>
              </div>
              <div className="space-y-3">
                {schoolTreeholes.slice(0, 2).map((treehole) => (
                  <MainTreeholeCard
                    key={treehole.id}
                    treehole={treehole}
                    onClick={() => onBigTreeholeClick(treehole.id)}
                  />
                ))}
                {regionTreeholes.slice(0, 1).map((treehole) => (
                  <MainTreeholeCard
                    key={treehole.id}
                    treehole={treehole}
                    onClick={() => onBigTreeholeClick(treehole.id)}
                  />
                ))}
              </div>
            </div>

            {/* 第二层：平台推荐小树洞 */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Star className="size-4 text-amber-600" />
                <h2 className="text-sm font-semibold text-slate-900">平台精选小树洞</h2>
                <Badge className="bg-amber-50 text-amber-600 border-0 text-[10px] px-1.5 py-0">
                  编辑推荐
                </Badge>
              </div>
              <div className="space-y-2.5">
                {platformRecommendedTreeholes.map((treehole) => (
                  <RecommendedTreeholeCard
                    key={treehole.id}
                    treehole={treehole}
                    onClick={() => onSmallTreeholeClick(treehole.id)}
                  />
                ))}
              </div>
            </div>

            {/* 第三层：用户创建小树洞 */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Users className="size-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-slate-900">用户创建小树洞</h2>
                <Badge className="bg-purple-50 text-purple-600 border-0 text-[10px] px-1.5 py-0">
                  兴趣圈子
                </Badge>
              </div>
              <div className="space-y-2.5">
                {userCreatedTreeholes.map((treehole) => (
                  <UserCreatedTreeholeCard
                    key={treehole.id}
                    treehole={treehole}
                    onClick={() => onSmallTreeholeClick(treehole.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 学校树洞 Tab */}
        {activeTab === "school" && (
          <div className="space-y-3 pt-4">
            {schoolTreeholes.map((treehole) => (
              <MainTreeholeCard
                key={treehole.id}
                treehole={treehole}
                onClick={() => onBigTreeholeClick(treehole.id)}
              />
            ))}
          </div>
        )}

        {/* 地区树洞 Tab */}
        {activeTab === "region" && (
          <div className="space-y-3 pt-4">
            {regionTreeholes.map((treehole) => (
              <MainTreeholeCard
                key={treehole.id}
                treehole={treehole}
                onClick={() => onBigTreeholeClick(treehole.id)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

// 第一层：主树洞卡片（最大、最完整、社区感）
function MainTreeholeCard({
  treehole,
  onClick,
}: {
  treehole: (typeof bigTreeholes)[0];
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl bg-white p-5 shadow-md border-2 border-slate-100 transition-all hover:shadow-lg hover:border-purple-200"
    >
      <div className="flex items-start gap-4">
        {/* 树洞图标 - 更大 */}
        <div className={`flex size-16 shrink-0 items-center justify-center rounded-2xl ${treehole.iconBgColor} text-3xl shadow-md`}>
          {treehole.icon}
        </div>

        <div className="min-w-0 flex-1">
          {/* 标题行 */}
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900">{treehole.name}</h3>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs px-2 py-0.5 font-medium">
              {treehole.type === "school" ? "校园树洞" : "城市树洞"}
            </Badge>
          </div>
          
          {/* 简介 - 增大字号 */}
          <p className="mt-2 text-base text-slate-700 leading-relaxed">{treehole.description}</p>
          
          {/* 活跃数据 - 增大字号和图标 */}
          <div className="mt-3.5 flex items-center gap-2 text-base text-slate-700">
            <Users className="size-4.5 text-blue-600" />
            <span className="font-semibold text-blue-600">{treehole.activeUsers}</span>
            <span className="text-slate-600">人活跃</span>
          </div>
          
          {/* 热门标签 - 增大字号 */}
          <div className="mt-3.5 flex flex-wrap gap-2">
            {treehole.hotTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm bg-slate-100 text-slate-700 border-0 px-2.5 py-1 font-medium">
                # {tag}
              </Badge>
            ))}
          </div>

          {/* 今日热聊 - 增大字号 */}
          {treehole.todayHotTopic && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 px-3.5 py-2.5">
              <Flame className="size-4.5 text-orange-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold text-orange-600">今日热聊</span>
                <p className="truncate text-sm text-orange-800 mt-0.5 leading-snug">{treehole.todayHotTopic}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* 进入箭头 */}
        <ChevronRight className="mt-2 size-6 shrink-0 text-slate-400" />
      </div>
    </div>
  );
}

// 第二层：平台推荐小树洞卡片（中等、精致、推荐感）
function RecommendedTreeholeCard({
  treehole,
  onClick
}: {
  treehole: SmallTreeholeWithReason;
  onClick: () => void;
}) {
  const belongToBigTreehole = bigTreeholes.find((bt) => bt.id === treehole.belongTo);

  // 推荐理由样式映射
  const recommendStyleMap = {
    "school-hot": { 
      bg: "bg-blue-50", 
      text: "text-blue-700", 
      border: "border-blue-200",
      icon: TrendingUp 
    },
    "region-hot": { 
      bg: "bg-green-50", 
      text: "text-green-700", 
      border: "border-green-200",
      icon: TrendingUp 
    },
    "might-interest": { 
      bg: "bg-purple-50", 
      text: "text-purple-700", 
      border: "border-purple-200",
      icon: Sparkles 
    },
    "recently-active": { 
      bg: "bg-orange-50", 
      text: "text-orange-700", 
      border: "border-orange-200",
      icon: Flame 
    },
    "newly-created": { 
      bg: "bg-pink-50", 
      text: "text-pink-700", 
      border: "border-pink-200",
      icon: Star 
    },
  };

  const recommendStyle = treehole.recommendReason 
    ? recommendStyleMap[treehole.recommendReason]
    : recommendStyleMap["might-interest"];
  const RecommendIcon = recommendStyle.icon;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl bg-white p-4 border ${recommendStyle.border} shadow-sm transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* 推荐理由标签 - 增大字号 */}
          {treehole.recommendReason && (
            <div className={`inline-flex items-center gap-1 ${recommendStyle.bg} ${recommendStyle.text} rounded-full px-2.5 py-1 text-xs font-semibold mb-2.5`}>
              <RecommendIcon className="size-3.5" />
              {recommendReasonLabels[treehole.recommendReason]}
            </div>
          )}
          
          {/* 标题行 - 增大字号 */}
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">{treehole.name}</h3>
            <Badge variant="outline" className="text-xs border-slate-300 text-slate-600 px-2 py-0.5 font-medium">
              {treehole.mode === "confession" ? "倾诉" : "搭子"}
            </Badge>
          </div>

          {/* 所属主树洞 - 增大字号 */}
          {belongToBigTreehole && (
            <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <span className="text-slate-400">来自</span>
              <span className={`flex size-5 items-center justify-center rounded ${belongToBigTreehole.iconBgColor} text-xs`}>
                {belongToBigTreehole.icon}
              </span>
              <span className="font-semibold text-slate-700">{belongToBigTreehole.name}</span>
            </div>
          )}

          {/* 简介 - 增大字号 */}
          <p className="mt-2.5 text-sm text-slate-700 line-clamp-2 leading-relaxed">{treehole.description}</p>

          {/* 数据 - 增大字号和图标 */}
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-blue-600" />
              <span className="font-semibold text-slate-800">{treehole.members}</span>
              <span className="text-slate-600">人</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Clock className="size-4" />
              <span className="font-medium">{treehole.validUntil}</span>
            </span>
          </div>

          {/* 标签 - 增大字号 */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {treehole.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-700 border-0 px-2 py-0.5 font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <ChevronRight className="size-5 shrink-0 text-slate-300 mt-1" />
      </div>
    </div>
  );
}

// 第三层：用户创建小树洞卡片（轻量、兴趣圈子感）
function UserCreatedTreeholeCard({
  treehole,
  onClick
}: {
  treehole: (typeof smallTreeholes)[0];
  onClick: () => void;
}) {
  const belongToBigTreehole = bigTreeholes.find((bt) => bt.id === treehole.belongTo);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-lg bg-white p-4 border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-purple-200"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          {/* 标题行 - 增大字号 */}
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">{treehole.name}</h3>
            <Badge className="bg-purple-50 text-purple-600 border-0 text-xs px-2 py-0.5 font-medium">
              用户创建
            </Badge>
            <Badge variant="outline" className="text-xs border-slate-300 text-slate-600 px-2 py-0.5 font-medium">
              {treehole.mode === "confession" ? "倾诉" : "搭子"}
            </Badge>
          </div>

          {/* 所属主树洞 - 增大字号 */}
          {belongToBigTreehole && (
            <div className="mt-2 flex items-center gap-1.5 text-sm">
              <span className="text-slate-400">来自</span>
              <span className={`flex size-5 items-center justify-center rounded ${belongToBigTreehole.iconBgColor} text-xs`}>
                {belongToBigTreehole.icon}
              </span>
              <span className="font-semibold text-slate-700">{belongToBigTreehole.name}</span>
            </div>
          )}

          {/* 简介 - 增大字号 */}
          <p className="mt-2.5 text-sm text-slate-700 line-clamp-2 leading-relaxed">{treehole.description}</p>

          {/* 数据 - 增大字号和图标 */}
          <div className="mt-3 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Users className="size-4 text-purple-600" />
              <span className="font-semibold text-slate-800">{treehole.members}</span>
              <span className="text-slate-600">人</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Clock className="size-4" />
              <span className="font-medium">{treehole.validUntil}</span>
            </span>
          </div>

          {/* 标签 - 增大字号 */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {treehole.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-700 border-0 px-2 py-0.5 font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        <ChevronRight className="size-5 shrink-0 text-slate-300 mt-1" />
      </div>
    </div>
  );
}