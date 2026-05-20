import { ArrowLeft, Heart } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "motion/react";

interface FavoritesListPageProps {
  onBack: () => void;
  onContentClick: (id: string) => void;
}

const mockFavorites = [
  {
    id: "2",
    category: "探店",
    title: "池袋自习咖啡馆推荐",
    description: "适合学习的安静咖啡店",
    likes: 412,
    emoji: "☕",
    gradient: "from-pink-100 to-rose-100",
  },
];

export function FavoritesListPage({ onBack, onContentClick }: FavoritesListPageProps) {
  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">我的收藏</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {mockFavorites.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => onContentClick(item.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full overflow-hidden rounded-xl bg-white text-left shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`h-24 bg-gradient-to-br ${item.gradient} relative flex items-center justify-center`}>
                <span className="text-4xl">{item.emoji}</span>
              </div>
              <div className="p-4">
                <div className="mb-1">
                  <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                </div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart className="size-4" />
                    {item.likes}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
