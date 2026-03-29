import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, FormField, Input, Select } from '@/components/ui';
import { Player, Team } from '@/lib/types';

const schema = z.object({
  name: z.string().min(2),
  position: z.enum(['GK', 'DEF', 'MID', 'FWD']),
  age: z.coerce.number().min(15).max(45),
  team_id: z.string().min(1),
  market_value: z.coerce.number().min(0),
  goals: z.coerce.number().min(0),
  assists: z.coerce.number().min(0),
  passes_completed: z.coerce.number().min(0),
  tackles: z.coerce.number().min(0),
  xg: z.coerce.number().min(0),
});

type Values = z.infer<typeof schema>;

export function PlayerForm({
  teams,
  initial,
  onSubmit,
}: {
  teams: Team[];
  initial?: Player;
  onSubmit: (values: Omit<Player, 'id'>) => void;
}) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: initial
      ? { ...initial, ...initial.stats }
      : { name: '', position: 'MID', age: 22, team_id: teams[0]?.id ?? '', market_value: 1000000, goals: 0, assists: 0, passes_completed: 0, tackles: 0, xg: 0.1 },
  });

  return (
    <form
      className="space-y-3"
      onSubmit={form.handleSubmit((v) =>
        onSubmit({
          name: v.name,
          position: v.position,
          age: v.age,
          team_id: v.team_id,
          market_value: v.market_value,
          stats: {
            goals: v.goals,
            assists: v.assists,
            passes_completed: v.passes_completed,
            tackles: v.tackles,
            xg: v.xg,
          },
        }),
      )}
    >
      <FormField label="Name" error={form.formState.errors.name?.message}><Input {...form.register('name')} /></FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField label="Position" error={form.formState.errors.position?.message}><Select {...form.register('position')}><option value="GK">GK</option><option value="DEF">DEF</option><option value="MID">MID</option><option value="FWD">FWD</option></Select></FormField>
        <FormField label="Team" error={form.formState.errors.team_id?.message}><Select {...form.register('team_id')}>{teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</Select></FormField>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Age" error={form.formState.errors.age?.message}><Input type="number" {...form.register('age')} /></FormField>
        <FormField label="Market Value" error={form.formState.errors.market_value?.message}><Input type="number" {...form.register('market_value')} /></FormField>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {(['goals', 'assists', 'passes_completed', 'tackles', 'xg'] as const).map((key) => (
          <FormField key={key} label={key} error={form.formState.errors[key]?.message}><Input type="number" step="0.1" {...form.register(key)} /></FormField>
        ))}
      </div>
      <Button type="submit">Save Player</Button>
    </form>
  );
}
