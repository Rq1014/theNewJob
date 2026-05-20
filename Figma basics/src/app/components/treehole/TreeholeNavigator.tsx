import { useState } from "react";
import { TreeholeHomePage } from "./TreeholeHomePage";
import { BigTreeholeDetailPage } from "./BigTreeholeDetailPage";
import { SmallTreeholeDetailPage } from "./SmallTreeholeDetailPage";
import { CreateSmallTreeholePage } from "./CreateSmallTreeholePage";
import { PostComposerPage } from "./PostComposerPage";
import { MyTreeholesPage } from "./MyTreeholesPage";

type View =
  | "home"
  | "big-treehole-detail"
  | "small-treehole-detail"
  | "create-small-treehole"
  | "create-post"
  | "my-treeholes";

interface NavigationState {
  bigTreeholeId?: string;
  smallTreeholeId?: string;
  postTreeholeId?: string;
  postTreeholeName?: string;
}

interface TreeholeNavigatorProps {
  onBack?: () => void;
}

export function TreeholeNavigator({ onBack }: TreeholeNavigatorProps = {}) {
  const [currentView, setCurrentView] = useState<View>("home");
  const [navState, setNavState] = useState<NavigationState>({});
  const [viewHistory, setViewHistory] = useState<View[]>([]);

  const handleBigTreeholeClick = (id: string) => {
    setViewHistory([...viewHistory, currentView]);
    setNavState({ bigTreeholeId: id });
    setCurrentView("big-treehole-detail");
  };

  const handleSmallTreeholeClick = (id: string) => {
    setViewHistory([...viewHistory, currentView]);
    setNavState({ ...navState, smallTreeholeId: id });
    setCurrentView("small-treehole-detail");
  };

  const handleCreateSmallTreehole = (bigTreeholeId: string) => {
    setViewHistory([...viewHistory, currentView]);
    setNavState({ ...navState, bigTreeholeId });
    setCurrentView("create-small-treehole");
  };

  const handleCreatePost = (treeholeId: string, treeholeName: string) => {
    setViewHistory([...viewHistory, currentView]);
    setNavState({ ...navState, postTreeholeId: treeholeId, postTreeholeName: treeholeName });
    setCurrentView("create-post");
  };

  const handleMyTreeholesClick = () => {
    setViewHistory([...viewHistory, currentView]);
    setCurrentView("my-treeholes");
  };

  const handleBack = () => {
    if (viewHistory.length > 0) {
      const previousView = viewHistory[viewHistory.length - 1];
      setViewHistory(viewHistory.slice(0, -1));
      setCurrentView(previousView);
    } else if (currentView === "home" && onBack) {
      // 在首页且有外部返回回调时，调用外部返回
      onBack();
    } else {
      setCurrentView("home");
      setNavState({});
    }
  };

  const handlePostSuccess = () => {
    // 返回到发帖前的页面
    handleBack();
  };

  const handleCreateTreeholeSuccess = () => {
    // 返回到大树洞详情页
    setCurrentView("big-treehole-detail");
    setViewHistory(viewHistory.slice(0, -1));
  };

  return (
    <>
      {currentView === "home" && (
        <TreeholeHomePage
          onBigTreeholeClick={handleBigTreeholeClick}
          onSmallTreeholeClick={handleSmallTreeholeClick}
          onMyTreeholesClick={handleMyTreeholesClick}
          onBack={onBack}
        />
      )}

      {currentView === "big-treehole-detail" && navState.bigTreeholeId && (
        <BigTreeholeDetailPage
          bigTreeholeId={navState.bigTreeholeId}
          onBack={handleBack}
          onCreateSmallTreehole={handleCreateSmallTreehole}
          onSmallTreeholeClick={handleSmallTreeholeClick}
          onCreatePost={handleCreatePost}
        />
      )}

      {currentView === "small-treehole-detail" && navState.smallTreeholeId && (
        <SmallTreeholeDetailPage
          smallTreeholeId={navState.smallTreeholeId}
          onBack={handleBack}
          onCreatePost={handleCreatePost}
        />
      )}

      {currentView === "create-small-treehole" && navState.bigTreeholeId && (
        <CreateSmallTreeholePage
          bigTreeholeId={navState.bigTreeholeId}
          onBack={handleBack}
          onSuccess={handleCreateTreeholeSuccess}
        />
      )}

      {currentView === "create-post" && navState.postTreeholeId && navState.postTreeholeName && (
        <PostComposerPage
          treeholeId={navState.postTreeholeId}
          treeholeName={navState.postTreeholeName}
          onBack={handleBack}
          onSuccess={handlePostSuccess}
        />
      )}

      {currentView === "my-treeholes" && (
        <MyTreeholesPage
          onBack={handleBack}
          onBigTreeholeClick={handleBigTreeholeClick}
          onSmallTreeholeClick={handleSmallTreeholeClick}
        />
      )}
    </>
  );
}