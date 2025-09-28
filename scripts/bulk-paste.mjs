#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
})

function ask(q) {
  return new Promise(res => rl.question(q, res))
}

async function main() {
  console.log('Bulk paste mode. Enter a file path, then paste contents. Type EOF on a single line to finish that file. Empty path to exit.')
  while (true) {
    const fp = (await ask('\nTarget file path (empty to quit): ')).trim()
    if (!fp) break
    const abs = path.resolve(process.cwd(), fp)
    fs.mkdirSync(path.dirname(abs), { recursive: true })
    console.log(`Paste content for ${fp}. End with a line containing only: EOF`)
    let buf = []
    while (true) {
      const line = await ask('')
      if (line === 'EOF') break
      buf.push(line)
    }
    fs.writeFileSync(abs, buf.join('\n'), 'utf8')
    console.log(`✔ Wrote ${fp} (${buf.length} lines)`)
  }
  rl.close()
  console.log('Done.')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})