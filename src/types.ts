export type DataStatus = 'demo' | 'calculated' | 'unavailable'

export interface Metric {
  label: string
  value: number | null
  unit: string
  status: DataStatus
}

export interface DashboardSummary {
  project: string
  target_month: string
  precipitation: Metric
  oni: Metric
  model: { name: string; status: DataStatus; scope: string; rmse: number | null }
  metrics: Metric[]
  physical_variables: Array<{ label: string; value: string; status: DataStatus }>
  series: Array<{ month: string; observed: number | null; predicted: number }>
  dataset_period: string
  updated_at: string
  region: string
  context: {
    origin_month: string
    target_month: string
    horizon_months: number
    grid_resolution: string
    grid_points: number
    evaluation_metric: string
    submission_rows: number
  }
}

export interface DashboardOptions {
  months: string[]
  regions: string[]
  default_month: string
  default_region: string
}
