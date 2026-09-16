import { readFileSync } from 'node:fs'

const message = readFileSync(process.argv[2], 'utf8').split(/\r?\n/, 1)[0]
const pattern = /^(feat|fix|docs|style|refactor|test|build|ci|chore)(\([a-z0-9-]+\))?!?: .{3,72}$/

if (!pattern.test(message)) {
  console.error('Commit inválido. Use: tipo(escopo): descrição curta')
  console.error('Exemplo: feat(dashboard): adiciona painel de métricas')
  process.exit(1)
}
