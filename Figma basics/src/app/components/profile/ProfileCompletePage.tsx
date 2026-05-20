import { ArrowLeft, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface ProfileCompletePageProps {
  onBack: () => void;
}

const profileItems = [
  { id: "email", label: "大学邮箱", completed: true, required: true },
  { id: "school", label: "学校信息", completed: true, required: true },
  { id: "bio", label: "个性签名", completed: true, required: false },
  { id: "location", label: "常驻地区", completed: false, required: false },
  { id: "interests", label: "兴趣爱好", completed: false, required: false },
  { id: "avatar", label: "个人头像", completed: true, required: false },
];

export function ProfileCompletePage({ onBack }: ProfileCompletePageProps) {
  const completedCount = profileItems.filter((item) => item.completed).length;
  const totalCount = profileItems.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">完善资料</h1>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {/* 进度卡片 */}
        <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-6 text-white">
          <div className="mb-4">
            <p className="text-sm text-white/80">资料完整度</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-bold">{percentage}%</span>
              <span className="text-sm">
                {completedCount}/{totalCount} 项已完成
              </span>
            </div>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="mt-4 text-sm text-white/90">
            完善资料可以帮助你获得更精准的推荐和更多社区功能
          </p>
        </div>

        {/* 资料清单 */}
        <div className="mt-4">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">资料清单</h2>
          <div className="space-y-2">
            {profileItems.map((item) => (
              <button
                key={item.id}
                className="flex w-full items-center gap-3 rounded-xl bg-white p-4 text-left shadow-sm hover:shadow-md transition-shadow"
              >
                {item.completed ? (
                  <CheckCircle2 className="size-6 shrink-0 text-green-500" />
                ) : (
                  <Circle className="size-6 shrink-0 text-gray-300" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{item.label}</span>
                    {item.required && (
                      <span className="text-xs text-red-500">必填</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {item.completed ? "已完成" : "未完成"}
                  </p>
                </div>
                {!item.completed && (
                  <ChevronRight className="size-5 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 提示卡片 */}
        <div className="mt-4 rounded-xl bg-amber-50 p-4">
          <h4 className="font-semibold text-amber-900">💡 完善资料的好处</h4>
          <ul className="mt-2 space-y-1 text-sm text-amber-700">
            <li>• 提升匹配准确度，找到更合适的朋友</li>
            <li>• 让其他用户更了解你</li>
            <li>• 解锁更多社区功能</li>
            <li>• 增加账号可信度</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
