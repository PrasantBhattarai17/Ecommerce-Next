const sql = require('mssql');
require('dotenv').config({ path: '.env.local' });

const config = {
    server: 'LAPTOP-RE844OVJ',
    options: {
        instanceName: 'SQLEXPRESS',
        encrypt: false,
        trustServerCertificate: true,
        trustedConnection: true,
    },
};

async function checkAuthMode() {
    try {
        console.log('Checking SQL Server Settings (via Windows Auth)...');
        const pool = await sql.connect(config);

        // 1. Check Authentication Mode
        // 1 = Windows Auth Only, 2 = Mixed Mode
        const authMode = await pool.request().query("SELECT SERVERPROPERTY('IsIntegratedSecurityOnly') as IsIntegratedOnly");
        console.log('Auth Mode (1=Windows Only, 0=Mixed Mode):', authMode.recordset[0].IsIntegratedOnly);

        // 2. Check if ecom_db exists and is enabled
        const userCheck = await pool.request().query("SELECT name, is_disabled FROM sys.sql_logins WHERE name IN ('ecom_db', 'ecom_user')");
        console.log('SQL Logins found:', userCheck.recordset);

        await pool.close();
    } catch (err) {
        console.log('❌ Error: ' + err.message);
    }
}

checkAuthMode();
