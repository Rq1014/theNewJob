import { ArrowLeft, FileEdit, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

interface DraftsPageProps {
  onBack: () => void;
}

export function DraftsPage({ onBack }: DraftsPageProps) {
  const mockDrafts = [
    { id: "1", title: "大阪周末游玩攻略", category: "旅游", updatedAt: "2小时前" },
    { id: "2", title: "日语N1备考经验", category: "学习", updatedAt: "1天前" },
  ];

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">草稿箱</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {mockDrafts.length === 0 ? (
          <div className="rounded-xl bg-white py-12 text-center shadow-sm">
            <FileEdit className="mx-auto size-12 text-gray-300" />
            <p className="mt-3 text-sm text-gray-500">暂无草稿</p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockDrafts.map((draft) => (
              <div key={draft.id} className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="mb-1">
                      <Badge variant="secondary" className="text-xs">{draft.category}</Badge>
                    </div>
                    <h4 className="font-medium text-gray-900">{draft.title}</h4>
                    <p className="mt-1 text-xs text-gray-500">最后编辑：{draft.updatedAt}</p>
                  </div>
                  <button className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
