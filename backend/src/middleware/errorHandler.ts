import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  console.error('[Error]', err)

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    })
    return
  }

  if (err instanceof Error) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    })
    return
  }

  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred',
  })
}
