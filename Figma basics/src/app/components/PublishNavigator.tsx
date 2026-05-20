import { useState } from "react";
import {
  X, Image, Camera, MapPin, Tag, Users, Lock, Globe, Send,
  ShieldCheck, FileText, Inbox, BookOpen, ChevronRight, AlertCircle,
  MessageCircle, HelpCircle, Home as HomeIcon, Briefcase, Package,
  GraduationCap, CreditCard, Coffee, ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "./ui/badge";
import { bigTreeholes, smallTreeholes, BigTreehole, SmallTreehole } from "../data/treehole";

type PublishType = "post" | "treehole";
type ViewState = "home" | "select-treehole" | "select-post-type" | "compose" | "drafts" | "rules";

interface PostType {
  id: string;
  label: string;
  icon: any;
  description: string;
  color: string;
}

interface Draft {
  id: string;
  type: "post" | "treehole";
  title?: string;
  content: string;
  category?: string;
  treehole?: string;
  savedAt: string;
}

// 帖子类型选项
const postTypes: PostType[] = [
  { id: "experience", label: "经验分享", icon: FileText, description: "分享留学、求职、生活经验", color: "from-blue-500 to-blue-600" },
  { id: "question", label: "提问求助", icon: HelpCircle, description: "寻求建议和帮助", color: "from-purple-500 to-purple-600" },
  { id: "rental", label: "租房", icon: HomeIcon, description: "房源推荐、转租、合租信息", color: "from-green-500 to-green-600" },
  { id: "job", label: "求职", icon: Briefcase, description: "内推、面经、求职交流", color: "from-orange-500 to-orange-600" },
  { id: "secondhand", label: "二手", icon: Package, description: "闲置物品交易", color: "from-pink-500 to-pink-600" },
  { id: "course", label: "选课", icon: GraduationCap, description: "课程推荐、选课经验", color: "from-indigo-500 to-indigo-600" },
  { id: "visa", label: "签证", icon: CreditCard, description: "签证办理经验分享", color: "from-teal-500 to-teal-600" },
  { id: "life", label: "生活", icon: Coffee, description: "日常生活、美食、旅游", color: "from-amber-500 to-amber-600" },
];

// 模拟用户已加入的树洞ID列表（实际应从用户数据中获取）
const joinedTreeholeIds = [
  "bt1", // 东京大学树洞
  "bt4", // 东京地区树洞
  "bt5", // 大阪地区树洞
  "st2", // 深夜吐槽树洞
  "st4", // 饭搭子树洞
  "st6", // 租房避坑树洞
  "st8", // 游戏树洞
];

// 根据用户已加入ID过滤大树洞
const joinedBigTreeholes = bigTreeholes.filter(th => joinedTreeholeIds.includes(th.id));

// 根据用户已加入ID过滤小树洞
const joinedSmallTreeholes = smallTreeholes.filter(th => joinedTreeholeIds.includes(th.id));

// 模拟草稿数据
const mockDrafts: Draft[] = [
  {
    id: "d1",
    type: "post",
    title: "东京租房避坑经验分享",
    content: "刚在东京租到房子，有一些经验想跟大家分享。首先是关于初期费用...",
    category: "租房",
    savedAt: "2小时前"
  },
  {
    id: "d2",
    type: "treehole",
    content: "最近面试压力好大，连续被拒了三家公司...",
    treehole: "求职emo",
    savedAt: "昨天 18:30"
  },
  {
    id: "d3",
    type: "post",
    title: "早稻田大学选课攻略",
    content: "作为一名早大的学生，我想分享一下选课的一些技巧...",
    category: "选课",
    savedAt: "3天前"
  },
];

interface PublishNavigatorProps {
  onClose: () => void;
}

export function PublishNavigator({ onClose }: PublishNavigatorProps) {
  const [viewState, setViewState] = useState<ViewState>("home");
  const [publishType, setPublishType] = useState<PublishType | null>(null);
  const [selectedTreehole, setSelectedTreehole] = useState<{ id: string; name: string; icon: string } | null>(null);
  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(null);
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handlePublishTypeSelect = (type: PublishType) => {
    setPublishType(type);
    if (type === "treehole") {
      setViewState("select-treehole");
      setIsAnonymous(true); // 默认匿名
    } else {
      setViewState("select-post-type");
    }
  };

  const handleBigTreeholeSelect = (treehole: BigTreehole) => {
    setSelectedTreehole({ id: treehole.id, name: treehole.name, icon: treehole.icon });
    setViewState("compose");
  };

  const handleSmallTreeholeSelect = (treehole: SmallTreehole) => {
    // 小树洞没有icon字段，根据mode生成图标
    const icon = treehole.mode === "confession" ? "💭" : "🤝";
    setSelectedTreehole({ id: treehole.id, name: treehole.name, icon });
    setViewState("compose");
  };

  const handlePostTypeSelect = (postType: PostType) => {
    setSelectedPostType(postType);
    setViewState("compose");
  };

  const handleBack = () => {
    if (viewState === "compose") {
      if (publishType === "treehole") {
        setViewState("select-treehole");
        setContent("");
      } else {
        setViewState("select-post-type");
        setContent("");
      }
    } else if (viewState === "select-treehole" || viewState === "select-post-type" || viewState === "drafts" || viewState === "rules") {
      setViewState("home");
      setPublishType(null);
      setSelectedTreehole(null);
      setSelectedPostType(null);
      setIsAnonymous(false);
    } else {
      onClose();
    }
  };

  const handlePublish = () => {
    // TODO: 实现发布逻辑
    console.log("Publishing:", {
      type: publishType,
      treehole: selectedTreehole,
      postType: selectedPostType,
      content,
      isAnonymous
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <AnimatePresence mode="wait">
        {viewState === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col"
          >
            {/* 顶部栏 */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200">
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-slate-700" />
              </button>
              <h2 className="font-semibold text-slate-900">创建内容</h2>
              <div className="w-9" />
            </div>

            {/* 发布入口 */}
            <div className="flex-1 overflow-y-auto px-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handlePublishTypeSelect("post")}
                className="w-full mb-4 p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">发布帖子</h3>
                      <div className="h-px w-3 bg-slate-300" />
                      <div className="flex items-center gap-1 text-blue-600">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">以认证身份发布</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">分享留学经验、租房、选课、求职、生活日常</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-3" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handlePublishTypeSelect("treehole")}
                className="w-full mb-6 p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">树洞发帖</h3>
                      <div className="h-px w-3 bg-slate-300" />
                      <span className="text-xs font-medium text-purple-600">可匿名 / 认证身份发布</span>
                    </div>
                    <p className="text-sm text-slate-600">在已加入的树洞中倾诉、求助或交流</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-3" />
                </div>
              </motion.button>

              {/* 辅助功能入口 */}
              <div className="space-y-2">
                <button
                  onClick={() => setViewState("drafts")}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <Inbox className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-slate-900 text-sm">草稿箱</h4>
                      <p className="text-xs text-slate-500">查看未完成的内容</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{mockDrafts.length}</Badge>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>

                <button
                  onClick={() => setViewState("rules")}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-slate-900 text-sm">发布规则</h4>
                      <p className="text-xs text-slate-500">了解社区规范</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* 说明提示 */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-blue-700 leading-relaxed">
                    <p className="font-medium mb-1">发布须知</p>
                    <p className="text-blue-600">普通帖子需以认证身份发布，前台显示昵称+学校认证标签；树洞支持匿名，但必须发布到已加入的树洞并遵守社区规范。</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {viewState === "select-treehole" && (
          <motion.div
            key="select-treehole"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col bg-slate-50"
          >
            {/* 顶部栏 */}
            <div className="px-4 py-3 flex items-center border-b border-slate-200 bg-white">
              <button onClick={handleBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors -ml-2">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <h2 className="font-semibold text-slate-900 ml-2">选择树洞</h2>
            </div>

            {/* 树洞列表 */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
              {(joinedBigTreeholes.length > 0 || joinedSmallTreeholes.length > 0) ? (
                <div className="space-y-6">
                  {/* 大树洞区域 */}
                  {joinedBigTreeholes.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-1">
                        <h3 className="text-sm font-semibold text-slate-700">大树洞</h3>
                        <span className="text-xs text-slate-500">{joinedBigTreeholes.length}个</span>
                      </div>
                      <div className="space-y-3">
                        {joinedBigTreeholes.map((treehole) => {
                          const categoryLabel = treehole.type === "school" ? "学校树洞" : "地区树洞";
                          return (
                            <motion.button
                              key={treehole.id}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleBigTreeholeSelect(treehole)}
                              className="w-full relative overflow-hidden bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition-all text-left p-5"
                            >
                              <div className="relative">
                                {/* 顶部：图标+名称+箭头 */}
                                <div className="flex items-start gap-3 mb-3">
                                  <div className={`w-12 h-12 rounded-xl ${treehole.iconBgColor} flex items-center justify-center text-2xl shadow-sm flex-shrink-0`}>
                                    {treehole.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-bold text-slate-900">{treehole.name}</h3>
                                      <div className="h-px w-2 bg-slate-300" />
                                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-slate-300">
                                        {categoryLabel}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{treehole.description}</p>
                                  </div>
                                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-3" />
                                </div>

                                {/* 成员数据 */}
                                <div className="flex items-center gap-4 mb-3 text-xs text-slate-500">
                                  <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    <span>{treehole.activeUsers} 在线</span>
                                  </div>
                                </div>

                                {/* 热门话题标签 */}
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {treehole.hotTags.slice(0, 4).map((topic, index) => (
                                    <Badge key={index} variant="secondary" className="text-[10px] px-2 py-0.5 h-5 bg-slate-100 text-slate-700">
                                      # {topic}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 小树洞区域 */}
                  {joinedSmallTreeholes.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3 px-1">
                        <h3 className="text-sm font-semibold text-slate-700">小树洞</h3>
                        <span className="text-xs text-slate-500">{joinedSmallTreeholes.length}个</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {joinedSmallTreeholes.map((treehole) => {
                          const displayTags = [];
                          if (treehole.isAnonymous) {
                            displayTags.push("匿名");
                          }
                          if (treehole.mode === "confession") {
                            displayTags.push("倾诉");
                          } else if (treehole.mode === "social") {
                            displayTags.push("搭子");
                          }
                          if (treehole.validUntil === "长期有效") {
                            displayTags.push("长期有效");
                          }

                          // 根据mode选择图标
                          const icon = treehole.mode === "confession" ? "💭" : "🤝";

                          return (
                            <motion.button
                              key={treehole.id}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleSmallTreeholeSelect(treehole)}
                              className="w-full bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all text-left p-4"
                            >
                              <div className="flex items-start gap-3">
                                <div className="text-2xl flex-shrink-0">{icon}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-slate-900 text-sm">{treehole.name}</h4>
                                  </div>
                                  <p className="text-xs text-slate-500 mb-2">来自 {treehole.belongToName}</p>
                                  <p className="text-xs text-slate-600 leading-relaxed mb-2">{treehole.description}</p>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {displayTags.map((tag, index) => (
                                      <Badge
                                        key={index}
                                        className={`text-[10px] px-1.5 py-0 h-4 border-0 ${
                                          tag === "匿名"
                                            ? "bg-purple-100 text-purple-700"
                                            : tag === "倾诉"
                                            ? "bg-pink-100 text-pink-700"
                                            : tag === "搭子"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-slate-100 text-slate-700"
                                        }`}
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                    <span className="text-[10px] text-slate-500 ml-1">{treehole.members} 成员</span>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">还没有加入树洞</h3>
                  <p className="text-sm text-slate-600 mb-6">先去发现感兴趣的树洞吧</p>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                    去加入树洞
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {viewState === "select-post-type" && (
          <motion.div
            key="select-post-type"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
          >
            {/* 顶部栏 */}
            <div className="px-4 py-3 flex items-center border-b border-slate-200">
              <button onClick={handleBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors -ml-2">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <h2 className="font-semibold text-slate-900 ml-2">选择帖子类型</h2>
            </div>

            {/* 类型列表 */}
            <div className="flex-1 overflow-y-auto px-4 pt-4">
              <div className="grid grid-cols-2 gap-3">
                {postTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePostTypeSelect(type)}
                      className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-3 shadow-sm`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-1">{type.label}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{type.description}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {viewState === "compose" && (
          <motion.div
            key="compose"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
          >
            {/* 顶部栏 */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-slate-200">
              <button onClick={handleBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <h2 className="font-semibold text-slate-900">
                {publishType === "post" ? selectedPostType?.label : selectedTreehole?.name}
              </h2>
              <button
                onClick={handlePublish}
                disabled={!content.trim()}
                className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
              >
                发布
              </button>
            </div>

            {/* 内容编辑区 */}
            <div className="flex-1 overflow-y-auto px-4 pt-4">
              {/* 树洞发布身份选择 */}
              {publishType === "treehole" && selectedTreehole && (
                <div className="mb-4 p-4 bg-purple-50 rounded-xl border border-purple-200/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{selectedTreehole.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{selectedTreehole.name}</div>
                        <div className="text-xs text-slate-600">选择发布身份</div>
                      </div>
                    </div>
                  </div>

                  {/* 匿名/认证开关 */}
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-purple-200/50">
                    <div className="flex items-center gap-2">
                      {isAnonymous ? (
                        <>
                          <Lock className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-slate-900">匿名发布</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-slate-900">认证身份发布</span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => setIsAnonymous(!isAnonymous)}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        isAnonymous ? "bg-purple-500" : "bg-blue-500"
                      }`}
                    >
                      <motion.div
                        layout
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
                        animate={{ left: isAnonymous ? "4px" : "calc(100% - 24px)" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>

                  {/* 匿名提示 */}
                  {isAnonymous && (
                    <div className="flex items-start gap-2 mt-2 text-xs text-purple-700">
                      <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <p>匿名仅对其他用户隐藏身份，平台仍会进行安全审核</p>
                    </div>
                  )}
                </div>
              )}

              {/* 普通帖子认证提示 */}
              {publishType === "post" && (
                <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200/50">
                  <div className="flex items-center gap-2 text-blue-700">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-sm font-medium">以认证身份发布</span>
                    <span className="text-xs text-blue-600 ml-auto">前台展示昵称 + 学校认证</span>
                  </div>
                </div>
              )}

              {/* 文本输入 */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={
                  publishType === "post"
                    ? `分享你的${selectedPostType?.label}经验...`
                    : "说出你的心声..."
                }
                className="w-full min-h-[200px] resize-none text-[16px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none"
                autoFocus
              />
            </div>

            {/* 底部工具栏 */}
            <div className="border-t border-slate-200 px-4 py-3">
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Image className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Tag className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <MapPin className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="h-[env(safe-area-inset-bottom)]" />
            </div>
          </motion.div>
        )}

        {viewState === "drafts" && (
          <motion.div
            key="drafts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col bg-slate-50"
          >
            {/* 顶部栏 */}
            <div className="px-4 py-3 flex items-center border-b border-slate-200 bg-white">
              <button onClick={handleBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors -ml-2">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <h2 className="font-semibold text-slate-900 ml-2">草稿箱</h2>
              <span className="ml-auto text-xs text-slate-500">{mockDrafts.length} 篇草稿</span>
            </div>

            {/* 草稿列表 */}
            <div className="flex-1 overflow-y-auto px-4 pt-4">
              {mockDrafts.length > 0 ? (
                <div className="space-y-3">
                  {mockDrafts.map((draft) => (
                    <div
                      key={draft.id}
                      className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all"
                    >
                      {/* 草稿类型标签 */}
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className={`text-[10px] px-2 py-0.5 h-5 border-0 ${
                            draft.type === "post"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {draft.type === "post" ? "普通帖子" : "树洞"}
                        </Badge>
                        {draft.category && (
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5 h-5">
                            {draft.category}
                          </Badge>
                        )}
                        {draft.treehole && (
                          <Badge variant="outline" className="text-[10px] px-2 py-0.5 h-5">
                            {draft.treehole}
                          </Badge>
                        )}
                      </div>

                      {/* 标题（如果有） */}
                      {draft.title && (
                        <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1">{draft.title}</h3>
                      )}

                      {/* 内容预览 */}
                      <p className="text-sm text-slate-600 leading-relaxed mb-3 line-clamp-2">
                        {draft.content}
                      </p>

                      {/* 底部操作栏 */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-500">{draft.savedAt}</span>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            删除
                          </button>
                          <button className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:shadow-md transition-all">
                            继续编辑
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Inbox className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">暂无草稿</h3>
                  <p className="text-sm text-slate-600">编辑中的内容会自动保存在这里</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {viewState === "rules" && (
          <motion.div
            key="rules"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col bg-slate-50"
          >
            {/* 顶部栏 */}
            <div className="px-4 py-3 flex items-center border-b border-slate-200 bg-white">
              <button onClick={handleBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors -ml-2">
                <ArrowLeft className="w-5 h-5 text-slate-700" />
              </button>
              <h2 className="font-semibold text-slate-900 ml-2">发布规则</h2>
            </div>

            {/* 规则内容 */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
              {/* 普通帖子规则 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">普通帖子</h3>
                    <p className="text-sm text-slate-600">需以认证身份发布</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 mb-1">身份展示</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        前台展示昵称 + 学校认证标签，不会显示真实姓名
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 mb-1">适用内容</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        经验分享、提问求助、租房信息、求职交流、选课推荐、签证办理、二手交易、生活日常等
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 树洞发帖规则 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-4">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">树洞发帖</h3>
                    <p className="text-sm text-slate-600">可选匿名或认证身份</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Lock className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 mb-1">匿名机制</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        匿名仅对其他用户隐藏身份，平台仍会进行安全审核和违规追溯
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 mb-1">发布范围</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        必须发布到已加入的树洞中，内容仅在该树洞内可见
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 mb-1">认证发布</p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        也可选择以认证身份发布，展示昵称 + 认证标签，提升可信度
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 禁止内容 */}
              <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">禁止发布内容</h3>
                    <p className="text-sm text-red-700">违规内容将被删除，严重者封号处理</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-slate-900">
                    <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>人身攻击、辱骂、骚扰等言论</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-900">
                    <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>泄露他人隐私、未经同意公开个人信息</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-900">
                    <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>虚假信息、恶意造谣、诈骗信息</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-900">
                    <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>恶意广告、引流推广、刷屏灌水</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-900">
                    <X className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>违法违规内容、色情暴力、政治敏感话题</span>
                  </div>
                </div>
              </div>

              {/* 底部提示 */}
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    我们致力于营造友善、真实、有价值的留学生交流社区。请遵守社区规范，共同维护良好的讨论氛围。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
