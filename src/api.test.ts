import { afterEach, expect, it, vi } from 'vitest'
import { getModelManifest, MODEL_CONTRACT_VERSION } from './api'

afterEach(() => vi.unstubAllGlobals())

it('consome o manifesto científico do backend sem métricas antigas', async () => {
  const payload = {
    schema_version: '1.1',
    model_id: 'pca-lstm-run1',
    model_name: 'PCA/EOF + LSTM',
    status: 'requires_retraining',
    source_repository: 'https://github.com/mazeeqe/WORCAP-2026',
    source_branch: 'Beatriz',
    source_artifact_commit: 'f0a17ef',
    evaluation_scope: 'retreino obrigatório',
    metrics: null,
    reviewed_sources: [],
    candidate_models: [],
    readiness: [{ id: 'temporal_contract', label: 'Contrato M→M+1', status: 'passed' }],
    limitations: [],
  }
  const fetchMock = vi.fn(() => Promise.resolve(new Response(JSON.stringify(payload))))
  vi.stubGlobal('fetch', fetchMock)

  const manifest = await getModelManifest()

  expect(manifest.schema_version).toBe(MODEL_CONTRACT_VERSION)
  expect(manifest.metrics).toBeNull()
  expect(manifest.readiness[0].status).toBe('passed')
  expect(fetchMock).toHaveBeenCalledWith(
    expect.stringContaining('/v1/model/manifest'),
    expect.objectContaining({ signal: undefined }),
  )
})

it('rejeita manifesto incompatível em vez de exibir estado científico incorreto', async () => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(new Response(JSON.stringify({ schema_version: '9.9' })))))

  await expect(getModelManifest()).rejects.toThrow('Contrato científico incompatível')
})
