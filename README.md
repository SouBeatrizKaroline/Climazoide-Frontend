# Climazoide Web

[![CI](https://github.com/SouBeatrizKaroline/Climazoide-Frontend/actions/workflows/ci.yml/badge.svg)](https://github.com/SouBeatrizKaroline/Climazoide-Frontend/actions/workflows/ci.yml)
[![Pages](https://github.com/SouBeatrizKaroline/Climazoide-Frontend/actions/workflows/deploy-pages.yml/badge.svg)](https://soubeatrizkaroline.github.io/Climazoide-Frontend/)
[![License: MIT](https://img.shields.io/badge/license-MIT-0b7a75.svg)](LICENSE)

Dashboard responsivo conectado ao **Climazoide API**. Transforma dados públicos recentes em uma leitura clara de tempo, chuva, solo, ar, agricultura, conforto térmico e disponibilidade hídrica.

Projeto aberto sob licença MIT. Consulte [como contribuir](CONTRIBUTING.md), [governança](GOVERNANCE.md), [segurança](SECURITY.md) e [histórico de versões](CHANGELOG.md).

## Repositórios e responsabilidades

- **Este repositório:** aplicação React/TypeScript, interface, acessibilidade e publicação no GitHub Pages.
- **[Climazoide-Backend](https://github.com/SouBeatrizKaroline/Climazoide-Backend):** API FastAPI publicada no Render, integrações, normalização, tratamento de falhas e proveniência.
- **[WORCAP-2026](https://github.com/mazeeqe/WORCAP-2026):** repositório científico e de testes/experimentos de modelos. Reúne PCA/PLS + LSTM, ConvLSTM, XGBoost, ONI, EDA e artefatos de pesquisa; não é alterado pelo produto Climazoide.

O dashboard separa três coisas diferentes: dados meteorológicos atuais, previsão operacional
de sete dias e pesquisa de previsão climática mensal M→M+1. Uma camada não é apresentada
como resultado da outra.

## APIs e dados apresentados

| Fonte | Informação exibida |
| --- | --- |
| Open-Meteo | tempo atual, chuva, vento, solo e previsão de sete dias |
| CAMS/Copernicus | AQI, material particulado, gases e UV |
| CPTEC/INPE | comparação nacional para pontos brasileiros |
| NOAA CPC | ONI observado e fase ENSO |
| US Naval Observatory | fase lunar, iluminação, nascer e pôr do Sol |
| Backend Climazoide | catálogo científico, branches auditadas e estado dos modelos |

Kaggle/WORCAP e ERA5 pertencem ao pipeline científico; não alimentam silenciosamente os
cartões de tempo atual. Métricas sem validação continuam marcadas como pesquisa ou indisponíveis.

## Funciona de verdade

- consulta o backend ao abrir, trocar de cidade ou atualizar;
- exibe somente valores retornados pelas fontes públicas;
- mostra horário, local, origem e disponibilidade;
- não usa fallback numérico simulado;
- apresenta erro acionável quando a fonte principal falha;
- oferece 13 pontos operacionais em países e territórios da América do Sul;
- adapta-se a desktop, tablet e celular.

## Experiência e design

A hierarquia prioriza decisões em três níveis:

1. **Agora:** temperatura, sensação, chuva, vento e condição;
2. **Próximos sete dias:** temperatura, volume e probabilidade de chuva;
3. **Consequências:** balanço hídrico, evapotranspiração, calor e qualidade do ar.

Verde-água sinaliza dado rastreável. Verde-limão destaca resultados e ação. Indisponibilidades aparecem sem maquiar falhas. A interface adota texto direto, contraste alto, foco visível, HTML semântico e redução de movimento.

## Rodar frontend e backend

Terminal 1:

```bash
cd Climazoide-Backend
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

Terminal 2:

```bash
cd Climazoide-Frontend
cp .env.example .env
npm ci
npm run dev
```

Acesse `http://localhost:5173`. O backend padrão é `http://localhost:8000`.

## Contrato consumido

```text
GET /v1/live/locations
GET /v1/live/overview?location=brasilia
GET /v1/model/manifest
GET /v1/research/branches
```

O navegador não consulta serviços climáticos diretamente. O backend centraliza Open-Meteo, CAMS/Copernicus, CPTEC/INPE, timeouts, transformações e proveniência.

O painel também recebe o ONI mais recente do NOAA CPC e efemérides do US Naval Observatory para contextualizar ENSO, fase lunar, nascer e pôr do Sol sem transformar correlação em causalidade.

Os pontos operacionais são Buenos Aires, La Paz, Brasília, Santiago, Bogotá, Quito, Georgetown, Assunção, Lima, Paramaribo, Montevidéu, Caracas e Caiena. CPTEC é consultado apenas no Brasil; fora dessa cobertura, a interface mostra **Fora da cobertura**, em vez de erro ou dado inventado.

## Qualidade

```bash
npm run lint
npm test
npm run build
powershell -ExecutionPolicy Bypass -File scripts/install_hooks.ps1
```

O teste garante que falhas externas não sejam trocadas por valores simulados.

## Build e publicação

```bash
docker build --build-arg VITE_API_URL=https://api.exemplo.org -t climazoide-web .
```

Em produção, configure `VITE_API_URL` com a URL HTTPS do backend e inclua a origem do site em `ALLOWED_ORIGINS`. Nunca coloque credenciais em variáveis `VITE_*`: elas são públicas no navegador.

Para o GitHub Pages, crie em **Settings → Secrets and variables → Actions → Variables** a variável `VITE_API_URL` com a URL HTTPS publicada pelo backend. O workflow `Deploy Pages` injeta essa variável no build; sem ela, o site continua apontando para o backend local por segurança e não exibe números simulados.

## WORCAP 2026

O painel operacional complementa a tarefa científica de estimar precipitação mensal M+1 sobre a América do Sul. Ele comunica:

- grade ERA5 de 0,25°;
- 78.561 pontos mensais;
- RMSE como métrica oficial;
- estado auditado do PCA/EOF + LSTM, sem publicar métricas invalidadas;
- distinção explícita entre tempo recente, previsão de sete dias e previsão climática mensal.

O contrato é estritamente temporal: para prever setembro, o modelo só pode usar dados
disponíveis até agosto. Dados atmosféricos de setembro não podem ser usados como entrada
da previsão de setembro. Isso seria vazamento temporal e invalidaria a comparação.

O frontend não apresenta as métricas antigas: a auditoria detectou que a execução histórica usava a atmosfera do mês-alvo em vez do mês anterior. O código foi corrigido, mas os resultados dependem de retreino. O painel não afirma executar inferência mensal enquanto pesos e objetos PCA não estiverem publicados.

O mapa de branches mostra todo o trabalho localizado no WORCAP, destaca a consolidação
mais recente e diferencia referência, experimento, incorporação e código superado. Os
links apontam para as branches na origem, que permanece sem alterações.

### Duas camadas, sem confusão

- **Grade científica:** toda a área `60°S–15°N`, `90°O–25°O`, com 78.561 pontos por mês. É a cobertura exigida pelo Kaggle.
- **Camada operacional:** 13 pontos representativos, usados somente para dados públicos recentes e contexto de decisão.

Uma capital não representa um país inteiro e não substitui a previsão mensal em grade. Essa limitação aparece no próprio painel.

### Sincronização científica

O laboratório de modelos não contém uma lista mantida manualmente no frontend. Ele consome `/v1/model/manifest` e apresenta:

- PCA/EOF + LSTM pronto para retreino;
- PLS concorrente e PLS defasado somente como pesquisa;
- ConvLSTM com arquitetura pronta para treinamento, ainda sem métricas oficiais;
- checklist de contrato temporal, grade, dataset, retreino, submissão e leaderboard;
- commit e branch científicos que originaram o estado exibido.

Se o backend mudar o contrato, a tipagem e os testes do frontend acusam a divergência durante a CI.

## Estrutura

```text
src/
├── api.ts          cliente do backend
├── types.ts        contrato TypeScript
├── App.tsx         estados e composição
├── styles.css      sistema visual responsivo
└── App.test.tsx    teste contra fallback simulado
```

## Limites responsáveis

- toda previsão possui incerteza;
- indicadores apoiam triagem e não substituem decisões médicas, agronômicas ou de defesa civil;
- CPTEC pode ficar temporariamente indisponível e esse estado é exibido;
- em risco imediato, consulte alertas e autoridades oficiais.
