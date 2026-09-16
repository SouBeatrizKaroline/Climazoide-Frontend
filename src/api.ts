import type { DashboardOptions, DashboardSummary } from './types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function getDashboardSummary(
  targetMonth: string,
  region: string,
  signal?: AbortSignal,
): Promise<DashboardSummary> {
  const params = new URLSearchParams({ target_month: targetMonth, region })
  const response = await fetch(`${API_URL}/v1/dashboard/summary?${params}`, { signal })
  if (!response.ok) throw new Error('Não foi possível carregar os dados do painel.')
  return response.json()
}

export async function getDashboardOptions(signal?: AbortSignal): Promise<DashboardOptions> {
  const response = await fetch(`${API_URL}/v1/dashboard/options`, { signal })
  if (!response.ok) throw new Error('Não foi possível carregar os filtros.')
  return response.json()
}
