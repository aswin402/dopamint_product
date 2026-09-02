import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './components/auth/LoginPage';
import { StyleGuidePage } from './components/styleguide/StyleGuidePage';
import { useCryptoStore } from './store/useCryptoStore';

const ChatRouteWrapper: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const setActiveConversation = useCryptoStore((s) => s.setActiveConversation);
  const conversations = useCryptoStore((s) => s.conversations);

  useEffect(() => {
    if (chatId && conversations.some((c) => c.id === chatId)) {
      setActiveConversation(chatId);
    }
  }, [chatId, conversations, setActiveConversation]);

  return <AppLayout />;
};

function App() {
  const isAuthenticated = useCryptoStore((s) => s.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* Hidden Developer & Designer Style Guide Routes */}
        <Route path="/style-guide" element={<StyleGuidePage />} />
        <Route path="/styleguide" element={<Navigate to="/style-guide" replace />} />
        <Route path="/design-system" element={<Navigate to="/style-guide" replace />} />

        {/* Dedicated Light Mode Style Guide */}
        <Route path="/style-guide-light" element={<StyleGuidePage forcedTheme="light" />} />
        <Route path="/styleguide-light" element={<Navigate to="/style-guide-light" replace />} />

        {/* Dedicated Dark Mode Style Guide */}
        <Route path="/style-guide-dark" element={<StyleGuidePage forcedTheme="dark" />} />
        <Route path="/styleguide-dark" element={<Navigate to="/style-guide-dark" replace />} />

        {/* Auth Route: 2-step Login & Wallet Ready flow */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="/signin" element={<Navigate to="/login" replace />} />
        <Route path="/auth" element={<Navigate to="/login" replace />} />

        {/* Protected / Main App Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route
          path="/c/:chatId"
          element={isAuthenticated ? <ChatRouteWrapper /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/leaderboard"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/refer"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/points"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        />
        <Route path="/xp" element={<Navigate to="/points" replace />} />
        <Route
          path="/settings"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/agents"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/active-agents"
          element={<Navigate to="/agents" replace />}
        />
        <Route
          path="/buy-credits"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/pro"
          element={<Navigate to="/buy-credits" replace />}
        />
        <Route
          path="/favourites"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/watchlist"
          element={<Navigate to="/favourites" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
