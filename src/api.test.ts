import { afterEach, expect, it, vi } from 'vitest'
import { getModelManifest, MODEL_CONTRACT_VERSION } from './api'

afterEach(() => vi.unstubAllGlobals())

it('consome o manifesto do baseline validado sem confundir RMSE interno com oficial', async () => {
  const payload = {
    schema_version: '1.4',
    model_id: 'monthly-climatology-v1',
    model_name: 'Climatologia mensal espacial',
    status: 'validated_for_submission',
    scientific_audit: {
      status: 'passed',
      rule: 'Para prever T, usar somente dados disponíveis até T−1.',
      summary: 'Baseline temporalmente válido.',
      source_audit_commit: '54ab930',
      source_repository_read_only: true,
    },
    source_repository: 'https://github.com/mazeeqe/WORCAP-2026',
    source_branch: 'Beatriz',
    source_artifact_commit: 'f0a17ef',
    evaluation_scope: 'validação interna; pontuação oficial pendente',
    metrics: { name: 'RMSE', value: 1.882055, training_period: '1940-01/2018-12', validation_period: '2019-01/2022-12', observations: 3770928, scope: 'não é pontuação oficial' },
    reviewed_sources: [],
    candidate_models: [],
    readiness: [{ id: 'temporal_contract', label: 'Contrato M→M+1', status: 'passed' }],
    limitations: [],
  }
  const fetchMock = vi.fn(() => Promise.resolve(new Response(JSON.stringify(payload))))
  vi.stubGlobal('fetch', fetchMock)

  const manifest = await getModelManifest()

  expect(manifest.schema_version).toBe(MODEL_CONTRACT_VERSION)
  expect(manifest.metrics?.value).toBeCloseTo(1.882055)
  expect(manifest.scientific_audit.status).toBe('passed')
  expect(manifest.scientific_audit.source_repository_read_only).toBe(true)
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
