import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  MapPin,
  Clock,
  CheckCircle2,
  ThumbsUp,
  Star,
  MoreVertical,
  Send,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { JapanCommunityPost } from "../../data/japan-community";
import { categoryIcons, categoryLabels } from "./utils";

interface PostDetailPageProps {
  post: JapanCommunityPost;
  onBack: () => void;
  onUserClick: (userId: string) => void;
  onSchoolClick: (schoolName: string) => void;
  onCompanyClick: (companyName: string) => void;
  onTagClick: (tag: string) => void;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Reply[];
}

interface Reply {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  replyTo: string;
}

const mockComments: Comment[] = [
  {
    id: "c1",
    author: { name: "热心网友", avatar: "R", verified: true },
    content: "感谢分享！这个信息太有用了，正好我也在准备这个公司的面试。",
    timestamp: "1小时前",
    likes: 23,
    replies: [
      {
        id: "r1",
        author: { name: "楼主", avatar: "L", verified: false },
        content: "加油！有问题随时问我",
        timestamp: "50分钟前",
        likes: 5,
        replyTo: "热心网友",
      },
    ],
  },
  {
    id: "c2",
    author: { name: "小明", avatar: "M", verified: false },
    content: "请问楼主ES通过率怎么样？我也想试试这家公司。",
    timestamp: "2小时前",
    likes: 12,
    replies: [],
  },
  {
    id: "c3",
    author: { name: "张三", avatar: "Z", verified: true },
    content: "mark一下，回头仔细看。楼主写得很详细！",
    timestamp: "3小时前",
    likes: 8,
    replies: [],
  },
];

