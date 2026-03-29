import { create } from 'zustand';

type Theme = 'dark' | 'light';

type UIState = {
  sidebarOpen: boolean;
  theme: Theme;
  playerFilter: string;
  role: 'admin' | 'scout';
  toggleSidebar: () => void;
  setTheme: (theme: Theme) => void;
  setPlayerFilter: (value: string) => void;
  setRole: (role: 'admin' | 'scout') => void;
};

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  theme: 'dark',
  playerFilter: '',
  role: 'admin',
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
  setPlayerFilter: (playerFilter) => set({ playerFilter }),
  setRole: (role) => set({ role }),
}));
