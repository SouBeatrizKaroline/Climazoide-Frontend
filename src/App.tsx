import { useEffect, useState } from 'react'
import { Activity, CloudRain, Database, Gauge, Info, Layers3, RefreshCw, Sparkles } from 'lucide-react'
import { getDashboardSummary } from './api'
import { demoSummary } from './demo'
import { RainChart } from './components/RainChart'
import { StatusTag } from './components/StatusTag'
import type { DashboardSummary } from './types'
import './styles.css'

const formatValue = (value: number | null, unit: string) => value === null ? '—' : `${value.toLocaleString('pt-BR')} ${unit}`.trim()

export default function App() {
  const [data, setData] = useState<DashboardSummary>(demoSummary)
  const [source, setSource] = useState<'api' | 'demo'>('demo')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    getDashboardSummary(controller.signal)
      .then((result) => { setData(result); setSource('api') })
      .catch(() => setSource('demo'))
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Climazoide, início"><span className="brand__mark"><CloudRain size={22} /></span><span>CLIMA<strong>ZOIDE</strong></span></a>
        <div className="topbar__meta"><span className={`connection connection--${source}`}>{loading ? 'Conectando…' : source === 'api' ? 'API conectada' : 'Modo demonstração'}</span><span>WORCAP 2026 · INPE</span></div>
      </header>

      <section className="dashboard" id="inicio">
        <aside className="sidebar">
          <div><p className="eyebrow"><Info size={14} /> Informações</p><h1>Chuva de amanhã começa nos dados de hoje.</h1><p className="muted">Previsão climática mensal experimental para apoiar leitura rápida e decisões responsáveis.</p></div>
          <nav aria-label="Seções do painel"><a className="nav-item nav-item--active" href="#visao"><Gauge size={18} /> Visão geral</a><a className="nav-item" href="#metricas"><Activity size={18} /> Desempenho</a><a className="nav-item" href="#fontes"><Database size={18} /> Fontes</a></nav>
          <div className="info-block" id="fontes"><p className="info-block__label">Base de referência</p><p>{data.dataset_period}</p></div>
          <div className="physical-list"><p className="info-block__label">Leituras físicas</p>{data.physical_variables.map((item) => <div className="physical" key={item.label}><span>{item.label}</span><small>{item.value}</small></div>)}</div>
          <p className="sidebar__foot">Protótipo científico · valores identificados por origem</p>
        </aside>

        <div className="content" id="visao">
          <div className="content__heading"><div><p className="eyebrow"><Sparkles size={14} /> Próximo mês</p><h2>{data.target_month}</h2></div><div className="update"><RefreshCw size={14} /> Atualizado em {new Date(data.updated_at).toLocaleDateString('pt-BR')}</div></div>

          <div className="hero-grid">
            <article className="card forecast-card"><div className="card__top"><span>Precipitação média</span><StatusTag status={data.precipitation.status} /></div><div className="forecast-value">{formatValue(data.precipitation.value, data.precipitation.unit)}</div><p>Estimativa espacial média para o domínio analisado.</p><div className="rain-bars" aria-hidden="true">{[36, 58, 45, 78, 62, 92, 74, 48, 67, 53, 84, 70].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></article>
            <article className="card oni-card" tabIndex={0} aria-label="Índice ONI atual"><div className="card__top"><span>Oscilação do Pacífico</span><StatusTag status={data.oni.status} /></div><div className="oni-ring" style={{ '--progress': `${Math.min(Math.abs(data.oni.value ?? 0) * 90, 100)}%` } as React.CSSProperties}><div><strong>{formatValue(data.oni.value, data.oni.unit)}</strong><small>ONI atual</small></div></div><p>Abra o painel detalhado quando a fonte NOAA estiver conectada.</p></article>
            <article className="card model-card"><div className="model-icon"><Layers3 size={24} /></div><div><span className="card__label">Modelo ativo</span><h3>{data.model.name}</h3><p>{data.model.scope}</p><p>RMSE de teste: <strong>{data.model.rmse ?? 'A confirmar'}</strong></p></div></article>
          </div>

          <div className="lower-grid">
            <article className="card chart-card"><div className="section-title"><div><span className="card__label">Comportamento recente</span><h3>Observado × previsto</h3></div><span>mm/dia</span></div><RainChart series={data.series} /></article>
            <section className="metric-panel" id="metricas" aria-label="Métricas do modelo"><div className="section-title"><div><span className="card__label">Conjunto de teste</span><h3>Métricas que importam</h3></div></div><div className="metric-grid">{data.metrics.map((metric) => <article className="metric" key={metric.label}><span>{metric.label}</span><strong>{formatValue(metric.value, metric.unit)}</strong><StatusTag status={metric.status} /></article>)}</div><p className="metric-note">As métricas só deixam “A confirmar” quando forem calculadas sobre o conjunto de teste.</p></section>
          </div>
        </div>
      </section>
    </main>
  )
}
