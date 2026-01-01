// Database connection using mssql
// Note: Drizzle ORM SQL Server support is limited, so we use mssql directly
// with parameterized queries for security
import sql from 'mssql'

// Parse server and instance from connection string
const dbServer = process.env.DB_SERVER || 'LAPTOP-RE844OVJ\\SQLEXPRESS'
const [host, instance] = dbServer.includes('\\') ? dbServer.split('\\') : [dbServer, null]

// Configure for Windows Authentication if no user/password provided
const useWindowsAuth = !process.env.DB_USER || !process.env.DB_PASSWORD

const config = useWindowsAuth
    ? {
          server: host,
          database: process.env.DB_NAME || 'ecommerce_db',
          options: {
              encrypt: false, // Use true if connecting to Azure SQL
              trustServerCertificate: true, // Use true for local development
              enableArithAbort: true,
              instanceName: instance || undefined,
              trustedConnection: true, // Use Windows Authentication
          },
      }
    : {
          server: host,
          database: process.env.DB_NAME || 'ecommerce_db',
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          options: {
              encrypt: false, // Use true if connecting to Azure SQL
              trustServerCertificate: true, // Use true for local development
              enableArithAbort: true,
              instanceName: instance || undefined,
          },
      }

let pool = null

// Create connection pool
export async function connectDB() {
    try {
        if (!pool) {
            console.log('Attempting to connect to database with config:', {
                server: config.server,
                database: config.database,
                useWindowsAuth: useWindowsAuth
            })
            pool = await sql.connect(config)
            console.log('Database connection pool created successfully.')
        }
        return pool
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        console.error('Connection error details:', {
            message: error.message,
            code: error.code,
            originalError: error.originalError?.message
        })
        throw error
    }
}

// Get connection pool
export function getPool() {
    if (!pool) {
        throw new Error('Database not connected. Call connectDB() first.')
    }
    return pool
}

// Execute raw SQL query
export async function executeQuery(query, params = {}) {
    const pool = getPool()
    const request = pool.request()
    
    // Add parameters to request
    Object.keys(params).forEach(key => {
        request.input(key, params[key])
    })
    
    const result = await request.query(query)
    return result.recordset
}

// Execute raw SQL query and return single row
export async function executeQueryOne(query, params = {}) {
    const results = await executeQuery(query, params)
    return results[0] || null
}

// Close connection
export async function closeConnection() {
    try {
        if (pool) {
            await pool.close()
            pool = null
            console.log('Database connection closed')
        }
    } catch (error) {
        console.error('Error closing database connection:', error)
        throw error
    }
}

export default pool
