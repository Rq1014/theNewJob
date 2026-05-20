import { motion } from "motion/react";
import { Users, Clock, ArrowLeft, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";

interface Circle {
  id: string;
  name: string;
  tag: string;
  memberCount: number;
  maxMembers: number;
  expiresAt: Date;
  creator: string;
}

const mockCircles: Circle[] = [
  {
    id: "1",
    name: "健身打卡小组",
    tag: "健身",
    memberCount: 8,
    maxMembers: 10,
    expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000),
    creator: "小明",
  },
  {
    id: "2",
    name: "摄影爱好者",
    tag: "摄影",
    memberCount: 15,
    maxMembers: 20,
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    creator: "阿华",
  },
  {
    id: "3",
    name: "周末登山队",
    tag: "户外",
    memberCount: 6,
    maxMembers: 8,
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    creator: "小红",
  },
  {
    id: "4",
    name: "日语学习交流",
    tag: "学习",
    memberCount: 12,
    maxMembers: 15,
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000),
    creator: "李华",
  },
  {
    id: "5",
    name: "美食探店",
    tag: "美食",
    memberCount: 9,
    maxMembers: 12,
    expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
    creator: "小张",
  },
  {
    id: "6",
    name: "二手物品交换",
    tag: "生活",
    memberCount: 18,
    maxMembers: 25,
    expiresAt: new Date(Date.now() + 15 * 60 * 60 * 1000),
    creator: "王芳",
  },
];

interface CircleGridProps {
  treeHoleName: string;
  onBack: () => void;
  onCreateCircle: () => void;
}

function CountdownTimer({ expiresAt }: { expiresAt: Date }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("已过期");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <motion.span
      key={timeLeft}
      initial={{ scale: 1.2, color: "#ef4444" }}
      animate={{ scale: 1, color: "#64748b" }}
      transition={{ duration: 0.3 }}
      className="font-mono text-xs"
    >
      {timeLeft}
    </motion.span>
  );
}

export function CircleGrid({ treeHoleName, onBack, onCreateCircle }: CircleGridProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 pb-[84px]">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h2 className="font-semibold text-slate-900">{treeHoleName}</h2>
              <p className="text-sm text-slate-600">发现和加入兴趣圈子</p>
            </div>
            <Button onClick={onCreateCircle} className="gap-2">
              <Plus className="w-4 h-4" />
              创建圈子
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCircles.map((circle, index) => {
            const isFull = circle.memberCount >= circle.maxMembers;
            const fillPercentage = (circle.memberCount / circle.maxMembers) * 100;

            return (
              <motion.div
                key={circle.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all border border-slate-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                    #{circle.tag}
                  </Badge>
                  {isFull && (
                    <Badge variant="secondary" className="text-xs">
                      已满
                    </Badge>
                  )}
                </div>

                <h3 className="font-semibold text-slate-900 mb-2">{circle.name}</h3>
                <p className="text-xs text-slate-500 mb-4">创建者: {circle.creator}</p>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1.5 text-sm">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Users className="w-4 h-4" />
                        <span>
                          {circle.memberCount}/{circle.maxMembers}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">{fillPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${fillPercentage}%` }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className={`h-full rounded-full ${
                          isFull
                            ? "bg-slate-400"
                            : fillPercentage > 75
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <CountdownTimer expiresAt={circle.expiresAt} />
                    </div>
                    <Button size="sm" disabled={isFull} className="h-7 text-xs">
                      {isFull ? "已满" : "加入"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
