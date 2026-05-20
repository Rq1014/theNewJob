import { useState } from "react";
import { ProfileHomePage } from "./ProfileHomePage";
import { EditProfilePage } from "./EditProfilePage";
import { SettingsPage } from "./SettingsPage";
import { PostDetailPage } from "../community/PostDetailPage";
import { japanCommunityPosts } from "../../data/japan-community";

type View =
  | "home"
  | "edit-profile"
  | "settings"
  | "content-detail";

interface NavigationState {
  contentId?: string;
}

export function ProfileNavigator() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [navState, setNavState] = useState<NavigationState>({});
  const [viewHistory, setViewHistory] = useState<View[]>([]);

  const handleNavigation = (view: View, state?: NavigationState) => {
    setViewHistory([...viewHistory, currentView]);
    setCurrentView(view);
    if (state) {
      setNavState(state);
    }
  };

  const handleBack = () => {
    if (viewHistory.length > 0) {
      const previousView = viewHistory[viewHistory.length - 1];
      setViewHistory(viewHistory.slice(0, -1));
      setCurrentView(previousView);
    } else {
      setCurrentView("home");
      setNavState({});
    }
  };

  // 根据contentId查找对应的帖子
  const currentPost = navState.contentId
    ? japanCommunityPosts.find((p) => p.id === navState.contentId)
    : undefined;

  return (
    <>
      {currentView === "home" && (
        <ProfileHomePage
          onEditProfile={() => handleNavigation("edit-profile")}
          onSettings={() => handleNavigation("settings")}
          onContentClick={(id) => handleNavigation("content-detail", { contentId: id })}
        />
      )}

      {currentView === "edit-profile" && <EditProfilePage onBack={handleBack} />}
      {currentView === "settings" && <SettingsPage onBack={handleBack} />}
      {currentView === "content-detail" && currentPost && (
        <PostDetailPage
          post={currentPost}
          onBack={handleBack}
          onUserClick={(userId) => console.log("User:", userId)}
          onSchoolClick={(schoolName) => console.log("School:", schoolName)}
          onCompanyClick={(companyName) => console.log("Company:", companyName)}
          onTagClick={(tag) => console.log("Tag:", tag)}
        />
      )}
    </>
  );
}