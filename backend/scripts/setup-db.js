import pg from 'pg'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const { Pool } = pg
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
})

const TABLES_IN_ORDER = ['users', 'pets', 'calendar_events', 'medical_records', 'growth_records']

async function runSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8')
  await pool.query(sql)
}

async function setup() {
  try {
    const dropOrder = [...TABLES_IN_ORDER].reverse()
    for (const table of dropOrder) {
      await pool.query(`DROP TABLE IF EXISTS ${table} CASCADE`)
    }

    for (const table of TABLES_IN_ORDER) {
      const filePath = path.join(__dirname, '../database/schema', `${table}.sql`)
      await runSqlFile(filePath)
    }

    for (const table of TABLES_IN_ORDER) {
      const filePath = path.join(__dirname, '../database/seeds', `${table}.sql`)
      await runSqlFile(filePath)
    }
  } catch (error) {
    console.error('Database setup failed:', error.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

setup()
