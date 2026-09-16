import type { DashboardSummary } from '../types'

export function RainChart({ series }: { series: DashboardSummary['series'] }) {
  const max = Math.max(...series.flatMap((item) => [item.predicted, item.observed ?? 0]), 1)
  const points = (key: 'observed' | 'predicted') => series.map((item, index) => {
    const value = item[key]
    return value === null ? null : `${40 + index * 92},${170 - (value / max) * 120}`
  }).filter(Boolean).join(' ')

  return (
    <div className="chart" role="img" aria-label="Comparação entre precipitação observada e prevista">
      <div className="chart__legend"><span><i className="dot dot--real" />Observado</span><span><i className="dot dot--forecast" />Previsto</span></div>
      <svg viewBox="0 0 540 210" aria-hidden="true">
        {[50, 90, 130, 170].map((y) => <line key={y} x1="32" y1={y} x2="510" y2={y} className="grid-line" />)}
        <polyline points={points('observed')} className="line line--real" />
        <polyline points={points('predicted')} className="line line--forecast" />
        {series.map((item, index) => <text key={item.month} x={40 + index * 92} y="199" className="axis-label">{item.month}</text>)}
      </svg>
    </div>
  )
}
