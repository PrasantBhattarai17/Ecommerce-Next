const sql = require('mssql');
require('dotenv').config({ path: '.env.local' });

async function checkSchema() {
    const config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER || 'localhost',
        database: process.env.DB_NAME,
        options: {
            encrypt: true,
            trustServerCertificate: true,
        },
    };

    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Orders'
        `);
        const columns = result.recordset.map(r => r.COLUMN_NAME);
        console.log('Columns in Orders table:', columns.join(', '));
        await sql.close();
    } catch (err) {
        console.error('Failed to check schema:', err);
    }
}

checkSchema();
