import { useState } from "react";
import { ArrowLeft, Info } from "lucide-react";
import { bigTreeholes } from "../../data/treehole";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface CreateSmallTreeholePageProps {
  bigTreeholeId: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function CreateSmallTreeholePage({
  bigTreeholeId,
  onBack,
  onSuccess,
}: CreateSmallTreeholePageProps) {
  const bigTreehole = bigTreeholes.find((t) => t.id === bigTreeholeId);

  const [formData, setFormData] = useState({
    name: "",
    tags: "",
    description: "",
    isAnonymous: false,
    isPublic: true,
    needApproval: false,
    maxMembers: "100",
    validDays: "30",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("请输入树洞名称");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("请输入树洞简介");
      return;
    }

    // 模拟创建成功
    toast.success("创建成功！");
    onSuccess();
  };

  if (!bigTreehole) {
    return null;
  }

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">创建小树洞</h1>
      </div>

      {/* 表单区 */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pb-20">
        <div className="space-y-4 p-4">
          {/* 所属大树洞 */}
          <div>
            <Label className="text-sm font-medium text-gray-700">所属大树洞</Label>
            <div className="mt-2 flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${bigTreehole.iconBgColor} text-xl`}
              >
                {bigTreehole.icon}
              </div>
              <div>
                <p className="font-medium text-gray-900">{bigTreehole.name}</p>
                <p className="text-xs text-gray-500">{bigTreehole.activeUsers}人活跃</p>
              </div>
            </div>
          </div>

          {/* 树洞名称 */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              树洞名称 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="例如：健身树洞、深夜吐槽树洞"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2"
              maxLength={20}
            />
            <p className="mt-1 text-xs text-gray-500">简洁明了，让人一眼就知道这是什么</p>
          </div>

          {/* 树洞简介 */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              树洞简介 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="介绍一下这个树洞的主题和玩法吧"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-2"
              rows={3}
              maxLength={100}
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/100字
            </p>
          </div>

          {/* 兴趣标签 */}
          <div>
            <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
              兴趣标签
            </Label>
            <Input
              id="tags"
              placeholder="用空格分隔，例如：健身 运动 搭子"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="mt-2"
            />
            {formData.tags && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {formData.tags.split(" ").filter(Boolean).map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* 树洞设置 */}
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900">树洞设置</h3>

            <div className="mt-4 space-y-4">
              {/* 是否匿名 */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">允许匿名发言</p>
                  <p className="text-xs text-gray-500">成员可以选择匿名或实名发言</p>
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

              {/* 是否公开 */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">公开树洞</p>
                  <p className="text-xs text-gray-500">所有人都能看到并申请加入</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    formData.isPublic ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                      formData.isPublic ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* 是否需要审核 */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">需要审核</p>
                  <p className="text-xs text-gray-500">加入申请需要创建者审核同意</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, needApproval: !formData.needApproval })
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    formData.needApproval ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                      formData.needApproval ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 人数上限 */}
          <div>
            <Label htmlFor="maxMembers" className="text-sm font-medium text-gray-700">
              人数上限
            </Label>
            <select
              id="maxMembers"
              value={formData.maxMembers}
              onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="50">50人</option>
              <option value="100">100人</option>
              <option value="200">200人</option>
              <option value="500">500人</option>
              <option value="unlimited">不限</option>
            </select>
          </div>

          {/* 有效时间 */}
          <div>
            <Label htmlFor="validDays" className="text-sm font-medium text-gray-700">
              有效时间
            </Label>
            <select
              id="validDays"
              value={formData.validDays}
              onChange={(e) => setFormData({ ...formData, validDays: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="7">7天</option>
              <option value="15">15天</option>
              <option value="30">30天</option>
              <option value="60">60天</option>
              <option value="permanent">长期有效</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">树洞到期后将自动关闭，但可以续期</p>
          </div>

          {/* 提示信息 */}
          <div className="rounded-xl bg-amber-50 p-4">
            <div className="flex gap-2">
              <Info className="mt-0.5 size-4 shrink-0 text-amber-600" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">创建须知</p>
                <ul className="mt-1 space-y-0.5 text-xs">
                  <li>• 请遵守社区规范，文明交流</li>
                  <li>• 不得创建违法违规内容的树洞</li>
                  <li>• 创建后您将成为该树洞的管理员</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 底部提交按钮 */}
        <div className="fixed inset-x-0 bottom-0 border-t border-gray-200 bg-white p-4">
          <Button type="submit" className="w-full" size="lg">
            创建树洞
          </Button>
        </div>
      </form>
    </div>
  );
}
