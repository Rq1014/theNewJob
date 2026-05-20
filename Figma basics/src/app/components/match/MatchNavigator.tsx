import { useState } from "react";
import { MatchHomePage } from "./MatchHomePage";
import { MyMatchPage } from "../treehole/MyMatchPage";

type View = "home" | "my-match";

export function MatchNavigator() {
  const [currentView, setCurrentView] = useState<View>("home");

  const handleMyMatchClick = () => {
    setCurrentView("my-match");
  };

  const handleBack = () => {
    setCurrentView("home");
  };

  return (
    <>
      {currentView === "home" && (
        <MatchHomePage onMyMatchClick={handleMyMatchClick} />
      )}

      {currentView === "my-match" && <MyMatchPage onBack={handleBack} />}
    </>
  );
}
