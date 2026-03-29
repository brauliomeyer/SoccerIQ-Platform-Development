import { AuditLog, Match, Observation, Player, ScoringScheme, Team } from './types';
import { uid } from './utils';

const teams: Team[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `team-${i + 1}`,
  name: `FC Squad ${i + 1}`,
  league: i < 5 ? 'Premier Analytics League' : 'Moneyball Championship',
  budget: 20_000_000 + i * 3_000_000,
}));

const positions: Player['position'][] = ['GK', 'DEF', 'MID', 'FWD'];

const players: Player[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `player-${i + 1}`,
  name: `Player ${i + 1}`,
  position: positions[i % 4],
  age: 18 + (i % 15),
  team_id: teams[i % teams.length].id,
  market_value: 1_000_000 + i * 350_000,
  stats: {
    goals: i % 7,
    assists: i % 5,
    passes_completed: 150 + i * 9,
    tackles: 10 + i * 2,
    xg: Number((0.3 + i * 0.07).toFixed(2)),
  },
}));

const matches: Match[] = Array.from({ length: 5 }).map((_, i) => ({
  id: `match-${i + 1}`,
  home_team_id: teams[i].id,
  away_team_id: teams[i + 1].id,
  home_score: i + 1,
  away_score: i % 3,
  date: new Date(Date.now() - i * 86_400_000).toISOString(),
  status: i === 0 ? 'live' : 'finished',
}));

const scoring: ScoringScheme[] = [
  {
    id: 'score-1',
    name: 'Balanced Scout v1',
    normalization: 'z_score',
    missing_data_policy: 'penalty_missing',
    penalty_missing: 0.15,
    position_multiplier: { GK: 0.9, DEF: 1, MID: 1.05, FWD: 1.1 },
    weights: { goals: 0.3, assists: 0.2, passes_completed: 0.2, tackles: 0.15, xg: 0.15 },
  },
  {
    id: 'score-2',
    name: 'Attacking Upside',
    normalization: 'min_max',
    missing_data_policy: 'exclude',
    penalty_missing: 0,
    position_multiplier: { GK: 0.75, DEF: 0.9, MID: 1, FWD: 1.25 },
    weights: { goals: 0.45, assists: 0.2, passes_completed: 0.1, tackles: 0.05, xg: 0.2 },
  },
];

const observations: Observation[] = players.slice(0, 6).map((p, idx) => ({
  id: uid(),
  player_id: p.id,
  match_id: matches[idx % matches.length].id,
  notes: `${p.name} showed strong decision making under pressure.`,
  rating: 6 + (idx % 4),
  created_at: new Date(Date.now() - idx * 1000 * 3600).toISOString(),
}));

const auditLogs: AuditLog[] = [];

export const seedData = { teams, players, matches, scoring, observations, auditLogs };
