import { Card } from '@/components/ui';
import { usePlayers } from '@/hooks/useSoccerData';

export function MarketPage() {
  const { data: players = [] } = usePlayers();
  const top = [...players].sort((a, b) => b.market_value - a.market_value).slice(0, 10);
  return (
    <Card>
      <h1 className='text-xl font-semibold mb-2'>Market Intelligence</h1>
      <ul className='space-y-2 text-sm'>{top.map((p) => <li key={p.id}>{p.name} • ${p.market_value.toLocaleString()}</li>)}</ul>
    </Card>
  );
}
