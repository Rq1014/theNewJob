import { useState } from "react";
import { Settings, MessageCircle, Video, Mic, Heart, Sparkles, Users, MapPin, GraduationCap, Crown, Zap, Check, Edit2, Shield, Clock, TrendingUp } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MatchFilterSheet } from "./MatchFilterSheet";

type MatchPurpose = "chat" | "school-friend" | "city-partner" | "study-partner" | "food-partner" | "emotional" | "dating";
type MatchMethod = "text" | "voice" | "video";

interface MatchHomePageProps {
  onMyMatchClick: () => void;
}

export function MatchHomePage({ onMyMatchClick }: MatchHomePageProps) {
  const [selectedPurposes, setSelectedPurposes] = useState<MatchPurpose[]>(["chat"]);
  const [selectedMethod, setSelectedMethod] = useState<MatchMethod>("text");
  const [sameSchoolFirst, setSameSchoolFirst] = useState(false);
  const [sameCityFirst, setSameCityFirst] = useState(true);
  const [onlyActiveUsers, setOnlyActiveUsers] = useState(true);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // 用户状态模拟（实际应从后端获取）
  const userStatus = {
    isVIP: false,
    voiceMatchesUsedToday: 0, // 0表示未使用，1表示已用完
    videoMatchesUsedToday: 0,
  };

  const matchPurposes = [
    { value: "chat" as MatchPurpose, label: "找聊天", icon: "💬" },
    { value: "school-friend" as MatchPurpose, label: "同校朋友", icon: "🎓" },
    { value: "city-partner" as MatchPurpose, label: "同城搭子", icon: "📍" },
    { value: "study-partner" as MatchPurpose, label: "学习搭子", icon: "📚" },
    { value: "food-partner" as MatchPurpose, label: "饭搭子", icon: "🍜" },
    { value: "emotional" as MatchPurpose, label: "情绪陪伴", icon: "💝" },
    { value: "dating" as MatchPurpose, label: "恋爱交友", icon: "💕" },
  ];

  // 获取当前选中目的的信息
  const currentPurposesInfo = matchPurposes.filter(p => selectedPurposes.includes(p.value));

  // 匹配方式状态判断
  const getMethodStatus = (method: MatchMethod) => {
    if (userStatus.isVIP) {
      return { available: true, label: "VIP无限次", showVIPBadge: true };
    }

    if (method === "text") {
      return { available: true, label: "永久免费", showVIPBadge: false };
    }

    if (method === "voice") {
      const used = userStatus.voiceMatchesUsedToday;
      if (used === 0) {
        return { available: true, label: "今日剩余 1 次", showVIPBadge: false };
      } else {
        return { available: false, label: "今日已用完", showVIPBadge: false, needVIP: true };
      }
    }

    if (method === "video") {
      const used = userStatus.videoMatchesUsedToday;
      if (used === 0) {
        return { available: true, label: "今日剩余 1 次", showVIPBadge: false };
      } else {
        return { available: false, label: "今日已用完", showVIPBadge: false, needVIP: true };
      }
    }

    return { available: true, label: "", showVIPBadge: false };
  };

  // 推荐匹配对象
  const recommendedMatches = [
    {
      id: "1",
      name: "小明同学",
      school: "东京大学",
      avatar: "M",
      purpose: "找学习搭子",
      tags: ["日语N1", "考研", "一起自习"],
      online: true,
      matchScore: 92,
    },
    {
      id: "2",
      name: "阿华",
      school: "早稻田大学",
      avatar: "H",
      purpose: "想练日语",
      tags: ["日语会话", "交流"],
      online: true,
      matchScore: 88,
    },
    {
      id: "3",
      name: "小李",
      location: "东京地区",
      avatar: "L",
      purpose: "周末找人探店",
      tags: ["美食", "摄影"],
      online: false,
      matchScore: 85,
    },
  ];

  return (
    <div className="flex h-full flex-col bg-slate-50">
      {/* 顶部 Hero 区 */}
      <div className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-rose-400 px-4 pt-6 pb-5 shadow-md">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Heart className="size-6 text-white" strokeWidth={2.5} />
              <h1 className="text-2xl font-bold text-white">匹配交友</h1>
            </div>
            <p className="mt-1.5 text-sm text-white/90">发现同校、同城、同频的人</p>
          </div>
          <button
            onClick={onMyMatchClick}
            className="flex items-center gap-1.5 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/30 transition-colors"
          >
            <Settings className="size-4" />
            我的匹配
          </button>
        </div>

        {/* 实时在线与等待氛围 */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1">
              <div className="size-1.5 rounded-full bg-green-400 animate-pulse" />
              <div className="text-lg font-bold text-white">892</div>
            </div>
            <p className="text-[10px] text-white/80 mt-0.5">当前在线</p>
          </div>
          <div className="rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 p-2.5 text-center">
            <div className="text-lg font-bold text-white">2,345</div>
            <p className="text-[10px] text-white/80 mt-0.5">今日匹配</p>
          </div>
          <div className="rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock className="size-3 text-white/90" />
              <div className="text-lg font-bold text-white">8s</div>
            </div>
            <p className="text-[10px] text-white/80 mt-0.5">平均等待</p>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        {/* 匹配条件摘要卡片 */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900">当前匹配条件</h3>
            <button
              onClick={() => setIsFilterSheetOpen(true)}
              className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              <Edit2 className="size-3.5" />
              修改
            </button>
          </div>

          <div className="space-y-2.5">
            {/* 目的摘要 */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center size-9 rounded-lg bg-purple-50">
                <span className="text-xl">{currentPurposesInfo.map(p => p.icon).join(' ')}</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500">匹配目的</p>
                <p className="text-sm font-medium text-slate-900">{currentPurposesInfo.map(p => p.label).join(' / ')}</p>
              </div>
            </div>

            {/* 筛选条件摘要 */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {sameCityFirst && (
                <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700 border border-purple-200">
                  同城优先
                </Badge>
              )}
              {sameSchoolFirst && (
                <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700 border border-purple-200">
                  同校优先
                </Badge>
              )}
              {onlyActiveUsers && (
                <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border border-green-200">
                  仅在线用户
                </Badge>
              )}
              {!sameCityFirst && !sameSchoolFirst && !onlyActiveUsers && (
                <Badge variant="secondary" className="text-xs">
                  无筛选条件
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* 匹配方式选择卡片 */}
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">选择匹配方式</h3>
          <div className="space-y-2.5">
            {/* 文字匹配 */}
            {(() => {
              const status = getMethodStatus("text");
              return (
                <button
                  onClick={() => setSelectedMethod("text")}
                  className={`w-full flex items-center gap-3 rounded-xl p-4 text-left transition-all ${
                    selectedMethod === "text"
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-400 shadow-md"
                      : "bg-white border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200"
                  }`}
                >
                  <div
                    className={`size-12 rounded-xl flex items-center justify-center ${
                      selectedMethod === "text" 
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg" 
                        : "bg-slate-100"
                    }`}
                  >
                    <MessageCircle
                      className={`size-6 ${selectedMethod === "text" ? "text-white" : "text-slate-500"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900">文字匹配</h4>
                      <Badge className="bg-green-100 text-green-700 border-0 text-[10px] px-1.5 py-0">
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">通过文字聊天认识新朋友，轻松自在</p>
                  </div>
                  {selectedMethod === "text" && (
                    <div className="size-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="size-3.5 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })()}

            {/* 语音匹配 */}
            {(() => {
              const status = getMethodStatus("voice");
              return (
                <button
                  onClick={() => status.available && setSelectedMethod("voice")}
                  disabled={!status.available}
                  className={`w-full flex items-center gap-3 rounded-xl p-4 text-left transition-all ${
                    !status.available
                      ? "bg-slate-50 border-2 border-slate-200 opacity-60 cursor-not-allowed"
                      : selectedMethod === "voice"
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-400 shadow-md"
                      : "bg-white border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200"
                  }`}
                >
                  <div
                    className={`size-12 rounded-xl flex items-center justify-center ${
                      !status.available
                        ? "bg-slate-200"
                        : selectedMethod === "voice"
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
                        : "bg-slate-100"
                    }`}
                  >
                    <Mic
                      className={`size-6 ${
                        !status.available
                          ? "text-slate-400"
                          : selectedMethod === "voice"
                          ? "text-white"
                          : "text-slate-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900">语音匹配</h4>
                      {status.showVIPBadge && (
                        <Badge className="bg-amber-100 text-amber-700 border-0 text-[10px] px-1.5 py-0">
                          <Crown className="size-2.5 mr-0.5" />
                          {status.label}
                        </Badge>
                      )}
                      {!status.showVIPBadge && status.available && (
                        <Badge className="bg-blue-100 text-blue-700 border-0 text-[10px] px-1.5 py-0">
                          {status.label}
                        </Badge>
                      )}
                      {!status.available && status.needVIP && (
                        <Badge className="bg-slate-200 text-slate-600 border-0 text-[10px] px-1.5 py-0">
                          {status.label}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {status.needVIP ? "升级VIP解锁无限次" : "听声音感受真实的TA，更有温度"}
                    </p>
                  </div>
                  {selectedMethod === "voice" && status.available && (
                    <div className="size-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="size-3.5 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })()}

            {/* 视频匹配 */}
            {(() => {
              const status = getMethodStatus("video");
              return (
                <button
                  onClick={() => status.available && setSelectedMethod("video")}
                  disabled={!status.available}
                  className={`w-full flex items-center gap-3 rounded-xl p-4 text-left transition-all ${
                    !status.available
                      ? "bg-slate-50 border-2 border-slate-200 opacity-60 cursor-not-allowed"
                      : selectedMethod === "video"
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-400 shadow-md"
                      : "bg-white border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200"
                  }`}
                >
                  <div
                    className={`size-12 rounded-xl flex items-center justify-center ${
                      !status.available
                        ? "bg-slate-200"
                        : selectedMethod === "video"
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg"
                        : "bg-slate-100"
                    }`}
                  >
                    <Video
                      className={`size-6 ${
                        !status.available
                          ? "text-slate-400"
                          : selectedMethod === "video"
                          ? "text-white"
                          : "text-slate-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900">视频匹配</h4>
                      {status.showVIPBadge && (
                        <Badge className="bg-amber-100 text-amber-700 border-0 text-[10px] px-1.5 py-0">
                          <Crown className="size-2.5 mr-0.5" />
                          {status.label}
                        </Badge>
                      )}
                      {!status.showVIPBadge && status.available && (
                        <Badge className="bg-blue-100 text-blue-700 border-0 text-[10px] px-1.5 py-0">
                          {status.label}
                        </Badge>
                      )}
                      {!status.available && status.needVIP && (
                        <Badge className="bg-slate-200 text-slate-600 border-0 text-[10px] px-1.5 py-0">
                          {status.label}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {status.needVIP ? "升级VIP解锁无限次" : "面对面交流更真实，快速破冰"}
                    </p>
                  </div>
                  {selectedMethod === "video" && status.available && (
                    <div className="size-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <Check className="size-3.5 text-white" strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })()}
          </div>
        </div>

        {/* 开始匹配按钮 - 移到视频匹配下方 */}
        <div className="mt-5">
          <Button 
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 hover:from-purple-600 hover:via-pink-600 hover:to-rose-500 text-white font-bold text-base shadow-lg shadow-purple-500/40 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <Zap className="mr-2 size-6 animate-pulse" />
            开始匹配
          </Button>
        </div>

        {/* VIP 权益入口 */}
        {!userStatus.isVIP && (
          <div className="mt-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Crown className="size-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm">升级 VIP 会员</h3>
                <p className="text-xs text-slate-600 mt-1">
                  无限次语音/视频匹配 · 优先推荐 · 专属身份标识
                </p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs px-4 h-8 shadow-sm"
              >
                了解详情
              </Button>
            </div>
          </div>
        )}

        {/* 为你推荐区 */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-900">为你推荐</h2>
            <span className="text-xs text-slate-500">{recommendedMatches.length}位</span>
          </div>
          <div className="space-y-3">
            {recommendedMatches.map((match) => (
              <div
                key={match.id}
                className="rounded-xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="size-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-base font-semibold">
                      {match.avatar}
                    </div>
                    {match.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-green-500 border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-slate-900 text-sm">{match.name}</h3>
                      <Badge className="bg-purple-50 text-purple-700 border border-purple-200 text-[10px] px-2 py-0">
                        {match.matchScore}% 匹配
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      {match.school && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="size-3" />
                          {match.school}
                        </span>
                      )}
                      {match.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          {match.location}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-slate-600">{match.purpose}</p>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {match.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 border-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 安全与信任提示 */}
        <div className="mt-6 mb-4 rounded-xl bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-start gap-2.5">
            <Shield className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900">安全匹配，放心交友</h4>
              <ul className="mt-2 space-y-1 text-xs text-blue-700">
                <li>• 实名认证用户，确保真实身份</li>
                <li>• 智能匹配算法，提高匹配质量</li>
                <li>• 不良内容过滤，保护用户安全</li>
                <li>• 随时举报功能，维护社区环境</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选条件侧边栏 */}
      <MatchFilterSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        selectedPurposes={selectedPurposes}
        onPurposesChange={setSelectedPurposes}
        sameSchoolFirst={sameSchoolFirst}
        onSameSchoolChange={setSameSchoolFirst}
        sameCityFirst={sameCityFirst}
        onSameCityChange={setSameCityFirst}
        onlyActiveUsers={onlyActiveUsers}
        onOnlyActiveChange={setOnlyActiveUsers}
      />
    </div>
  );
}