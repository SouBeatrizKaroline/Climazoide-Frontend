# Climazoide Web

Interface enxuta para comunicar a previsão mensal de precipitação do desafio WORCAP 2026. O painel mostra previsão, ONI, modelo, série observado × previsto e métricas de teste sem transformar números de demonstração em resultados científicos.

> Estado atual: MVP de interface. Quando o backend não está disponível, a tela entra em **Modo demonstração** e identifica cada dado como `Demonstração`, `Calculado` ou `A confirmar`.

## O que é exigido pelo desafio

- prever precipitação média do mês seguinte em mm/dia por ponto da grade;
- preservar os IDs do `sample_submission.csv`;
- avaliar por RMSE;
- publicar código e documentação reproduzíveis;
- usar os dados ERA5 fornecidos conforme as regras da competição.

## O que este frontend acrescenta

- leitura executiva da previsão e do estado do modelo;
- visualização observado × previsto;
- espaço preparado para ONI e variáveis físicas;
- estados de procedência para evitar métricas decorativas;
- navegação por teclado, HTML semântico e suporte a redução de movimento.

## Rodar localmente

```bash
cp .env.example .env
npm install
npm run dev
```

O backend esperado fica em `http://localhost:8000`. Configure outro endereço com `VITE_API_URL`.

## Contrato consumido

O frontend carrega primeiro `GET /v1/dashboard/options` e consulta `GET /v1/dashboard/summary?target_month=AAAA-MM&region=...` a cada mudança de filtro. O último payload válido permanece visível durante a sincronização. Consulte o OpenAPI do backend em `/docs`.

O contrato exibe origem M, alvo M+1, grade 301 × 261, 78.561 pontos por mês, RMSE global e 1.885.464 linhas da submissão completa. Esses números descrevem o desafio; previsões e métricas continuam marcadas pela procedência real.

## Organização

```text
src/
├── components/       componentes visuais pequenos
├── test/             configuração de testes
├── api.ts            acesso ao backend
├── demo.ts           fallback explicitamente demonstrativo
├── types.ts          contrato da API
└── App.tsx           composição do dashboard
```

## Qualidade e commits

```bash
npm run lint
npm test
npm run build
powershell -ExecutionPolicy Bypass -File scripts/install_hooks.ps1
```

As regras completas estão em [CONTRIBUTING.md](CONTRIBUTING.md). A CI valida a branch `main`.

## Limites atuais

- o layout é desktop e propositalmente fixo, a partir de 1180 px;
- o painel não executa o modelo no navegador;
- métricas e ONI ficam como demonstração/indisponíveis até a integração com fontes e artefatos reais;
- o ConvLSTM do repositório científico ainda está em desenvolvimento e não é anunciado como modelo ativo.

## Licença

Antes da publicação pública, confirme com a equipe a licença apropriada e as regras específicas do conjunto de dados da competição.
