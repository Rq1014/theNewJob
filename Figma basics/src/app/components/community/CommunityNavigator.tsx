import { useState } from "react";
import { JapanCommunityTab } from "../JapanCommunityTab";
import { PostDetailPage } from "./PostDetailPage";
import { SearchPage } from "./SearchPage";
import { UserProfilePage } from "./UserProfilePage";
import { CompanyDetailPage } from "./CompanyDetailPage";
import { TagPage } from "./TagPage";
import { CareerCommunityPage } from "./CareerCommunityPage";
import { LifeCommunityPage } from "./LifeCommunityPage";
import { NewKakomonPage } from "./NewKakomonPage";
import { UniversityKakomonPage } from "./UniversityKakomonPage";
import { PublishCenterPage } from "./PublishCenterPage";
import { TreeholeNavigator } from "../treehole/TreeholeNavigator";
import { japanCommunityPosts, City } from "../../data/japan-community";
import { UniversityId } from "../../data/kakomon";

type View =
  | "home"
  | "search"
  | "post-detail"
  | "user-profile"
  | "company-detail"
  | "tag-page"
  | "career-community"
  | "life-community"
  | "kakomon"
  | "university-kakomon"
  | "publish-center"
  | "partner";

interface NavigationState {
  view: View;
  postId?: string;
  userId?: string;
  companyName?: string;
  tag?: string;
  city?: City;
  universityId?: UniversityId;
}

export function CommunityNavigator() {
  const [navState, setNavState] = useState<NavigationState>({ view: "home" });

  const handleSearchClick = () => {
    setNavState({ view: "search" });
  };

  const handlePostClick = (postId: string) => {
    setNavState({ view: "post-detail", postId });
  };

  const handleUserClick = (userId: string) => {
    setNavState({ view: "user-profile", userId });
  };

  const handleCompanyClick = (companyName: string) => {
    setNavState({ view: "company-detail", companyName });
  };

  const handleTagClick = (tag: string) => {
    setNavState({ view: "tag-page", tag });
  };

  const handleFunctionClick = (functionId: string) => {
    switch (functionId) {
      case "career-community":
        setNavState({ view: "career-community" });
        break;
      case "life-community":
        setNavState({ view: "life-community" });
        break;
      case "kakomon":
        setNavState({ view: "kakomon" });
        break;
      case "university-kakomon":
        setNavState({ view: "university-kakomon" });
        break;
      case "publish-center":
        setNavState({ view: "publish-center" });
        break;
      case "partner":
        setNavState({ view: "partner" });
        break;
    }
  };

  const handleUniversityClick = (universityId: UniversityId) => {
    setNavState({ view: "university-kakomon", universityId });
  };

  const handleBackToKakomon = () => {
    setNavState({ view: "kakomon" });
  };

  const handleCityClick = (city: City) => {
    setNavState({ view: "city-detail", city });
  };

  const handleBackToHome = () => {
    setNavState({ view: "home" });
  };

  const handleBackToCityInfo = () => {
    setNavState({ view: "city-info" });
  };

  const currentPost =
    navState.view === "post-detail" && navState.postId
      ? japanCommunityPosts.find((p) => p.id === navState.postId)
      : null;

  switch (navState.view) {
    case "home":
      return (
        <JapanCommunityTab
          onSearchClick={handleSearchClick}
          onPostClick={handlePostClick}
          onUserClick={handleUserClick}
          onCompanyClick={handleCompanyClick}
          onTagClick={handleTagClick}
          onFunctionClick={handleFunctionClick}
        />
      );

    case "search":
      return <SearchPage onBack={handleBackToHome} onPostClick={handlePostClick} />;

    case "post-detail":
      if (!currentPost) return null;
      return (
        <PostDetailPage
          post={currentPost}
          onBack={handleBackToHome}
          onUserClick={handleUserClick}
          onSchoolClick={(schoolName) => console.log("School:", schoolName)}
          onCompanyClick={handleCompanyClick}
          onTagClick={handleTagClick}
        />
      );

    case "user-profile":
      if (!navState.userId) return null;
      return (
        <UserProfilePage
          userId={navState.userId}
          onBack={handleBackToHome}
          onPostClick={handlePostClick}
        />
      );

    case "company-detail":
      if (!navState.companyName) return null;
      return (
        <CompanyDetailPage
          companyName={navState.companyName}
          onBack={handleBackToHome}
          onPostClick={handlePostClick}
        />
      );

    case "tag-page":
      if (!navState.tag) return null;
      return (
        <TagPage tag={navState.tag} onBack={handleBackToHome} onPostClick={handlePostClick} />
      );

    case "career-community":
      return (
        <CareerCommunityPage
          onBack={handleBackToHome}
          onPostClick={handlePostClick}
          onCompanyClick={handleCompanyClick}
          onUserClick={handleUserClick}
        />
      );

    case "life-community":
      return (
        <LifeCommunityPage
          onBack={handleBackToHome}
          onPostClick={handlePostClick}
          onUserClick={handleUserClick}
        />
      );

    case "kakomon":
      return <NewKakomonPage onBack={handleBackToHome} onUniversityClick={handleUniversityClick} />;

    case "university-kakomon":
      if (!navState.universityId) return null;
      return <UniversityKakomonPage universityId={navState.universityId} onBack={handleBackToKakomon} />;

    case "publish-center":
      return <PublishCenterPage onBack={handleBackToHome} />;

    case "partner":
      return <TreeholeNavigator onBack={handleBackToHome} />;

    default:
      return null;
  }
}