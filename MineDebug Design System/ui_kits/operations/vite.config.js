import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, extname } from 'path'
import { createReadStream, existsSync } from 'fs'

const ROOT = resolve(__dirname, '../..')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
}

function serveDesignSystem() {
  return {
    name: 'serve-design-system',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url || '').split('?')[0])

        // Redireciona o caminho legado do dashboard para a raiz do Vite
        if (url === '/ui_kits/operations/' || url === '/ui_kits/operations/index.html') {
          res.writeHead(302, { Location: '/' })
          res.end()
          return
        }

        // Arquivos exatos na raiz do design system
        const exactFiles = ['/colors_and_type.css']
        for (const f of exactFiles) {
          if (url === f) {
            const file = resolve(ROOT, f.slice(1))
            res.setHeader('Content-Type', MIME[extname(file)] || 'text/plain')
            createReadStream(file).pipe(res)
            return
          }
        }

        // Diretórios mapeados
        const dirs = {
          '/site/':   resolve(ROOT, 'site'),
          '/assets/': resolve(ROOT, 'assets'),
        }
        for (const [prefix, dir] of Object.entries(dirs)) {
          if (url.startsWith(prefix)) {
            const file = resolve(dir, url.slice(prefix.length))
            if (existsSync(file)) {
              res.setHeader('Content-Type', MIME[extname(file)] || 'application/octet-stream')
              createReadStream(file).pipe(res)
              return
            }
          }
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), serveDesignSystem()],
  base: './',
  publicDir: resolve(ROOT, 'assets'),
  server: {
    fs: { allow: [ROOT] },
  },
})
