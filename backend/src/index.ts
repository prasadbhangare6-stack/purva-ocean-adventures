import { createApp } from './app.js'
import { config } from './config/env.js'

const app = createApp()

if (!process.env.VERCEL) {
  const server = app.listen(config.port, () => {
    console.log(`
🌊 ============================================
   Purva Ocean Adventures API Server
   Running on: http://localhost:${config.port}
   Environment: ${config.nodeEnv}
   Health:      http://localhost:${config.port}/api/health
============================================ 🌊
    `)
  })

  // Graceful shutdown handling
  const handleShutdown = (signal: string) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`)
    server.close(() => {
      console.log('Server closed. Goodbye!')
      process.exit(0)
    })

    // Force close after 10s if stuck
    setTimeout(() => {
      console.error('Forced shutdown due to timeout')
      process.exit(1)
    }, 10000)
  }

  process.on('SIGINT', () => handleShutdown('SIGINT'))
  process.on('SIGTERM', () => handleShutdown('SIGTERM'))
}

export default app
