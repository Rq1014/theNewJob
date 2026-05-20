import { useState } from "react";
import { motion } from "motion/react";
import {
  Users,
  Clock,
  Lock,
  Unlock,
  MessageCircle,
  Heart,
  Flame,
  Crown,
  MapPin,
  GraduationCap,
  Hash,
  TrendingUp,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  bigTreeholes,
  smallTreeholes,
  matchOptions,
  TreeholeType,
  SmallTreeholeMode,
  MatchType,
} from "../data/treehole";

type MainTab = "recommend" | "school" | "region" | "match";

export function TreeholeTab() {
  const [activeTab, setActiveTab] = useState<MainTab>("recommend");

  // 筛选学校树洞和地区树洞
  const schoolTreeholes = bigTreeholes.filter((t) => t.type === "school");
  const regionTreeholes = bigTreeholes.filter((t) => t.type === "region");

  // 获取推荐内容（混合展示）
  const recommendedBigTreeholes = bigTreeholes.slice(0, 4);
  const recommendedSmallTreeholes = smallTreeholes.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 pb-[84px]">
      {/* 顶部标题区 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="p-4 pb-3">
          <h1 className="font-bold text-slate-900 mb-1">树洞</h1>
          <p className="text-sm text-slate-600 mb-3">发现同校、同城、同兴趣的人</p>

          {/* Tab 切换 */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as MainTab)} className="w-full">
            <TabsList className="w-full bg-slate-50 p-1">
              <TabsTrigger value="recommend" className="flex-1">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                推荐
              </TabsTrigger>
              <TabsTrigger value="school" className="flex-1">
                <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                学校树洞
              </TabsTrigger>
              <TabsTrigger value="region" className="flex-1">
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                地区树洞
              </TabsTrigger>
              <TabsTrigger value="match" className="flex-1">
                <Heart className="w-3.5 h-3.5 mr-1.5" />
                匹配
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="pb-6">
        {/* 推荐 Tab */}
        {activeTab === "recommend" && (
          <div className="space-y-4 p-4">
            {/* 热门大树洞 */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                热门树洞
              </h3>
              <div className="space-y-3">
                {recommendedBigTreeholes.map((treehole, index) => (
                  <BigTreeholeCard key={treehole.id} treehole={treehole} index={index} />
                ))}
              </div>
            </div>

            {/* 小树洞推荐 */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                推荐小树洞
              </h3>
              <div className="space-y-3">
                {recommendedSmallTreeholes.map((treehole, index) => (
                  <SmallTreeholeCard key={treehole.id} treehole={treehole} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 学校树洞 Tab */}
        {activeTab === "school" && (
          <div className="space-y-4 p-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">学校大树洞</h3>
              <div className="space-y-3">
                {schoolTreeholes.map((treehole, index) => (
                  <BigTreeholeCard key={treehole.id} treehole={treehole} index={index} />
                ))}
              </div>
            </div>

            {/* 活跃度兜底 - 展示小树洞 */}
            <div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 mb-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900">
                    <p className="font-semibold mb-1">推荐同地区热门小树洞</p>
                    <p className="text-xs opacity-90">
                      以下内容来自同地区其他学校或地区树洞，帮你发现更多有趣的人
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {smallTreeholes.slice(0, 4).map((treehole, index) => (
                  <SmallTreeholeCard
                    key={treehole.id}
                    treehole={treehole}
                    index={index}
                    showBelongTo={true}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 地区树洞 Tab */}
        {activeTab === "region" && (
          <div className="space-y-4 p-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">地区大树洞</h3>
              <div className="space-y-3">
                {regionTreeholes.map((treehole, index) => (
                  <BigTreeholeCard key={treehole.id} treehole={treehole} index={index} />
                ))}
              </div>
            </div>

            {/* 地区内的小树洞 */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">热门小树洞</h3>
              <div className="space-y-3">
                {smallTreeholes
                  .filter((t) => regionTreeholes.some((rt) => rt.id === t.belongTo))
                  .map((treehole, index) => (
                    <SmallTreeholeCard
                      key={treehole.id}
                      treehole={treehole}
                      index={index}
                      showBelongTo={true}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* 匹配 Tab */}
        {activeTab === "match" && (
          <div className="p-4 space-y-4">
            {/* 匹配说明 */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Heart className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">随机匹配聊天</h3>
                  <p className="text-sm text-slate-600">
                    与同校或同城的陌生人开启一段有趣的对话
                  </p>
                </div>
              </div>
            </div>

            {/* 匹配选项 */}
            <div className="space-y-3">
              {matchOptions.map((option, index) => (
                <MatchCard key={option.id} option={option} index={index} />
              ))}
            </div>

            {/* VIP 提示 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-start gap-3">
                <Crown className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1 text-sm">VIP 专属权益</h4>
                  <ul className="space-y-1 text-xs text-slate-700">
                    <li>• 解锁视频匹配功能</li>
                    <li>• 优先匹配活跃用户</li>
                    <li>• 查看对方学校/地区信息</li>
                    <li>• 无限次匹配机会</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 大树洞卡片组件
function BigTreeholeCard({
  treehole,
  index,
}: {
  treehole: any;
  index: number;
}) {
  const isSchool = treehole.type === "school";

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all text-left"
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
            isSchool
              ? "bg-gradient-to-br from-blue-500 to-indigo-500"
              : "bg-gradient-to-br from-green-500 to-teal-500"
          }`}
        >
          {isSchool ? (
            <GraduationCap className="w-6 h-6 text-white" />
          ) : (
            <MapPin className="w-6 h-6 text-white" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 mb-1">{treehole.name}</h3>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Users className="w-3.5 h-3.5" />
            <span>{treehole.activeUsers}人活跃</span>
          </div>
        </div>
      </div>

      {/* 热门标签 */}
      <div className="flex flex-wrap gap-1.5">
        {treehole.hotTags.map((tag: string) => (
          <Badge
            key={tag}
            variant="secondary"
            className={`text-xs ${
              isSchool ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
            }`}
          >
            <Hash className="w-3 h-3 mr-0.5" />
            {tag}
          </Badge>
        ))}
      </div>
    </motion.button>
  );
}

// 小树洞卡片组件
function SmallTreeholeCard({
  treehole,
  index,
  showBelongTo = false,
}: {
  treehole: any;
  index: number;
  showBelongTo?: boolean;
}) {
  const isConfession = treehole.mode === "confession";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md ${
        isConfession
          ? "border-purple-200 bg-gradient-to-br from-purple-50/30 to-white"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-slate-900">{treehole.name}</h4>
            {treehole.isAnonymous && (
              <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                <Lock className="w-3 h-3 mr-1" />
                匿名
              </Badge>
            )}
            {!treehole.isAnonymous && (
              <Badge variant="outline" className="text-xs">
                <Unlock className="w-3 h-3 mr-1" />
                实名
              </Badge>
            )}
          </div>

          {showBelongTo && (
            <div className="text-xs text-slate-500 mb-2 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              来自 {treehole.belongToName}
            </div>
          )}

          <p className="text-sm text-slate-600 mb-2">{treehole.description}</p>

          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {treehole.members}人
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {treehole.validUntil}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {treehole.tags.map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className={`text-xs ${
                  isConfession
                    ? "bg-purple-100 text-purple-700"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Button size="sm" className="w-full">
        加入树洞
      </Button>
    </motion.div>
  );
}

// 匹配卡片组件
function MatchCard({ option, index }: { option: any; index: number }) {
  const isVip = option.isVip;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`w-full bg-white rounded-xl p-4 shadow-sm border transition-all hover:shadow-md text-left ${
        isVip
          ? "border-yellow-200 bg-gradient-to-br from-yellow-50/30 to-white"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-md ${
            isVip
              ? "bg-gradient-to-br from-yellow-400 to-orange-500"
              : "bg-gradient-to-br from-blue-500 to-purple-500"
          }`}
        >
          {option.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-slate-900">{option.title}</h4>
            {isVip && (
              <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">
                <Crown className="w-3 h-3 mr-1" />
                VIP
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-600 mb-2">{option.description}</p>
          <div className="flex items-center gap-1 text-xs text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>{option.onlineCount}人在线</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
