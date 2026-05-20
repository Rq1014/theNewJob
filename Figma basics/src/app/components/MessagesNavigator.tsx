import { useState } from "react";
import {
  ArrowLeft,
  Search,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "./ui/badge";

type View = "list" | "chat";
type MessageCategory = "all" | "chat" | "interaction" | "system" | "resources" | "institution";
type MessageType = "chat" | "comment" | "like" | "system" | "resource" | "institution" | "activity";

interface Message {
  id: string;
  type: MessageType;
  userName: string;
  avatar: string;
  userBadge?: string;
  lastMessage: string;
  time: string;
  unread: number;
  online?: boolean;
  category: MessageCategory;
}

interface ChatMessage {
  id: string;
  fromMe: boolean;
  content: string;
  time: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    type: "chat",
    userName: "小林",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=xiaolin",
    userBadge: "",
    lastMessage: "明天一起去新大久保吃火锅吗？",
    time: "10:23",
    unread: 2,
    online: true,
    category: "chat",
  },
  {
    id: "2",
    type: "institution",
    userName: "名门升学私塾·田中老师",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=juku",
    userBadge: "机构",
    lastMessage: "关于你的研究计划书，我这边已经看完了，整体框架不错，但第二章需要补充一些最新的文献...",
    time: "1小时前",
    unread: 1,
    online: false,
    category: "institution",
  },
  {
    id: "3",
    type: "resource",
    userName: "张学长",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang",
    userBadge: "资料",
    lastMessage: "你分享的东大情报理工2023过去问我看到了，太有用了！",
    time: "2小时前",
    unread: 0,
    online: true,
    category: "resources",
  },
  {
    id: "4",
    type: "comment",
    userName: "王同学",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wang",
    userBadge: "",
    lastMessage: "你关注的租房帖子有新回复：目黑区1K房间已出租",
    time: "5小时前",
    unread: 0,
    online: false,
    category: "interaction",
  },
  {
    id: "5",
    type: "activity",
    userName: "东京留学生会",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=activity",
    userBadge: "活动",
    lastMessage: "本周同城聚餐活动已更新：12月23日新宿烤肉，已有15人报名",
    time: "昨天",
    unread: 1,
    online: false,
    category: "interaction",
  },
  {
    id: "6",
    type: "chat",
    userName: "李华",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lihua",
    userBadge: "",
    lastMessage: "周末去代代木公园散步吗？听说樱花快开了",
    time: "昨天",
    unread: 0,
    online: true,
    category: "chat",
  },
  {
    id: "7",
    type: "system",
    userName: "平台通知",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=system",
    userBadge: "系统",
    lastMessage: "你的机构评价「名门升学私塾」获得了5个「有帮助」",
    time: "2天前",
    unread: 0,
    online: false,
    category: "system",
  },
  {
    id: "8",
    type: "chat",
    userName: "赵同学",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zhao",
    userBadge: "",
    lastMessage: "便利店打工面试通过了！谢谢你的建议",
    time: "2天前",
    unread: 0,
    online: false,
    category: "chat",
  },
  {
    id: "9",
    type: "resource",
    userName: "资料库",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=library",
    userBadge: "资料",
    lastMessage: "平台新增早稻田大学经济学研究科2024年过去问（含解析）",
    time: "3天前",
    unread: 0,
    online: false,
    category: "resources",
  },
  {
    id: "10",
    type: "comment",
    userName: "刘同学",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=liu",
    userBadge: "",
    lastMessage: "评论了你的帖子：签证更新要提前3个月准备哦",
    time: "3天前",
    unread: 0,
    online: false,
    category: "interaction",
  },
  {
    id: "11",
    type: "chat",
    userName: "陈学姐",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=chen",
    userBadge: "",
    lastMessage: "我的二手自行车还在，要的话周末来取吧",
    time: "4天前",
    unread: 0,
    online: false,
    category: "chat",
  },
  {
    id: "12",
    type: "institution",
    userName: "东京精英私塾",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elite",
    userBadge: "机构",
    lastMessage: "您好，关于EJU数学课程的咨询我们已收到，12月开新班...",
    time: "5天前",
    unread: 0,
    online: false,
    category: "institution",
  },
];

const mockChatMessages: ChatMessage[] = [
  { id: "1", fromMe: false, content: "你好，请问你也在准备面试吗？", time: "09:15" },
  { id: "2", fromMe: true, content: "是的，正在准备秋招", time: "09:16" },
  { id: "3", fromMe: false, content: "明天一起去图书馆吗？", time: "10:23" },
];

export function MessagesNavigator() {
  const [view, setView] = useState<View>("list");
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);

  const handleChatClick = (message: Message) => {
    setSelectedChat(message);
    setView("chat");
  };

  const handleBack = () => {
    setView("list");
    setSelectedChat(null);
  };

  if (view === "chat" && selectedChat) {
    return (
      <div className="h-screen flex flex-col bg-slate-50">
        {/* 聊天顶部栏 */}
        <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button onClick={handleBack} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <img src={selectedChat.avatar} alt="" className="w-9 h-9 rounded-full" />
            <div>
              <div className="font-medium text-slate-900">{selectedChat.userName}</div>
              <div className="text-xs text-slate-500">{selectedChat.online ? "在线" : "离线"}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Phone className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Video className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* 聊天内容区域 */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {mockChatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] ${msg.fromMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl ${
                    msg.fromMe
                      ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-br-md"
                      : "bg-white text-slate-900 rounded-bl-md shadow-sm border border-slate-200"
                  }`}
                >
                  <p className="text-[15px] leading-relaxed">{msg.content}</p>
                </div>
                <span className="text-xs text-slate-400 px-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 输入框 */}
        <div className="bg-white border-t border-slate-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="发送消息..."
              className="flex-1 bg-slate-100 rounded-full px-4 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full font-medium text-[15px] hover:shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95">
              发送
            </button>
          </div>
        </div>
        <div className="h-[env(safe-area-inset-bottom)] bg-white" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* 顶部栏 */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-900">消息</h1>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜索聊天记录、用户或资料"
            className="w-full bg-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto pb-20">
        {mockMessages.map((message, index) => (
          <motion.button
            key={message.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
            onClick={() => handleChatClick(message)}
            className="w-full px-4 py-3 flex items-start gap-3 hover:bg-slate-50 active:bg-slate-100 transition-colors border-b border-slate-100"
          >
            {/* 头像 */}
            <div className="relative flex-shrink-0">
              <img src={message.avatar} alt="" className="w-12 h-12 rounded-full" />
              {message.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            {/* 内容 */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <span className="font-medium text-slate-900 truncate">{message.userName}</span>
                  {message.userBadge && (
                    <Badge
                      className={`flex-shrink-0 text-[10px] px-1.5 py-0 border-0 ${
                        message.userBadge === "机构"
                          ? "bg-emerald-100 text-emerald-700"
                          : message.userBadge === "活动"
                          ? "bg-orange-100 text-orange-700"
                          : message.userBadge === "资料"
                          ? "bg-purple-100 text-purple-700"
                          : message.userBadge === "系统"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {message.userBadge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{message.time}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-slate-600 line-clamp-1 flex-1">{message.lastMessage}</p>
                {message.unread > 0 && (
                  <span className="flex-shrink-0 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-xs rounded-full font-medium">
                    {message.unread}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
