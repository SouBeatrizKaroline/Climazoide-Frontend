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
  weather_code: number | null
  temperature_2m_max: number | null
  temperature_2m_min: number | null
  precipitation_sum: number | null
  precipitation_probability_max: number | null
  uv_index_max: number | null
  et0_fao_evapotranspiration: number | null
}
export interface LiveOverview {
  project: string; location_id: string; location: Omit<LocationOption, 'id'>; generated_at: string; timezone: string
  weather_metadata: { provider: string; model_updated_at: string | null; valid_from: string | null; valid_until: string | null; fallback_used: boolean; primary_source_error: string | null }
  coverage: { scientific_domain: string; grid_resolution: string; grid_points_per_month: number; operational_points: number; note: string }
  current: { observed_at: string | null; temperature: number | null; apparent_temperature: number | null; humidity: number | null; precipitation: number | null; weather_code: number | null; condition?: string | null; cloud_cover: number | null; surface_pressure: number | null; wind_speed: number | null; wind_direction: number | null; wind_gusts: number | null; soil_moisture: number | null; vapour_pressure_deficit: number | null }
  air_quality: { observed_at: string | null; us_aqi: number | null; pm2_5: number | null; pm10: number | null; carbon_monoxide: number | null; nitrogen_dioxide: number | null; ozone: number | null; uv_index: number | null }
  daily: DailyForecast[]
  cptec: { available: boolean; applicable?: boolean; provider: string; location?: string; state?: string; updated_at?: string; forecast: Array<Record<string, string | number>> }
  climate_context: { oni: { available: boolean; season?: string; year?: number; value?: number; phase?: string } }
  astronomy: { available: boolean; moon_phase?: string; moon_illumination?: string; sunrise_utc?: string; sunset_utc?: string; date?: string }
  impacts: Array<{ id: string; label: string; value: number | null; unit: string; detail: string }>
  short_range_analysis: {
    period_start: string | null
    period_end: string | null
    days_received: number
    metrics: Array<{ id: string; label: string; value: number | null; unit: string; detail: string }>
    rain_temperature_correlation: { value: number | null; paired_days: number; interpretation: string; detail: string }
  }
  sources: Array<{ name: string; scope: string; available: boolean; applicable?: boolean; updated_at: string | null; valid_from?: string | null; valid_until?: string | null; note?: string | null; url: string }>
}

export type ModelReadinessStatus = 'passed' | 'pending' | 'blocked_by_auth'
export type CandidateModelStatus = 'validated_baseline' | 'ready_for_retraining' | 'ready_for_training' | 'research_only' | 'not_implemented'

export interface ModelManifest {
  schema_version: string
  model_id: string
  model_name: string
  status: 'requires_retraining' | 'validated_for_submission'
  scientific_audit: {
    status: 'critical' | 'pending' | 'passed'
    rule: string
    summary: string
    source_audit_commit: string
    source_repository_read_only: boolean
  }
  source_repository: string
  source_branch: string
  source_artifact_commit: string
  evaluation_scope: string
  official_dataset: {
    source: string
    training_period: string
    target_period: string
    domain: string
    resolution: string
    grid: string
    points_per_month: number
    target_months: number
    submission_rows: number
    target: { id: string; label: string; unit: string; temporal_role: string }
    atmospheric_features: Array<{ id: string; label: string; level: string; temporal_role: string }>
    test_contract: string
    baseline_usage: string
  }
  metrics: null | {
    name: 'RMSE'
    value: number
    training_period: string
    validation_period: string
    observations: number
    scope: string
  }
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

export interface ResearchCatalog {
  schema_version: string
  audited_at: string
  source_repository: string
  source_repository_modified: false
  default_branch: string
  latest_branch: string
  branches: Array<{
    name: string
    commit: string
    updated_at: string
    status: 'integrated_base' | 'contract_reference' | 'experimental_result' | 'merged_into_latest' | 'superseded' | 'latest'
    work: string[]
  }>
  promotion_policy: { production_metrics: false; reason: string; binary_artifacts_copied: false }
}

export interface SubmissionStatus {
  ready: boolean
  filename: string | null
  columns: ['id', 'tp_mm_day']
  expected_rows: number | null
  id_contract: string
  temporal_contract: string
  model_id: string | null
  model_name: string | null
  submission_kind: 'validated_baseline' | null
  validation: ModelManifest['metrics']
  official_score: number | null
  example_available: boolean
  example_is_submittable: false
  partial_available: boolean
  partial_filename: string | null
  partial_rows: number
  partial_target_months: string[]
  partial_is_complete: boolean
  partial_notice: string
  blocking_reasons: string[]
}
