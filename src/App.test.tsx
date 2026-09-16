import { render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import App from './App'
vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))))
it('não substitui falha externa por números simulados', async () => { render(<App />); expect(await screen.findByText('Não foi possível consultar as fontes agora.')).toBeInTheDocument(); expect(screen.getByText(/Nenhum dado simulado foi exibido/)).toBeInTheDocument() })
