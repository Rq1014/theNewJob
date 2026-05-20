import { useState } from "react";
import { Settings, TrendingUp, Shield, MessageCircle, Video, Mic, ArrowLeft } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { matchOptions } from "../../data/treehole";

type MatchPurpose = "chat" | "school-friend" | "city-partner" | "study-partner" | "food-partner" | "emotional" | "dating";
type Gender = "all" | "male" | "female";
type City = "all" | "tokyo" | "osaka" | "kyoto" | "other";

interface MatchPageProps {
  onBack: () => void;
  onMyMatchClick: () => void;
}

export function MatchPage({ onBack, onMyMatchClick }: MatchPageProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<MatchPurpose>("chat");
  const [sameSchoolFirst, setSameSchoolFirst] = useState(false);
  const [sameCityFirst, setSameCityFirst] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // 匹配条件状态
  const [selectedCity, setSelectedCity] = useState<City>("all");
  const [selectedGender, setSelectedGender] = useState<Gender>("all");
  const [onlyActiveUsers, setOnlyActiveUsers] = useState(true);

  const matchPurposes = [
    { value: "chat" as MatchPurpose, label: "找聊天", icon: "💬" },
    { value: "school-friend" as MatchPurpose, label: "同校朋友", icon: "🎓" },
    { value: "city-partner" as MatchPurpose, label: "同城搭子", icon: "📍" },
    { value: "study-partner" as MatchPurpose, label: "学习搭子", icon: "📚" },
    { value: "food-partner" as MatchPurpose, label: "饭搭子", icon: "🍜" },
    { value: "emotional" as MatchPurpose, label: "情绪陪伴", icon: "💝" },
    { value: "dating" as MatchPurpose, label: "恋爱交友", icon: "💕" },
  ];

  // 推荐匹配对象预览
  const recommendedMatches = [
    { id: "1", school: "东京大学", purpose: "找学习搭子", tags: ["日语N1", "考研"] },
    { id: "2", school: "早稻田大学", purpose: "想练日语", tags: ["日语会话", "交流"] },
    { id: "3", location: "东京地区", purpose: "周末找人探店", tags: ["美食", "摄影"] },
  ];

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部标题栏 */}
      <div className="bg-white px-4 pb-3 pt-4">
        <div className="flex items-start gap-3">
          <button onClick={onBack} className="mt-0.5 rounded-lg p-1 hover:bg-gray-100">
            <ArrowLeft className="size-5 text-gray-700" />
          </button>
          <div className="flex flex-1 items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">匹配交友</h1>
              <p className="mt-1 text-sm text-gray-500">发现同校、同城、志同道合的人</p>
            </div>
            <button
              onClick={onMyMatchClick}
              className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
            >
              <Settings className="size-4" />
              我的匹配
            </button>
          </div>
        </div>

        {/* 今日匹配数据 */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-3 text-center">
            <div className="text-lg font-bold text-blue-600">2,345</div>
            <p className="mt-0.5 text-xs text-blue-700">今日匹配</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-3 text-center">
            <div className="text-lg font-bold text-purple-600">892</div>
            <p className="mt-0.5 text-xs text-purple-700">当前在线</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 p-3 text-center">
            <div className="text-lg font-bold text-green-600">8s</div>
            <p className="mt-0.5 text-xs text-green-700">平均等待</p>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {/* 匹配目的选择 */}
        <div className="mt-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">匹配目的</h2>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {matchPurposes.map((purpose) => (
              <button
                key={purpose.value}
                onClick={() => setSelectedPurpose(purpose.value)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedPurpose === purpose.value
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{purpose.icon}</span>
                <span>{purpose.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 快捷筛选 */}
        <div className="mt-5">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">快捷筛选</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSameSchoolFirst(!sameSchoolFirst)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                sameSchoolFirst
                  ? "bg-purple-100 text-purple-700"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>🎓</span>
              <span>同校优先</span>
            </button>
            <button
              onClick={() => setSameCityFirst(!sameCityFirst)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                sameCityFirst
                  ? "bg-green-100 text-green-700"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>📍</span>
              <span>同城优先</span>
            </button>
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <Settings className="size-4" />
              <span>更多筛选</span>
            </button>
          </div>
        </div>

        {/* 推荐匹配对象预览 */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">可能匹配到的人</h2>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <span className="size-2 animate-pulse rounded-full bg-green-500"></span>
              <span>实时更新</span>
            </div>
          </div>
          <div className="space-y-2.5">
            {recommendedMatches.map((match) => (
              <div
                key={match.id}
                className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-xl">
                    {match.school ? "🎓" : "📍"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {match.school || match.location}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {match.purpose}
                      </Badge>
                    </div>
                    <div className="mt-1 flex gap-1.5">
                      {match.tags.map((tag) => (
                        <span key={tag} className="text-xs text-gray-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <MessageCircle className="size-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 热门话题 */}
        <div className="mt-5 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-orange-600" />
            <h3 className="text-sm font-semibold text-orange-900">今日热门话题</h3>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge className="bg-white text-orange-700 hover:bg-white">日语学习</Badge>
            <Badge className="bg-white text-orange-700 hover:bg-white">找饭搭子</Badge>
            <Badge className="bg-white text-orange-700 hover:bg-white">修士申请</Badge>
            <Badge className="bg-white text-orange-700 hover:bg-white">周末出游</Badge>
          </div>
        </div>

        {/* 匹配方式选择 */}
        <div className="mt-5">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">选择匹配方式</h2>

          {/* 文字匹配 */}
          <div className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 text-3xl">
                    💬
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">文字匹配</h3>
                    <p className="mt-0.5 text-xs text-gray-600">轻松破冰，先聊再决定</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="size-2 rounded-full bg-green-500"></span>
                        234人在线
                      </span>
                      <span>平均8秒匹配</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="mt-3 w-full" size="lg">
                开始文字匹配
              </Button>
            </div>
            <div className="border-t border-gray-100 bg-blue-50 px-4 py-2 text-xs text-blue-700">
              💡 支持发送图片、表情，系统推荐共同话题破冰
            </div>
          </div>

          {/* 语音匹配 */}
          <div className="mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-50 to-pink-50 text-3xl">
                    🎙️
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">语音匹配</h3>
                    <p className="mt-0.5 text-xs text-gray-600">更真实高效，快速熟悉</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="size-2 rounded-full bg-green-500"></span>
                        89人在线
                      </span>
                      <span>平均15秒接通</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button className="mt-3 w-full" size="lg">
                开始语音匹配
              </Button>
            </div>
            <div className="border-t border-gray-100 bg-purple-50 px-4 py-2 text-xs text-purple-700">
              💡 练习日语口语、深夜电台、真实声音更有温度
            </div>
          </div>

          {/* 视频匹配 - VIP */}
          <div className="relative mb-3 overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="absolute right-3 top-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">VIP专享</Badge>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-50 to-red-50 text-3xl">
                    📹
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">视频匹配</h3>
                    <p className="mt-0.5 text-xs text-gray-600">面对面交流，同城深度了解</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="size-2 rounded-full bg-green-500"></span>
                        45人在线
                      </span>
                      <span>平均20秒接通</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className="mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="lg"
              >
                升级VIP解锁
              </Button>
            </div>
            <div className="border-t border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 text-xs text-purple-700">
              💎 VIP用户可筛选同城/同校对象，适合深度交友
            </div>
          </div>
        </div>

        {/* VIP权益 */}
        <div className="mt-5 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">💎</span>
            <h3 className="font-semibold text-purple-900">VIP专属权益</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm text-purple-700">
            <li className="flex items-center gap-2">
              <Video className="size-4" />
              <span>视频匹配无限次使用</span>
            </li>
            <li className="flex items-center gap-2">
              <TrendingUp className="size-4" />
              <span>优先匹配高活跃度用户</span>
            </li>
            <li className="flex items-center gap-2">
              <Settings className="size-4" />
              <span>自定义匹配条件（学校、城市、兴趣）</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="size-4" />
              <span>筛选同城/同校对象，精准匹配</span>
            </li>
          </ul>
          <Button
            className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            size="lg"
          >
            立即开通VIP
          </Button>
        </div>

        {/* 安全提示 */}
        <div className="mt-5 rounded-xl bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-green-600" />
            <h3 className="text-sm font-semibold text-green-900">安全保障</h3>
          </div>
          <ul className="mt-2 space-y-1 text-xs text-green-700">
            <li>• 系统智能推荐共同话题，帮助破冰</li>
            <li>• 匹配成功后可使用破冰问题开始聊天</li>
            <li>• 支持随时结束匹配，保护隐私</li>
            <li>• 视频匹配默认不展示真实姓名</li>
            <li>• 支持举报与拉黑，维护社区环境</li>
          </ul>
        </div>

        {/* 底部留白 */}
        <div className="h-4"></div>
      </div>
    </div>
  );
}
