import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './components/auth/LoginPage';
import { useCryptoStore } from './store/useCryptoStore';

function App() {
  const isAuthenticated = useCryptoStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <AppLayout />;
}

export default App;
