import { ArrowLeft, Camera } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useState } from "react";

interface EditProfilePageProps {
  onBack: () => void;
}

export function EditProfilePage({ onBack }: EditProfilePageProps) {
  const [formData, setFormData] = useState({
    name: "张同学",
    bio: "在东京的留学生活 | 喜欢探店和摄影 📷",
    university: "东京大学",
    location: "东京",
    interests: "探店, 摄影, 日语学习",
  });

  const handleSave = () => {
    toast.success("资料已保存");
    onBack();
  };

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">编辑资料</h1>
        <Button onClick={handleSave} size="sm">
          保存
        </Button>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {/* 头像编辑 */}
        <div className="mt-6 flex flex-col items-center">
          <div className="relative">
            <Avatar className="size-24 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-2xl font-semibold text-white">
                张
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600">
              <Camera className="size-4" />
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">点击更换头像</p>
        </div>

        {/* 表单区域 */}
        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="name">昵称</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="bio">个性签名</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="mt-2"
              rows={3}
              maxLength={100}
            />
            <p className="mt-1 text-xs text-gray-500">{formData.bio.length}/100字</p>
          </div>

          <div>
            <Label htmlFor="university">学校</Label>
            <Input
              id="university"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="mt-2"
              disabled
            />
            <p className="mt-1 text-xs text-gray-500">学校信息不可修改</p>
          </div>

          <div>
            <Label htmlFor="location">常驻地区</Label>
            <select
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="东京">东京</option>
              <option value="大阪">大阪</option>
              <option value="京都">京都</option>
              <option value="横滨">横滨</option>
              <option value="名古屋">名古屋</option>
              <option value="福冈">福冈</option>
            </select>
          </div>

          <div>
            <Label htmlFor="interests">兴趣爱好</Label>
            <Input
              id="interests"
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              className="mt-2"
              placeholder="用逗号分隔，例如：探店, 摄影, 日语学习"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
