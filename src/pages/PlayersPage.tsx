import { useMemo, useState } from 'react';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '@/api/client';
import { Button, Card, DataTable, EmptyState, Input, Modal } from '@/components/ui';
import { PlayerForm } from '@/features/players/PlayerForm';
import { useCreatePlayer, useDeletePlayer, usePlayers, useTeams, useUpdatePlayer } from '@/hooks/useSoccerData';
import { useUIStore } from '@/store/ui-store';

export function PlayersPage() {
  const { data: players = [] } = usePlayers();
  const { data: teams = [] } = useTeams();
  const createPlayer = useCreatePlayer();
  const updatePlayer = useUpdatePlayer();
  const deletePlayer = useDeletePlayer();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { playerFilter, setPlayerFilter } = useUIStore();

  const filtered = useMemo(() => players.filter((p) => p.name.toLowerCase().includes(playerFilter.toLowerCase())), [players, playerFilter]);
  const editing = players.find((p) => p.id === editingId);

  const onImport = (file?: File) => {
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: async (result) => {
        for (const row of result.data as Record<string, string>[]) {
          if (!row.name || !row.team) continue;
          const team = teams.find((t) => t.name === row.team) ?? teams[0];
          await createPlayer.mutateAsync({
            name: row.name,
            position: (row.position as 'GK' | 'DEF' | 'MID' | 'FWD') ?? 'MID',
            age: Number(row.age ?? 20),
            team_id: team.id,
            market_value: Number(row.market_value ?? 1000000),
            stats: { goals: 0, assists: 0, passes_completed: 0, tackles: 0, xg: 0 },
          });
        }
        toast.success('Players imported');
      },
    });
  };

  const exportCsv = async () => {
    const data = await api.getPlayers();
    const csv = Papa.unparse(data.map((p) => ({ name: p.name, position: p.position, age: p.age, team: teams.find((t) => t.id === p.team_id)?.name ?? '', market_value: p.market_value })));
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'players.csv';
    a.click();
  };

  if (!players.length) return <EmptyState title="No players" description="Seed data should appear on first load." />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input placeholder="Filter players..." value={playerFilter} onChange={(e) => setPlayerFilter(e.target.value)} className="max-w-sm" />
        <Modal title="Create player" trigger={<Button>Add Player</Button>}>
          <PlayerForm teams={teams} onSubmit={(data) => createPlayer.mutate(data, { onSuccess: () => toast.success('Player created') })} />
        </Modal>
        <Button onClick={exportCsv}>Export CSV</Button>
        <label className="rounded-xl border border-slate-700 px-3 py-2 text-sm cursor-pointer">Import CSV<input type="file" accept=".csv" className="hidden" onChange={(e) => onImport(e.target.files?.[0])} /></label>
      </div>
      <Card>
        <DataTable
          columns={['name', 'position', 'age', 'team', 'value', 'actions']}
          rows={filtered.map((p) => ({
            name: <Link className="text-emerald-400" to={`/players/${p.id}`}>{p.name}</Link>,
            position: p.position,
            age: p.age,
            team: teams.find((t) => t.id === p.team_id)?.name ?? 'Unknown',
            value: `$${p.market_value.toLocaleString()}`,
            actions: (
              <div className="flex gap-2">
                <Button className="px-2 py-1" onClick={() => setEditingId(p.id)}>Edit</Button>
                <Button className="bg-red-700 hover:bg-red-600 px-2 py-1" onClick={() => deletePlayer.mutate(p.id, { onSuccess: () => toast.success('Deleted') })}>Delete</Button>
              </div>
            ),
          }))}
        />
      </Card>

      {editing ? (
        <Card>
          <div className="mb-2 flex items-center justify-between"><h2 className="font-medium">Edit {editing.name}</h2><Button className="bg-slate-700" onClick={() => setEditingId(null)}>Close</Button></div>
          <PlayerForm teams={teams} initial={editing} onSubmit={(data) => updatePlayer.mutate({ id: editing.id, data }, { onSuccess: () => { toast.success('Player updated'); setEditingId(null); } })} />
        </Card>
      ) : null}
    </div>
  );
}
