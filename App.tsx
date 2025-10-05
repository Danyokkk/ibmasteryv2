import React, { useState, useEffect } from 'react';
import { MOCK_USER, MOCK_LESSONS_WITH_CONTENT } from './constants';
import { User, Lesson } from './types';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import LearnPage from './pages/LearnPage';
import TimetablePage from './pages/TimetablePage';
import CorePage from './pages/CorePage';
import SkillsPage from './pages/SkillsPage';
import ConnectPage from './pages/ConnectPage';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import OnboardingPage from './pages/OnboardingPage';
import AuthPage from './pages/AuthPage';
import LessonPlayerPage from './pages/LessonPlayerPage';
import TeacherPortalPage from './pages/TeacherPortalPage';
import { useResponsive } from './hooks/useResponsive';

export type Page = 'Dashboard' | 'Learn' | 'Timetable' | 'Core' | 'Skills' | 'Connect' | 'Profile' | 'Help' | 'Teachers';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState<Page>('Dashboard');
  const [viewingLesson, setViewingLesson] = useState<Lesson | null>(null);
  const { isMobile } = useResponsive();

  const handleLogin = () => {
    setUser(MOCK_USER);
    setIsAuthenticated(true);
  };
  
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActivePage('Dashboard');
  };

  const handleOnboardingComplete = (updatedUser: User) => {
    setUser({ ...updatedUser, onboardingComplete: true });
  };

  const handleStartLesson = (lesson: Lesson) => {
    const lessonWithContent = MOCK_LESSONS_WITH_CONTENT.find(l => l.id === lesson.id);
    if(lessonWithContent) {
      setViewingLesson(lessonWithContent);
    } else {
      alert("This lesson is a placeholder. Starting a sample lesson instead.");
      setViewingLesson(MOCK_LESSONS_WITH_CONTENT[0]);
    }
  };

  const handleExitLesson = () => {
    setViewingLesson(null);
    setActivePage('Learn');
  };

  const renderPage = () => {
    if (!user) return null;
    switch (activePage) {
      case 'Dashboard': return <DashboardPage user={user} />;
      case 'Learn': return <LearnPage user={user} onStartLesson={handleStartLesson} setActivePage={setActivePage} />;
      case 'Timetable': return <TimetablePage />;
      case 'Core': return <CorePage user={user} />;
      case 'Skills': return <SkillsPage user={user} />;
      case 'Connect': return <ConnectPage user={user} />;
      case 'Profile': return <ProfilePage user={user} onUpdateUser={setUser} />;
      case 'Help': return <HelpPage />;
      case 'Teachers': return <TeacherPortalPage />;
      default: return <DashboardPage user={user} />;
    }
  };

  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (user && !user.onboardingComplete) {
    return <OnboardingPage user={user} onComplete={handleOnboardingComplete} />;
  }
  
  const MainContent = () => (
    <div className="p-4 sm:p-6 lg:p-8 flex-grow overflow-y-auto">
      {renderPage()}
    </div>
  );

  if (user && viewingLesson) {
    return (
        <div className="bg-background-light min-h-screen flex text-text-primary font-sans">
             <main className="flex-1 flex flex-col max-h-screen">
                <LessonPlayerPage lesson={viewingLesson} onExit={handleExitLesson} user={user} />
             </main>
        </div>
    );
  }

  return (
    <div className="bg-background-light min-h-screen flex text-text-primary font-sans">
      {!isMobile && <Sidebar activePage={activePage} setActivePage={setActivePage} />}
      
      <main className="flex-1 flex flex-col max-h-screen">
        <Header user={user!} onLogout={handleLogout} setActivePage={setActivePage} />
        <MainContent />
      </main>

      {isMobile && <BottomNav activePage={activePage} setActivePage={setActivePage} />}
    </div>
  );
};

export default App;