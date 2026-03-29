import { Link } from 'react-router-dom';
import { Card, DataTable } from '@/components/ui';
import { scorePlayer } from '@/features/scoring/engine';
import { usePlayers, useScoringSchemes } from '@/hooks/useSoccerData';

export function ScoringPage() {
  const { data: players = [] } = usePlayers();
  const { data: schemes = [] } = useScoringSchemes();
  const active = schemes[0];
  const scored = active ? players.map((p) => ({ p, s: scorePlayer(p, players, active) })).sort((a, b) => b.s - a.s) : [];

  return (
    <Card>
      <h1 className="text-xl font-semibold mb-3">Scoring</h1>
      <DataTable columns={['scheme', 'normalization', 'policy']} rows={schemes.map((s) => ({ scheme: <Link className='text-emerald-400' to={`/scoring/${s.id}`}>{s.name}</Link>, normalization: s.normalization, policy: s.missing_data_policy }))} />
      {active ? <p className="mt-4 text-sm text-slate-300">Top player ({active.name}): {scored[0]?.p.name} • {scored[0]?.s.toFixed(2)}</p> : null}
    </Card>
  );
}
