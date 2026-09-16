import type { LiveOverview, LocationOption } from './types'
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'
async function request<T>(path: string, signal?: AbortSignal): Promise<T> { const response = await fetch(`${API_URL}${path}`, { signal }); if (!response.ok) throw new Error('Os dados públicos não responderam agora.'); return response.json() }
export const getLocations = (signal?: AbortSignal) => request<LocationOption[]>('/v1/live/locations', signal)
export const getLiveOverview = (location: string, signal?: AbortSignal) => request<LiveOverview>(`/v1/live/overview?location=${encodeURIComponent(location)}`, signal)
