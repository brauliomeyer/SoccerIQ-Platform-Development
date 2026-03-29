import { useParams } from 'react-router-dom';
import { Card, EmptyState } from '@/components/ui';
import { usePlayers, useTeams } from '@/hooks/useSoccerData';

export function TeamDetailPage() {
  const { id = '' } = useParams();
  const { data: teams = [] } = useTeams();
  const { data: players = [] } = usePlayers();
  const team = teams.find((t) => t.id === id);
  if (!team) return <EmptyState title="Team not found" description="Invalid team id." />;
  return (
    <Card>
      <h1 className="text-2xl font-semibold">{team.name}</h1>
      <p className="text-slate-400">{team.league}</p>
      <p className="mt-2">Budget: ${team.budget.toLocaleString()}</p>
      <p className="mt-3 text-sm text-slate-300">Players: {players.filter((p) => p.team_id === id).length}</p>
    </Card>
  );
}
