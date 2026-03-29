import { Card } from '@/components/ui';

export function ManualsPage() {
  return (
    <Card>
      <h1 className='text-xl font-semibold'>Manuals</h1>
      <ul className='mt-3 list-disc pl-5 text-slate-300 text-sm'>
        <li>Scoring methodology with z-score and min-max normalization.</li>
        <li>CSV schema for players: name, position, age, team, market_value.</li>
        <li>Audit trail compliance for create, update, delete actions.</li>
      </ul>
    </Card>
  );
}
