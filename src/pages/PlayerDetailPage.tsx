import { useParams } from 'react-router-dom';
import { Card, EmptyState } from '@/components/ui';
import { usePlayers, useTeams } from '@/hooks/useSoccerData';

export function PlayerDetailPage() {
  const { id = '' } = useParams();
  const { data: players = [] } = usePlayers();
  const { data: teams = [] } = useTeams();
  const player = players.find((p) => p.id === id);
  if (!player) return <EmptyState title="Player not found" description="Invalid player id." />;
  return (
    <Card>
      <h1 className="text-2xl font-semibold">{player.name}</h1>
      <p className="text-slate-400 mt-1">{player.position} • {teams.find((t) => t.id === player.team_id)?.name}</p>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
        <div>Goals: {player.stats.goals}</div>
        <div>Assists: {player.stats.assists}</div>
        <div>Passes: {player.stats.passes_completed}</div>
        <div>Tackles: {player.stats.tackles}</div>
        <div>xG: {player.stats.xg}</div>
      </div>
    </Card>
  );
}
