import { seedData } from '@/lib/seed';
import { AuditLog, Match, Observation, Player, ScoringScheme, Team } from '@/lib/types';
import { uid } from '@/lib/utils';

const DB_KEY = 'socceriq-db-v1';

type DB = {
  players: Player[];
  teams: Team[];
  matches: Match[];
  scoringSchemes: ScoringScheme[];
  observations: Observation[];
  auditLogs: AuditLog[];
};

const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data));

const initial: DB = {
  players: seedData.players,
  teams: seedData.teams,
  matches: seedData.matches,
  scoringSchemes: seedData.scoring,
  observations: seedData.observations,
  auditLogs: seedData.auditLogs,
};

function loadDB(): DB {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    localStorage.setItem(DB_KEY, JSON.stringify(initial));
    return clone(initial);
  }
  return JSON.parse(raw) as DB;
}

function saveDB(db: DB) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function mutate(mutator: (db: DB) => void) {
  const db = loadDB();
  mutator(db);
  saveDB(db);
}

function collectionAs<T>(db: DB, key: keyof DB): T[] {
  return db[key] as unknown as T[];
}

const delay = (ms = 120) => new Promise((res) => setTimeout(res, ms));

export function logAction(entity: string, action: 'create' | 'update' | 'delete', entity_id: string, changes: Record<string, unknown>) {
  mutate((db) => {
    db.auditLogs.unshift({ id: uid(), entity, action, entity_id, changes, created_at: new Date().toISOString() });
  });
}

async function list<T>(key: keyof DB): Promise<T[]> {
  await delay();
  return clone(collectionAs<T>(loadDB(), key));
}

async function getOne<T extends { id: string }>(key: keyof DB, id: string): Promise<T | undefined> {
  await delay();
  const row = collectionAs<T>(loadDB(), key).find((item) => item.id === id);
  return row ? clone(row) : undefined;
}

async function createOne<T extends { id: string }>(key: keyof DB, payload: Omit<T, 'id'>): Promise<T> {
  await delay();
  const item = { id: uid(), ...payload } as T;
  mutate((db) => {
    collectionAs<T>(db, key).push(item);
  });
  logAction(key, 'create', item.id, item as Record<string, unknown>);
  return clone(item);
}

async function updateOne<T extends { id: string }>(key: keyof DB, id: string, payload: Partial<T>): Promise<T> {
  await delay();
  let updated!: T;
  mutate((db) => {
    const records = collectionAs<T>(db, key);
    const index = records.findIndex((item) => item.id === id);
    if (index < 0) throw new Error(`No record for ${id}`);
    const original = records[index];
    updated = { ...original, ...payload };
    records[index] = updated;
  });
  logAction(key, 'update', id, payload as Record<string, unknown>);
  return clone(updated);
}

async function deleteOne<T extends { id: string }>(key: keyof DB, id: string): Promise<void> {
  await delay();
  mutate((db) => {
    const filtered = collectionAs<T>(db, key).filter((item) => item.id !== id);
    db[key] = filtered as unknown as DB[typeof key];
  });
  logAction(key, 'delete', id, {});
}

export const api = {
  getPlayers: () => list<Player>('players'),
  getPlayer: (id: string) => getOne<Player>('players', id),
  createPlayer: (data: Omit<Player, 'id'>) => createOne<Player>('players', data),
  updatePlayer: (id: string, data: Partial<Player>) => updateOne<Player>('players', id, data),
  deletePlayer: (id: string) => deleteOne<Player>('players', id),

  getTeams: () => list<Team>('teams'),
  getTeam: (id: string) => getOne<Team>('teams', id),
  createTeam: (data: Omit<Team, 'id'>) => createOne<Team>('teams', data),
  updateTeam: (id: string, data: Partial<Team>) => updateOne<Team>('teams', id, data),
  deleteTeam: (id: string) => deleteOne<Team>('teams', id),

  getMatches: () => list<Match>('matches'),
  getMatch: (id: string) => getOne<Match>('matches', id),
  createMatch: (data: Omit<Match, 'id'>) => createOne<Match>('matches', data),
  updateMatch: (id: string, data: Partial<Match>) => updateOne<Match>('matches', id, data),
  deleteMatch: (id: string) => deleteOne<Match>('matches', id),

  getScoringSchemes: () => list<ScoringScheme>('scoringSchemes'),
  getScoringScheme: (id: string) => getOne<ScoringScheme>('scoringSchemes', id),
  createScoringScheme: (data: Omit<ScoringScheme, 'id'>) => createOne<ScoringScheme>('scoringSchemes', data),
  updateScoringScheme: (id: string, data: Partial<ScoringScheme>) => updateOne<ScoringScheme>('scoringSchemes', id, data),
  deleteScoringScheme: (id: string) => deleteOne<ScoringScheme>('scoringSchemes', id),

  getObservations: () => list<Observation>('observations'),
  getObservation: (id: string) => getOne<Observation>('observations', id),
  createObservation: (data: Omit<Observation, 'id'>) => createOne<Observation>('observations', data),
  updateObservation: (id: string, data: Partial<Observation>) => updateOne<Observation>('observations', id, data),
  deleteObservation: (id: string) => deleteOne<Observation>('observations', id),

  getAuditLogs: () => list<AuditLog>('auditLogs'),
};
