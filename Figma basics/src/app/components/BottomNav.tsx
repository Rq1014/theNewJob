import { motion } from "motion/react";
import { Users, TrendingUp, Plus, Bell, User } from "lucide-react";

export type NavTab = "community" | "ranking" | "publish" | "messages" | "profile";

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const navItems = [
  { id: "community" as NavTab, icon: Users, label: "社区" },
  { id: "ranking" as NavTab, icon: TrendingUp, label: "榜单" },
  { id: "publish" as NavTab, icon: Plus, label: "", isSpecial: true },
  { id: "messages" as NavTab, icon: Bell, label: "消息" },
  { id: "profile" as NavTab, icon: User, label: "我的" },
];

export function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-2px_16px_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-5 h-16 max-w-[640px] mx-auto">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;

            // 特殊的发布按钮
            if (item.isSpecial) {
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className="relative flex items-center justify-center"
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="relative"
                  >
                    {/* 发布按钮的渐变背景 */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/30" />
                    <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl">
                      <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                  </motion.div>
                </button>
              );
            }

            // 普通导航按钮
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="relative flex flex-col items-center justify-center gap-1 py-2 transition-all active:scale-95"
              >
                {/* 激活指示器 */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                  />
                )}

                {/* 图标 */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon
                    className={`w-[22px] h-[22px] transition-colors duration-200 ${
                      isActive ? "text-slate-900" : "text-slate-400"
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </motion.div>

                {/* 文字标签 */}
                <span
                  className={`text-[11px] font-medium transition-colors duration-200 ${
                    isActive ? "text-slate-900" : "text-slate-500"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 底部安全区域 */}
        <div className="h-[env(safe-area-inset-bottom)] bg-white" />
      </div>
    </div>
  );
}