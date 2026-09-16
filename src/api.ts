import type { DashboardSummary } from './types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function getDashboardSummary(signal?: AbortSignal): Promise<DashboardSummary> {
  const response = await fetch(`${API_URL}/v1/dashboard/summary`, { signal })
  if (!response.ok) throw new Error('Não foi possível carregar os dados do painel.')
  return response.json()
}
