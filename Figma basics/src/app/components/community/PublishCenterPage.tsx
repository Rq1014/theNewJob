import { motion } from "motion/react";
import {
  ArrowLeft,
  FileText,
  Trophy,
  HelpCircle,
  Home,
  Stethoscope,
  Utensils,
  MapPin,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
} from "lucide-react";

interface PublishCenterPageProps {
  onBack: () => void;
}

const publishTypes = [
  {
    id: "career-question",
    title: "求职提问",
    subtitle: "就活疑问、求职困惑",
    icon: HelpCircle,
    color: "from-purple-500 to-purple-600",
    category: "career",
  },
  {
    id: "interview-exp",
    title: "分享面经",
    subtitle: "面试流程、技巧与经验",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    category: "career",
  },
  {
    id: "offer-share",
    title: "分享内定",
    subtitle: "内定经验、选考流程",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    category: "career",
  },
  {
    id: "life-exp",
    title: "分享生活经验",
    subtitle: "办卡、手续、日常攻略",
    icon: Lightbulb,
    color: "from-green-500 to-emerald-500",
    category: "life",
  },
  {
    id: "housing-warning",
    title: "租房避坑",
    subtitle: "曝光黑中介、分享经验",
    icon: AlertTriangle,
    color: "from-red-500 to-pink-500",
    category: "life",
  },
  {
    id: "medical-recommend",
    title: "推荐医院",
    subtitle: "中文友好医院推荐",
    icon: Stethoscope,
    color: "from-teal-500 to-cyan-500",
    category: "life",
  },
  {
    id: "food-recommend",
    title: "推荐美食",
    subtitle: "餐厅评价、美食分享",
    icon: Utensils,
    color: "from-orange-500 to-red-500",
    category: "life",
  },
  {
    id: "city-info",
    title: "补充城市信息",
    subtitle: "完善本地生活信息",
    icon: MapPin,
    color: "from-indigo-500 to-purple-500",
    category: "life",
  },
];

export function PublishCenterPage({ onBack }: PublishCenterPageProps) {
  const careerTypes = publishTypes.filter((type) => type.category === "career");
  const lifeTypes = publishTypes.filter((type) => type.category === "life");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg flex-1">发布内容</h1>
          </div>
        </div>
      </div>

      <div className="pb-6">
        {/* 顶部说明 */}
        <div className="bg-gradient-to-br from-purple-50 to-white p-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">选择发布类型</h2>
              <p className="text-sm text-slate-600">分享您的经验，帮助更多人</p>
            </div>
          </div>
        </div>

        {/* 求职相关发布 */}
        <div className="p-4">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
            求职相关
          </h3>
          <div className="space-y-2">
            {careerTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold text-slate-900 mb-1">{type.title}</h4>
                      <p className="text-sm text-slate-600">{type.subtitle}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 生活相关发布 */}
        <div className="p-4 pt-0">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-green-600 rounded-full"></span>
            生活相关
          </h3>
          <div className="space-y-2">
            {lifeTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + careerTypes.length) * 0.05 }}
                  className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-green-300 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-bold text-slate-900 mb-1">{type.title}</h4>
                      <p className="text-sm text-slate-600">{type.subtitle}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 底部提示 */}
        <div className="px-4 mt-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">发布须知</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• 请确保分享内容真实可靠</li>
              <li>• 求职经验可帮助更多同学</li>
              <li>• 避坑信息请客观描述事实</li>
              <li>• 推荐内容请注明个人体验</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
