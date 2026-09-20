# Climazoide Web

[![CI](https://github.com/SouBeatrizKaroline/Climazoide-Frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/SouBeatrizKaroline/Climazoide-Frontend/actions/workflows/ci.yml)
[![Pages](https://github.com/SouBeatrizKaroline/Climazoide-Frontend/actions/workflows/deploy-pages.yml/badge.svg)](https://soubeatrizkaroline.github.io/Climazoide-Frontend/)
[![License: MIT](https://img.shields.io/badge/license-MIT-0b7a75.svg)](LICENSE)

Interface pública do Climazoide: previsão mensal de precipitação, contexto meteorológico
recente e apoio à decisão apresentados com origem, período, disponibilidade e limites.

- **Site:** https://soubeatrizkaroline.github.io/Climazoide-Frontend/
- **Backend:** https://github.com/SouBeatrizKaroline/Climazoide-Backend
- **API:** https://climazoide-api.onrender.com/docs
- **Pesquisa auditada, somente leitura:** https://github.com/mazeeqe/WORCAP-2026

## Equipe

Beatriz Karoline • Daiane Fonseca • Tomáz Giansante

## O que a interface resolve

- disponibiliza o baseline enviado e o novo candidato completo;
- explica o contrato mensal `T−1 → T` e as nove variáveis oficiais;
- apresenta condição atual e previsão de sete dias em 13 pontos sul-americanos;
- identifica fonte, período, contingência e campos indisponíveis;
- transforma o cenário mensal em leituras para agricultura, logística, risco,
  hidroenergia, turismo e gestão da água;
- mantém métricas internas, pontuação pública e pesquisa histórica claramente separadas.

## Três camadas, três papéis

| Camada | Cobertura | Dados | Relação com o CSV |
| --- | --- | --- | --- |
| previsão mensal | grade 301 × 261 | arquivos científicos oficiais | gera `id,tp_mm_day` |
| contexto recente | 13 pontos | tempo, ar e sete dias | não entra no modelo |
| apoio à decisão | locais e setores | saída mensal + histórico permitido | interpreta; não altera o CSV |

O aviso discreto no topo e o manifesto científico deixam explícito que Open-Meteo,
MET Norway, CAMS, CPTEC, NOAA, NASA POWER e USNO tornam a experiência mais completa,
mas não treinam, calibram ou corrigem a submissão atual.

## Integridade científica

Para prever um mês `T`, só podem ser usadas informações disponíveis até o fim de
`T−1`. Os campos de janeiro usados para prever fevereiro não podem ser reorganizados
para estimar janeiro. A precipitação ERA5 observada de 2023–2024 é alvo proibido,
mesmo sendo pública.

O painel também distingue:

- **violação objetiva:** alvo, informação futura, valor real fixado ou transformação
  ajustada com o período proibido;
- **risco de overfitting:** escolhas sucessivas orientadas pelo leaderboard público,
  sem evidência direta de consulta ao alvo.

O recorte público de 2023 não substitui a validação temporal independente; 2024 é a
avaliação privada. A interface nunca apresenta RMSE interno como pontuação oficial.

## Estado dos modelos

| Modelo | Estado | RMSE interno | Pontuação pública |
| --- | --- | ---: | ---: |
| climatologia mensal | baseline enviado | 1,882056 | 1,85077 |
| XGBoost de anomalias | candidato validado | **1,838655** | pendente |
| PLS defasado + LSTM | pesquisa temporal revisada | 1,840456* | pendente |

O candidato foi avaliado em 3.770.928 previsões históricas de 2019–2022 e usa somente
as entradas científicas declaradas. Modelos históricos reprovados continuam visíveis
como pesquisa, sem serem promovidos.

\* A nova métrica veio do repositório científico auditado em 20/09/2026. Ela agrega
horizontes em proporções diferentes do teste oficial e, portanto, não é apresentada
como score esperado. A variante com ONI piorou para 1,865132 e continua bloqueada.

## Downloads

- **Baixar baseline enviado:** 1.885.464 linhas já pontuadas.
- **Baixar novo candidato:** 1.885.464 linhas validadas, score oficial pendente.
- **CSV parcial:** só aparece quando existem previsões válidas para parte dos IDs.
- **Exemplo de formato:** três linhas ilustrativas; não é uma submissão.

Todos os arquivos completos preservam `id,tp_mm_day`, IDs, meses e ordem do arquivo
oficial. O frontend recebe o estado do backend; não monta previsões no navegador.

## Experiência e linguagem visual

A hierarquia acompanha a pergunta do usuário:

1. **Agora:** condição, temperatura, vento, chuva e ar.
2. **Próximos dias:** janela prevista e relações descritivas.
3. **Mês:** grade, modelo, auditoria e downloads.
4. **Decisão:** cenário setorial, o que observar e limites.

Verde-água sinaliza dado rastreável; verde-limão destaca resultado e ação. Estados
indisponíveis explicam a causa em vez de usar zeros. Pressão ao nível do mar, ET₀
aproximada e contingências são rotuladas com precisão. A interface usa HTML semântico,
contraste alto, foco visível, layout responsivo e redução de movimento.

## Fontes operacionais exibidas

| Fonte | Informação |
| --- | --- |
| Open-Meteo | tempo, chuva, vento, solo e sete dias |
| MET Norway | contingência meteorológica gratuita |
| CAMS/Copernicus | AQI, partículas, gases e UV |
| CPTEC/INPE | comparação nacional quando aplicável |
| NOAA CPC | ONI observado e fase ENSO |
| US Naval Observatory | Sol e Lua |

Cada resposta informa origem e validade. Falhas parciais não derrubam o restante do
painel e nenhum número simulado é usado como substituição.

## Executar

O projeto usa Node.js `24.19.0`.

```bash
cp .env.example .env
npm ci
npm run dev
```

Acesse http://localhost:5173. Por padrão, a API local é http://localhost:8000.

Para executar o backend em outro terminal:

```bash
cd Climazoide-Backend
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

## Contrato consumido

```text
GET /v1/live/locations
GET /v1/live/overview
GET /v1/model/manifest
GET /v1/research/branches
GET /v1/decision-support/options
GET /v1/decision-support/scenario
GET /v1/submission/status
GET /v1/submission/download
GET /v1/submission/candidate/download
GET /v1/submission/partial.csv
GET /v1/submission/example.csv
```

O frontend valida `model_contract_version=1.5`. Mudanças incompatíveis falham no build
em vez de exibir um estado científico incorreto.

## Qualidade e publicação

```bash
npm run lint
npm test
npm run build
```

- CI e deploy do GitHub Pages rodam em cada push para `main`;
- `VITE_API_URL` define a API HTTPS de produção;
- variáveis `VITE_*` nunca recebem segredos, pois são públicas no navegador;
- testes impedem fallback numérico simulado e contrato incompatível;
- a origem do site deve constar em `ALLOWED_ORIGINS` no backend.

## Estrutura

```text
src/
├── api.ts          cliente e versão do contrato
├── types.ts        tipos científicos e operacionais
├── App.tsx         interface e estados
├── styles.css      sistema visual responsivo
└── App.test.tsx    testes de comportamento
```

Consulte [contribuição](CONTRIBUTING.md), [governança](GOVERNANCE.md),
[segurança](SECURITY.md) e [changelog](CHANGELOG.md).

## Limites responsáveis

- previsões e reanálises possuem incerteza;
- pontos operacionais não substituem a grade continental;
- recomendações não substituem profissionais, alertas ou autoridades;
- correlação de sete dias é descritiva, não causal;
- em risco imediato, use os canais oficiais de defesa civil e meteorologia.
