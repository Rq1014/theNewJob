import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  FileText,
  Trophy,
  HelpCircle,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Clock,
  MapPin,
  Flame,
  ArrowUpRight,
  Edit3,
  Coffee,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Building,
  TrendingUp,
  Eye,
  ThumbsUp,
  Star,
  MessageSquare,
  LifeBuoy,
  Home,
  Stethoscope,
  Utensils,
  UserPlus,
  Compass,
  GraduationCap,
  ChevronDown,
  X,
  RotateCcw,
  Check,
  Filter,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import {
  japanCommunityPosts,
  careerTags,
  lifeTags,
  hotDiscussionsJapan,
  cityNames,
} from "../data/japan-community";
import { categoryIcons, categoryLabels } from "./community/utils";

type MainChannel = "follow" | "discover" | "local";

const mainChannels = [
  { id: "follow" as MainChannel, label: "关注" },
  { id: "discover" as MainChannel, label: "发现" },
  { id: "local" as MainChannel, label: "同城" },
];

// 预设标签数据
const communityTags = [
  // 校园相关
  { id: "campus", label: "校园", category: "campus" },
  { id: "course", label: "选课", category: "campus" },
  { id: "exam", label: "考试", category: "campus" },
  { id: "lab", label: "研究室", category: "campus" },
  { id: "club", label: "社团", category: "campus" },
  { id: "lecture", label: "讲座", category: "campus" },
  { id: "scholarship", label: "奖学金", category: "campus" },
  { id: "graduate", label: "升学", category: "campus" },
  { id: "study-procedure", label: "留学手续", category: "campus" },

  // 求职相关
  { id: "job", label: "求职", category: "career" },
  { id: "internship", label: "实习", category: "career" },
  { id: "referral", label: "内推", category: "career" },
  { id: "interview", label: "面经", category: "career" },
  { id: "part-time", label: "打工", category: "career" },

  // 生活相关
  { id: "rent", label: "租房", category: "life" },
  { id: "sublet", label: "转租", category: "life" },
  { id: "roommate", label: "合租", category: "life" },
  { id: "visa", label: "签证", category: "life" },
  { id: "food", label: "美食", category: "life" },
  { id: "secondhand", label: "二手", category: "life" },
  { id: "travel", label: "旅游", category: "life" },
  { id: "emotion", label: "情感", category: "life" },
  { id: "treehole", label: "树洞", category: "life" },
  { id: "language-learning", label: "语言学习", category: "life" },
  { id: "japanese", label: "日语", category: "life" },
  { id: "english", label: "英语", category: "life" },
  { id: "japan-culture", label: "日本文化", category: "life" },
  { id: "local-event", label: "同城活动", category: "life" },
  { id: "transport", label: "交通", category: "life" },
  { id: "bank-card", label: "银行卡", category: "life" },
  { id: "phone-card", label: "手机卡", category: "life" },
  { id: "medical", label: "医疗", category: "life" },
  { id: "insurance", label: "保险", category: "life" },
  { id: "living-cost", label: "生活费", category: "life" },
  { id: "save-money", label: "省钱", category: "life" },
];

// 热门树洞帖子数据
const hotTreeholePosts = [
  {
    id: "t1",
    title: "最近面试好累，想找个人说说话...",
    preview: "连续面了三家公司都没消息，有点怀疑自己了。大家面试的时候都怎么调整心态的？",
    replies: 234,
    likes: 567,
    timestamp: "刚刚",
    category: "心情",
    anonymous: true,
  },
  {
    id: "t2",
    title: "今天早稻田樱花开了！！",
    preview: "路过校园看到樱花开了，虽然来日本三年了，但每次看到还是会感动...",
    replies: 89,
    likes: 423,
    timestamp: "15分钟前",
    category: "校园",
    anonymous: true,
  },
  {
    id: "t3",
    title: "有没有同样在准备N1的小伙伴",
    preview: "7月考试，现在开始准备还来得及吗？求组队互相监督学习",
    replies: 156,
    likes: 289,
    timestamp: "1小时前",
    category: "学习",
    anonymous: true,
  },
  {
    id: "t4",
    title: "深夜emo：异国他乡的孤独感",
    preview: "凌晨三点睡不着，想家了。在日本生活三年，适应了很多，但有时候还是会觉得很孤独...",
    replies: 312,
    likes: 891,
    timestamp: "2小时前",
    category: "心情",
    anonymous: true,
  },
];

