import type { LiveOverview, LocationOption, ModelManifest, ResearchCatalog, SubmissionStatus } from './types'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
export const MODEL_CONTRACT_VERSION = '1.2'
async function request<T>(path: string, signal?: AbortSignal): Promise<T> { const response = await fetch(`${API_URL}${path}`, { signal }); if (!response.ok) throw new Error('Os dados públicos não responderam agora.'); return response.json() }
export const getLocations = (signal?: AbortSignal) => request<LocationOption[]>('/v1/live/locations', signal)
export const getLiveOverview = (location: string, signal?: AbortSignal) => request<LiveOverview>(`/v1/live/overview?location=${encodeURIComponent(location)}`, signal)
export const getModelManifest = async (signal?: AbortSignal) => {
  const manifest = await request<ModelManifest>('/v1/model/manifest', signal)
  if (manifest.schema_version !== MODEL_CONTRACT_VERSION) throw new Error('Contrato científico incompatível entre frontend e backend.')
  return manifest
}
export const getResearchCatalog = (signal?: AbortSignal) => request<ResearchCatalog>('/v1/research/branches', signal)
export const getSubmissionStatus = (signal?: AbortSignal) => request<SubmissionStatus>('/v1/submission/status', signal)
export const SUBMISSION_EXAMPLE_URL = `${API_URL}/v1/submission/example.csv`
export const SUBMISSION_DOWNLOAD_URL = `${API_URL}/v1/submission/download`
