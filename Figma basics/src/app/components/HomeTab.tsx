import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import Masonry from "react-responsive-masonry";
import { mockPosts } from "../data/posts";
import { PostCard } from "./PostCard";

const tabs = ["推荐", "同城", "关注", "就活", "生活"];

interface HomeTabProps {
  onPostClick?: (postId: string) => void;
}

export function HomeTab({ onPostClick }: HomeTabProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      setIndicatorStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab]);

  const selectedCategory = tabs[activeTab];
  const filteredPosts = mockPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 pb-[84px]">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="relative">
          <div className="flex justify-around py-3">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => (tabRefs.current[index] = el)}
                onClick={() => setActiveTab(index)}
                className={`flex-1 pb-2 transition-all text-base ${
                  activeTab === index ? "font-bold text-slate-900" : "font-medium text-slate-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <motion.div
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      <div className="px-2 py-3">
        <Masonry columnsCount={2} gutter="12px">
          {filteredPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              onPostClick={onPostClick || (() => {})}
              showLocation={selectedCategory === "同城"}
            />
          ))}
        </Masonry>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">暂无内容</p>
          </div>
        )}
      </div>
    </div>
  );
}