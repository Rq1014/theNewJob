import { motion } from "motion/react";
import { Check, Users } from "lucide-react";
import { Badge } from "./ui/badge";

interface TreeHole {
  id: string;
  name: string;
  logo: string;
  onlineCount: number;
  isVerified: boolean;
  category: "university" | "region";
}

const mockTreeHoles: TreeHole[] = [
  {
    id: "1",
    name: "东京大学",
    logo: "🏛️",
    onlineCount: 1243,
    isVerified: true,
    category: "university",
  },
  {
    id: "2",
    name: "早稻田大学",
    logo: "🎓",
    onlineCount: 892,
    isVerified: true,
    category: "university",
  },
  {
    id: "3",
    name: "京都大学",
    logo: "🏫",
    onlineCount: 756,
    isVerified: true,
    category: "university",
  },
  {
    id: "4",
    name: "关东地区",
    logo: "🗾",
    onlineCount: 2341,
    isVerified: true,
    category: "region",
  },
  {
    id: "5",
    name: "关西地区",
    logo: "🌸",
    onlineCount: 1876,
    isVerified: true,
    category: "region",
  },
];

interface TreeHoleListProps {
  onSelectTreeHole: (id: string, name: string) => void;
}

export function TreeHoleList({ onSelectTreeHole }: TreeHoleListProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 pb-[100px]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-2">在日留学生交流平台</h1>
          <p className="text-slate-600">选择您的学校或地区，加入官方认证的交流社区</p>
        </div>

        <div className="space-y-4">
          {mockTreeHoles.map((hole, index) => (
            <motion.div
              key={hole.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelectTreeHole(hole.id, hole.name)}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                    {hole.logo}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">{hole.name}</h3>
                      {hole.isVerified && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs">
                          <Check className="w-3 h-3" />
                          <span>官方认证</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{hole.onlineCount.toLocaleString()} 人在线</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {hole.category === "university" ? "高校" : "地区"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
