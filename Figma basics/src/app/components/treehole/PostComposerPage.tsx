import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { postTypeOptions, bigTreeholes, smallTreeholes, type PostType } from "../../data/treehole";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";

interface PostComposerPageProps {
  treeholeId: string;
  treeholeName: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function PostComposerPage({
  treeholeId,
  treeholeName,
  onBack,
  onSuccess,
}: PostComposerPageProps) {
  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    isAnonymous: false,
  });

  // 判断是否支持匿名
  const treehole = [...bigTreeholes, ...smallTreeholes].find((t) => t.id === treeholeId);
  const supportsAnonymous = treehole && "isAnonymous" in treehole ? treehole.isAnonymous : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPostType) {
      toast.error("请选择发帖类型");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("请输入内容");
      return;
    }

    // 模拟发帖成功
    toast.success("发布成功！");
    onSuccess();
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">发帖</h1>
      </div>

      {/* 表单区 */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pb-20">
        <div className="space-y-4 p-4">
          {/* 发帖位置提示 */}
          <div className="rounded-lg bg-blue-50 px-4 py-3">
            <p className="text-sm font-medium text-blue-900">
              发布到：<span className="font-bold">{treeholeName}</span>
            </p>
          </div>

          {/* 发帖类型选择 */}
          <div>
            <Label className="text-sm font-medium text-gray-700">
              选择发帖类型 <span className="text-red-500">*</span>
            </Label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {postTypeOptions.map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => setSelectedPostType(option.type)}
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    selectedPostType === option.type
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl">{option.icon}</div>
                  <h3 className="mt-2 font-semibold text-gray-900">{option.label}</h3>
                  <p className="mt-1 text-xs text-gray-500">{option.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 标题（可选） */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              标题（可选）
            </Label>
            <Input
              id="title"
              placeholder="给你的帖子起个标题"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-2"
              maxLength={50}
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.title.length}/50字
            </p>
          </div>

          {/* 内容 */}
          <div>
            <Label htmlFor="content" className="text-sm font-medium text-gray-700">
              内容 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              placeholder="分享你的想法..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-2"
              rows={6}
              maxLength={500}
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.content.length}/500字
            </p>
          </div>

          {/* 标签 */}
          <div>
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
              标签
            </Label>
            <Input
              id="tags"
              placeholder="用空格分隔，例如：学习 生活 交友"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="mt-2"
            />
            <p className="mt-1 text-xs text-gray-500">添加标签让更多人看到你的帖子</p>
          </div>

          {/* 匿名选项 */}
          {supportsAnonymous && (
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">匿名发布</p>
                  <p className="text-xs text-gray-500">其他人将看不到你的真实身份</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, isAnonymous: !formData.isAnonymous })
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    formData.isAnonymous ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                      formData.isAnonymous ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* 提示信息 */}
          <div className="rounded-xl bg-amber-50 p-4">
            <div className="flex gap-2">
              <Info className="mt-0.5 size-4 shrink-0 text-amber-600" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">发帖须知</p>
                <ul className="mt-1 space-y-0.5 text-xs">
                  <li>• 请遵守社区规范，文明交流</li>
                  <li>• 不得发布违法违规内容</li>
                  <li>• 尊重他人，友善互动</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 底部提交按钮 */}
        <div className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white p-4">
          <Button type="submit" className="w-full" size="lg">
            发布
          </Button>
        </div>
      </form>
    </div>
  );
}
