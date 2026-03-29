export type Position = 'GK' | 'DEF' | 'MID' | 'FWD';

export interface Team {
  id: string;
  name: string;
  league: string;
  budget: number;
}

export interface Player {
  id: string;
  name: string;
  position: Position;
  age: number;
  team_id: string;
  market_value: number;
  stats: {
    goals: number;
    assists: number;
    passes_completed: number;
    tackles: number;
    xg: number;
  };
}

export interface Match {
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: number;
  away_score: number;
  date: string;
  status: 'live' | 'finished' | 'scheduled';
}

export interface ScoringScheme {
  id: string;
  name: string;
  normalization: 'z_score' | 'min_max';
  missing_data_policy: 'exclude' | 'penalty_missing';
  penalty_missing: number;
  position_multiplier: Record<Position, number>;
  weights: {
    goals: number;
    assists: number;
    passes_completed: number;
    tackles: number;
    xg: number;
  };
}

export interface Observation {
  id: string;
  player_id: string;
  match_id: string;
  notes: string;
  rating: number;
  created_at: string;
}

export interface AuditLog {
  id: string;
  entity: string;
  action: 'create' | 'update' | 'delete';
  entity_id: string;
  changes: Record<string, unknown>;
  created_at: string;
}
