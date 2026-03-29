import { useMemo } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, LoadingSkeleton, StatCard } from '@/components/ui';
import { useMatches, usePlayers, useTeams } from '@/hooks/useSoccerData';

export function DashboardPage() {
  const players = usePlayers();
  const teams = useTeams();
  const matches = useMatches();

  const perf = useMemo(
    () =>
      (matches.data ?? []).slice(0, 5).reverse().map((m, i) => ({
        idx: i + 1,
        totalGoals: m.home_score + m.away_score,
      })),
    [matches.data],
  );

  if (players.isLoading || teams.isLoading || matches.isLoading) return <LoadingSkeleton />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Tracked Players" value={players.data?.length ?? 0} subtitle="Active scouting pool" />
        <StatCard title="Teams" value={teams.data?.length ?? 0} subtitle="League coverage" />
        <StatCard title="Live Matches" value={(matches.data ?? []).filter((m) => m.status === 'live').length} subtitle="Realtime feed" />
        <StatCard title="Avg Market Value" value={`$${Math.round((players.data ?? []).reduce((a, p) => a + p.market_value, 0) / Math.max(players.data?.length ?? 1, 1)).toLocaleString()}`} subtitle="Per player" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <h2 className="mb-4 font-medium">Performance Trend</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={perf}>
                <XAxis dataKey="idx" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="totalGoals" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h2 className="mb-3 font-medium">Live Matches</h2>
          <ul className="space-y-2 text-sm">
            {(matches.data ?? []).filter((m) => m.status === 'live').map((m) => (
              <li key={m.id} className="rounded-xl border border-slate-800 p-3">{m.home_team_id} {m.home_score} - {m.away_score} {m.away_team_id}</li>
            ))}
          </ul>
        </Card>
      </div>

      <Card>
        <h2 className="mb-3 font-medium">Latest Results</h2>
        <ul className="space-y-2 text-sm text-slate-300">
          {(matches.data ?? []).filter((m) => m.status === 'finished').slice(0, 5).map((m) => (
            <li key={m.id}>{new Date(m.date).toLocaleDateString()} • {m.home_team_id} {m.home_score} - {m.away_score} {m.away_team_id}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
