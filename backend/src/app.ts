import express from 'express'
import cors from 'cors'
import { config } from './config/env.js'
import { requestLogger } from './middleware/requestLogger.js'
import { errorHandler } from './middleware/errorHandler.js'
import apiRoutes from './routes/index.js'

export function createApp() {
  const app = express()

  // CORS configuration - allow all origins in preview/production
  app.use(
    cors({
      origin: true,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  )

  // Request parsing
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true }))

  // Logging
  app.use(requestLogger)

  // Root welcome route
  app.get(['/', '/api'], (req, res) => {
    res.json({
      name: 'Purva Ocean Adventures API',
      status: 'active',
      docs: '/api/health',
      endpoints: [
        '/api/health',
        '/api/inquiries',
        '/api/newsletter',
        '/api/trips',
        '/api/content/experiences',
        '/api/content/gallery',
        '/api/content/faqs',
        '/api/testimonials',
      ],
    })
  })

  // Mount API (supports both /api/* and direct routing on serverless)
  app.use('/api', apiRoutes)
  app.use('/', apiRoutes)

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `Endpoint ${req.method} ${req.originalUrl} not found.`,
    })
  })

  // Centralized Error handler
  app.use(errorHandler)

  return app
}
