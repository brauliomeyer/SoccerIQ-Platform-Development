import { Player, ScoringScheme } from '@/lib/types';

const metricKeys = ['goals', 'assists', 'passes_completed', 'tackles', 'xg'] as const;
type MetricKey = (typeof metricKeys)[number];

function statsFor(players: Player[], key: MetricKey) {
  const values = players.map((p) => p.stats[key]).filter((v) => Number.isFinite(v));
  const mean = values.reduce((sum, v) => sum + v, 0) / Math.max(values.length, 1);
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / Math.max(values.length, 1);
  const std = Math.sqrt(variance);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { mean, std, min, max };
}

function normalize(value: number, metrics: ReturnType<typeof statsFor>, method: ScoringScheme['normalization']) {
  if (method === 'z_score') {
    return metrics.std === 0 ? 0 : (value - metrics.mean) / metrics.std;
  }
  const range = metrics.max - metrics.min;
  return range === 0 ? 0 : (value - metrics.min) / range;
}

export function scorePlayer(player: Player, pool: Player[], scheme: ScoringScheme) {
  let total = 0;

  metricKeys.forEach((key) => {
    const value = player.stats[key];
    const weight = scheme.weights[key];

    if (value == null || Number.isNaN(value)) {
      if (scheme.missing_data_policy === 'penalty_missing') {
        total -= scheme.penalty_missing * weight;
      }
      return;
    }

    const metricMeta = statsFor(pool, key);
    total += normalize(value, metricMeta, scheme.normalization) * weight;
  });

  return total * scheme.position_multiplier[player.position];
}