export function PostDetailPage({
  post,
  onBack,
  onUserClick,
  onSchoolClick,
  onCompanyClick,
  onTagClick,
}: PostDetailPageProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<{ commentId: string; authorName: string } | null>(
    null
  );
  const [replyText, setReplyText] = useState("");

  const CategoryIcon = categoryIcons[post.category];

  const handleCommentLike = (commentId: string) => {
    setLikedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleReplyLike = (replyId: string) => {
    setLikedReplies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(replyId)) {
        newSet.delete(replyId);
      } else {
        newSet.add(replyId);
      }
      return newSet;
    });
  };

  const handleReplyClick = (commentId: string, authorName: string) => {
    setReplyingTo({ commentId, authorName });
    setReplyText("");
  };

  const handleReplySubmit = () => {
    if (!replyText.trim() || !replyingTo) return;

    const newReply: Reply = {
      id: `r${Date.now()}`,
      author: { name: "当前用户", avatar: "U", verified: false },
      content: replyText,
      timestamp: "刚刚",
      likes: 0,
      replyTo: replyingTo.authorName,
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === replyingTo.commentId
          ? {
              ...comment,
              replies: [...(comment.replies || []), newReply],
            }
          : comment
      )
    );

    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg">帖子详情</h1>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="bg-white border-b border-slate-200">
          <div className="p-4">
            {/* 内容类型和城市标签 */}
            <div className="flex items-center gap-2 mb-3">
              <Badge
                className={`text-xs border-0 ${
                  post.domain === "career"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                <CategoryIcon className="w-3 h-3 mr-1" />
                {categoryLabels[post.category]}
              </Badge>
              {post.city && (
                <Badge variant="outline" className="text-xs">
                  <MapPin className="w-3 h-3 mr-1" />
                  {post.city}
                </Badge>
              )}
              {post.featured && (
                <Badge className="bg-yellow-100 text-yellow-700 border-0 text-xs">精选</Badge>
              )}
            </div>

            {/* 标题 */}
            <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
              {post.title}
            </h2>

            {/* 作者信息 */}
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => onUserClick(post.author.id)}>
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-medium">
                    {post.author.avatar}
                  </AvatarFallback>
                </Avatar>
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={() => onUserClick(post.author.id)}
                    className="font-medium text-slate-900 hover:text-blue-600"
                  >
                    {post.author.name}
                  </button>
                  {post.author.verified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                  {post.author.university && (
                    <button
                      onClick={() => onSchoolClick(post.author.university!)}
                      className="text-sm text-slate-600 hover:text-blue-600"
                    >
                      {post.author.university}
                    </button>
                  )}
                </div>
                {post.author.badges && post.author.badges.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    {post.author.badges.map((badge) => (
                      <Badge
                        key={badge}
                        className={`text-xs border-0 ${
                          badge === "已获内定"
                            ? "bg-green-100 text-green-700"
                            : badge === "学校认证"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 公司信息卡 */}
            {post.company && (
              <button
                onClick={() => onCompanyClick(post.company!.name)}
                className="w-full mb-4 p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm border border-slate-100">
                    {post.company.logo}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-slate-900 mb-1">{post.company.name}</div>
                    <div className="text-sm text-slate-600 mb-1">{post.position}</div>
                    {post.company.location && (
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {post.company.location}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            )}

            {/* 评分/实用度 */}
            {(post.rating || post.helpful) && (
              <div className="flex items-center gap-4 mb-4 p-3 bg-green-50 rounded-xl border border-green-100">
                {post.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold text-slate-900">{post.rating}</span>
                    <span className="text-sm text-slate-500">评分</span>
                  </div>
                )}
                {post.helpful && (
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5 text-green-600" />
                    <span className="text-lg font-bold text-slate-900">{post.helpful}%</span>
                    <span className="text-sm text-slate-500">实用度</span>
                  </div>
                )}
              </div>
            )}

            {/* 正文内容 */}
            <div className="prose prose-slate max-w-none mb-4">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-sm text-slate-700 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>

            {/* 互动数据 */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views}次浏览
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.timestamp}
              </div>
            </div>
          </div>

          {/* 帖子主互动区 - 固定在帖子正文和评论区之间 */}
          <div className="bg-white border-y border-slate-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 transition-colors ${
                    liked ? "text-red-500" : "text-slate-600 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
                  <span className="text-sm font-medium">{post.likes + (liked ? 1 : 0)}</span>
                </button>
                <button
                  onClick={() => {
                    const commentsSection = document.getElementById("comments-section");
                    commentsSection?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-2 transition-colors ${
                    bookmarked ? "text-yellow-500" : "text-slate-600 hover:text-yellow-500"
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-yellow-500" : ""}`} />
                  <span className="text-sm font-medium">{post.bookmarks + (bookmarked ? 1 : 0)}</span>
                </button>
              </div>
              <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">分享</span>
              </button>
            </div>
          </div>
        </div>

        {/* 评论区 */}
        <div id="comments-section" className="mt-4">
          <div className="px-4 py-3 bg-white border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">
              评论 <span className="text-slate-500">({comments.length})</span>
            </h3>
          </div>

          <div className="bg-white divide-y divide-slate-100">
            {comments.map((comment) => {
              const isCommentLiked = likedComments.has(comment.id);
              return (
                <div key={comment.id} className="p-4">
                  {/* 一级评论 */}
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="w-9 h-9 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white text-sm">
                        {comment.author.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-slate-900">
                          {comment.author.name}
                        </span>
                        {comment.author.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                        )}
                        <span className="text-xs text-slate-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed mb-3">
                        {comment.content}
                      </p>
                      {/* 评论操作：点赞和回复 */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleCommentLike(comment.id)}
                          className={`flex items-center gap-1.5 text-xs transition-colors ${
                            isCommentLiked
                              ? "text-red-500"
                              : "text-slate-500 hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`w-3.5 h-3.5 ${isCommentLiked ? "fill-red-500" : ""}`}
                          />
                          <span>{comment.likes + (isCommentLiked ? 1 : 0)}</span>
                        </button>
                        <button
                          onClick={() => handleReplyClick(comment.id, comment.author.name)}
                          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>回复</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 二级回复列表 */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-12 space-y-3 pt-3 border-l-2 border-slate-100 pl-4">
                      {comment.replies.map((reply) => {
                        const isReplyLiked = likedReplies.has(reply.id);
                        return (
                          <div key={reply.id} className="bg-slate-50/50 rounded-lg p-3">
                            <div className="flex items-start gap-3">
                              <Avatar className="w-7 h-7 flex-shrink-0">
                                <AvatarFallback className="bg-gradient-to-br from-emerald-400 to-teal-400 text-white text-xs">
                                  {reply.author.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm text-slate-900">
                                    {reply.author.name}
                                  </span>
                                  {reply.author.verified && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                                  )}
                                  <span className="text-xs text-slate-500">{reply.timestamp}</span>
                                </div>
                                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                                  <span className="text-blue-600 font-medium">@{reply.replyTo} </span>
                                  {reply.content}
                                </p>
                                {/* 二级回复操作：点赞和回复 */}
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() => handleReplyLike(reply.id)}
                                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                                      isReplyLiked
                                        ? "text-red-500"
                                        : "text-slate-500 hover:text-red-500"
                                    }`}
                                  >
                                    <Heart
                                      className={`w-3.5 h-3.5 ${isReplyLiked ? "fill-red-500" : ""}`}
                                    />
                                    <span>{reply.likes + (isReplyLiked ? 1 : 0)}</span>
                                  </button>
                                  <button
                                    onClick={() => handleReplyClick(comment.id, reply.author.name)}
                                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    <span>回复</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 回复输入框 */}
                  {replyingTo?.commentId === comment.id && (
                    <div className="ml-12 mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-start gap-2">
                        <Textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`回复 ${replyingTo.authorName}...`}
                          className="flex-1 min-h-[60px] max-h-[120px] resize-none text-sm"
                          autoFocus
                        />
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={handleReplySubmit}
                            disabled={!replyText.trim()}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            发送
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                          >
                            取消
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部固定输入栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3 z-10">
        <div className="flex items-center gap-2">
          <Textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="写评论..."
            className="flex-1 min-h-[40px] max-h-[80px] resize-none"
          />
          <Button
            size="sm"
            disabled={!commentText.trim()}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  );
}
