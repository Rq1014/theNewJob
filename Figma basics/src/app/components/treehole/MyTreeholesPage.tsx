import { ArrowLeft, Users, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { bigTreeholes, smallTreeholes } from "../../data/treehole";
import { Badge } from "../ui/badge";

interface MyTreeholesPageProps {
  onBack: () => void;
  onBigTreeholeClick: (id: string) => void;
  onSmallTreeholeClick: (id: string) => void;
}

export function MyTreeholesPage({
  onBack,
  onBigTreeholeClick,
  onSmallTreeholeClick,
}: MyTreeholesPageProps) {
  // 模拟用户加入的树洞（实际应从用户数据获取）
  const myBigTreeholes = bigTreeholes.slice(0, 2);
  const mySmallTreeholes = smallTreeholes.slice(0, 4);

  return (
    <div className="flex h-full flex-col bg-gray-50">
      {/* 顶部导航栏 */}
      <div className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
        <button onClick={onBack} className="rounded-lg p-1 hover:bg-gray-100">
          <ArrowLeft className="size-5 text-gray-700" />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-gray-900">我的树洞</h1>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">{/* 改为pb-24以适配底部导航 */}
        {/* 统计卡片 */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {myBigTreeholes.length}
            </div>
            <p className="mt-1 text-xs text-blue-700">大树洞</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {mySmallTreeholes.length}
            </div>
            <p className="mt-1 text-xs text-purple-700">小树洞</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">128</div>
            <p className="mt-1 text-xs text-green-700">互动数</p>
          </div>
        </div>

        {/* 我加入的大树洞 */}
        <div className="mt-6">
          <h2 className="mb-3 flex items-center text-sm font-semibold text-gray-900">
            <Sparkles className="mr-1.5 size-4" />
            我加入的大树洞
            <span className="ml-1 text-sm font-normal text-gray-500">
              ({myBigTreeholes.length})
            </span>
          </h2>

          {myBigTreeholes.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl">🌳</div>
              <p className="mt-2 text-sm text-gray-500">还没有加入大树洞</p>
              <p className="mt-1 text-xs text-gray-400">去首页看看吧</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myBigTreeholes.map((treehole) => (
                <div
                  key={treehole.id}
                  onClick={() => onBigTreeholeClick(treehole.id)}
                  className="cursor-pointer rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex size-12 items-center justify-center rounded-xl ${treehole.iconBgColor} text-2xl shadow-sm`}
                    >
                      {treehole.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{treehole.name}</h3>
                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <Users className="size-3" />
                        <span>{treehole.activeUsers}人活跃</span>
                      </div>
                    </div>
                    {treehole.type === "school" ? (
                      <GraduationCap className="size-5 text-gray-400" />
                    ) : (
                      <MapPin className="size-5 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 我加入的小树洞 */}
        <div className="mt-6">
          <h2 className="mb-3 flex items-center text-sm font-semibold text-gray-900">
            <Sparkles className="mr-1.5 size-4" />
            我加入的小树洞
            <span className="ml-1 text-sm font-normal text-gray-500">
              ({mySmallTreeholes.length})
            </span>
          </h2>

          {mySmallTreeholes.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl">🌱</div>
              <p className="mt-2 text-sm text-gray-500">还没有加入小树洞</p>
              <p className="mt-1 text-xs text-gray-400">去发现感兴趣的树洞吧</p>
            </div>
          ) : (
            <div className="space-y-3">
              {mySmallTreeholes.map((treehole) => {
                const belongToBigTreehole = bigTreeholes.find(
                  (bt) => bt.id === treehole.belongTo
                );
                return (
                  <div
                    key={treehole.id}
                    onClick={() => onSmallTreeholeClick(treehole.id)}
                    className="cursor-pointer rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{treehole.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {treehole.mode === "confession" ? "倾诉" : "搭子"}
                      </Badge>
                    </div>

                    {belongToBigTreehole && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                        <span
                          className={`flex size-4 items-center justify-center rounded ${belongToBigTreehole.iconBgColor} text-xs`}
                        >
                          {belongToBigTreehole.icon}
                        </span>
                        <span>{belongToBigTreehole.name}</span>
                      </div>
                    )}

                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="size-3" />
                        {treehole.members}人
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {treehole.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}