interface JapanCommunityTabProps {
  onSearchClick?: () => void;
  onPostClick?: (postId: string) => void;
  onUserClick?: (userId: string) => void;
  onCompanyClick?: (companyName: string) => void;
  onTagClick?: (tag: string) => void;
  onFunctionClick?: (functionId: string) => void;
}

export function JapanCommunityTab({
  onSearchClick,
  onPostClick,
  onUserClick,
  onCompanyClick,
  onTagClick,
  onFunctionClick,
}: JapanCommunityTabProps) {
  const [selectedChannel, setSelectedChannel] = useState<MainChannel>("discover");
  const [tagFilterExpanded, setTagFilterExpanded] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const handleResetTags = () => {
    setSelectedTags([]);
  };

  const handleConfirmTags = () => {
    setTagFilterExpanded(false);
  };

  // 标签关键词映射 - 定义在外层以便复用
  const tagKeywords: Record<string, string[]> = {
    rent: ["租房", "房子", "初期费用", "租房避坑", "租房推荐"],
    sublet: ["转租", "合租", "找室友"],
    roommate: ["合租", "室友", "找室友"],
    course: ["选课", "课程"],
    exam: ["考试"],
    lab: ["研究室", "实验室"],
    interview: ["面经", "面试", "面试经验"],
    job: ["求职", "内定", "就活"],
    internship: ["实习"],
    "part-time": ["打工", "兼职", "时薪"],
    visa: ["签证", "在留"],
    food: ["美食", "料理", "餐厅"],
    secondhand: ["二手"],
    scholarship: ["奖学金"],
    graduate: ["升学", "考研"],
    "bank-card": ["银行卡", "办卡"],
    "phone-card": ["手机卡"],
    medical: ["医院", "就医", "医疗"],
    transport: ["交通"],
    "study-procedure": ["留学手续", "行政手续", "住民登录"],
    campus: ["校园"],
    club: ["社团"],
    lecture: ["讲座"],
    referral: ["内推"],
    travel: ["旅游"],
    emotion: ["情感"],
    treehole: ["树洞"],
    "language-learning": ["语言学习"],
    japanese: ["日语"],
    english: ["英语"],
    "japan-culture": ["日本文化"],
    "local-event": ["同城活动"],
    insurance: ["保险"],
    "living-cost": ["生活费"],
    "save-money": ["省钱"],
  };

  // 计算帖子与选中标签的匹配度评分
  const calculatePostScore = (post: typeof japanCommunityPosts[0]) => {
    if (selectedTags.length === 0) return 0;

    let matchedTagsCount = 0;
    let totalMatchStrength = 0;

    selectedTags.forEach(tagId => {
      const tag = communityTags.find(t => t.id === tagId);
      if (!tag) return;

      const keywords = tagKeywords[tagId] || [tag.label];
      let tagMatchStrength = 0;

      // 精确匹配帖子tags (权重: 3)
      const matchInTags = post.tags.some(postTag =>
        keywords.some(keyword => postTag.includes(keyword))
      );
      if (matchInTags) tagMatchStrength += 3;

      // 标题匹配 (权重: 2)
      const matchInTitle = keywords.some(keyword => post.title.includes(keyword));
      if (matchInTitle) tagMatchStrength += 2;

      // 分类匹配 (权重: 1)
      const matchInCategory =
        (tag.category === "career" && post.domain === "career") ||
        (tag.category === "life" && (post.domain === "life" || post.category === "rental" || post.category === "food" || post.category === "housing")) ||
        (tag.category === "campus" && (post.category === "academic" || post.domain === "life"));
      if (matchInCategory) tagMatchStrength += 1;

      if (tagMatchStrength > 0) {
        matchedTagsCount++;
        totalMatchStrength += tagMatchStrength;
      }
    });

    // 综合评分：标签匹配度 + 热度
    const tagScore = matchedTagsCount * 1000 + totalMatchStrength * 100;

    // 热度评分：点赞 + 评论*2 + 收藏*1.5 + 浏览/10
    const engagementScore =
      post.likes +
      post.comments * 2 +
      post.bookmarks * 1.5 +
      post.views / 10;

    // 时间衰减因子 (简化处理，实际可以解析timestamp)
    const timeBoost = post.timestamp.includes("分钟") || post.timestamp.includes("刚刚") || post.timestamp.includes("小时") ? 50 : 0;

    // 精选帖子加分
    const featuredBoost = post.featured ? 100 : 0;

    return tagScore + engagementScore + timeBoost + featuredBoost;
  };

  const filteredPosts = (() => {
    const posts = japanCommunityPosts.filter((post) => {
      if (selectedChannel === "follow") {
        return true;
      }
      if (selectedChannel === "discover") {
        if (selectedTags.length > 0) {
          // 至少匹配一个标签
          return selectedTags.some(tagId => {
            const tag = communityTags.find(t => t.id === tagId);
            if (!tag) return false;

            const keywords = tagKeywords[tagId] || [tag.label];

            const matchInTags = post.tags.some(postTag =>
              keywords.some(keyword => postTag.includes(keyword))
            );
            const matchInTitle = keywords.some(keyword => post.title.includes(keyword));
            const matchInSummary = keywords.some(keyword => post.summary?.includes(keyword));
            const matchInCategory =
              (tag.category === "career" && post.domain === "career") ||
              (tag.category === "life" && (post.domain === "life" || post.category === "rental" || post.category === "food" || post.category === "housing" || post.category === "medical" || post.category === "finance")) ||
              (tag.category === "campus" && (post.category === "academic" || post.tags.some(t => t.includes("学校") || t.includes("大学") || t.includes("留学"))));

            return matchInTags || matchInTitle || matchInSummary || matchInCategory;
          });
        }
        return true;
      }
      if (selectedChannel === "local") {
        return post.city !== undefined;
      }
      return true;
    });

    // 如果筛选后没有结果，返回同类别的帖子
    if (selectedChannel === "discover" && selectedTags.length > 0 && posts.length === 0) {
      const selectedTag = communityTags.find(t => t.id === selectedTags[0]);
      if (selectedTag) {
        return japanCommunityPosts.filter(post => {
          if (selectedTag.category === "career") return post.domain === "career";
          if (selectedTag.category === "life") return post.domain === "life" || post.category === "rental" || post.category === "food" || post.category === "housing";
          if (selectedTag.category === "campus") {
            // 校园标签更宽松的匹配：包含学校、大学、留学等关键词的帖子
            return post.category === "academic" ||
                   post.tags.some(t => t.includes("学校") || t.includes("大学") || t.includes("留学")) ||
                   post.title.includes("学校") || post.title.includes("大学") || post.title.includes("留学") ||
                   post.author.university !== undefined;
          }
          return true;
        }).slice(0, 10);
      }
    }

    return posts;
  })()
    .sort((a, b) => {
      // 如果选择了标签，按评分排序；否则保持原顺序
      if (selectedChannel === "discover" && selectedTags.length > 0) {
        return calculatePostScore(b) - calculatePostScore(a);
      }
      return 0;
    });

  // 根据选中的标签筛选今日热议话题
  const filteredHotDiscussions = selectedTags.length > 0
    ? (() => {
        const matched = hotDiscussionsJapan.filter(topic => {
          return selectedTags.some(tagId => {
            const tag = communityTags.find(t => t.id === tagId);
            if (!tag) return false;

            const keywords = tagKeywords[tagId] || [tag.label];

            // 检查标题是否包含关键词
            const matchInTitle = keywords.some(keyword => topic.title.includes(keyword));

            // 检查分类匹配
            const matchInCategory =
              (tag.category === "career" && topic.domain === "career") ||
              (tag.category === "life" && topic.domain === "life") ||
              (tag.category === "campus" && topic.domain === "life");

            return matchInTitle || matchInCategory;
          });
        });

        // 如果没有匹配结果，返回同类别的话题
        if (matched.length === 0) {
          const selectedTag = communityTags.find(t => t.id === selectedTags[0]);
          if (selectedTag) {
            return hotDiscussionsJapan.filter(topic => {
              if (selectedTag.category === "career") return topic.domain === "career";
              if (selectedTag.category === "life") return topic.domain === "life";
              if (selectedTag.category === "campus") return topic.domain === "life";
              return true;
            }).slice(0, 3);
          }
        }

        return matched.length > 0 ? matched : hotDiscussionsJapan.slice(0, 3);
      })()
    : hotDiscussionsJapan;

  return (
    <div className="min-h-screen bg-slate-50 pb-[84px]">
      {/* 顶部导航区 */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        {/* 一级导航 + 搜索图标 */}
        <div className="flex items-center px-4 h-14">
          {/* 一级导航 - 三个Tab等宽分布 */}
          <div className="flex items-center flex-1">
            {mainChannels.map((channel, index) => {
              const isActive = selectedChannel === channel.id;
              return (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel.id)}
                  className="relative flex-1 h-14 flex items-center justify-center transition-all"
                >
                  <span
                    className={`text-base font-semibold transition-colors ${
                      isActive ? "text-blue-600" : "text-slate-600"
                    }`}
                  >
                    {channel.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeChannel"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full"
                      transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                    />
                  )}
                  {/* 关注频道未读提示点 */}
                  {channel.id === "follow" && index === 0 && (
                    <span className="absolute top-4 right-[calc(50%-16px)] w-1.5 h-1.5 bg-red-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* 搜索图标 */}
          <button
            onClick={onSearchClick}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0 ml-2"
          >
            <Search className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* 发现页的标签筛选区域 */}
        {selectedChannel === "discover" && !tagFilterExpanded && (
          <div className="px-4 pb-3 border-t border-slate-100">
            <div className="flex items-center gap-2 min-h-[40px]">
              {selectedTags.length === 0 ? (
                /* 筛选按钮 - 未选择标签时 */
                <button
                  onClick={() => setTagFilterExpanded(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all flex-shrink-0 bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">选择兴趣标签</span>
                </button>
              ) : (
                /* 已选标签显示区 - "已选 3 个｜选课 ×｜面经 ×｜租房 ×" */
                <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar flex-1">
                  {/* "已选 N 个" 按钮 - 点击重新打开面板 */}
                  <button
                    onClick={() => setTagFilterExpanded(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-all flex-shrink-0 text-sm font-medium"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    已选 {selectedTags.length} 个
                  </button>

                  {/* 分隔符 */}
                  <span className="text-slate-300 text-sm">｜</span>

                  {/* 已选标签列表 */}
                  <div className="flex items-center gap-1.5 flex-1">
                    {selectedTags.map((tagId) => {
                      const tag = communityTags.find((t) => t.id === tagId);
                      if (!tag) return null;

                      // 根据分类设置颜色
                      const tagColor =
                        tag.category === "career"
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : tag.category === "campus"
                          ? "bg-purple-100 text-purple-700 border-purple-200"
                          : "bg-green-100 text-green-700 border-green-200";

                      return (
                        <motion.button
                          key={tagId}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => handleTagToggle(tagId)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all hover:opacity-80 flex items-center gap-1 flex-shrink-0 ${tagColor}`}
                        >
                          {tag.label}
                          <X className="w-3 h-3" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 发现页的标签筛选面板 */}
        <AnimatePresence>
          {selectedChannel === "discover" && tagFilterExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-slate-200 bg-slate-50"
            >
              {/* 面板标题栏 */}
              <div className="px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-600" />
                  <h3 className="text-sm font-semibold text-slate-900">标签筛选</h3>
                  {selectedTags.length > 0 && (
                    <Badge className="bg-blue-100 text-blue-700 border-0 text-xs px-2 py-0.5">
                      已选 {selectedTags.length}
                    </Badge>
                  )}
                </div>
                <button
                  onClick={() => setTagFilterExpanded(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="px-4 py-4 max-h-[400px] overflow-y-auto">
                {/* 标签分组 */}
                <div className="space-y-4">
                  {/* 校园标签 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                      <h4 className="text-xs font-semibold text-slate-600">校园相关</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {communityTags
                        .filter((tag) => tag.category === "campus")
                        .map((tag) => {
                          const isSelected = selectedTags.includes(tag.id);
                          return (
                            <button
                              key={tag.id}
                              onClick={() => handleTagToggle(tag.id)}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                isSelected
                                  ? "bg-purple-600 text-white shadow-sm"
                                  : "bg-white text-slate-700 border border-slate-200 hover:border-purple-300"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                              {tag.label}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* 求职标签 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                      <h4 className="text-xs font-semibold text-slate-600">求职相关</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {communityTags
                        .filter((tag) => tag.category === "career")
                        .map((tag) => {
                          const isSelected = selectedTags.includes(tag.id);
                          return (
                            <button
                              key={tag.id}
                              onClick={() => handleTagToggle(tag.id)}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                isSelected
                                  ? "bg-blue-600 text-white shadow-sm"
                                  : "bg-white text-slate-700 border border-slate-200 hover:border-blue-300"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                              {tag.label}
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* 生活标签 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Coffee className="w-3.5 h-3.5 text-green-600" />
                      <h4 className="text-xs font-semibold text-slate-600">生活相关</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {communityTags
                        .filter((tag) => tag.category === "life")
                        .map((tag) => {
                          const isSelected = selectedTags.includes(tag.id);
                          return (
                            <button
                              key={tag.id}
                              onClick={() => handleTagToggle(tag.id)}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                                isSelected
                                  ? "bg-green-600 text-white shadow-sm"
                                  : "bg-white text-slate-700 border border-slate-200 hover:border-green-300"
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                              {tag.label}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 面板底部操作按钮 */}
              <div className="px-4 py-3 border-t border-slate-200 bg-white flex items-center gap-3">
                <button
                  onClick={handleResetTags}
                  className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  重置
                </button>
                <button
                  onClick={handleConfirmTags}
                  className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  确认 {selectedTags.length > 0 && `(${selectedTags.length})`}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-3">
        {/* 树洞入口卡片 - 轻量化设计 */}
        <div className="px-4 pt-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onFunctionClick?.("partner")}
            className="w-full relative overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-2xl border border-teal-100/50 hover:shadow-md transition-all group text-left"
          >
            {/* 背景装饰层 */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/15 rounded-full blur-2xl -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-200/10 rounded-full blur-xl translate-y-12 -translate-x-12" />
            </div>

            <div className="relative p-4">
              {/* 顶部：图标、标题、进入按钮 */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-900">树洞</h3>
                    <Badge className="bg-teal-100 text-teal-700 border-0 text-[10px] px-1.5 py-0.5">
                      匿名
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">匿名倾诉、实时讨论、找到共鸣</p>
                </div>

                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <span className="text-[10px] text-slate-500">2.3k在线</span>
                </div>
              </div>

              {/* 正在热议预览 - 显示3条 */}
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2.5 border border-teal-100/50 space-y-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <Flame className="w-3 h-3 text-orange-500 flex-shrink-0" />
                  <span className="text-[10px] font-semibold text-slate-700">正在热议</span>
                </div>
                {hotTreeholePosts.slice(0, 3).map((post, index) => (
                  <div key={post.id} className={`${index > 0 ? 'pt-2 border-t border-white/50' : ''}`}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-xs font-medium text-slate-900 line-clamp-1 flex-1">
                        {post.title}
                      </p>
                      <span className="text-[10px] text-slate-400 flex-shrink-0">{post.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500">
                      <span>{post.replies} 回复</span>
                      <span>{post.likes} 点赞</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.button>
        </div>

        {/* 今日热议 */}
        <div className="px-4">
          <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <h3 className="font-semibold text-slate-900">今日热议</h3>
              </div>
              <button className="text-xs text-blue-600 flex items-center gap-0.5">
                更多
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-1.5">
              {filteredHotDiscussions.slice(0, 3).length > 0 ? (
                filteredHotDiscussions.slice(0, 3).map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => onPostClick?.(topic.id)}
                    className="w-full flex items-start justify-between text-left hover:bg-slate-50 rounded-lg p-2 -m-2 transition-colors"
                  >
                    <div className="flex items-start gap-2 flex-1">
                      <Badge
                        className={`mt-0.5 text-xs border-0 ${
                          topic.domain === "career"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {topic.domain === "career" ? "就活" : "生活"}
                      </Badge>
                      <span className="text-sm text-slate-700 line-clamp-1 flex-1">
                        {topic.title}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">
                      {topic.replies}回复
                    </span>
                  </button>
                ))
              ) : (
                <div className="text-center py-4 text-sm text-slate-500">
                  暂无相关热议话题
                </div>
              )}
            </div>
          </div>
        </div>


        {/* 信息流内容区 */}
        <div className="bg-white border-t border-slate-200">
          <div className="px-4 py-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                {selectedChannel === "follow"
                  ? "你关注的内容"
                  : selectedChannel === "discover"
                  ? "为你推荐"
                  : "同城动态"}
              </h3>
              <span className="text-xs text-slate-500">{filteredPosts.length}条</span>
            </div>
          </div>

          <div className="px-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => {
                const isFeatured = post.featured;
                const CategoryIcon = categoryIcons[post.category] || FileText;

                return (
                  <motion.button
                    key={post.id}
                    onClick={() => onPostClick?.(post.id)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="w-full bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors text-left py-3 px-0"
                  >
                  {/* 第一行：标签信息 */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Badge
                      className={`text-[10px] px-1.5 py-0 h-4 border-0 ${
                        post.domain === "career"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {categoryLabels[post.category]}
                    </Badge>
                    {post.city && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-slate-200">
                        {cityNames[post.city]}
                      </Badge>
                    )}
                    {isFeatured && (
                      <Badge className="bg-yellow-100 text-yellow-700 border-0 text-[10px] px-1.5 py-0 h-4">
                        精选
                      </Badge>
                    )}
                  </div>

                  {/* 第二行：标题 */}
                  <h3 className="font-semibold text-[15px] text-slate-900 mb-1.5 leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {/* 第三行：摘要 */}
                  <p className="text-[13px] text-slate-600 leading-relaxed mb-2 line-clamp-2">
                    {post.summary}
                  </p>

                  {/* 第四行：公司/实体信息（轻量显示） */}
                  {post.company && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onCompanyClick?.(post.company!.name);
                      }}
                      className="flex items-center gap-2 mb-2 py-1.5 px-2 bg-slate-50 rounded border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer"
                    >
                      <span className="text-base">{post.company.logo}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-slate-900 truncate">
                          {post.company.name}
                          {post.position && <span className="text-slate-500 ml-1.5">・{post.position}</span>}
                        </div>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </div>
                  )}

                  {/* 评分信息（轻量显示） */}
                  {(post.rating || post.helpful) && (
                    <div className="flex items-center gap-3 mb-2 text-[12px]">
                      {post.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-slate-700">{post.rating}</span>
                        </div>
                      )}
                      {post.helpful && (
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3 text-green-600" />
                          <span className="font-medium text-slate-700">{post.helpful}%实用</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 第五行：作者信息 + 时间 */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onUserClick?.(post.author.id);
                      }}
                      className="cursor-pointer"
                    >
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-[10px] font-medium">
                          {post.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-center gap-1 flex-1 min-w-0 text-[12px] text-slate-500">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          onUserClick?.(post.author.id);
                        }}
                        className="font-medium text-slate-700 hover:text-blue-600 cursor-pointer truncate"
                      >
                        {post.author.name}
                      </span>
                      {post.author.verified && (
                        <CheckCircle2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
                      )}
                      {post.author.university && (
                        <span className="truncate">・{post.author.university}</span>
                      )}
                      {post.author.badges && post.author.badges.length > 0 && (
                        <Badge className="text-[10px] px-1.5 py-0 h-4 bg-green-100 text-green-700 border-0">
                          {post.author.badges[0]}
                        </Badge>
                      )}
                      <span className="ml-auto flex-shrink-0">・{post.timestamp}</span>
                    </div>
                  </div>

                  {/* 第六行：互动数据 */}
                  <div className="flex items-center gap-4 text-[12px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{post.bookmarks}</span>
                    </div>
                    <div className="flex items-center gap-1 ml-auto">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })
            ) : (
              <div className="text-center py-16 px-6">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">暂无相关内容</h3>
                <p className="text-sm text-slate-600 mb-4">
                  {selectedTags.length > 0
                    ? `还没有关于"${communityTags.find(t => t.id === selectedTags[0])?.label}"的帖子`
                    : "还没有相关内容"}
                </p>
                <button
                  onClick={() => onFunctionClick?.("publish")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  发布第一篇帖子
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}