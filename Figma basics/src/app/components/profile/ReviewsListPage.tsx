import { ArrowLeft, Heart, Star } from "lucide-react";
import { Badge } from "../ui/badge";

interface ReviewsListPageProps {
  onBack: () => void;
  onContentClick: (id: string) => void;
}

export function ReviewsListPage({ onBack, onContentClick }: ReviewsListPageProps) {
  const mockReviews = [
    {
      id: "3",
      category: "就活",
      title: "外资实习投递经验",
      description: "投了20家的经验分享",
      likes: 178,
      rating: 4.5,
      emoji: "💼",
      gradient: "from-blue-100 to-cyan-100",
    },
  ];

  return (
    <div className="flex h-full flex-col bg-gray-50">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">我的评价</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-3">
          {mockReviews.map((review) => (
            <button
              key={review.id}
              onClick={() => onContentClick(review.id)}
              className="w-full overflow-hidden rounded-xl bg-white text-left shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`h-24 bg-gradient-to-br ${review.gradient} relative flex items-center justify-center`}>
                <span className="text-4xl">{review.emoji}</span>
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 backdrop-blur-sm">
                  <Star className="size-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs font-semibold text-gray-900">{review.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-1">
                  <Badge variant="secondary" className="text-xs">{review.category}</Badge>
                </div>
                <h4 className="font-semibold text-gray-900">{review.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{review.description}</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Heart className="size-4" />
                    {review.likes}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
