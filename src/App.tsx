import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppLayout } from '@/layouts/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { HomeRedirect } from '@/pages/HomeRedirect';
import { ManualsPage } from '@/pages/ManualsPage';
import { MarketPage } from '@/pages/MarketPage';
import { MatchDetailPage } from '@/pages/MatchDetailPage';
import { MatchesPage } from '@/pages/MatchesPage';
import { PlayerDetailPage } from '@/pages/PlayerDetailPage';
import { PlayersPage } from '@/pages/PlayersPage';
import { ScoringDetailPage } from '@/pages/ScoringDetailPage';
import { ScoringPage } from '@/pages/ScoringPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { TeamDetailPage } from '@/pages/TeamDetailPage';
import { TeamsPage } from '@/pages/TeamsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 30, gcTime: 1000 * 60 * 10, retry: 2 },
  },
});

const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomeRedirect /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'players', element: <PlayersPage /> },
      { path: 'players/:id', element: <PlayerDetailPage /> },
      { path: 'teams', element: <TeamsPage /> },
      { path: 'teams/:id', element: <TeamDetailPage /> },
      { path: 'matches', element: <MatchesPage /> },
      { path: 'matches/:id', element: <MatchDetailPage /> },
      { path: 'market', element: <MarketPage /> },
      { path: 'scoring', element: <ScoringPage /> },
      { path: 'scoring/:id', element: <ScoringDetailPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'manuals', element: <ManualsPage /> },
    ],
  },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster theme="dark" richColors />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
