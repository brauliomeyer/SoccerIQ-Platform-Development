import { Link } from 'react-router-dom';
import { Card, DataTable } from '@/components/ui';
import { useMatches, useTeams } from '@/hooks/useSoccerData';

export function MatchesPage() {
  const { data: matches = [] } = useMatches();
  const { data: teams = [] } = useTeams();
  const t = (id: string) => teams.find((team) => team.id === id)?.name ?? id;
  return <Card><DataTable columns={['fixture', 'score', 'status']} rows={matches.map((m) => ({ fixture: <Link className='text-emerald-400' to={`/matches/${m.id}`}>{t(m.home_team_id)} vs {t(m.away_team_id)}</Link>, score: `${m.home_score}-${m.away_score}`, status: m.status }))} /></Card>;
}
