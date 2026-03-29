import { useParams } from 'react-router-dom';
import { Card, EmptyState } from '@/components/ui';
import { scorePlayer } from '@/features/scoring/engine';
import { usePlayers, useScoringSchemes } from '@/hooks/useSoccerData';

export function ScoringDetailPage() {
  const { id = '' } = useParams();
  const { data: players = [] } = usePlayers();
  const { data: schemes = [] } = useScoringSchemes();
  const scheme = schemes.find((s) => s.id === id);
  if (!scheme) return <EmptyState title="Scheme missing" description="No scoring scheme for this id." />;
  const scored = players.map((p) => ({ name: p.name, score: scorePlayer(p, players, scheme) })).sort((a, b) => b.score - a.score).slice(0, 5);
  return (
    <Card>
      <h1 className='text-xl font-semibold'>{scheme.name}</h1>
      <p className='text-slate-400'>{scheme.normalization} • {scheme.missing_data_policy}</p>
      <ul className='mt-3 space-y-2 text-sm'>{scored.map((s) => <li key={s.name}>{s.name}: {s.score.toFixed(2)}</li>)}</ul>
    </Card>
  );
}
