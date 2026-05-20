import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  X,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface SearchPageProps {
  onBack: () => void;
  onPostClick?: (postId: string) => void;
}

// 搜索历史数据
const initialSearchHistory = ["东京租房", "研究生申请", "JLPT N1", "二手家具"];

// 热门搜索数据
const hotSearchKeywords = [
  { keyword: "东京租房", heat: "热" },
  { keyword: "签证更新", heat: "新" },
  { keyword: "研究生申请", heat: "热" },
  { keyword: "打工面试", heat: "" },
  { keyword: "东大过去问", heat: "热" },
  { keyword: "二手家具", heat: "" },
  { keyword: "手机卡办理", heat: "新" },
  { keyword: "银行卡开户", heat: "" },
  { keyword: "同城聚餐", heat: "" },
  { keyword: "JLPT", heat: "热" },
  { keyword: "TOEFL", heat: "" },
  { keyword: "研究室生活", heat: "" },
  { keyword: "早稻田宿舍", heat: "新" },
  { keyword: "日语学习", heat: "热" },
  { keyword: "兼职推荐", heat: "" },
];

export function SearchPage({ onBack }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(initialSearchHistory);

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleRemoveHistory = (keyword: string) => {
    setSearchHistory((prev) => prev.filter((k) => k !== keyword));
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // TODO: 执行搜索逻辑
      console.log("搜索:", searchQuery);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchQuery(keyword);
    // TODO: 执行搜索逻辑
    console.log("搜索:", keyword);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* 返回按钮 */}
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>

          {/* 搜索输入框 */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="搜索帖子、学校、城市或关键词"
              className="pl-9 pr-9 bg-slate-50 border-slate-200 h-10"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            )}
          </div>

          {/* 搜索按钮 */}
          <button
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-lg text-sm font-medium transition-colors"
          >
            搜索
          </button>
        </div>
      </div>

      {/* 搜索内容区 */}
      <div className="px-4 py-6 space-y-6">
        {/* 搜索历史 */}
        {searchHistory.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <h3 className="font-semibold text-slate-900">搜索历史</h3>
              </div>
              <button
                onClick={handleClearHistory}
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                清空
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((keyword, index) => (
                <motion.div
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  <button
                    onClick={() => handleKeywordClick(keyword)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-sm transition-colors"
                  >
                    {keyword}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveHistory(keyword);
                    }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-slate-400 hover:bg-slate-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-2.5 h-2.5 text-white" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* 大家都在搜 */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <h3 className="font-semibold text-slate-900">大家都在搜</h3>
          </div>
          <div className="space-y-2">
            {hotSearchKeywords.map((item, index) => (
              <motion.button
                key={item.keyword}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleKeywordClick(item.keyword)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors text-left group"
              >
                {/* 排名 */}
                <span
                  className={`flex-shrink-0 w-5 text-center font-semibold text-sm ${
                    index < 3 ? "text-orange-500" : "text-slate-400"
                  }`}
                >
                  {index + 1}
                </span>

                {/* 关键词 */}
                <span className="flex-1 text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.keyword}
                </span>

                {/* 热度标签 */}
                {item.heat && (
                  <Badge
                    className={`flex-shrink-0 text-[10px] px-1.5 py-0 border-0 ${
                      item.heat === "热"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.heat}
                  </Badge>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 提示文案 */}
        <div className="pt-4 text-center">
          <p className="text-xs text-slate-400">
            搜索校园生活、租房信息、求职经验、学习资料等内容
          </p>
        </div>
      </div>
    </div>
  );
}
