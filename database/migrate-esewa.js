const sql = require('mssql');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
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
        console.log('Connected to database');

        // Check if columns exist
        const checkResult = await pool.request().query(`
            SELECT COLUMN_NAME 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_NAME = 'Orders' AND COLUMN_NAME IN ('KhaltiPidx', 'KhaltiTransactionId')
        `);

        const hasKhaltiColumns = checkResult.recordset.length > 0;
        console.log('Has Khalti columns:', hasKhaltiColumns);

        // Add eSewa columns
        console.log('Adding eSewa columns...');
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Orders]') AND name = 'EsewaTransactionCode')
            BEGIN
                ALTER TABLE [dbo].[Orders] ADD [EsewaTransactionCode] NVARCHAR(100)
            END

            IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Orders]') AND name = 'EsewaStatus')
            BEGIN
                ALTER TABLE [dbo].[Orders] ADD [EsewaStatus] NVARCHAR(50)
            END
        `);

        console.log('Migration completed successfully');
        await sql.close();
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

migrate();
