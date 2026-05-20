import { X, GraduationCap, MapPin, Users, Check } from "lucide-react";
import { Button } from "../ui/button";

type MatchPurpose = "chat" | "school-friend" | "city-partner" | "study-partner" | "food-partner" | "emotional" | "dating";

interface MatchFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPurposes: MatchPurpose[];
  onPurposesChange: (purposes: MatchPurpose[]) => void;
  sameSchoolFirst: boolean;
  onSameSchoolChange: (value: boolean) => void;
  sameCityFirst: boolean;
  onSameCityChange: (value: boolean) => void;
  onlyActiveUsers: boolean;
  onOnlyActiveChange: (value: boolean) => void;
}

const matchPurposes = [
  { value: "chat" as MatchPurpose, label: "找聊天", icon: "💬", desc: "随便聊聊，放松心情" },
  { value: "school-friend" as MatchPurpose, label: "同校朋友", icon: "🎓", desc: "认识同校的小伙伴" },
  { value: "city-partner" as MatchPurpose, label: "同城搭子", icon: "📍", desc: "同城线下活动" },
  { value: "study-partner" as MatchPurpose, label: "学习搭子", icon: "📚", desc: "一起学习进步" },
  { value: "food-partner" as MatchPurpose, label: "饭搭子", icon: "🍜", desc: "探店美食同行" },
  { value: "emotional" as MatchPurpose, label: "情绪陪伴", icon: "💝", desc: "倾听与被倾听" },
  { value: "dating" as MatchPurpose, label: "恋爱交友", icon: "💕", desc: "寻找心动的TA" },
];

export function MatchFilterSheet({
  isOpen,
  onClose,
  selectedPurposes,
  onPurposesChange,
  sameSchoolFirst,
  onSameSchoolChange,
  sameCityFirst,
  onSameCityChange,
  onlyActiveUsers,
  onOnlyActiveChange,
}: MatchFilterSheetProps) {
  if (!isOpen) return null;

  const handlePurposeToggle = (purpose: MatchPurpose) => {
    if (selectedPurposes.includes(purpose)) {
      // 取消选择
      onPurposesChange(selectedPurposes.filter(p => p !== purpose));
    } else {
      // 添加选择
      onPurposesChange([...selectedPurposes, purpose]);
    }
  };

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 bg-black/40 z-[100] transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-slide-up">
        {/* 拖拽指示条 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-slate-300 rounded-full" />
        </div>

        {/* 头部 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">匹配设置</h2>
          <button
            onClick={onClose}
            className="size-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <X className="size-5 text-slate-600" />
          </button>
        </div>

        {/* 内容区 - 可滚动 */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* 匹配目的 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">匹配目的</h3>
              <span className="text-xs text-purple-600">
                {selectedPurposes.length > 0 ? `已选${selectedPurposes.length}个` : "可多选"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {matchPurposes.map((purpose) => {
                const isSelected = selectedPurposes.includes(purpose.value);
                return (
                  <button
                    key={purpose.value}
                    onClick={() => handlePurposeToggle(purpose.value)}
                    className={`flex flex-col gap-1.5 rounded-xl p-3 text-left transition-all ${
                      isSelected
                        ? "bg-purple-50 border-2 border-purple-500 shadow-sm"
                        : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{purpose.icon}</span>
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-purple-700" : "text-slate-700"
                          }`}
                        >
                          {purpose.label}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="size-4 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                          <Check className="size-2.5 text-white" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500">{purpose.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 快捷筛选 */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">快捷筛选</h3>
            <div className="space-y-2.5">
              <button
                onClick={() => onSameSchoolChange(!sameSchoolFirst)}
                className={`w-full flex items-center gap-3 rounded-xl p-3.5 text-left transition-all ${
                  sameSchoolFirst
                    ? "bg-purple-50 border-2 border-purple-500"
                    : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                }`}
              >
                <div
                  className={`size-10 rounded-full flex items-center justify-center ${
                    sameSchoolFirst ? "bg-purple-500" : "bg-slate-200"
                  }`}
                >
                  <GraduationCap
                    className={`size-5 ${sameSchoolFirst ? "text-white" : "text-slate-500"}`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-900">同校优先</h4>
                  <p className="text-xs text-slate-500 mt-0.5">优先匹配同一所学校的同学</p>
                </div>
                {sameSchoolFirst && (
                  <div className="size-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <Check className="size-3 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>

              <button
                onClick={() => onSameCityChange(!sameCityFirst)}
                className={`w-full flex items-center gap-3 rounded-xl p-3.5 text-left transition-all ${
                  sameCityFirst
                    ? "bg-purple-50 border-2 border-purple-500"
                    : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                }`}
              >
                <div
                  className={`size-10 rounded-full flex items-center justify-center ${
                    sameCityFirst ? "bg-purple-500" : "bg-slate-200"
                  }`}
                >
                  <MapPin
                    className={`size-5 ${sameCityFirst ? "text-white" : "text-slate-500"}`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-900">同城优先</h4>
                  <p className="text-xs text-slate-500 mt-0.5">优先匹配同城的留学生</p>
                </div>
                {sameCityFirst && (
                  <div className="size-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <Check className="size-3 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>

              <button
                onClick={() => onOnlyActiveChange(!onlyActiveUsers)}
                className={`w-full flex items-center gap-3 rounded-xl p-3.5 text-left transition-all ${
                  onlyActiveUsers
                    ? "bg-purple-50 border-2 border-purple-500"
                    : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                }`}
              >
                <div
                  className={`size-10 rounded-full flex items-center justify-center ${
                    onlyActiveUsers ? "bg-purple-500" : "bg-slate-200"
                  }`}
                >
                  <Users
                    className={`size-5 ${onlyActiveUsers ? "text-white" : "text-slate-500"}`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-900">仅在线用户</h4>
                  <p className="text-xs text-slate-500 mt-0.5">只匹配当前在线的用户</p>
                </div>
                {onlyActiveUsers && (
                  <div className="size-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <Check className="size-3 text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="px-5 py-4 border-t border-slate-100 bg-white">
          <Button
            onClick={onClose}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
          >
            确认设置
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}