export interface LocationOption { id: string; name: string; state: string; latitude: number; longitude: number }
export interface DailyForecast { time: string; weather_code: number; temperature_2m_max: number; temperature_2m_min: number; precipitation_sum: number; precipitation_probability_max: number; uv_index_max: number; et0_fao_evapotranspiration: number }
export interface LiveOverview {
  project: string; location_id: string; location: Omit<LocationOption, 'id'>; generated_at: string; timezone: string
  current: { observed_at: string; temperature: number; apparent_temperature: number; humidity: number; precipitation: number; weather_code: number; cloud_cover: number; surface_pressure: number; wind_speed: number; wind_direction: number; wind_gusts: number; soil_moisture: number | null; vapour_pressure_deficit: number | null }
  air_quality: { observed_at: string | null; us_aqi: number | null; pm2_5: number | null; pm10: number | null; carbon_monoxide: number | null; nitrogen_dioxide: number | null; ozone: number | null; uv_index: number | null }
  daily: DailyForecast[]
  cptec: { available: boolean; provider: string; location?: string; state?: string; updated_at?: string; forecast: Array<Record<string, string | number>> }
  impacts: Array<{ id: string; label: string; value: number | null; unit: string; detail: string }>
  sources: Array<{ name: string; scope: string; available: boolean; updated_at: string | null; url: string }>
}
