# Como contribuir

O projeto usa apenas a branch `Beatriz` como base de integração.

## Fluxo curto

1. Atualize a branch antes de começar.
2. Faça uma alteração por commit.
3. Rode `npm run lint`, `npm test` e `npm run build`.
4. Abra o PR contra `Beatriz` e descreva como validou a interface.

## Commits

Use Conventional Commits em português, no formato `tipo(escopo): descrição`.

Tipos aceitos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci` e `chore`.

Exemplos:

```text
feat(dashboard): conecta resumo climático
fix(acessibilidade): corrige contraste dos estados
docs(api): registra contrato do backend
```

Rode `powershell -ExecutionPolicy Bypass -File scripts/install_hooks.ps1` uma vez após clonar para ativar a validação local da mensagem de commit.

Não inclua tokens, dados do Kaggle, arquivos NetCDF, resultados não reproduzíveis ou métricas sem origem.
