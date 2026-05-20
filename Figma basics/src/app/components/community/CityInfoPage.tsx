import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  MapPin,
  ChevronRight,
  Stethoscope,
  Home,
  Utensils,
  FileText,
  Bus,
  Briefcase,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { City, cityNames } from "../../data/japan-community";

interface CityInfoPageProps {
  onBack: () => void;
  onCityClick: (city: City) => void;
}

const cities: Array<{ id: City; name: string; count: number; description: string }> = [
  { id: "tokyo", name: "东京", count: 2345, description: "首都圈，最多留学生聚集地" },
  { id: "osaka", name: "大阪", count: 1456, description: "关西地区，生活成本相对较低" },
  { id: "kyoto", name: "京都", count: 892, description: "古都，多所知名大学" },
  { id: "yokohama", name: "横滨", count: 678, description: "临近东京，港口城市" },
  { id: "nagoya", name: "名古屋", count: 534, description: "中部地区，制造业发达" },
  { id: "fukuoka", name: "福冈", count: 445, description: "九州地区，生活便利" },
  { id: "sendai", name: "仙台", count: 312, description: "东北地区中心城市" },
  { id: "kobe", name: "神户", count: 289, description: "国际港口城市" },
  { id: "sapporo", name: "札幌", count: 234, description: "北海道，气候凉爽" },
];

export function CityInfoPage({ onBack, onCityClick }: CityInfoPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-lg flex-1">城市信息</h1>
            <button className="p-2 hover:bg-slate-100 rounded-full">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="pb-6">
        {/* 顶部说明 */}
        <div className="bg-gradient-to-br from-green-50 to-white p-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">按城市查看信息</h2>
              <p className="text-sm text-slate-600">医院、租房、美食、办事全覆盖</p>
            </div>
          </div>
        </div>

        {/* 城市列表 */}
        <div className="p-4">
          <h3 className="font-semibold text-slate-900 mb-3">选择城市</h3>
          <div className="space-y-2">
            {cities.map((city, index) => (
              <motion.button
                key={city.id}
                onClick={() => onCityClick(city.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-green-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-lg">{city.name[0]}</span>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900">{city.name}</h4>
                        {index < 3 && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            热门
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{city.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{city.count}条相关信息</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 底部说明 */}
        <div className="px-4 mt-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-2">每个城市包含</h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                <span>中文友好医院</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>租房避坑信息</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                <span>美食推荐</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>办事指南</span>
              </div>
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4" />
                <span>交通信息</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>求职信息</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
