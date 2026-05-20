import { ArrowLeft, ChevronRight, Shield, Bell, Lock, HelpCircle, FileText, LogOut, Mail, ShieldCheck, User } from "lucide-react";

interface SettingsPageProps {
  onBack: () => void;
}

const settingsSections = [
  {
    title: "资料与认证",
    items: [
      { id: "email-verify", label: "大学邮箱认证", icon: Mail, description: "已认证 zhang@g.ecc.u-tokyo.ac.jp", verified: true },
      { id: "school-verify", label: "学校认证", icon: ShieldCheck, description: "已完成学校身份认证", verified: true },
      { id: "profile-complete", label: "完善个人资料", icon: User, description: "资料完整度 75%，补充更多信息" },
    ],
  },
  {
    title: "账号设置",
    items: [
      { id: "account", label: "账号管理", icon: Shield, description: "修改邮箱、密码" },
      { id: "notifications", label: "消息通知", icon: Bell, description: "管理通知偏好" },
      { id: "privacy", label: "隐私设置", icon: Lock, description: "谁可以看到我的信息" },
    ],
  },
  {
    title: "帮助与支持",
    items: [
      { id: "help", label: "帮助中心", icon: HelpCircle, description: "常见问题解答" },
      { id: "feedback", label: "意见反馈", icon: FileText, description: "向我们反馈问题" },
    ],
  },
];

export function SettingsPage({ onBack }: SettingsPageProps) {
  return (
    <div className="flex h-full flex-col bg-slate-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-slate-100">
          <ArrowLeft className="size-5 text-slate-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-slate-900">设置</h1>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="mt-4">
            <h2 className="mb-2 text-sm font-semibold text-slate-700">{section.title}</h2>
            <div className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className="flex w-full items-center gap-3 rounded-xl bg-white p-4 text-left shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className={`flex size-10 items-center justify-center rounded-lg ${
                      item.verified ? 'bg-green-50' : 'bg-slate-100'
                    }`}>
                      <Icon className={`size-5 ${
                        item.verified ? 'text-green-600' : 'text-slate-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500 truncate">{item.description}</p>
                    </div>
                    <ChevronRight className="size-5 text-slate-400 flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* 退出登录 */}
        <div className="mt-6">
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white p-4 text-red-600 shadow-sm hover:shadow-md transition-shadow">
            <LogOut className="size-5" />
            <span className="font-medium">退出登录</span>
          </button>
        </div>

        {/* 版本信息 */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">当前版本 v1.0.0</p>
        </div>
      </div>
    </div>
  );
}