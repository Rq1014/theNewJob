import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Users, Clock } from "lucide-react";

interface CreateCircleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CircleFormData) => void;
}

export interface CircleFormData {
  name: string;
  tag: string;
  maxMembers: number;
  duration: number;
}

const popularTags = ["健身", "摄影", "学习", "美食", "户外", "游戏", "音乐", "电影"];
const durationOptions = [
  { value: 12, label: "12小时" },
  { value: 24, label: "1天" },
  { value: 72, label: "3天" },
  { value: 168, label: "1周" },
];

export function CreateCircleModal({ isOpen, onClose, onSubmit }: CreateCircleModalProps) {
  const [formData, setFormData] = useState<CircleFormData>({
    name: "",
    tag: "",
    maxMembers: 10,
    duration: 24,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      tag: "",
      maxMembers: 10,
      duration: 24,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>创建兴趣圈子</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name">圈子名称</Label>
            <Input
              id="name"
              placeholder="例如：周末登山队"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>兴趣标签</Label>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={formData.tag === tag ? "default" : "outline"}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setFormData({ ...formData, tag })}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
            <Input
              placeholder="或输入自定义标签"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                人数上限
              </Label>
              <span className="text-sm font-semibold text-slate-900">{formData.maxMembers} 人</span>
            </div>
            <Slider
              value={[formData.maxMembers]}
              onValueChange={([value]) => setFormData({ ...formData, maxMembers: value })}
              min={5}
              max={50}
              step={5}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>5人</span>
              <span>50人</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              有效时间
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {durationOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={formData.duration === option.value ? "default" : "outline"}
                  onClick={() => setFormData({ ...formData, duration: option.value })}
                  className="h-auto py-3"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              取消
            </Button>
            <Button type="submit" className="flex-1" disabled={!formData.name || !formData.tag}>
              创建圈子
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
