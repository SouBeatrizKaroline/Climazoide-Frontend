import { render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import App from './App'

vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))))

it('identifica dados de demonstração e métricas não confirmadas', async () => {
  render(<App />)
  expect(await screen.findByText('Modo demonstração')).toBeInTheDocument()
  expect(screen.getAllByText('A confirmar').length).toBeGreaterThan(0)
})
