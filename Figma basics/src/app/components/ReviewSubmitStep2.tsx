import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Star,
  Upload,
  X,
  Shield,
  AlertCircle,
  CheckCircle2,
  Camera,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Institution } from "../data/institutions";
import { Step1Data } from "./ReviewSubmitStep1";
import { toast } from "sonner";

interface ReviewSubmitStep2Props {
  institution: Institution;
  step1Data: Step1Data;
  onBack: () => void;
  onSubmit: () => void;
}

const tutoringTags = [
  "教学认真",
  "师资优秀",
  "升学率高",
  "课程体系完善",
  "作业反馈及时",
  "性价比高",
  "进度灵活",
  "面试辅导好",
  "价格偏贵",
  "作业量大",
];

const languageTags = [
  "教学质量好",
  "老师负责",
  "升学指导完善",
  "签证办理靠谱",
  "生活支持到位",
  "环境优越",
  "性价比高",
  "出勤管理严格",
  "宿舍条件好",
  "学费偏贵",
];

const agencyTags = [
  "顾问专业",
  "匹配精准",
  "沟通顺畅",
  "流程透明",
  "办事高效",
  "售后服务好",
  "性价比高",
  "文书质量高",
  "响应及时",
  "费用合理",
];

const tagsByType = {
  tutoring: tutoringTags,
  language: languageTags,
  agency: agencyTags,
};

const placeholdersByType = {
  tutoring:
    "分享您的真实体验，例如：\n• 教学质量和师资水平如何？\n• 课程内容和教学方法是否有效？\n• 最终的升学或提分效果如何？\n• 作业量和反馈及时性如何？\n• 性价比是否合理？\n• 有什么优点和需要改进的地方？",
  language:
    "分享您的真实体验，例如：\n• 教学质量和老师水平如何？\n• 签证办理是否顺利？\n• 升学指导是否到位？\n• 生活支持和宿舍条件如何？\n• 出勤管理是否严格？\n• 学校环境和地理位置如何？\n• 性价比是否合理？",
  agency:
    "分享您的真实体验，例如：\n• 顾问的专业程度如何？\n• 学校/专业匹配是否精准？\n• 沟通响应是否及时？\n• 申请流程是否透明？\n• 文书质量如何？\n• 最终申请结果如何？\n• 售后服务是否到位？\n• 费用是否合理透明？",
};

