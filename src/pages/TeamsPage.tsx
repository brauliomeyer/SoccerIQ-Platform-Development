import { Link } from 'react-router-dom';
import { Card, DataTable } from '@/components/ui';
import { useTeams } from '@/hooks/useSoccerData';

export function TeamsPage() {
  const { data: teams = [] } = useTeams();
  return (
    <Card>
      <DataTable columns={['name', 'league', 'budget']} rows={teams.map((t) => ({ name: <Link className='text-emerald-400' to={`/teams/${t.id}`}>{t.name}</Link>, league: t.league, budget: `$${t.budget.toLocaleString()}` }))} />
    </Card>
  );
}
