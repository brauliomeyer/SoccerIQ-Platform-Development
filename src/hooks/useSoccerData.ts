import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api/client';

export function usePlayers() {
  return useQuery({ queryKey: ['players'], queryFn: api.getPlayers, retry: 2 });
}

export function useTeams() {
  return useQuery({ queryKey: ['teams'], queryFn: api.getTeams, retry: 2 });
}

export function useMatches() {
  return useQuery({ queryKey: ['matches'], queryFn: api.getMatches, retry: 2, refetchInterval: 8000 });
}

export function useScoringSchemes() {
  return useQuery({ queryKey: ['scoring'], queryFn: api.getScoringSchemes, retry: 2 });
}

export function useAuditLogs() {
  return useQuery({ queryKey: ['audit'], queryFn: api.getAuditLogs, retry: 2 });
}

export function useCreatePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createPlayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }),
  });
}

export function useUpdatePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof api.updatePlayer>[1] }) => api.updatePlayer(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }),
  });
}

export function useDeletePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.deletePlayer,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['players'] }),
  });
}
