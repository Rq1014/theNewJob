import { ArrowLeft, Heart, MessageCircle, UserPlus, Star } from "lucide-react";
import { Badge } from "../ui/badge";

interface NotificationsPageProps {
  onBack: () => void;
}

type NotificationType = "like" | "comment" | "follow" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  { id: "1", type: "like", message: "有 3 人点赞了你的评价", time: "2小时前", isRead: false },
  { id: "2", type: "comment", message: '你发布的"东大健身搭子"新增 2 条评论', time: "5小时前", isRead: false },
  { id: "3", type: "follow", message: "小李同学关注了你", time: "1天前", isRead: true },
  { id: "4", type: "system", message: "你的资料完整度提升至75%", time: "2天前", isRead: true },
];

export function NotificationsPage({ onBack }: NotificationsPageProps) {
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "like":
        return <Heart className="size-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="size-5 text-blue-500" />;
      case "follow":
        return <UserPlus className="size-5 text-green-500" />;
      case "system":
        return <Star className="size-5 text-yellow-500" />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">消息通知</h1>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          全部已读
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-2">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl bg-white p-4 shadow-sm ${!notification.isRead ? "border-l-4 border-blue-500" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-50">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notification.isRead ? "font-medium text-gray-900" : "text-gray-700"}`}>
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                </div>
                {!notification.isRead && (
                  <div className="size-2 shrink-0 rounded-full bg-blue-500"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
