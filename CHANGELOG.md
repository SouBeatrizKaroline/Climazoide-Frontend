# Changelog

Este projeto segue [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.6.2] - 2026-09-20

- incorpora ao laboratório a nova execução PLS defasado + LSTM como pesquisa não promovida;
- informa o RMSE interno 1,840456 com a ressalva de que a avaliação não replica o peso oficial;
- registra a rejeição da variante ONI, que piorou para 1,865132 e mantém risco temporal;
- preserva os downloads aprovados e a separação entre pesquisa e submissão.

## [0.6.1] - 2026-09-20

- esclarece de forma discreta quais fontes entram no CSV e quais servem apenas ao produto;
- registra alvo público proibido, limite T−1 e risco de overfitting ao leaderboard;
- reorganiza o README por camadas, integridade, modelos, downloads e operação;
- remove repetições sem reduzir a documentação científica.

## [0.6.0] - 2026-09-20

- apresenta o XGBoost de anomalias validado separadamente do baseline já enviado;
- compara RMSE interno no mesmo recorte temporal e informa a pontuação pública conhecida do baseline;
- adiciona download direto do candidato completo sem substituir silenciosamente o arquivo principal;
- atualiza o contrato científico para `1.5` e identifica a avaliação oficial ainda pendente.

## [0.5.0] - 2026-09-20

- adiciona o `Climazoide Decisão`, com seleção de mês e seis áreas de interesse;
- apresenta cenário, comparação histórica, próximos passos e pontos a monitorar;
- sincroniza a localidade com o seletor principal e mantém a entrega oficial separada;
- destaca que os cenários 2023–2024 não são previsão operacional atual.

## [0.4.0] - 2026-09-20

- adiciona leitura cruzada de chuva e temperatura com fonte, período e cautela estatística;
- apresenta o contrato oficial, alvo protegido e as nove variáveis atmosféricas do dataset;
- corrige o aviso superior para refletir o baseline já validado;
- mantém o CSV oficial intacto e separa análises operacionais da previsão mensal.

## [0.3.3] - 2026-09-19

- libera o download do CSV completo quando o backend confirma o artefato validado;
- identifica claramente a climatologia mensal como baseline, não como pontuação oficial;
- exibe período e RMSE da validação temporal interna sem promover métricas antigas.

## [0.3.2] - 2026-09-19

- alinha o frontend ao contrato científico `1.3`;
- mantém a interface com linguagem do Climazoide, sem tratar a entrega externa como identidade do projeto;
- reforça os três downloads: completo validado, parcial de pesquisa e exemplo de formato.

## [0.3.1] - 2026-09-18

- documenta APIs, dados e responsabilidades dos três repositórios;
- adiciona links visíveis para frontend, backend e pesquisa WORCAP;
- esclarece o comportamento de indisponibilidade sem dados simulados.

## [0.3.0] - 2026-09-18

- mapa visual das oito branches auditadas do WORCAP-2026;
- destaque da consolidação científica mais recente;
- indicação explícita de resultados experimentais, branches superadas e política de promoção.

## [0.2.0] - 2026-09-16

- dashboard responsivo conectado à Climazoide API;
- 13 pontos sul-americanos e atualização manual;
- tempo, chuva, solo, ar, ENSO, astronomia e impactos;
- estados explícitos de carregamento, indisponibilidade e erro;
- publicação automática no GitHub Pages, testes e CI.
