import type { DashboardOptions } from '../types'

const regionLabels: Record<string, string> = {
  'america-do-sul': 'América do Sul',
  amazonia: 'Amazônia',
  nordeste: 'Nordeste',
  'centro-sul': 'Centro-Sul',
}

interface Props {
  options: DashboardOptions
  month: string
  region: string
  disabled: boolean
  onMonthChange: (value: string) => void
  onRegionChange: (value: string) => void
}

export function ForecastControls(props: Props) {
  const { options, month, region, disabled, onMonthChange, onRegionChange } = props
  return (
    <div className="filters" aria-label="Filtros da previsão">
      <label>
        <span>Mês-alvo</span>
        <select value={month} onChange={(event) => onMonthChange(event.target.value)} disabled={disabled}>
          {options.months.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
      </label>
      <label>
        <span>Recorte</span>
        <select value={region} onChange={(event) => onRegionChange(event.target.value)} disabled={disabled}>
          {options.regions.map((item) => <option value={item} key={item}>{regionLabels[item] ?? item}</option>)}
        </select>
      </label>
    </div>
  )
}
