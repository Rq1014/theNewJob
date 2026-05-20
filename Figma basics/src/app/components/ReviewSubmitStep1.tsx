import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Info,
  Star,
  MapPin,
  Shield,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Institution, radarDimensions } from "../data/institutions";

interface ReviewSubmitStep1Props {
  institution: Institution;
  onBack: () => void;
  onNext: (data: Step1Data) => void;
}

export interface Step1Data {
  isCertified: boolean;
  scores: Record<string, number>;
  avgScore: number;
}

function RatingSlider({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-700">{label}</span>
        <div className="flex items-center gap-1">
          <Star className={`w-4 h-4 ${value > 0 ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`} />
          <span className="text-sm font-semibold text-slate-900 w-6">{value > 0 ? value.toFixed(1) : "-"}</span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={0}
        max={5}
        step={0.5}
        className="py-2"
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>0分</span>
        <span>5分</span>
      </div>
    </div>
  );
}

export function ReviewSubmitStep1({ institution, onBack, onNext }: ReviewSubmitStep1Props) {
  const [isCertified, setIsCertified] = useState<boolean | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});

  const dimensions = radarDimensions[institution.type];
  const allScored = Object.keys(dimensions).every((key) => scores[key] > 0);
  const avgScore = allScored
    ? Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length
    : 0;

  const handleNext = () => {
    if (isCertified !== null && allScored) {
      onNext({
        isCertified,
        scores,
        avgScore: parseFloat(avgScore.toFixed(1)),
      });
    }
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
            <h1 className="font-bold text-lg">发布评价</h1>
          </div>
          <button className="flex items-center gap-1 text-blue-600 text-sm">
            <Info className="w-4 h-4" />
            评价规则
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-4 space-y-4">
          {/* 机构信息卡片 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-2">{institution.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{institution.type === "tutoring" ? "私塾" : institution.type === "language" ? "语言学校" : "留学中介"}</Badge>
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <MapPin className="w-3.5 h-3.5" />
                <span>{institution.location}·{institution.district}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-slate-900">{institution.avgScore}</span>
              <span className="text-sm text-slate-600">({institution.totalReviews}条评价)</span>
            </div>
          </div>

          {/* 评价类型选择 */}
          <div className="space-y-3">
            <h2 className="font-semibold text-slate-900">选择评价类型</h2>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCertified(false)}
              className={`w-full p-4 rounded-2xl border-2 transition-all ${
                isCertified === false
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isCertified === false
                    ? "border-blue-500 bg-blue-500"
                    : "border-slate-300"
                }`}>
                  {isCertified === false && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-900">普通评价</span>
                    <Badge variant="outline" className="text-xs">
                      快速发布
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">无需上传凭证，适合咨询、试听或一般体验分享</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsCertified(true)}
              className={`w-full p-4 rounded-2xl border-2 transition-all ${
                isCertified === true
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 bg-white hover:border-emerald-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  isCertified === true
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-slate-300"
                }`}>
                  {isCertified === true && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-slate-900">认证评价</span>
                    <Badge className="bg-emerald-600 text-white border-0 text-xs gap-1">
                      <Shield className="w-3 h-3" />
                      高可信度
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">可选择上传材料，审核通过后获得认证标识，可信度更高</p>
                  <div className="mt-2 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">
                    可上传付款记录、合同、收据、录取结果等材料
                  </div>
                </div>
              </div>
            </motion.button>
          </div>

          {/* 规则提示 */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 text-sm text-amber-900 space-y-1">
                <p className="font-semibold">评价规则说明</p>
                <ul className="space-y-0.5 text-xs">
                  <li>• 评论发布后不可删除</li>
                  <li>• 可后续追加修改，所有历史版本永久保留</li>
                  <li>• 认证评价可上传材料用于审核，普通评价无需上传</li>
                  <li>• 平台通过内容审核、用户信用和举报机制维护真实性</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 维度评分 */}
          {isCertified !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="font-semibold text-slate-900">评分</h2>

              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4">
                {Object.entries(dimensions).map(([key, label]) => (
                  <RatingSlider
                    key={key}
                    label={label}
                    value={scores[key] || 0}
                    onChange={(value) => setScores({ ...scores, [key]: value })}
                  />
                ))}
              </div>

              {/* 综合评分 */}
              {allScored && (
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 text-white">
                  <div className="text-center">
                    <div className="text-sm mb-2 opacity-90">综合评分</div>
                    <div className="flex items-center justify-center gap-2">
                      <Star className="w-8 h-8 fill-white" />
                      <span className="text-4xl font-bold">{avgScore.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* 底部固定按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-10">
        <Button
          className="w-full"
          size="lg"
          disabled={isCertified === null || !allScored}
          onClick={handleNext}
        >
          下一步
        </Button>
      </div>
    </div>
  );
}
