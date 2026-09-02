import type { StateCreator } from 'zustand';
import type { UserProfile } from '../../types/crypto';
import { walletService } from '../../api/walletService';

export interface AuthSlice {
  isAuthenticated: boolean;
  userProfile: UserProfile;
  activeCurrency: string;
  setActiveCurrency: (cur: string) => void;
  login: (walletAddress: string, email?: string) => void;
  logout: () => void;
}

const getInitialAuth = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('dopamint-authenticated') === 'true';
  }
  return false;
};

const INITIAL_PROFILE: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@solana.org',
  walletAddress: '0x4F2a91C8392F865eE824A1054E5F36423c9E3c76',
  avatarUrl:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  tier: 'Pro',
  apiCallsRemaining: 840,
};

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (set) => ({
  isAuthenticated: getInitialAuth(),
  userProfile: INITIAL_PROFILE,
  activeCurrency: 'USD',
  setActiveCurrency: (activeCurrency) => set({ activeCurrency }),

  login: (walletAddress, email) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dopamint-authenticated', 'true');
    }
    const truncated = walletService.formatAddress(walletAddress);
    set((state) => ({
      isAuthenticated: true,
      userProfile: {
        ...state.userProfile,
        name: truncated,
        email: email || state.userProfile.email,
        walletAddress,
      },
    }));
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dopamint-authenticated');
    }
    set({
      isAuthenticated: false,
    });
  },
});
