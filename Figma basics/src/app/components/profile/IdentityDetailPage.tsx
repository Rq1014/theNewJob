import { ArrowLeft, CheckCircle2, ShieldCheck, Mail, Award } from "lucide-react";
import { Badge } from "../ui/badge";

interface IdentityDetailPageProps {
  onBack: () => void;
}

export function IdentityDetailPage({ onBack }: IdentityDetailPageProps) {
  const identityInfo = {
    email: "zhang@g.ecc.u-tokyo.ac.jp",
    emailVerified: true,
    schoolVerified: true,
    university: "东京大学",
    verifiedDate: "2024年1月15日",
    trustScore: 95,
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">身份与信用</h1>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {/* 信用评分 */}
        <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">账号信用评分</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-bold">{identityInfo.trustScore}</span>
                <span className="text-lg">/100</span>
              </div>
              <p className="mt-2 text-sm text-white/90">可信留学生账号</p>
            </div>
            <Award className="size-16 text-white/20" />
          </div>
        </div>

        {/* 认证详情 */}
        <div className="mt-4 space-y-3">
          {/* 邮箱认证 */}
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
                  <Mail className="size-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">大学邮箱认证</h3>
                  <p className="text-xs text-gray-500">已认证</p>
                </div>
              </div>
              <CheckCircle2 className="size-6 text-green-500" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">认证邮箱</span>
                <span className="text-gray-900">{identityInfo.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">认证时间</span>
                <span className="text-gray-900">{identityInfo.verifiedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">认证状态</span>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">已验证</Badge>
              </div>
            </div>
          </div>

          {/* 学校认证 */}
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50">
                  <ShieldCheck className="size-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">学校认证</h3>
                  <p className="text-xs text-gray-500">已认证</p>
                </div>
              </div>
              <CheckCircle2 className="size-6 text-green-500" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">认证学校</span>
                <span className="text-gray-900">{identityInfo.university}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">认证时间</span>
                <span className="text-gray-900">{identityInfo.verifiedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">认证状态</span>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">可信留学生</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* 说明 */}
        <div className="mt-4 rounded-xl bg-blue-50 p-4">
          <h4 className="font-semibold text-blue-900">💡 关于身份认证</h4>
          <ul className="mt-2 space-y-1 text-sm text-blue-700">
            <li>• 完成身份认证可提升账号可信度</li>
            <li>• 认证用户可享受更多社区功能</li>
            <li>• 认证信息仅用于身份验证，不会公开展示</li>
            <li>• 认证后可获得更精准的匹配推荐</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
