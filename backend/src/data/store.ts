import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const isVercel = Boolean(process.env.VERCEL)
const DATA_DIR = isVercel
  ? path.join('/tmp', 'data-storage')
  : path.resolve(__dirname, '../../data-storage')

// Ensure storage directory exists
async function ensureStorageDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch (err) {
    console.error('Failed to create storage directory:', err)
  }
}

// Initialise directory immediately
ensureStorageDir()

export async function readJson<T>(filename: string, fallback: T): Promise<T> {
  const filePath = path.join(DATA_DIR, filename)
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    // If file doesn't exist, save the fallback and return it
    await writeJson(filename, fallback)
    return fallback
  }
}

export async function writeJson<T>(filename: string, data: T): Promise<void> {
  await ensureStorageDir()
  const filePath = path.join(DATA_DIR, filename)
  const tempPath = `${filePath}.tmp`
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf-8')
  await fs.rename(tempPath, filePath)
}
