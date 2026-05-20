import { motion } from "motion/react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Crown, Check, X } from "lucide-react";
import { Badge } from "./ui/badge";

interface VIPLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

const freeFeatures = [
  { name: "加入圈子", available: true },
  { name: "浏览机构", available: true },
  { name: "每日创建 1 个圈子", available: true },
];

const vipFeatures = [
  { name: "无限创建圈子", available: true },
  { name: "置顶圈子", available: true },
  { name: "自定义圈子时长（最长30天）", available: true },
  { name: "专属 VIP 标识", available: true },
  { name: "优先客服支持", available: true },
];

export function VIPLimitModal({ isOpen, onClose, onUpgrade }: VIPLimitModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-xl">创建次数已达上限</h2>
                <p className="text-sm text-white/90">升级 VIP 解锁更多特权</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs">
                  当前方案
                </Badge>
                <span className="text-sm font-medium text-slate-900">免费版</span>
              </div>
              <ul className="space-y-2">
                {freeFeatures.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  VIP 特权
                </Badge>
                <span className="text-sm font-semibold text-slate-900">¥29/月</span>
              </div>
              <ul className="space-y-2 mb-4">
                {vipFeatures.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2 text-sm text-slate-900">
                    <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium">{feature.name}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <p className="text-xs text-amber-900">
                  <span className="font-semibold">限时优惠：</span>首月仅需 ¥9.9，立即升级享受全部特权
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} className="flex-1">
                稍后再说
              </Button>
              <Button
                onClick={onUpgrade}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                <Crown className="w-4 h-4 mr-2" />
                立即升级
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
