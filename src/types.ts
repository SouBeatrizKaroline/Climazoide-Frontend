export interface LocationOption {
  id: string
  name: string
  country: string
  code: string
  state?: string
  latitude: number
  longitude: number
}

export interface DailyForecast {
  time: string
  weather_code: number
  temperature_2m_max: number
  temperature_2m_min: number
  precipitation_sum: number
  precipitation_probability_max: number
  uv_index_max: number
  et0_fao_evapotranspiration: number
}
export interface LiveOverview {
  project: string; location_id: string; location: Omit<LocationOption, 'id'>; generated_at: string; timezone: string
  coverage: { scientific_domain: string; grid_resolution: string; grid_points_per_month: number; operational_points: number; note: string }
  current: { observed_at: string; temperature: number; apparent_temperature: number; humidity: number; precipitation: number; weather_code: number; cloud_cover: number; surface_pressure: number; wind_speed: number; wind_direction: number; wind_gusts: number; soil_moisture: number | null; vapour_pressure_deficit: number | null }
  air_quality: { observed_at: string | null; us_aqi: number | null; pm2_5: number | null; pm10: number | null; carbon_monoxide: number | null; nitrogen_dioxide: number | null; ozone: number | null; uv_index: number | null }
  daily: DailyForecast[]
  cptec: { available: boolean; applicable?: boolean; provider: string; location?: string; state?: string; updated_at?: string; forecast: Array<Record<string, string | number>> }
  climate_context: { oni: { available: boolean; season?: string; year?: number; value?: number; phase?: string } }
  astronomy: { available: boolean; moon_phase?: string; moon_illumination?: string; sunrise_utc?: string; sunset_utc?: string; date?: string }
  impacts: Array<{ id: string; label: string; value: number | null; unit: string; detail: string }>
  sources: Array<{ name: string; scope: string; available: boolean; applicable?: boolean; updated_at: string | null; url: string }>
}

export type ModelReadinessStatus = 'passed' | 'pending' | 'blocked_by_auth'
export type CandidateModelStatus = 'ready_for_retraining' | 'ready_for_training' | 'research_only' | 'not_implemented'

export interface ModelManifest {
  schema_version: string
  model_id: string
  model_name: string
  status: 'requires_retraining'
  source_repository: string
  source_branch: string
  source_artifact_commit: string
  evaluation_scope: string
  metrics: null
  reviewed_sources: Array<{
    ref: string
    commit: string
    decision: string
    promoted: boolean
    reason?: string
  }>
  candidate_models: Array<{
    id: string
    label: string
    status: CandidateModelStatus
    purpose: string
  }>
  readiness: Array<{
    id: string
    label: string
    status: ModelReadinessStatus
  }>
  limitations: string[]
}
