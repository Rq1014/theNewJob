import { useState } from "react";
import { BottomNav, NavTab } from "./components/BottomNav";
import { NewRankingTab } from "./components/NewRankingTab";
import { InstitutionDetail } from "./components/InstitutionDetail";
import { CommunityNavigator } from "./components/community/CommunityNavigator";
import { ProfileNavigator } from "./components/profile/ProfileNavigator";
import { MessagesNavigator } from "./components/MessagesNavigator";
import { PublishNavigator } from "./components/PublishNavigator";
import { ReviewSubmitFlow } from "./components/ReviewSubmitFlow";
import { Toaster } from "./components/ui/sonner";
import { getInstitutionById } from "./data/institutions";

type View = "tabs" | "institution-detail" | "review-submit" | "publish";

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>("community");
  const [currentView, setCurrentView] = useState<View>("tabs");
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<string | null>(null);

  const handleInstitutionClick = (institutionId: string) => {
    setSelectedInstitutionId(institutionId);
    setCurrentView("institution-detail");
  };

  const handleReviewSubmit = (institutionId: string) => {
    setSelectedInstitutionId(institutionId);
    setCurrentView("review-submit");
  };

  const handleBackToTabs = () => {
    setCurrentView("tabs");
    setSelectedInstitutionId(null);
  };

  const handleBackToInstitution = () => {
    setCurrentView("institution-detail");
  };

  const handleReviewComplete = () => {
    setCurrentView("institution-detail");
  };

  const handleTabChange = (tab: NavTab) => {
    if (tab === "publish") {
      setCurrentView("publish");
    } else {
      setCurrentTab(tab);
      setCurrentView("tabs");
    }
  };

  const handleClosePublish = () => {
    setCurrentView("tabs");
  };

  return (
    <>
      <div className="size-full">
        {currentView === "tabs" && (
          <>
            {currentTab === "community" && <CommunityNavigator />}
            {currentTab === "ranking" && (
              <NewRankingTab onInstitutionClick={handleInstitutionClick} />
            )}
            {currentTab === "messages" && <MessagesNavigator />}
            {currentTab === "profile" && <ProfileNavigator />}

            <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />
          </>
        )}

        {currentView === "publish" && <PublishNavigator onClose={handleClosePublish} />}

        {currentView === "institution-detail" && selectedInstitutionId && (
          <InstitutionDetail
            institutionId={selectedInstitutionId}
            onBack={handleBackToTabs}
            onReviewSubmit={handleReviewSubmit}
          />
        )}

        {currentView === "review-submit" && selectedInstitutionId && (
          <ReviewSubmitFlow
            institution={getInstitutionById(selectedInstitutionId)!}
            onBack={handleBackToInstitution}
            onComplete={handleReviewComplete}
          />
        )}
      </div>
      <Toaster />
    </>
  );
}