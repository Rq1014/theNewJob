import { motion } from "motion/react";
import { Heart, CheckCircle2, MapPin, Shield } from "lucide-react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";

export interface Post {
  id: string;
  image: {
    color: string;
    emoji: string;
    aspectRatio: number;
  };
  categoryTag: string;
  categoryColor: string;
  title: string;
  tags: string[];
  category: string;
  author: {
    name: string;
    avatar: string;
    university: string;
    isVerified: boolean;
  };
  likes: number;
  location: string;
  audienceTag?: string;
  verificationBadge?: string;
}

interface PostCardProps {
  post: Post;
  index: number;
  onPostClick: (postId: string) => void;
  showLocation?: boolean;
}

export function PostCard({ post, index, onPostClick, showLocation = false }: PostCardProps) {
  return (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onPostClick(post.id)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-all cursor-pointer"
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          backgroundColor: post.image.color,
          aspectRatio: post.image.aspectRatio,
        }}
      >
        <span className="text-6xl">{post.image.emoji}</span>

        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <div
            className={`${post.categoryColor} text-white px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm bg-opacity-90`}
          >
            {post.categoryTag}
          </div>
        </div>

        {post.verificationBadge && (
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-1 bg-blue-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
              <Shield className="w-3 h-3" />
              {post.verificationBadge}
            </div>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-bold text-base text-slate-900 line-clamp-2 mb-2 leading-tight">
          {post.title}
        </h3>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {showLocation && (
            <div className="flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
              <MapPin className="w-3 h-3" />
              <span>{post.location.split("·")[1] || post.location}</span>
            </div>
          )}

          {post.audienceTag && (
            <Badge variant="outline" className="text-xs border-orange-300 text-orange-700 bg-orange-50">
              {post.audienceTag}
            </Badge>
          )}

          {post.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Avatar className="w-5 h-5 flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                {post.author.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-xs text-slate-700 truncate font-medium">
                {post.author.name}
              </span>
              {post.author.isVerified && (
                <CheckCircle2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-500 flex-shrink-0">
            <Heart className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{post.likes}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}