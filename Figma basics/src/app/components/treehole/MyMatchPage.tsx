import { ArrowLeft, Clock, MessageCircle, Video, Mic, Settings } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface MyMatchPageProps {
  onBack: () => void;
}

export function MyMatchPage({ onBack }: MyMatchPageProps) {
  // 模拟匹配历史数据
  const matchHistory = [
    {
      id: "1",
      type: "text" as const,
      matchTime: "2小时前",
      school: "东京大学",
      purpose: "找学习搭子",
      duration: "15分钟",
      status: "已结束",
    },
    {
      id: "2",
      type: "voice" as const,
      matchTime: "昨天",
      location: "东京地区",
      purpose: "找聊天",
      duration: "8分钟",
      status: "已结束",
    },
    {
      id: "3",
      type: "text" as const,
      matchTime: "3天前",
      school: "早稻田大学",
      purpose: "饭搭子",
      duration: "22分钟",
      status: "已加好友",
    },
  ];

  // 匹配偏好设置
  const preferences = {
    city: "东京",
    gender: "不限",
    interests: ["日语学习", "美食", "旅游"],
    sameSchoolFirst: true,
    sameCityFirst: true,
    onlyActiveUsers: true,
  };

  const getMatchIcon = (type: "text" | "voice" | "video") => {
    switch (type) {
      case "text":
        return <MessageCircle className="size-4 text-blue-500" />;
      case "voice":
        return <Mic className="size-4 text-purple-500" />;
      case "video":
        return <Video className="size-4 text-pink-500" />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">我的匹配</h1>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">{/* 改为pb-24以适配底部导航 */}
        {/* 统计卡片 */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">23</div>
            <p className="mt-1 text-xs text-blue-700">总匹配次数</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <p className="mt-1 text-xs text-purple-700">成功加好友</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">12分</div>
            <p className="mt-1 text-xs text-green-700">平均时长</p>
          </div>
        </div>

        {/* 当前匹配偏好 */}
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">我的偏好</h2>
            <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700">
              <Settings className="size-3.5" />
              <span>编辑</span>
            </button>
          </div>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">偏好城市</span>
                <span className="text-sm font-medium text-gray-900">{preferences.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">偏好性别</span>
                <span className="text-sm font-medium text-gray-900">{preferences.gender}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-600">兴趣标签</span>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {preferences.interests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">同校优先</span>
                <span className={`text-sm font-medium ${preferences.sameSchoolFirst ? "text-purple-600" : "text-gray-400"}`}>
                  {preferences.sameSchoolFirst ? "已开启" : "未开启"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">同城优先</span>
                <span className={`text-sm font-medium ${preferences.sameCityFirst ? "text-green-600" : "text-gray-400"}`}>
                  {preferences.sameCityFirst ? "已开启" : "未开启"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">只看活跃用户</span>
                <span className={`text-sm font-medium ${preferences.onlyActiveUsers ? "text-blue-600" : "text-gray-400"}`}>
                  {preferences.onlyActiveUsers ? "已开启" : "未开启"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 匹配历史 */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            匹配历史
            <span className="ml-1 text-sm font-normal text-gray-500">({matchHistory.length})</span>
          </h2>

          {matchHistory.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl">💬</div>
              <p className="mt-2 text-sm text-gray-500">还没有匹配记录</p>
              <p className="mt-1 text-xs text-gray-400">开始你的第一次匹配吧</p>
            </div>
          ) : (
            <div className="space-y-3">
              {matchHistory.map((match) => (
                <div key={match.id} className="rounded-xl bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-purple-50">
                        {getMatchIcon(match.type)}
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
                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" />
                            {match.matchTime}
                          </span>
                          <span>时长 {match.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={
                        match.status === "已加好友"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                      }
                    >
                      {match.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 安全提示 */}
        <div className="mt-6 rounded-xl bg-amber-50 p-4">
          <h3 className="text-sm font-semibold text-amber-900">💡 匹配小贴士</h3>
          <ul className="mt-2 space-y-1 text-xs text-amber-700">
            <li>• 保持礼貌和友善，给对方留下好印象</li>
            <li>• 不要透露个人敏感信息</li>
            <li>• 遇到不适内容可随时举报</li>
            <li>• 匹配记录会保留7天</li>
          </ul>
        </div>
      </div>
    </div>
  );
}