export function ReviewSubmitStep2({
  institution,
  step1Data,
  onBack,
  onSubmit,
}: ReviewSubmitStep2Props) {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [proofImages, setProofImages] = useState<string[]>([]);
  const [studyDuration, setStudyDuration] = useState("");
  const [serviceStage, setServiceStage] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToNoDelete, setAgreedToNoDelete] = useState(false);
  const [agreedToHistory, setAgreedToHistory] = useState(false);

  const tags = tagsByType[institution.type];
  const placeholder = placeholdersByType[institution.type];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleImageUpload = (isProof: boolean) => {
    // 模拟图片上传
    const mockImageUrl = `https://picsum.photos/400/300?random=${Date.now()}`;
    if (isProof) {
      setProofImages([...proofImages, mockImageUrl]);
    } else {
      setImages([...images, mockImageUrl]);
    }
  };

  const removeImage = (index: number, isProof: boolean) => {
    if (isProof) {
      setProofImages(proofImages.filter((_, i) => i !== index));
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const canSubmit =
    content.trim().length >= 20 &&
    agreedToTerms &&
    agreedToNoDelete &&
    agreedToHistory &&
    (!step1Data.isCertified || proofImages.length >= 1);

  const handleSubmit = () => {
    if (!canSubmit) return;

    toast.success("评价提交成功！", {
      description: step1Data.isCertified
        ? "您的认证材料正在审核中，审核通过后将显示认证标识"
        : "感谢您的分享！",
    });

    // 延迟后调用 onSubmit
    setTimeout(() => {
      onSubmit();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 顶部导航栏 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg">发布评价 2/2</h1>
          </div>
          <div className="text-sm text-slate-500">填写详情</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-4 space-y-4">
          {/* 评价摘要卡片 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-2">{institution.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              {step1Data.isCertified ? (
                <Badge className="bg-emerald-600 text-white border-0 gap-1">
                  <Shield className="w-3 h-3" />
                  认证评价
                </Badge>
              ) : (
                <Badge variant="outline">普通评价</Badge>
              )}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-slate-900">{step1Data.avgScore}</span>
              </div>
            </div>
          </div>

          {/* 文字评价 */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-900">
              详细评价 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              className="min-h-[200px] resize-none"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">至少20字</span>
              <span
                className={`text-xs ${
                  content.length >= 20 ? "text-green-600" : "text-slate-400"
                }`}
              >
                {content.length}/20
              </span>
            </div>
          </div>

          {/* 快捷标签 */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-900">快捷标签（可选）</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-blue-500 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 补充信息 */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-slate-900">补充信息（可选）</Label>
            <div className="bg-white rounded-xl p-3 space-y-3 border border-slate-200">
              <div>
                <Label className="text-xs text-slate-600 mb-1">学习/使用时长</Label>
                <Input
                  value={studyDuration}
                  onChange={(e) => setStudyDuration(e.target.value)}
                  placeholder="例如：半年、1年"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-slate-600 mb-1">服务阶段</Label>
                <Input
                  value={serviceStage}
                  onChange={(e) => setServiceStage(e.target.value)}
                  placeholder="例如：N2备考、研究生申请"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* 图片上传 - 认证材料 */}
          {step1Data.isCertified && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-slate-900">
                认证材料 <span className="text-red-500">*</span>
              </Label>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-900">
                    请上传至少1张付款记录、合同、收据、录取结果或沟通截图等材料，审核通过后将显示"已认证评价"标识
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {proofImages.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                    <img src={img} alt={`凭证${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(index, true)}
                      className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {proofImages.length < 6 && (
                  <button
                    onClick={() => handleImageUpload(true)}
                    className="aspect-square border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-blue-400 hover:bg-blue-50 transition-all"
                  >
                    <Camera className="w-5 h-5 text-slate-400" />
                    <span className="text-xs text-slate-500">上传凭证</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500">
                已上传 {proofImages.length}/6 张（至少1张）
              </p>
            </div>
          )}

          {/* 图片上传 - 普通图片 */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-900">
              补充图片（可选）
            </Label>
            <p className="text-xs text-slate-500">
              可上传学习环境、教材、课堂、咨询截图、试听材料等照片
            </p>
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={img} alt={`图片${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(index, false)}
                    className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {images.length < 9 && (
                <button
                  onClick={() => handleImageUpload(false)}
                  className="aspect-square border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-blue-400 hover:bg-blue-50 transition-all"
                >
                  <Upload className="w-5 h-5 text-slate-400" />
                  <span className="text-xs text-slate-500">上传图片</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500">已上传 {images.length}/9 张</p>
          </div>

          {/* 确认条款 */}
          <div className="bg-white rounded-xl p-4 space-y-3 border border-slate-200">
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label
                htmlFor="terms"
                className="text-sm text-slate-700 cursor-pointer leading-relaxed"
              >
                我确认以上评价内容真实，基于个人真实体验
              </Label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="no-delete"
                checked={agreedToNoDelete}
                onCheckedChange={(checked) => setAgreedToNoDelete(checked as boolean)}
              />
              <Label
                htmlFor="no-delete"
                className="text-sm text-slate-700 cursor-pointer leading-relaxed"
              >
                我理解评价发布后<span className="font-semibold text-red-600">不可删除</span>
              </Label>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox
                id="history"
                checked={agreedToHistory}
                onCheckedChange={(checked) => setAgreedToHistory(checked as boolean)}
              />
              <Label
                htmlFor="history"
                className="text-sm text-slate-700 cursor-pointer leading-relaxed"
              >
                我理解后续修改将生成新版本，<span className="font-semibold">所有历史版本永久保留</span>
              </Label>
            </div>
          </div>

          {/* 提示信息 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-sm text-blue-900 space-y-1">
                <p className="font-semibold">发布后您可以：</p>
                <ul className="space-y-0.5 text-xs">
                  <li>• 随时追加修改评价（将生成新版本）</li>
                  <li>• 查看评价的浏览量和点赞数</li>
                  <li>• 与其他用户交流互动</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部固定按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-10">
        <Button
          className="w-full"
          size="lg"
          disabled={!canSubmit}
          onClick={handleSubmit}
        >
          提交评价
        </Button>
        {!canSubmit && (
          <p className="text-xs text-center text-slate-500 mt-2">
            {content.length < 20
              ? "请至少填写20字评价"
              : step1Data.isCertified && proofImages.length < 1
              ? "认证评价需上传至少1张材料"
              : "请勾选所有确认条款"}
          </p>
        )}
      </div>
    </div>
  );
}
