import { motion } from "motion/react";
import { MapPin, Clock, Users, MessageCircle, Dumbbell, Coffee, Camera, Book, Utensils, Music } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Activity {
  id: string;
  purpose: string;
  icon: any;
  color: string;
  organizer: {
    name: string;
    avatar: string;
    university: string;
  };
  time: string;
  location: string;
  currentCount: number;
  maxCount: number;
  tags: string[];
  description: string;
}

const mockActivities: Activity[] = [
  {
    id: "1",
    purpose: "健身",
    icon: Dumbbell,
    color: "from-orange-500 to-red-500",
    organizer: {
      name: "健身达人小李",
      avatar: "L",
      university: "东京大学",
    },
    time: "明天 18:00",
    location: "新宿 Anytime Fitness",
    currentCount: 2,
    maxCount: 4,
    tags: ["力量训练", "新手友好"],
    description: "一起撸铁！有专业指导，适合新手，练完可以一起吃个饭~",
  },
  {
    id: "2",
    purpose: "备考",
    icon: Book,
    color: "from-blue-500 to-indigo-600",
    organizer: {
      name: "阿华",
      avatar: "H",
      university: "早稻田大学",
    },
    time: "本周六 14:00",
    location: "涉谷星巴克",
    currentCount: 3,
    maxCount: 5,
    tags: ["N1备考", "互相监督"],
    description: "找几个小伙伴一起备考N1，互相监督打卡，有学习资料可以分享！",
  },
  {
    id: "3",
    purpose: "探店",
    icon: Utensils,
    color: "from-pink-500 to-rose-500",
    organizer: {
      name: "美食家小红",
      avatar: "H",
      university: "京都大学",
    },
    time: "周日 12:00",
    location: "表参道·新开拉面店",
    currentCount: 1,
    maxCount: 3,
    tags: ["拉面", "AA制"],
    description: "听说表参道新开了一家超火的拉面店，一起去打卡！",
  },
  {
    id: "4",
    purpose: "摄影",
    icon: Camera,
    color: "from-purple-500 to-violet-600",
    organizer: {
      name: "摄影师张三",
      avatar: "Z",
      university: "大阪大学",
    },
    time: "下周末全天",
    location: "富士山五合目",
    currentCount: 4,
    maxCount: 6,
    tags: ["风光摄影", "有车"],
    description: "计划去富士山拍摄，我有车可以一起拼车，欢迎摄影爱好者！",
  },
  {
    id: "5",
    purpose: "咖啡",
    icon: Coffee,
    color: "from-amber-500 to-orange-500",
    organizer: {
      name: "咖啡控王芳",
      avatar: "W",
      university: "名古屋大学",
    },
    time: "明天 15:00",
    location: "代官山·Blue Bottle",
    currentCount: 2,
    maxCount: 4,
    tags: ["精品咖啡", "聊天交友"],
    description: "去网红咖啡店打卡，顺便认识新朋友，欢迎咖啡爱好者~",
  },
  {
    id: "6",
    purpose: "音乐",
    icon: Music,
    color: "from-teal-500 to-cyan-600",
    organizer: {
      name: "乐队主唱小明",
      avatar: "M",
      university: "庆应义塾大学",
    },
    time: "周五 19:00",
    location: "下北泽 Live House",
    currentCount: 5,
    maxCount: 8,
    tags: ["独立音乐", "现场演出"],
    description: "一起去看地下乐队演出！喜欢摇滚和独立音乐的来~",
  },
];

export function PartnerTab() {
  return (
    <div className="min-h-screen bg-slate-50 pb-[84px]">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm p-4">
        <h1 className="font-bold text-slate-900 mb-1">找搭子</h1>
        <p className="text-sm text-slate-600">发现同城活动，结识志同道合的伙伴</p>
      </div>

      <div className="p-4 space-y-3">
        {mockActivities.map((activity, index) => {
          const Icon = activity.icon;
          const isFull = activity.currentCount >= activity.maxCount;
          const fillPercentage = (activity.currentCount / activity.maxCount) * 100;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className={`bg-gradient-to-r ${activity.color} p-4`}>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{activity.purpose}</h3>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <Users className="w-3.5 h-3.5" />
                      <span>
                        {activity.currentCount}/{activity.maxCount} 人
                      </span>
                      {isFull && <Badge className="bg-white/20 text-white border-0 text-xs">已满</Badge>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {activity.organizer.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{activity.organizer.name}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {activity.organizer.university}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-slate-700 mb-3 leading-relaxed">{activity.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {activity.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{activity.location}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${fillPercentage}%` }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className={`h-full rounded-full ${
                        isFull ? "bg-slate-400" : "bg-gradient-to-r from-blue-500 to-purple-500"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    私信
                  </Button>
                  <Button size="sm" className="flex-1" disabled={isFull}>
                    {isFull ? "已满员" : "我要加入"}
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="fixed bottom-[100px] right-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl"
        >
          +
        </motion.button>
      </div>
    </div>
  );
}
