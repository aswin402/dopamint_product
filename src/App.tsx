import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
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
  return (
    <BrowserRouter>
      <Routes>
        {/* Main App Homepage (Dashboard) */}
        <Route path="/" element={<AppLayout />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />

        {/* Redirect any legacy auth routes directly to homepage */}
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<Navigate to="/" replace />} />
        <Route path="/auth" element={<Navigate to="/" replace />} />

        {/* Core Product Routes */}
        <Route path="/c/:chatId" element={<ChatRouteWrapper />} />
        <Route path="/leaderboard" element={<AppLayout />} />
        <Route path="/refer" element={<AppLayout />} />
        <Route path="/points" element={<AppLayout />} />
        <Route path="/xp" element={<Navigate to="/points" replace />} />
        <Route path="/settings" element={<AppLayout />} />
        <Route path="/agents" element={<AppLayout />} />
        <Route path="/active-agents" element={<Navigate to="/agents" replace />} />
        <Route path="/buy-credits" element={<AppLayout />} />
        <Route path="/pro" element={<Navigate to="/buy-credits" replace />} />
        <Route path="/favourites" element={<AppLayout />} />
        <Route path="/watchlist" element={<Navigate to="/favourites" replace />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
