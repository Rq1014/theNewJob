import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "../ui/badge";

interface HistoryPageProps {
  onBack: () => void;
}

export function HistoryPage({ onBack }: HistoryPageProps) {
  const mockHistory = [
    { id: "1", title: "东京租房避坑指南", category: "租房", time: "2小时前" },
    { id: "2", title: "日本留学生活分享", category: "生活", time: "5小时前" },
    { id: "3", title: "东大修士申请经验", category: "申请", time: "1天前" },
  ];

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">浏览历史</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-2">
          {mockHistory.map((item) => (
            <div key={item.id} className="rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="mb-1">
                    <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                  </div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="size-3" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
