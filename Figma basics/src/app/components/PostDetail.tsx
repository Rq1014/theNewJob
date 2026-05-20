import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Heart,
  Bookmark,
  MessageCircle,
  MapPin,
  MoreHorizontal,
  CheckCircle2,
  Shield,
  Send,
  Share2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Post, postComments } from "../data/posts";

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

export function PostDetail({ post, onBack }: PostDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentText, setCommentText] = useState("");

  const comments = postComments[post.id] || [];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleSendComment = () => {
    if (commentText.trim()) {
      // 这里可以添加发送评论的逻辑
      setCommentText("");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>

          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-medium">
              {post.author.avatar}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900 text-sm truncate">
                {post.author.name}
              </span>
              {post.author.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-slate-500 truncate">{post.author.university}</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:text-white"
          >
            + 关注
          </Button>

          <button className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="flex-1 overflow-y-auto">
        {/* 图片轮播 */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            <div className="flex">
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 snap-center"
                  style={{ aspectRatio: "3/4" }}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: image.color }}
                  >
                    <span className="text-9xl">{image.emoji}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 图片指示器 */}
          {post.images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
              {currentImageIndex + 1} / {post.images.length}
            </div>
          )}
        </div>

        {/* 帖子内容 */}
        <div className="p-4 space-y-4">
          {/* 标题和标签 */}
          <div>
            <h1 className="font-bold text-xl text-slate-900 mb-3 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge className={`${post.categoryColor} text-white border-0 shadow-sm`}>
                {post.categoryTag}
              </Badge>

              {post.verificationBadge && (
                <Badge className="bg-blue-600 text-white border-0 gap-1 shadow-sm">
                  <Shield className="w-3 h-3" />
                  {post.verificationBadge}
                </Badge>
              )}

              {post.audienceTag && (
                <Badge
                  variant="outline"
                  className="border-orange-300 text-orange-700 bg-orange-50"
                >
                  {post.audienceTag}
                </Badge>
              )}
            </div>

            {/* 位置信息 */}
            <div className="flex items-center gap-1.5 text-slate-600 text-sm mb-4">
              <MapPin className="w-4 h-4" />
              <span>{post.location}</span>
            </div>

            {/* 正文内容 */}
            <div className="text-slate-700 leading-relaxed whitespace-pre-line text-[15px] space-y-2">
              {post.content}
            </div>

            {/* 标签列表 */}
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <button
                  key={tag}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1 rounded-full transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* 互动数据 */}
          <div className="flex items-center gap-4 py-3 border-y border-slate-200">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-700 font-medium">{likeCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-700 font-medium">{comments.length}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-700 font-medium">收藏</span>
            </div>
          </div>

          {/* 评论区 */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg text-slate-900">
              评论 <span className="text-slate-500 font-normal">{comments.length}</span>
            </h2>

            <div className="space-y-5">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <Avatar className="w-9 h-9 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-medium">
                      {comment.author.avatar}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-semibold text-slate-900 text-sm">
                        {comment.author.name}
                      </span>
                      {comment.author.isOP && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0"
                        >
                          楼主
                        </Badge>
                      )}
                      {comment.author.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                      )}
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed mb-2">
                      {comment.content}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{comment.timestamp}</span>
                      <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                        <Heart className="w-3.5 h-3.5" />
                        <span>{comment.likes}</span>
                      </button>
                      <button className="hover:text-blue-600 transition-colors font-medium">
                        回复
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {comments.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">暂无评论，快来抢沙发~</p>
              </div>
            )}
          </div>

          {/* 底部留白 */}
          <div className="h-24" />
        </div>
      </div>

      {/* 底部固定操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div className="px-4 py-3">
          <div className="flex items-center gap-2">
            {/* 评论输入框 */}
            <div className="flex-1 relative">
              <Input
                placeholder="说点什么..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendComment();
                  }
                }}
                className="rounded-full h-10 pl-4 pr-12 bg-slate-100 border-0 focus-visible:ring-2 focus-visible:ring-orange-500"
              />
              {commentText.trim() && (
                <button
                  onClick={handleSendComment}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 点赞按钮 */}
            <button
              onClick={handleLike}
              className={`p-2.5 rounded-full transition-all ${
                isLiked
                  ? "bg-red-50"
                  : "hover:bg-slate-100 active:scale-95"
              }`}
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  isLiked ? "fill-red-500 text-red-500 scale-110" : "text-slate-600"
                }`}
              />
            </button>

            {/* 收藏按钮 */}
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2.5 rounded-full transition-all ${
                isSaved
                  ? "bg-yellow-50"
                  : "hover:bg-slate-100 active:scale-95"
              }`}
            >
              <Bookmark
                className={`w-5 h-5 transition-all ${
                  isSaved
                    ? "fill-yellow-500 text-yellow-500 scale-110"
                    : "text-slate-600"
                }`}
              />
            </button>

            {/* 分享按钮 */}
            <button className="p-2.5 rounded-full hover:bg-slate-100 transition-all active:scale-95">
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}