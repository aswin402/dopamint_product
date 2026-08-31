import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './components/auth/LoginPage';
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

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/c/:chatId" element={<ChatRouteWrapper />} />
        <Route path="/leaderboard" element={<AppLayout />} />
        <Route path="/refer" element={<AppLayout />} />
        <Route path="/points" element={<AppLayout />} />
        <Route path="/xp" element={<Navigate to="/points" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
