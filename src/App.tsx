import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { useGamification } from "./contexts/GamificationContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GoalsExplorerPage from "./pages/GoalsExplorerPage";
import GoalDetailPage from "./pages/GoalDetailPage";
import AssessmentPage from "./pages/AssessmentPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import DashboardPage from "./pages/DashboardPage";
import PathwayPage from "./pages/PathwayPage";
import QuizPage from "./pages/QuizPage";
import QuizResultsPage from "./pages/QuizResultsPage";
import ConceptAssessmentPage from "./pages/ConceptAssessmentPage";
import ConceptAssessmentResultsPage from "./pages/ConceptAssessmentResultsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AchievementsPage from "./pages/AchievementsPage";
import CollaborationPage from "./pages/CollaborationPage";
import ExternalApisPage from "./pages/ExternalApisPage";
import LevelUpModal from "./components/LevelUpModal";
import XPNotification from "./components/XPNotification";
import AchievementUnlocked from "./components/AchievementUnlocked";

// Admin pages
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminGoalsPage from "./pages/AdminGoalsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import CreateGoalPage from "./pages/CreateGoalPage";
import EditGoalPage from "./pages/EditGoalPage";

function PrivateRoute({
  children,
  adminOnly = false,
  requireAssessment = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
  requireAssessment?: boolean;
}) {
  const { isAuthenticated, isAdmin, hasCompletedAssessment } = useAuth();

  if (!isAuthenticated) {
    // Store the current path to redirect back after login
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  // Suggestion d'évaluation au lieu de forcer
  if (requireAssessment && !hasCompletedAssessment) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

function App() {
  const {
    showLevelUp,
    setShowLevelUp,
    profile,
    showXPNotification,
    setShowXPNotification,
    lastXPGain,
    newAchievement,
    setNewAchievement,
    markAchievementAsViewed,
  } = useGamification();

  const handleCloseAchievement = async () => {
    if (newAchievement) {
      await markAchievementAsViewed(newAchievement.achievementId._id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/assessment"
          element={
            <PrivateRoute>
              <AssessmentPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />

        <Route
          path="/goals"
          element={
            <PrivateRoute>
              <GoalsExplorerPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/goals/:goalId"
          element={
            <PrivateRoute>
              <GoalDetailPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pathways/:pathwayId"
          element={
            <PrivateRoute>
              <PathwayPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pathways/:pathwayId/modules/:moduleId/quiz"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/pathways/:pathwayId/quiz-results"
          element={
            <PrivateRoute>
              <QuizResultsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/achievements"
          element={
            <PrivateRoute>
              <AchievementsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/collaboration"
          element={
            <PrivateRoute>
              <CollaborationPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/external-apis"
          element={
            <PrivateRoute>
              <ExternalApisPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <PrivateRoute>
              <AnalyticsPage />
            </PrivateRoute>
          }
        />

        {/* Concept assessment routes */}
        <Route
          path="/concepts/:conceptId/assessment"
          element={
            <PrivateRoute>
              <ConceptAssessmentPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/concepts/:conceptId/assessment/results"
          element={
            <PrivateRoute>
              <ConceptAssessmentResultsPage />
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminDashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/goals"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminGoalsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/goals/new"
          element={
            <PrivateRoute adminOnly={true}>
              <CreateGoalPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/goals/:goalId/edit"
          element={
            <PrivateRoute adminOnly={true}>
              <EditGoalPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PrivateRoute adminOnly={true}>
              <AdminUsersPage />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* Level Up Modal */}
      {showLevelUp && profile && (
        <LevelUpModal
          level={profile.level}
          rank={profile.rank}
          onClose={() => setShowLevelUp(false)}
        />
      )}

      {/* XP Notification */}
      {showXPNotification && lastXPGain && (
        <XPNotification
          xp={lastXPGain.xpGained}
          reason={lastXPGain.reason}
          onClose={() => setShowXPNotification(false)}
        />
      )}

      {/* Achievement Unlocked */}
      {newAchievement && (
        <AchievementUnlocked
          achievement={newAchievement.achievementId}
          onClose={handleCloseAchievement}
        />
      )}
    </div>
  );
}

export default App;
