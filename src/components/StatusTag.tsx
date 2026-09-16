import type { DataStatus } from '../types'

const labels: Record<DataStatus, string> = { demo: 'Demonstração', calculated: 'Calculado', unavailable: 'A confirmar' }

export function StatusTag({ status }: { status: DataStatus }) {
  return <span className={`status status--${status}`}>{labels[status]}</span>
}
