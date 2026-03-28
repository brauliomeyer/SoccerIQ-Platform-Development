import { useParams } from 'react-router-dom';
import { Card, EmptyState } from '@/components/ui';
import { useMatches, useTeams } from '@/hooks/useSoccerData';

export function MatchDetailPage() {
  const { id = '' } = useParams();
  const { data: matches = [] } = useMatches();
  const { data: teams = [] } = useTeams();
  const match = matches.find((m) => m.id === id);
  if (!match) return <EmptyState title="Match not found" description="Invalid match id." />;
  const tn = (tid: string) => teams.find((t) => t.id === tid)?.name ?? tid;
  return <Card><h1 className='text-xl font-semibold'>{tn(match.home_team_id)} {match.home_score} - {match.away_score} {tn(match.away_team_id)}</h1><p className='text-slate-400'>{new Date(match.date).toLocaleString()} • {match.status}</p></Card>;
}
