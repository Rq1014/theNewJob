import { useState } from "react";
import { motion } from "motion/react";
import { Search, Star, ChevronRight, MapPin, ThumbsUp } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Institution {
  id: string;
  name: string;
  category: "中介" | "私塾" | "语言学校";
  rating: number;
  reviewCount: number;
  tags: string[];
  location: string;
  preview: string;
  likeCount: number;
}

const mockInstitutions: Institution[] = [
  {
    id: "1",
    name: "樱花留学中介",
    category: "中介",
    rating: 4.8,
    reviewCount: 234,
    tags: ["价格透明", "响应迅速", "专业可靠"],
    location: "东京·新宿区",
    preview: "服务态度非常好，帮我成功申请到了理想的大学，推荐！",
    likeCount: 156,
  },
  {
    id: "2",
    name: "东京精英私塾",
    category: "私塾",
    rating: 4.6,
    reviewCount: 189,
    tags: ["师资强", "小班教学", "升学率高"],
    location: "东京·涉谷区",
    preview: "老师都很专业，针对性辅导效果显著，考上了早大...",
    likeCount: 128,
  },
  {
    id: "3",
    name: "富士日本语学校",
    category: "语言学校",
    rating: 4.5,
    reviewCount: 312,
    tags: ["环境好", "签证稳定", "课程丰富"],
    location: "东京·池袋",
    preview: "学校环境很好，老师负责，签证材料指导很到位。",
    likeCount: 201,
  },
  {
    id: "4",
    name: "名门升学私塾",
    category: "私塾",
    rating: 4.9,
    reviewCount: 156,
    tags: ["顶尖师资", "一对一辅导", "名校录取"],
    location: "东京·目黑区",
    preview: "一对一辅导很有针对性，最终拿到了东大的offer！",
    likeCount: 243,
  },
  {
    id: "5",
    name: "启程留学咨询",
    category: "中介",
    rating: 4.3,
    reviewCount: 178,
    tags: ["经验丰富", "后续服务好"],
    location: "大阪·梅田",
    preview: "从咨询到入学全程跟进，后续服务也很不错。",
    likeCount: 89,
  },
];

const categories = ["全部", "中介", "私塾", "语言学校"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : star - 0.5 <= rating
              ? "fill-yellow-400/50 text-yellow-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
      <span className="ml-1 font-semibold text-slate-900">{rating.toFixed(1)}</span>
    </div>
  );
}

export function ReviewTab() {
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInstitutions = mockInstitutions.filter((inst) => {
    const matchesCategory = selectedCategory === "全部" || inst.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-[84px]">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="搜索机构名称或标签"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex-shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {filteredInstitutions.map((inst, index) => (
          <motion.div
            key={inst.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">{inst.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {inst.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <StarRating rating={inst.rating} />
                  <span className="text-sm text-slate-500">({inst.reviewCount}条评价)</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{inst.location}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {inst.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-slate-700 line-clamp-2">{inst.preview}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{inst.likeCount} 人觉得有用</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-blue-600">
                    查看详情
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredInstitutions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">未找到相关机构</p>
          </div>
        )}
      </div>
    </div>
  );
}
